<template>
  <div class="pl-10px border-box">
    <div class="detailBox">
      <div class="text-right mt-10px mb-10px"> 最后更新：{{ homeWorkData.createTime }} </div>
      <div>
        <MarkDown :value="homeWorkData.answerContent" />
      </div>
      <div class="mt-10px mb-10px">
        <div class="text-right mt-10px mb-10px"> 总分：{{ score }} </div>

        <Table :dataSource="evaluateData" :columns="columns" :pagination="false" bordered>
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'rate'">
              <Select ref="select" v-model:value="record.bonusRight" style="width: 100%">
                <SelectOption :value="item.weight" v-for="item in record.rate" :key="item.id">{{
                  item.level
                }}</SelectOption>
              </Select>
            </template>
          </template>
        </Table>
      </div>
      <div class="mb-10px pt-5px">
        <div v-for="item in homeWorkData.comments" :key="item.id" class="mt-10px mb-10px">
          <div>
            <a-textarea :value="item.comment" placeholder="请输入评语" readonly />
          </div>
          <div class="text-right text-hex-00000073">{{ item.createTime }}</div>
        </div>
        <a-textarea v-model:value="homeWorkDataSub.comment" placeholder="请输入评语" />
      </div>
      <div class="pt-5px pb-10px text-right">
        <Button type="primary" :disabled="gradeDefaultId !== gradeId" @click="doSubAnswer"
          >提交</Button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineProps, computed, watch, unref } from 'vue';
  import projectSetting from '/@/settings/projectSetting';
  import { Row, Col, Avatar, Table, Select, SelectOption } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { MarkDown } from '/@/components/Markdown';
  import { cloneDeep } from 'lodash-es';
  import { Button } from '/@/components/Button';
  import { laborHomeworkAnswer } from '/@/api/dynamic/industriallabor';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createConfirm, createMessage } = useMessage();

  const props = defineProps({
    homeWorkData: { type: Object },
    gradeDefaultId: { type: String },
    gradeId: { type: String },
  });
  const emit = defineEmits(['getLaborHomeworkStudentAnswer']);

  const columns = ref([
    {
      title: '加分项',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '评价等级',
      dataIndex: 'rate',
      key: 'rate',
    },
    {
      title: '加分权',
      dataIndex: 'bonusRight',
      key: 'bonusRight',
    },
  ]);

  const dataSource = ref([]);

  const evaluateData = ref([]);
  const homeWorkDataSub = ref({});
  watch(
    () => props.homeWorkData,
    () => {
      if (!props.homeWorkData) {
        evaluateData.value = [];
        homeWorkDataSub.value = {};
        return false;
      }
      homeWorkDataSub.value = cloneDeep(props.homeWorkData);
      homeWorkDataSub.value.comment = '';
      const {
        homeWorkData: { evaluationCriterias, evaluationCriteriaStr },
      } = props;
      let bonusRightAll = evaluationCriteriaStr
        ? typeof evaluationCriteriaStr == 'string'
          ? evaluationCriteriaStr.split(',')
          : evaluationCriteriaStr
        : [];
      let newArr = [];
      if (evaluationCriterias) {
        newArr = evaluationCriterias.map((o, index) => {
          let rate = JSON.parse(o.rate);
          return { ...o, rate, bonusRight: bonusRightAll[index] || 0 };
        });
      }
      evaluateData.value = newArr;
    },
    {
      immediate: true,
      // deep: true,
    },
  );

  const score = computed(() => {
    homeWorkDataSub.value.evaluationCriteriaStr = [];
    homeWorkDataSub.value.evaluationCriteriaStr.length = evaluateData.value.length;
    let num = evaluateData.value.reduce((pre, item, index) => {
      homeWorkDataSub.value.evaluationCriteriaStr[index] = item.bonusRight;
      return pre + item.bonusRight * 1;
    }, 0);
    homeWorkDataSub.value.score = num;
    return num;
  });

  const doSubAnswer = () => {
    const {
      id,
      studentId,
      answerContent,
      evaluationCriteriaStr,
      score,
      comment,
      laborHomewordId,
    } = homeWorkDataSub.value;
    createConfirm({
      iconType: 'warning',
      title: '温馨提示',
      content: '一旦提交评语就不能再次修改, 是否继续?',
      onOk: async () => {
        try {
          let subData={
            id, studentId, answerContent, score,
            evaluationCriteriaStr:evaluationCriteriaStr?evaluationCriteriaStr.join(','):evaluationCriteriaStr,
            comment
          }
          const { success } = await laborHomeworkAnswer(subData);
          if (success){ 
            emit('getLaborHomeworkStudentAnswer',laborHomewordId, studentId)
          };
        } catch (error) {
          console.log(error)
        }
      },
    });
  };
</script>

<style lang="less" scoped>
  .detailBox {
    padding: 5px 15px;
    border-radius: 10px;
    border: 2px solid #3949ac;
    background-color: #ffffff;
    box-sizing: border-box;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.35);
  }
</style>
<template>
  <div>
    <div v-if="!taskLaborShow">
      <List
        item-layout="horizontal"
        :data-source="taskList"
        :loading="taskListLoading"
        class="taskList"
      >
        <template #renderItem="{ item, index }">
          <ListItem>
            <taskLaborList :item="item" :index="index">
              <template #showDetail>
                <span style="color: var(--theme)" @click="showDetail(item)">查看</span>
              </template>
            </taskLaborList>
          </ListItem>
        </template>
      </List>
    </div>
    <div v-else class="pl-10px border-box">
      <div class="flex items-center">
        <Icon
          class="cursor-pointer"
          icon="mdi:arrow-left"
          :size="24"
          :color="projectSetting.themeColor"
          @click="taskLaborShow = false"
        />&nbsp;&nbsp;返回
      </div>
      <div class="border-box p-5px pt-10px">
        <div class="detailBox">
          <div class="text-right mt-10px flex">
            <div class="p-15px border-box flex justify-between items-center w-full">
              <div class="remark_card_top_left flex items-center">
                <span class="mr-20px">
                  <Icon icon="mdi:clipboard-list" :size="20" :color="projectSetting.themeColor" />
                </span>
                <span>{{ taskDate.name }}</span>
              </div>
              <div class="flex items-center">
                <span class="text-hex-00000073">创建日期：{{ taskDate.createTime }}</span>
              </div>
            </div>
          </div>
          <!-- <Divider /> -->
          <Divider class="!mt-0px !mb-0px bg-hex-bdbaba" />
          <div class="p-15px border-box w-full" style="min-height: 200px">
            <MarkdownViewer :value="taskDate.content" />

            <!-- <MarkDown :value="taskDate.answerContent" /> -->
          </div>
          <Divider class="!mt-0px !mb-0px bg-hex-bdbaba" />
          <div class="p-15px border-box w-full flex justify-between items-center">
            <span class="text-hex-00000073">截止日期：{{ taskDate.completionTime }}</span>
            <Tag color="red" v-if="laborHomeworkAnswerVO.state === '1'">已提交</Tag>
            <Tag color="green" v-else>待处理</Tag>
          </div>
          <Divider class="!mt-0px !mb-0px" style="border-color: #bdbaba" dashed />
          <div class="p-15px border-box w-full">
            <MarkDown v-model:value="laborHomeworkAnswerVO.answerContent" />
          </div>

          <div class="p-15px border-box text-right">
            <Button
              color="success"
              class="mr-10px"
              :disabled="laborHomeworkAnswerVO.state === '1'"
              @click="onSave(true)"
              >保存</Button
            >
            <Button type="primary" @click="onSave()">{{
              laborHomeworkAnswerVO.state === '1' ? '撤销提交' : '提交作业'
            }}</Button>
          </div>
          <div class="p-15px border-box">
            <List
              item-layout="horizontal"
              :data-source="laborHomeworkAnswerVO.comments"
              class="taskList"
            >
              <template #renderItem="{ item }">
                <ListItem>
                  <template #actions>
                    <span class="text-hex-00000073">{{ item.createTime }}</span>
                  </template>
                  <Skeleton avatar :title="false" :loading="false" active>
                    <ListItemMeta :description="item.comment">
                      <template #title>
                        <a>{{ item.teacherName }}</a>
                      </template>
                      <template #avatar>
                        <Avatar :src="item.avatar" />
                      </template>
                    </ListItemMeta>
                  </Skeleton>
                </ListItem>
              </template>
            </List>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, unref, computed, inject, watch } from 'vue';
  import projectSetting from '/@/settings/projectSetting';
  import {
    List,
    ListItem,
    Row,
    Col,
    Divider,
    Tag,
    Skeleton,
    ListItemMeta,
    Avatar,
  } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { MarkDown, MarkdownViewer } from '/@/components/Markdown';
  import { Button } from '/@/components/Button';
  import { laborHomeworkAnswerStudent } from '/@/api/dynamic/industriallabor';
  import taskLaborList from '/@/views/dynamic/IndustrialLabor/myClass/components/Labor/LaborRemask.vue';
  import { cloneDeep } from 'lodash-es';
  import { laborHomeworkAnswer } from '/@/api/dynamic/industriallabor';

  const props = defineProps({
    laborCourseId: { type: String },
  });
  const userInfo = inject('userInfo');
  const userId = computed(() => unref(userInfo)?.id);
  const taskList = ref([]);
  const taskListLoading = ref(false);
  const taskLaborShow = ref(false);

  watch(
    [() => userId.value, () => props.laborCourseId],
    async () => {
      try {
        taskListLoading.value = true;
        if (!unref(userId) && !props.laborCourseId) {
          taskList.value = [];
          taskListLoading.value = false;

          return false;
        }

        const { success, obj } = await laborHomeworkAnswerStudent({
          data: {
            laborCourseId: props.laborCourseId,
          },
          userId: unref(userId),
        });

        taskList.value = success ? obj || [] : [];
        taskListLoading.value = false;
      } catch (error) {
        console.log('error=>', error);
      }
    },
    {
      immediate: true,
    },
  );
  const taskDate = ref({});
  const laborHomeworkAnswerVO=ref({})
  function showDetail(item) {
    taskDate.value = item;
    laborHomeworkAnswerVO.value=unref(taskDate)?.laborHomeworkAnswerVO
    taskLaborShow.value = true;
  }
  // const laborHomeworkAnswerVO = computed(() => unref(taskDate)?.laborHomeworkAnswerVO);
  // const laborHomeworkAnswerVO = computed(() => unref(taskDate)?.laborHomeworkAnswerVO);
  const onSave = async (flag = null) => {
    const state = unref(laborHomeworkAnswerVO)?.state;
    const data = cloneDeep(unref(laborHomeworkAnswerVO));
    data.state = flag ? '0' : state === '1' ? '0' : '1';
    const { success } = await laborHomeworkAnswer(data);
    if (success) {
      laborHomeworkAnswerVO.value = data;
    }
  };
</script>

<style lang="less" scoped>
  .taskList {
    ::v-deep(.ant-list-item) {
      padding-bottom: 0;
    }
  }
  .detailBox {
    // padding: 5px 15px;
    border-radius: 10px;
    // border: 2px solid #3949ac;
    background-color: #ffffff;
    box-sizing: border-box;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.35);
  }
</style>
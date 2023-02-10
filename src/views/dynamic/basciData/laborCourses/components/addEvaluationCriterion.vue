<template>
  <div>
    <a-button @click="openSafeGuide" type="primary" class="mr-2" :iconSize="16"> 添加 </a-button>
    <br />
    <Row :gutter="10" class="mt-1">
      <Col
        class="mt-2"
        :xs="24"
        :sm="24"
        :md="21"
        :lg="24"
        :xl="24"
        :xxl="24"
        v-for="(item, index) in selectData"
        :key="item.id"
      >
        <Card :title="item.content">
          <template #extra>
            <Icon @click="remove(index)" icon="mdi:close-circle-outline"  color="red" class="cursor-pointer" title="移除"/>
          </template>
        </Card>
      </Col>
    </Row>
    <BasicModal
      v-bind="$attrs"
      @register="registerModal"
      title="安全指南"
      @ok="handleSuccess"
      :minHeight="500"
      width="800px"
    >
      <BasicTable v-bind="tableData" @register="registerTable" :boxShadow="false" :key="key">
      </BasicTable>
    </BasicModal>
  </div>
</template>
<script lang="ts" setup>
  import { ref, unref, defineProps, defineEmits, watch, computed } from 'vue';
  import { Button } from '/@/components/Button';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Row, Col, Card } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { Icon } from '/@/components/Icon';
  import { useMessage } from '/@/hooks/web/useMessage';
  import {
    evaluationCriteriaList as getList,
    evaluationCriteriaDelete as deleteData,
  } from '/@/api/dynamic/basciData';
  import { searchFormSchema, columns } from '/@/views/dynamic/basciData/evaluationCriterion/data';
  
  import { MarkdownViewer } from '/@/components/Markdown';
  const { createMessage } = useMessage();
  const key = ref(new Date().valueOf());

  const colProps = {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 12 },
    lg: { span: 12 },
    xl: { span: 12 },
  };

  const emit = defineEmits(['change']);

  const props = defineProps({
    evaluationCriterias: { type: Array },
    grade: { type: String },
  });

  const selectData = ref([]);

  watch([() => props.evaluationCriterias], () => {
    if (props.evaluationCriterias) {
      selectData.value = props.evaluationCriterias;
    }
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {});

  const tableData = computed(() => {
    return {
      api: getList,
      params: { test: 11 },
      columns,
      formConfig: {
        rowProps: { gutter: 2 },
        schemas: [
          {
            field: 'dictItemGradeId',
            component: 'Select',
            label: '班级',
            defaultValue: props.grade,
            show: false,
          },
          {
            field: 'content',
            label: '内容',
            colProps,
            component: 'Input',
          },
        ],
      },
      useSearchForm: true,
      bordered: false,
      showIndexColumn: false,
      rowSelection: {
        type: 'checkbox',
      },
      fetchSetting: {
        pageField: 'current',
        sizeField: 'size',
        listField: 'records',
        totalField: 'total',
      },
      scroll: { x: 'max-content' },
    };
  });

  const [registerTable, { reload, getSelectRows }] = useTable();

  function openSafeGuide() {
    if(!props.grade) return createMessage.warning('请先选择班级')
    key.value = new Date().valueOf();
    setModalProps({ visible: true });
  }

  async function remove(index) {
    const data = unref(selectData).filter((item, i) => index != i);
    selectData.value = data;
    emit('change', data.map((o) => o.id).join(','));
  }

  async function handleSuccess() {
    const data = await getSelectRows();
    selectData.value = data;
    emit('change', data.map((o) => o.id).join(','));
    closeModal();
  }
</script>
<style lang="less" scoped>
  .ant-card-head {
    padding: 0 10px;
  }
  .ant-card-head-title {
    padding: 10px 0;
  }
</style>


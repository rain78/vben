<template>
  <div >
    <a-button
      @click="openSafeGuide"
      type="primary"
      class="mr-2"
      :iconSize="16"
    >
      添加
    </a-button>
    <br />
    <Row :gutter="10" class="mt-1">
      <Col class="mt-2" :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12" v-for="(item,index) in selectData" :key="item.id">
        <Card  :data="item" :index="index" :icon="true" @delete="handleDelete">

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
      <BasicTable @register="registerTable" :boxShadow="false" :key="key">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'content'">
            <h2 class="font-blod text-1xl">{{ record.title }}</h2>
            <MarkdownViewer :value="record.content" />
          </template>
        </template>
      </BasicTable>
    </BasicModal>
  </div>
</template>
<script lang="ts" setup>
  import { ref, unref, defineProps, defineEmits, watch } from 'vue';
  import { Button } from '/@/components/Button';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Row, Col } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { safetyGuideList as getList } from '/@/api/dynamic/basciData';
  import { MarkdownViewer } from '/@/components/Markdown';
  import Card from '/@/views/dynamic/basciData/safetyGuide/components/card.vue';

  const key=ref(new Date().valueOf())

  const colProps = {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 12 },
    lg: { span: 12 },
    xl: { span: 12 },
  };

  const emit = defineEmits(['change']);



  const props = defineProps({
    safetyGuides: { type: Array },
  });
  
  const selectData = ref([]);

 
  watch([() => props.safetyGuides], () => {
    if (props.safetyGuides) {
      selectData.value = props.safetyGuides
    }
  });

  


  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {});

  const [registerTable, { reload, getSelectRows }] = useTable({
    api: getList,
    columns: [
      {
        dataIndex: 'content',
        title: '内容',
      },
    ],
    formConfig: {
      rowProps: { gutter: 2 },
      schemas: [
        {
          field: 'title',
          label: '标题',
          component: 'Input',
          colProps,
        },
        {
          field: 'content',
          label: '内容',
          component: 'Input',
          colProps,
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
  });

  function openSafeGuide() {
    key.value=new Date().valueOf()
    setModalProps({ visible: true });
  }

  async function handleDelete(index){
    const data=unref(selectData).filter((item,i)=>index!=i)
    selectData.value = data;
    emit('change', data.map((o) => o.id).join(','));
  }

  async function handleSuccess() {
    const data = await getSelectRows();
    selectData.value = data;
    // console.log('selectData=>',selectData.value)
    emit('change', data.map((o) => o.id).join(','));
    closeModal();
  }
</script>
<style lang="less" scoped>
</style>


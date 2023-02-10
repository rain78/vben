<template>
  <div>
    <CardList
      :actionColOptions="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12 }"
      :searchFormSchema="searchFormSchema"
      :params="params"
      :api="getList"
      @get-method="getMethod"
      :card="card"
      :gridData="{
        gutter: 10,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 5,
        xxl: 5,
      }"
    >
      <template #formBtn>
        <a-button
          color="success"
          @click="handleCreate"
          class="mr-2"
          preIcon="mdi:plus"
          :iconSize="16"
          >新增</a-button
        >
        <a-button color="warning" class="mr-2" @click="doEdit">修改</a-button>
        <a-button type="danger" class="mr-2" @click="doDel">删除</a-button>
      </template>
      <!-- <template #actionsOption1="{ data }" >
        <Space class="text-center"  @click="handleEdit(data)">
         编辑
        </Space>
      </template> -->
    </CardList>
    <editModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { CardList } from '/@/components/CardList';
  import { Button } from '/@/components/Button';
  import { PageWrapper } from '/@/components/Page';
  import { demoListApi } from '/@/api/demo/table';
  import {
    getLaborCourseList as getList,
    deleteLaborCourseData as deleteData,
  } from '/@/api/dynamic/basciData';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { searchFormSchema } from './data';
  import card from './components/card.vue';
  import { useModal } from '/@/components/Modal';
  import editModal from './editModal.vue';
  const [registerModal, { openModal }] = useModal();
  const { createConfirm, createMessage } = useMessage();
  // 请求api时附带参数
  const params = {};

  let reload = () => {};
  let select = () => {};
  // 获取内部fetch方法;
  function getMethod(m: any, flag) {
    if (flag === 'reload') reload = m;
    else if (flag === 'select') select = m;
  }

   function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function doEdit(){
    const selectData = select().filter(Boolean);
    if (selectData.length <= 0) return createMessage.warning('请至少选择一条数据操作');
    openModal(true, {
      record:selectData[selectData.length-1],
      isUpdate: true,
    });
  }

  

  function handleSuccess(){
    reload()
  }

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }
  //删除按钮事件
  function doDel() {
    const selectData = select().filter(Boolean);
    if (selectData.length <= 0) return createMessage.warning('请至少选择一条数据操作');
    createConfirm({
      iconType: 'warning',
      title: '温馨提示',
      content: '确定此操作吗',
      onOk: async () => {
        try {
          const { success } = await deleteData({ ids: selectData.map((o) => o.id).join(',') });

          if (success) reload();
        } catch (error) {
          console.log(error);
        }
      },
    });
  }
</script>

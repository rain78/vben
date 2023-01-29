<template>
  <div>
    <CardList
      :actionColOptions="{ xs: 24, sm: 24, md: 24, lg: 18, xl: 18 }"
      :searchFormSchema="searchFormSchema"
      :params="params"
      :api="getList"
      @get-method="getMethod"
      :card="card"
    >
      <template #formBtn>
        <!-- <a-button color="warn" class="mr-2">操作</a-button> -->
        <a-button type="danger" class="mr-2" @click="doDel">删除</a-button>
      </template>
    </CardList>
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
  import card from './card.vue';
  const { createConfirm, createMessage } = useMessage();
  // 请求api时附带参数
  const params = {};

  let reload = () => {};
  let handleDel = () => {};
  // 获取内部fetch方法;
  function getMethod(m: any, flag) {
    if (flag === 'reload') reload = m;
    else if (flag === 'delete') handleDel = m;
  }
  //删除按钮事件
  function doDel(id) {
    const selectData = handleDel().filter(Boolean);
    if (selectData.length <= 0) return createMessage.warning('请至少选择一条数据操作');
    createConfirm({
      iconType: 'warning',
      title: '温馨提示',
      content: '确定此操作吗',
      onOk: async () => {
        try {
          const { success } = await deleteData({ids:selectData.map(o=>o.id).join(',')});
          
          if (success) reload();
        } catch (error) {
          console.log(error);
        }
      },
    });
  }
</script>

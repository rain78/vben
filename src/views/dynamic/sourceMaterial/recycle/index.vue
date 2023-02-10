<template>
  <div>
    <CardList
      :actionColOptions="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }"
      :searchFormSchema="[]"
      :params="params"
      :api="getList"
      @get-method="getMethod"
      :card="card"
      :showSubmitButton="false"
      :gridData="{
        gutter: 10,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 5,
        xl: 5,
        xxl: 6,
      }"
    >
      <template #formBtn>
        <a-button
          type="primary"
          class="mr-2"
          @click="refresh"
          preIcon="mdi:delete-restore"
          :iconSize="16"
        >
          恢复
        </a-button>
        <a-button
          type="danger"
          class="mr-2"
          @click="empty"
          preIcon="mdi:delete-empty"
          :iconSize="16"
        >
          清空
        </a-button>
      </template>
    </CardList>
  </div>
</template>
<script lang="ts" setup>
  import { CardList } from '/@/components/CardList';
  import { Button } from '/@/components/Button';

  import ApiRadioGroup from './components/ApiRadioGroup.vue';
  import {
    recycleList as getList,
    recycleDelete as deleteData,
    recycleEdit as updateData,
  } from '/@/api/dynamic/sourceMaterial';
  import { useMessage } from '/@/hooks/web/useMessage';
  // import { searchFormSchema } from './data';
  import card from './components/card.vue';
  const { createConfirm, createMessage } = useMessage();

  function empty() {
    createConfirm({
      iconType: 'warning',
      title: '温馨提示',
      content: '确定此操作吗',
      onOk: async () => {
        try {
          const { success } = await deleteData();

          if (success) reload();
        } catch (error) {
          console.log(error);
        }
      },
    });
  }

  function refresh() {
    const selectData = handleDel().filter(Boolean);
    if (selectData.length <= 0) return createMessage.warning('请至少选择一条数据操作');
    createConfirm({
      iconType: 'warning',
      title: '温馨提示',
      content: '确定此操作吗',
      onOk: async () => {
        try {
          const { success } = await updateData({ ids: selectData.map((o) => o.id).join(',') }, 'put');

          if (success) reload();
        } catch (error) {
          console.log(error);
        }
      },
    });
  }

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
          const { success } = await deleteData({ ids: selectData.map((o) => o.id).join(',') });

          if (success) reload();
        } catch (error) {
          console.log(error);
        }
      },
    });
  }
</script>

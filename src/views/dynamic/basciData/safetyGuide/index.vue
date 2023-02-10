<template>
  <div>
    <CardList
      :actionColOptions="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12 }"
      :searchFormSchema="searchFormSchema"
      :params="params"
      :api="getList"
      @get-method="getMethod"
      :card="card"
      :boxShadow="false"
      :gridData="{
        gutter: 10,
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 1,
        xxl: 1,
      }"
    >
      <template #formBtn>
        <a-button
          color="success"
          @click="handleCreate"
          class="mr-2"
          preIcon="mdi:plus"
          :iconSize="16"
        >
          新增
        </a-button>
      </template>
      <template #actionsOption1="{ data }">
        <Space class="text-center">
          <!-- {{data}} -->
          <Icon
            icon="mdi:pencil"
            @click="handleEdit(data)"
            :size="20"
            :color="projectSetting.themeColor"
          />
        </Space>
      </template>
      <template #actionsOption2="{ data }">
        <Space class="text-center">
          <Icon icon="mdi:delete" @click="handleDelete(data)" :size="20" :color="projectSetting.themeColor" />
        </Space>
      </template>
    </CardList>
    <editModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { CardList } from '/@/components/CardList';
  import { Button } from '/@/components/Button';
  import { Space } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { useModal } from '/@/components/Modal';
  import {
    safetyGuideList as getList,
    safetyGuideDelete as deleteData,
  } from '/@/api/dynamic/basciData';
  import { useMessage } from '/@/hooks/web/useMessage';
  import card from './components/card.vue';
  import { router } from '/@/router';
  const { createConfirm, createMessage } = useMessage();
  import { searchFormSchema } from './data';
  import editModal from './editModal.vue';
  import projectSetting from '/@/settings/projectSetting';
  const [registerModal, { openModal }] = useModal();

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable) {
    const { createConfirm } = useMessage();
    createConfirm({
      iconType: 'warning',
      title: '温馨提示',
      content: '确定此操作吗',
      onOk: async () => {
        try {
          //const {success} =deleteData({ids:record.id})
          const { success } = await deleteData({ ids: record.id });
          if (success) reload();
        } catch (error) {}
      },
    });
  }

  function handleSuccess() {
    reload();
  }

  // 请求api时附带参数
  const params = { size: 10 };

  let reload = () => {};
  let select = () => {};
  // 获取内部fetch方法;
  function getMethod(m: any, flag) {
    if (flag === 'reload') reload = m;
    else if (flag === 'select') select = m;
  }
</script>

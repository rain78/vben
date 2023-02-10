<template>
  <div>
    <CardList
      :actionColOptions="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }"
      :searchFormSchema="[]"
      :params="params"
      :BasicFormShow="false"
      :api="getList"
      @get-method="getMethod"
      :paginationProp="false"
      :card="card"
      :gridData="{
        gutter: 15,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 4,
        xxl: 5,
      }"
      :fetchSetting="{
          pageField: 'current',
          sizeField: 'size',
          listField: '',
          totalField: '',
        }"
    >
      <template #formBtn>
        <a-button color="success" class="mr-2" @click="doEdit" preIcon="mdi:plus" :iconSize="16">
          新增
        </a-button>
        <a-button type="danger" class="mr-2" @click="doDel" preIcon="mdi:delete" :iconSize="16">
          删除
        </a-button>
      </template>
    </CardList>
    <CommonUpload @register="registerModal" @success="handleSuccess" ></CommonUpload>
  </div>
</template>
<script lang="ts" setup>
  import { CardList } from '/@/components/CardList';
  import { Button } from '/@/components/Button';
  import { Icon } from '/@/components/Icon';
  import { useModal } from '/@/components/Modal';
  import { industriallaborList as getList, industriallaborDetail as deleteData } from '/@/api/dynamic/industriallabor';
  import { useMessage } from '/@/hooks/web/useMessage';
  import card from './components/card.vue';
  import { func } from 'vue-types';
  import { router } from '/@/router';
  const { createConfirm, createMessage } = useMessage();

  const [registerModal, { openModal, closeModal }] = useModal();

  function doEdit(){
    router.push('/sourceMaterial/album/add')
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

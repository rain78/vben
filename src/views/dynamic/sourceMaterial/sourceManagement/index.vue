<template>
  <div>
    <CardList
      :actionColOptions="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }"
      :searchFormSchema="[]"
      :params="params"
      :api="getList"
      @get-method="getMethod"
      :card="card"
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
          color="warning"
          class="mr-2"
          @click="handleUpload"
          preIcon="mdi:folder-plus"
          :iconSize="16"
        >
          上传
        </a-button>
        <a-button color="success" class="mr-2" @click="doDownload" preIcon="mdi:cloud-download" :iconSize="16">
          下载
        </a-button>
        <a-button type="danger" class="mr-2" @click="doDel" preIcon="mdi:delete" :iconSize="16">
          删除
        </a-button>
      </template>
    </CardList>
    <CommonUpload @register="registerModal" @success="handleSuccess"></CommonUpload>
  </div>
</template>
<script lang="ts" setup>
  import { CardList } from '/@/components/CardList';
  import { Button } from '/@/components/Button';
  import { PageWrapper } from '/@/components/Page';
  import { demoListApi } from '/@/api/demo/table';
  import { Icon } from '/@/components/Icon';
  import { CommonUpload } from '/@/components/Upload';
  import { useModal } from '/@/components/Modal';
  import {downloadZip} from '/@/utils/file/download';
  import { cloneDeep } from 'lodash-es';



  import ApiRadioGroup from './components/ApiRadioGroup.vue';
  import {
    getSourceMaterialList as getList,
    deleteSourceMaterial as deleteData,
    upLoadSourceMaterial as upload,
  } from '/@/api/dynamic/sourceMaterial';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { searchFormSchema } from './data';
  import card from './card.vue';
import { func } from 'vue-types';
  const { createConfirm, createMessage } = useMessage();

  const [registerModal, { openModal, closeModal }] = useModal();

  function handleUpload() {
    openModal(true, {
      isUpdate: false,
    });
  }

  async function handleSuccess(fileList) {
    try {
      // debugger
      const uploadData = cloneDeep(fileList);
      const formdata = new FormData();
      uploadData.forEach((item) => {
        formdata.append('files', item.originFileObj);
      });
      const {data:{success}} = await upload(formdata);
      if(success){
        closeModal();
        createMessage.success('上传成功')
        reload()
      }else{
        createMessage.error('上传失败')
        closeModal();
      }
      
    } catch (error) {
      console.log('error=>',error)
    }
  }

  function doDownload(){
    const selectData = handleDel().filter(Boolean);
    if (selectData.length <= 0) return createMessage.warning('请至少选择一条数据操作');
    downloadZip(selectData)
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

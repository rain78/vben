<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="上传文件" @ok="handleSubmit">
    <UploadDragger
      v-model:fileList="fileList"
      name="file"
      :multiple="true"
      :before-upload="beforeUpload"
      @drop="handleDrop"
    >
      <p class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
      </p>
      <p class="ant-upload-text">拖拽文件于或者<em>点击上传</em></p>
      <p class="ant-upload-hint"> 支持类型</p>
      <template #itemRender="{ file, actions }">
        <div class="fileList">
            <span>{{ file.name }}</span>
            <a href="javascript:;" @click="actions.remove">删除</a>
          </div>
      </template>
    </UploadDragger>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  import { InboxOutlined } from '@ant-design/icons-vue';
  import { message } from 'ant-design-vue';
  import type { UploadChangeParam } from 'ant-design-vue';
  import { UploadDragger, Space } from 'ant-design-vue';

  export default defineComponent({
    components: { BasicModal, InboxOutlined, UploadDragger, Space },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const fileList = ref([]);
      const beforeUpload: UploadProps['beforeUpload'] = (file) => {
        fileList.value = [...fileList.value, file];
        return false;
      };

      async function handleSubmit() {
        emit('success', fileList.value);
      }

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        fileList.value=[]
      });

      return {
        handleSubmit,
        registerModal,

        beforeUpload,
        fileList,
        handleDrop: (e: DragEvent) => {
          console.log(e);
        },
      };
    },
  });
</script>
<style lang="less" scoped>
  .fileList {
    display: flex;
    justify-content: space-between;
  }
</style>


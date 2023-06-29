<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="上传文件" @ok="handleSubmit">
    <UploadDragger
      v-model:fileList="fileList"
      name="file"
      v-bind="fileSet"
      :before-upload="beforeUpload"
      @drop="handleDrop"
    >
      <p class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
      </p>
      <p class="ant-upload-text">拖拽文件于或者<em>点击上传</em></p>
      <p class="ant-upload-hint" v-if="fileSet&&fileSet.accept">支持类型:{{fileSet.accept}}</p>
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

  import { Upload , Space } from 'ant-design-vue';

  export default defineComponent({
    components: { BasicModal, UploadDragger:Upload.Dragger, Space },
    emits: ['success', 'register'],
    props:['fileSet'],
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


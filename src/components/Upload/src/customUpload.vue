<template>
  <div style="width: 100%">
    <Upload
      v-model:file-list="fileList"
      name="file"
      @change="handleChange"
      :before-upload="beforeUpload"
      :showUploadList="false"
    >
      <a-button :loading="loading">
        <upload-outlined v-if="!loading"></upload-outlined>
        上传文件
      </a-button>
    </Upload>
    <div class="imageBox">
      <a-row :gutter="8">
        <!-- <a-col :xs="8" :sm="8" :md="6" :lg="6" :xl="6">Col</a-col> -->
        <a-col :span="8" v-for="(item, index) in uploadedFile" :key="index">
          <Image :src="item.url" />
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts">
  import { message, Upload, Row, Col, Image } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { defineComponent, ref, watch } from 'vue';
  import type { UploadChangeParam } from 'ant-design-vue';
  import { isFunction } from '/@/utils/is';
  import { cloneDeep } from 'lodash-es';
  import { uploadContainerProps } from './props';

  export default defineComponent({
    name: 'CustomUpload',
    props: uploadContainerProps,
    components: {
      UploadOutlined,
      Upload,
      [Row.name]: Row,
      [Col.name]: Col,
      Image,
    },
    emits: ['change', 'update:value'],
    setup(props, { attrs, emit }) {
      const loading = ref(false);
      const fileList = ref([]);
      const uploadedFile = ref(null);

      watch(
        () => props.value,
        (value) => {
          if (!value) {
            uploadedFile.value = [];
          } else {
            if (typeof value === 'string') {
              uploadedFile.value = [
                {
                  url: value,
                },
              ];
            } else {
              uploadedFile.value = cloneDeep(value);
            }
          }
        },
      );

      const handleChange = async (info: UploadChangeParam) => {
        try {
          const formdata = new FormData();
          info.fileList.forEach((val) => {
            formdata.append('files', val.originFileObj);
          });
          formdata.append('tag', 'schoolBadge');
          await uploadApiBy(formdata);
        } catch (e) {
          console.log(e);
        }
      };

      async function uploadApiBy(formdata) {
        const { api } = props;
        if (!api || !isFunction(api)) {
          return message.warn('upload api must exist and be a function');
        }
        try {
          loading.value = true;
          const {
            data: { success, obj },
          } = await api(formdata);
          loading.value = false;
          if (success) {
            if (typeof obj === 'string') {
              uploadedFile.value = [
                {
                  url: obj,
                },
              ];
              emit('change', obj);
            } else {
              uploadedFile.value = cloneDeep(obj);
            }

            fileList.value = [];
          }
          // retu
        } catch (e) {
          console.log(e);
        }
      }

      function beforeUpload(file: File) {
        return false;
      }

      return {
        fileList,
        uploadedFile,
        loading,
        beforeUpload,
        handleChange,
      };
    },
  });
</script>
<style lang="less" scoped>
  .imageBox {
    padding-top: 10px;
  }
</style>


<template>
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
</template>
<script lang="ts">
import { message,Upload } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import type { UploadChangeParam } from 'ant-design-vue';
import { isFunction } from '/@/utils/is';

export default defineComponent({
  name:'CustomUpload',
  components: {
    UploadOutlined,Upload
  },
  emits: ['change'],
  setup(props,{ attrs, emit }) {
    const loading=ref(false)
    const fileList = ref([]);
    const handleChange =async (info: UploadChangeParam) => {
      try {
        const formdata = new FormData()
        info.fileList.forEach(val=>{
          formdata.append('files',val.originFileObj)
        })
				formdata.append('tag','schoolBadge')
        await uploadApiBy(formdata)
      } catch (e) {
        console.log(e)
        
      }
      
    };

    async function uploadApiBy(formdata) {
        const { api } = attrs;
        if (!api || !isFunction(api)) {
          return message.warn('upload api must exist and be a function');
        }
        try {
          loading.value=true
          const {data:{success,obj}}= await api(
            formdata,
          );
          loading.value=false
          if(success){ 
            emit('change', obj)
            fileList.value=[]
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
      loading,
      beforeUpload,
      handleChange,
    };
  },
});
</script>


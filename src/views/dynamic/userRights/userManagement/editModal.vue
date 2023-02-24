<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './data';
  // import { upSchooldate as update } from '/@/api/dynamic/agencyPersonnel';
  import { userEdit as update,userDetail as getDetail} from '/@/api/dynamic/userRights';

  
  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    name: 'MenuModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');

       const {
        createMessage,
      } = useMessage();
      const { success,error } = createMessage;

      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        const { obj: detailData } = await getDetail({ ids: data.record.id });
        console.log('detailData=>',detailData)
        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          setFieldsValue({
            ...data.record,
            ...detailData,
            lockFlag:!data.record.lockFlag
            // roleIds:values.roleIds.join(',')
          });
          
          
        }

        
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

      async function handleSubmit() {
        try {
          const values = await validate();
          console.log('values=>',values)
          setModalProps({ confirmLoading: true });
          let editData={}
          if(unref(isUpdate)){
            editData={
              id:rowId.value
            }
          }
          const {obj,success:resFlag}=await update({...values,roleIds:values.roleIds.join(','),...editData,lockFlag:!values.lockFlag},unref(isUpdate)?'put':'post')

          if(resFlag){
            emit('success');
            success(getTitle.value+'成功')
          }else{
            error(getTitle.value+'失败')

          }
          closeModal()
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>

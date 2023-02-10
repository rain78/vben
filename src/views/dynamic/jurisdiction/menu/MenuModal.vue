<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  // import { accountFormSchema } from './account.data';
  import { formSchema,formSchema1 } from './menu.data';
  import { getMenuList1,updateMenuList as update } from '/@/api/demo/system';
  
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
        schemas: formSchema1,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          setFieldsValue({
            ...data.record,
          });
        }

        const {obj:treeData} = await getMenuList1();
        updateSchema([
          {
            field: 'parentId',
            componentProps: { treeData },
          },
        ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          const {obj,success:resFlag}=await update({...values,keepAlive:false,meta:{}})
          // console.log(values,success);
          // closeModal();
          // emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });

          if(resFlag){
            emit('success');
            success(getTitle+'成功')
          }else{
            error(getTitle+'失败')

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

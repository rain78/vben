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
  import { menuEdit as update ,menuDetail as getDetail} from '/@/api/dynamic/upms';

  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    name: 'MenuModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');

      const { createMessage } = useMessage();
      const { success, error } = createMessage;

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
        const { obj: detailData } = await getDetail({ id: data.record.id });
        // console.log('detailData=>',detailData)
        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          const meta=detailData.meta?JSON.parse(detailData.meta):{}
          setFieldsValue({
            // ...data.record,
            ...detailData,
            // name:data.record.label,
            type:data.record.type*1,
            hideMenu:meta?.hideMenu||false,
            hideChildrenInMenu:meta?.hideChildrenInMenu||false,
            dynamicLevel:meta?.dynamicLevel||0,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

      async function handleSubmit() {
        try {
          const values = await validate();
          // console.log('values=>',values)
          setModalProps({ confirmLoading: true });
          let editData = {};
          if (unref(isUpdate)) {
            editData = {
              id: rowId.value,
              // meta: JSON.stringify({
              //   name: values.name,
              // }),
            };
          }
          let subData = {
            name: values.name,
            permission: values.permission||'',
            path:  values.path||'',
            parentId: values.parentId||'-1',
            icon: values.icon||'',
            component: values.component||'',
            sort: values.sort||0,
            keepAlive: values.keepAlive||'',
            type: values.type,
            redirect:values.redirect||'',
            meta: JSON.stringify({
                name: values.name,
                hideMenu:values.hideMenu||false,
                hideChildrenInMenu:values.hideChildrenInMenu||false,
                dynamicLevel:values.dynamicLevel||0
            }),
          };
          
          // console.log('subData=>',subData);
          const {obj,success:resFlag}=await update({...subData,...editData},unref(isUpdate)?'put':'post')

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

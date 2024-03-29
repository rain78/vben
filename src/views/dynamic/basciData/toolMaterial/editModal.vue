<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit" :minHeight="rowId?400:''">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './data';
  import { toolMaterialEdit as update } from '/@/api/dynamic/basciData';
  import { h } from 'vue';
  import AddImg from './components/AddImg.vue';

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

        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          setFieldsValue({
            ...data.record,
          });

          updateSchema({
            field: 'sourceMaterialId',
            // componentProps: { sourceMaterialUrl: data.record.sourceMaterialUrl },
            render: ({ model, field }) => {
              return h(AddImg, {
                value: model[field],
                thumbUrl:data.record.sourceMaterialUrl,
                onChange: (value: string) => {
                  model[field] = value;
                },
              });
            },
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
            };
          }
          const { obj, success: resFlag } = await update(
            { ...values, ...editData },
            unref(isUpdate) ? 'put' : 'post',
          );

          if (resFlag) {
            emit('success');
            success(getTitle.value + '成功');
          } else {
            error(getTitle.value + '失败');
          }
          closeModal();
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>

<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit" :minHeight="100">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './data';
  import { upTeacherdate as update,getTeacherDetail as getDetail} from '/@/api/dynamic/agencyPersonnel';

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
          // console.log('record=>',data.record)
          // console.log('res=>',res)
          rowId.value = data.record.teacher.id;
          setFieldsValue({
            ...data.record.user,
            ...data.record.teacher,
            lockFlag: !data.record.user.lockFlag,
          });
        }
        const {obj}=await getDetail({ id: data.record.teacher.id})
        // console.log('obj=>',obj)
        updateSchema([
            {
              field: 'clazzIds',
              show: unref(isUpdate),
              defaultValue:obj.clazzes||[]
            },
          ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          let editData = {};
          if (unref(isUpdate)) {
            editData = {
              id: rowId.value,
              clazzIds:values.clazzIds.map(o=>o.id).join(',')
            };
          }
          const {
            obj,
            success: resFlag,
            msg,
          } = await update(
            { ...values, ...editData, lockFlag: !values.lockFlag },
            unref(isUpdate) ? 'put' : 'post',
          );
          if (resFlag) {
            emit('success');
            success(getTitle.value + '成功');
          } else {
            error(msg ? msg : `${getTitle.value}失败`);
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

<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    :minHeight="400"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './data';
  import { notifyEdit as update } from '/@/api/dynamic/industriallabor';
  import { h } from 'vue';
  import { Image, Tag, Switch } from 'ant-design-vue';
  import AddImg from './AddImg.vue';

  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    props: ['clazzmemberData'],
    setup(props, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');
      var selectStuData = [];

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
        selectStuData = data.record.studentIds;
        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          setFieldsValue({
            ...data.record,
          });
        }

        updateSchema({
          field: 'sourceMaterialIds',
          render: ({ model, field }) => {
            return h(AddImg, {
              key:data.record.key,
              onChange: (value: string) => {
                model[field] = value;
              },
            });
          },
        });

        updateSchema({
          field: 'studentIds',
          render: ({ model, field }) => {
            const {
              clazzmemberData: { students },
            } = props;
            // debugger;
            const selectData = model[field];
            const newData = students.filter((o) => selectData.includes(o.student.id));
            const tags = newData.map((val, index) => {
              return h(
                Tag,
                {
                  color: 'blue',
                  closable: true,
                  onClose: () => {
                    selectStuData = selectStuData.filter((o) => o !== val.student.id);
                  },
                },
                () => val.student.name,
              );
            });
            return h('span', {}, tags);
          },
        });
      });

      const getTitle = computed(() => '发送通知');

      const handleSubmit = async () => {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          let editData = {};
          if (unref(isUpdate)) {
            editData = {
              id: rowId.value,
            };
          }
          let studentIds = selectStuData.join(',');
          let updateData = {
            studentIds: selectStuData.join(','),
            title: values.title,
            content: values.content,
            sourceMaterialIds: values.sourceMaterialIds,
          };
          const { obj, success: resFlag, msg } = await update(updateData, 'post');
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
      };

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>

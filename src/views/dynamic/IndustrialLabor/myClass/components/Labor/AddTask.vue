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
  import { useMessage } from '/@/hooks/web/useMessage';
  import { CheckboxGroup,Checkbox } from 'ant-design-vue';
  import { laborHomeworkEdit } from '/@/api/dynamic/industriallabor';


  export default defineComponent({
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    props:['studentData','laborCourseId','clazzId'],
    setup(props, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');
      const selectData=ref([])
      const selectAll=ref(false)

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
        selectData.value=[]
        selectAll.value=false
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          setFieldsValue({
            ...data.record,
          });
        }

        const {studentData}=props
        updateSchema({
          field: 'studentIds',
          render: ({ model, field }) => {
            const checkboxData=h(CheckboxGroup,{
              value:selectData,
              onChange:(e)=>{
                  selectData.value=e
                  if(e.length===studentData.length) selectAll.value=true
                  else selectAll.value=false
                  model[field] = e.join(',')
              },
              options:studentData.map(val=>{
                return {
                  label:val.student.name,
                  value:val.student.id
                }
              })
            })
            return h('div', {},[
              h('div',{},[
                h(Checkbox,{
                  checked:selectAll,
                  onChange:(e)=>{
                    selectAll.value=e.target.checked
                    selectData.value=e.target.checked?studentData.map(o=>o.student.id):[]
                    model[field] = selectData.value.join(',')
                  }
                },'班级所有学生')
              ]),
              checkboxData
            ]);
          },
        });

        
        
      });

      const getTitle = computed(() => '任务新增');

      const handleSubmit = async () => {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          const {laborCourseId,clazzId}=props
          const { obj, success: resFlag, msg } = await laborHomeworkEdit({...values,laborCourseId,clazzId});
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

      return { registerModal, registerForm, getTitle, handleSubmit,selectData,selectAll };
    },
  });
</script>

<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    :minHeight="600"
    width="800px"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './data';
  import {
    laborCourseEdit as update,
    laborCourseDetail as getDetail,
  } from '/@/api/dynamic/basciData';
  import { h } from 'vue';
  import AddImg from './components/AddImg.vue';
  import AddVideo from './components/AddVideo.vue'
  import AddSafeGuide from './components/AddSafeGuide.vue';
  import AddToolMaterial from './components/AddToolMaterial.vue'
  import addEvaluationCriterion from './components/addEvaluationCriterion.vue'
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
        await updateSchemaEdit('','',[],[],[])
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          const { obj: detailData } = await getDetail({ id: data.record.id });

          console.log('detailData=>',detailData)

          setFieldsValue({
            ...data.record,
          });
          updateSchemaEdit(
            detailData.sourceMaterialCoverUrl,
            detailData.sourceMaterialVideoUrl,
            detailData.safetyGuides,
            detailData.toolMaterialVOS,
            detailData.evaluationCriterias
          )
          
        }
      });

      function updateSchemaEdit(sourceMaterialCoverUrl,sourceMaterialVideoUrl,safetyGuides,toolMaterialVOS,evaluationCriterias){
          updateSchema({
            field: 'sourceMaterialCoverId',
            render: ({ model, field }) => {
              return h(AddImg, {
                value: model[field],
                thumbUrl: sourceMaterialCoverUrl,
                onChange: (value: string) => {
                  model[field] = value;
                },
              });
            },
          });

          updateSchema({
            field: 'sourceMaterialVideoId',
            render: ({ model, field }) => {
              return h(AddVideo, {
                value: model[field],
                sourceMaterialVideoUrl: sourceMaterialVideoUrl,
                onChange: (value: string) => {
                  model[field] = value;
                },
              });
            },
          });

          updateSchema({
            field: 'safetyGudeIds',
            render: ({ model, field }) => {
              return h(AddSafeGuide, {
                // value: model[field],
                safetyGuides: safetyGuides,
                onChange: (value: string) => {
                  model[field] = value;
                },
              });
            },
          });

          updateSchema({
            field: 'toolMaterialIds',
            render: ({ model, field }) => {
              return h(AddToolMaterial, {
                toolMaterialVOS:toolMaterialVOS,
                onChange: (value: string) => {
                  model[field] = value;
                },
              });
            },
          });
          updateSchema({
            field: 'evaluationCriteriaIds',
            render: ({ model, field }) => {
              return h(addEvaluationCriterion, {
                evaluationCriterias:evaluationCriterias,
                grade:model['grade'],
                onChange: (value: string) => {
                  model[field] = value;
                },
              });
            },
          });
        
      }

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

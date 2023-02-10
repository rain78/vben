import { FormSchema, } from '/@/components/Form/src/types/form';
import { getDictType } from '/@/api/common/index';
// import { changeData } from '/@/utils';
const { obj: gradeData } = await getDictType({ type: 'grade' })
const { obj: activityFormData } = await getDictType({ type: 'activity_form' })
const { obj: typeData } = await getDictType({ type: 'tool_material_type' })
const { obj: unitData } = await getDictType({ type: 'tool_material_unit' })
import { h } from 'vue';
import AddImg from './components/AddImg.vue'
import AddVideo from './components/AddVideo.vue'
import AddSafeGuide from './components/AddSafeGuide.vue'
import AddToolMaterial from './components/AddToolMaterial.vue'
import addEvaluationCriterion from './components/addEvaluationCriterion.vue'
import { MarkDown } from '/@/components/Markdown';
const colProps={ xs:24,sm:24,md:12,lg:6,xl:6 }
export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    colProps,
  },
  {
    field: 'dictItemGradeId',
    component: 'Select',
    label: '班级',
    colProps,
    componentProps: {
      options: gradeData,
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '课程标题',
    required: true,
    component: 'Input',
  },
  {
    field: 'grade',
    component: 'Select',
    label: '年级',
    rules: [{ required: true }],
    componentProps: {
      options: gradeData,
    },
  },
  {
    field: 'activityForm',
    component: 'Select',
    label: '活动形式',
    rules: [{ required: true }],
    componentProps: {
      options: activityFormData,
    },
  },
  {
    field: 'classHour',
    label: '课时',
    required: true,
    component: 'InputNumber',
  },
  {
    field: 'courseObjectives',
    label: '课程目标',
    required: true,
    component: 'InputTextArea',
  },
  {
    field: 'sourceMaterialCoverId',
    label: '课程封面',
    required: true,
    component: 'Input',
    render: ({ model, field }) => {
      return h(AddImg, {
        value: model[field],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },
  {
    field: 'safetyGudeIds',
    label: '安全指南',
    component: 'Input',
    render: ({ model, field }) => {
      return h(AddSafeGuide, {
        safetyGuides:[],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },
  {
    field: 'toolMaterialIds',
    label: '工具物料',
    component: 'Input',
    render: ({ model, field }) => {
      return h(AddToolMaterial, {
        toolMaterialVOS:[],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },
  {
    field: 'sourceMaterialVideoId',
    label: '视频',
    component: 'Input',
    render: ({ model, field }) => {
      return h(AddVideo, {
        value: model[field],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },

  {
    field: 'evaluationCriteriaIds',
    label: '评价标准',
    required: true,
    component: 'Input',
    render: ({ model, field }) => {
      return h(addEvaluationCriterion, {
        // value: model[field],
        grade:model['grade'],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },
  {
    field: 'stepContent',
    label: '步骤',
    component: 'Input',
    render: ({ model, field }) => {
      return h(MarkDown, {
        value: model[field],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },

];





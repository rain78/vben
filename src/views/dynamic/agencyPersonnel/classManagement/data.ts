import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getDictType } from '/@/api/common/index';;
import { parseTime } from '/@/utils/dateUtil';
import { changeData } from '/@/utils';
import { schoolSelect,classSelect } from '/@/api/dynamic/agencyPersonnel';

const {obj:periodData}=await getDictType({type:'period'})



export const columns: BasicColumn[] = [
  {
    dataIndex: 'schoolName',
    title: '学校名称',
  },
  {
    title: '学段',
    dataIndex: 'period',
    customRender: ({ record }) => {
      return changeData(record.period, periodData);
    },
  },
  {
    title: '班级',
    dataIndex: 'name',
  },
  {
    title: '入学年份',
    dataIndex: 'startYear',
    customRender: ({ record }) => {
      let { startYear } = record || {};
      if(startYear){
        startYear=parseTime(startYear, '{y}')
      }
      return startYear;
    },
  },
  {
    title: '门牌号',
    dataIndex: 'doorNumber',
  },
  {
    title: '简介',
    dataIndex: 'introduction',
  },
  
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'schoolId',
    label: '学校',
    component: 'ApiSelect',
    colProps: { span: 8 },
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: schoolSelect,
        resultField: 'obj',
        labelField: 'label',
        valueField: 'value',
        onChange: async (e: any) => {
          const {obj}=await classSelect({schoolId:e})
          formModel.clazzId = undefined; 
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'clazzId',
            componentProps: {
              placeholder: '请选择',
              options: obj||[],
            },
          });
        },
      };
    },
  },
  {
    field: 'clazzId',
    component: 'Select',
    label: '班级',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [], // defalut []
      placeholder: '请先选择学校',
    },
  },
  
];

export const formSchema: FormSchema[] = [
  
  {
    field: 'schoolId',
    label: '学校',
    required: true,
    component: 'ApiSelect',
    rules: [{ required: true, message: '请选择学校',trigger: 'blur', }],
    componentProps: {
      api: schoolSelect,
      resultField: 'obj',
      labelField: 'label',
      valueField: 'value',
    },
  },
  {
    field: 'period',
    component: 'Select',
    label: '学段',
    rules: [{ required: true }],
    componentProps: {
      options: periodData,
    },
  },
  {
    field: 'name',
    label: '班级名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'doorNumber',
    label: '门牌号',
    component: 'Input',
  },
  {
    label: '入学年份',
    field: 'startYear',
    component: 'DatePicker',
    componentProps: {
      style: { width: '100%' },
      picker:"year",
      valueFormat:'x'
    },
    required: true,
  },
  {
    label: '班级介绍',
    field: 'introduction',
    component: 'InputTextArea',
  },
];

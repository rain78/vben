import { getDictType } from '/@/api/common/index';
export const { obj: gradeData } = await getDictType({ type: 'grade' })

import { FormSchema } from '/@/components/Table';
import { h } from 'vue';


export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '任务名称',
    component: 'Input',
    required:true,
  },
  {
    field: 'completionTime',
    label: '完成时间',
    component: 'DatePicker',
    required:true,
    componentProps: {
      style: { width: '100%' },
      showTime:true
    },
  },
  {
    field: 'content',
    label: '任务内容',
    component: 'InputTextArea',
    required:true,
    componentProps:{
      rows:6
    }
  },
  {
    field: 'studentIds',
    label: '分派给',
    component: 'Input',
    rules: [{ required: true, message: '请选择', trigger: 'blur', }],
    // render: ({ model, field }) => {
    //   return h(AddImg, {
    //     // value: model[field],
    //     onChange: (value: string) => {
    //       model[field] = value;
    //     },
    //   });
    // },
  },
  

];
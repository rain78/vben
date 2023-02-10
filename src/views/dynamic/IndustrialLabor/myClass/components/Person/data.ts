import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import AddImg from './AddImg.vue';




export const formSchema: FormSchema[] = [
  {
    field: 'studentIds',
    label: '发送给',
    component: 'Input',
  },
  {
    field: 'title',
    label: '标题',
    component: 'Input',
  },
  {
    field: 'content',
    label: '内容',
    component: 'InputTextArea',
  },
  {
    field: 'sourceMaterialIds',
    label: '选择附件',
    component: 'Input',
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

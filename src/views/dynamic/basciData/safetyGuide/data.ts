import { FormSchema } from '/@/components/Form/src/types/form';
import { MarkDown } from '/@/components/Markdown';
import { h } from 'vue';
const colProps={ xs:{span:24},sm:{span:24},md:{span:12},lg:{span:6},xl:{span:6} }
export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    colProps,
  },
  {
    field: 'content',
    label: '内容',
    component: 'Input',
    colProps,
  },
];


export const formSchema: FormSchema[] = [
  
  {
    field: 'title',
    label: '标题',
    required: true,
    component: 'Input',
  },
  {
    field: 'content',
    component: 'Input',
    label: '内容',
    rules: [{ required: true, trigger: 'blur' }],
    render: ({ model, field }) => {
      return h(MarkDown, {
        value: model[field],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },
]




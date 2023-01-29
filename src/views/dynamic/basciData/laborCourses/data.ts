import { FormSchema, FormProps } from '/@/components/Form/src/types/form';



// const colProps={ xs:{span:24},sm:{span:24},md:{span:12},lg:{span:6},xl:{span:6} }
const colProps={ xs:24,sm:24,md:12,lg:6,xl:6 }
// const colProps={ xs:24,sm:24,md:12,lg:6,xl:6 }
export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    colProps,
  },
];




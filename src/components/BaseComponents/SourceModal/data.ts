import { FormSchema, FormProps } from '/@/components/Form/src/types/form';
import { albumList} from '/@/api/dynamic/sourceMaterial';



// const colProps={ xs:{span:24},sm:{span:24},md:{span:12},lg:{span:6},xl:{span:6} }
const colProps={ xs:24,sm:24,md:12,lg:8,xl:8 }
// const colProps={ xs:24,sm:24,md:12,lg:6,xl:6 }
export const searchFormSchema: FormSchema[] = [
 
  {
    field: 'pickerData',
    label: '日期',
    component: 'RangePicker',
    componentProps: {
      style: { width: '100%' },
    },
    colProps,
  },
  {
    field: 'albumId',
    label: '专辑',
    component: 'ApiSelect',
    colProps: { xs:24,sm:24,md:12,lg:8,xl:8 },
    componentProps: ({ formModel, formActionType }) => {
      return {
        style: { width: '100%' },
        api: albumList,
        params: {
          current: 1,
          size: 999,
        },
        resultField: 'obj.records',
        labelField: 'name',
        valueField: 'id',
       
      };
    },
  },
];




import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getDictType } from '/@/api/common/index';
const { obj: operTypeData } = await getDictType({ type: 'oper_type' })
const { obj: operStatusData } = await getDictType({ type: 'oper_status' })
import { changeData } from '/@/utils';


export const columns: BasicColumn[] = [
  
  {
    title: '名称',
    dataIndex: 'title',
  },
  {
    title: '操作类型',
    dataIndex: 'businessType',
    customRender: ({ record }) => {
      return changeData(record.businessType || '', operTypeData);
    },
  },
  {
    title: '操作人员',
    dataIndex: 'operName',
  },
  {
    title: 'IP地址',
    dataIndex: 'operIp',
  },
  {
    title: '操作地点',
    dataIndex: 'operLocation',
  },
  {
    title: '操作状态',
    dataIndex: 'status',
    customRender: ({ record }) => {
      return changeData(record.status || '', operStatusData);
    },
  },
  
  
  
];
const colProps={ xs:24,sm:24,md:12,lg:6,xl:6 }
export const searchFormSchema: FormSchema[] = [
  {
    field: 'operName',
    label: '操作人',
    component: 'Input',
    colProps,
  },
  {
    field: 'businessType',
    label: '操作类型',
    component: 'Select',
    componentProps: {
      options: operTypeData||[]
    },
    colProps,
  },
  {
    field: 'status',
    label: '操作状态',
    component: 'Select',
    componentProps: {
      options: operStatusData||[]
    },
    colProps,
  },
 
  
  {
    field: 'startTime',
    label: '开始时间',
    component: 'DatePicker',
    componentProps: {
      style: { width: '100%' },
      valueFormat: 'x',
      showTime:true
    },
    colProps,
  },
  {
    field: 'endTime',
    label: '结束时间',
    component: 'DatePicker',
    componentProps: {
      style: { width: '100%' },
      valueFormat: 'x',
      showTime:true
    },
    colProps,
  },
];


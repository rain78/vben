import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getDictType } from '/@/api/common/index';
const { obj: loginStatusData } = await getDictType({ type: 'login_status' })
import { changeData } from '/@/utils';


export const columns: BasicColumn[] = [
  
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: 'IP地址',
    dataIndex: 'ipaddr',
  },
  {
    title: '操作地点',
    dataIndex: 'location',
  },
  {
    title: '登录状态',
    dataIndex: 'status',
    customRender: ({ record }) => {
      return changeData(record.status || '', loginStatusData);
    },
  },
  {
    title: '操作时间',
    dataIndex: 'createTime',
  },
  
  
];
const colProps={ xs:24,sm:24,md:12,lg:6,xl:6 }
export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    colProps,
  },
  {
    field: 'ipaddr',
    label: 'ip地址',
    component: 'Input',
    colProps,
  },
  {
    field: 'status',
    label: '登录状态',
    component: 'Select',
    componentProps: {
      options: loginStatusData||[]
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


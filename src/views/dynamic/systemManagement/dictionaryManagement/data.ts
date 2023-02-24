import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Image, Tag } from 'ant-design-vue'
import { getDictType } from '/@/api/common/index';
import { changeData } from '/@/utils';
import { parseTime } from '/@/utils/dateUtil';
import { userSelect } from '/@/api/dynamic/userRights';
import { schoolSelect, classSelect } from '/@/api/dynamic/agencyPersonnel';
const { obj: schoolData } = await schoolSelect()
const { obj: genderData } = await getDictType({ type: 'gender' })
const { obj: userData } = await userSelect()


import dayjs from 'dayjs';


export const columns: BasicColumn[] = [
  {
    title: '类型',
    dataIndex: 'type',
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    customRender: ({ record }) => {
      let time = record.createTime || '';
      if (time) time = parseTime(time)
      return time;
    },
  },
  {
    title: '备注',
    dataIndex: 'remarks',
  },
];

const colProps = { xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }

export const searchFormSchema: FormSchema[] = [];

export const formSchema: FormSchema[] = [
  {
    field: 'type',
    label: '类型',
    component: 'Input',
  },
  {
    field: 'description',
    label: '描述',
    component: 'Input',
  },
  {
    field: 'remarks',
    label: '备注',
    component: 'InputTextArea',
  },
 
]


export const columns1: BasicColumn[] = [
  {
    title: '类型',
    dataIndex: 'type',
  },
  {
    title: '数据值',
    dataIndex: 'value',
  },
  {
    title: '标签名',
    dataIndex: 'label',
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
  {
    title: '备注',
    dataIndex: 'remarks',
  },
];


export const formSchema1: FormSchema[] = [
  {
    field: 'type',
    label: '类型',
    component: 'Input',
  },
  {
    field: 'value',
    label: '数据值',
    component: 'Input',
  },
  {
    field: 'label',
    label: '标签名',
    component: 'Input',
  },
  {
    field: 'description',
    label: '描述',
    component: 'Input',
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
  },
  {
    field: 'remarks',
    label: '备注',
    component: 'InputTextArea',
  },
 
]


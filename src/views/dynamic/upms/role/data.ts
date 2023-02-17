import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Image } from 'ant-design-vue'
import { getDictType } from '/@/api/common/index';
import {CustomUpload } from '/@/components/Upload';
import { uploadApi } from '/@/api/sys/upload';


export const columns: BasicColumn[] = [
  {
    title: '账号',
    dataIndex: 'name',
  },
  {
    title: '角色代码',
    dataIndex: 'roleCode',
  },
];


export const formSchema: FormSchema[] = [
  
  {
    field: 'name',
    label: '名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'roleCode',
    label: '编码',
    required: true,
    component: 'Input',
  },
  {
    label: '描述',
    field: 'roleDesc',
    component: 'InputTextArea',
  },
];

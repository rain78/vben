import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';
import {
  menuList 
} from '/@/api/dynamic/upms';


export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'label',
  },
  {
    title: '权限标识',
    dataIndex: 'permission',
  },
  {
    title: '组件路径',
    dataIndex: 'path',
  },
];

const isDir = (type: string) => type === '0';
const isMenu = (type: string) => type === '1';
const isButton = (type: string) => type === '2';

export const formSchema: FormSchema[] = [
  {
    field: 'type',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '菜单', value: 0 },
        { label: '按钮', value: 1 },
      ],
    },
    colProps: { lg: 24, md: 24 },
    // required: true
  },
  {
    field: 'redirect',
    label: '重定向',
    component: 'Input',
    // required: true,
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
  },
  {
    field: 'parentId',
    label: '父级',
    // component: 'TreeSelect',
    component: 'ApiTreeSelect',
    defaultValue:'-1',
    componentProps: {
      api: menuList,
      resultField: 'obj',
      fieldNames: {
        // label: 'menuName',
        key: 'id',
        value: 'id',
      },
    },
    // required: true,
    // componentProps: {
      
    //   getPopupContainer: () => document.body,
    // },
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    // required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
  },
 

  
 
  
  {
    field: 'path',
    label: '前端路由',
    component: 'Input',
    // required: true,
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    // required: true,
  },
  {
    field: 'permission',
    label: '权限',
    component: 'Input',
    // required: true,
  },
];

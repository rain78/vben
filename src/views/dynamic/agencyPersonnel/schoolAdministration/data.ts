import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Image } from 'ant-design-vue'
import { getDictType } from '/@/api/common/index';
import uploadBtn from './uploadBtn'
import {CustomUpload } from '/@/components/Upload';
import { uploadApi } from '/@/api/sys/upload';


export const columns: BasicColumn[] = [
  {
    dataIndex: 'badgeUrl',
    title: '校徽',
    customRender: ({ record }) => {
      const { badgeUrl='' } = record || {};
      return h(Image, { src:badgeUrl,style:{width:'75px',height:'75px'}});
    },
  },
  {
    title: '学校名称',
    dataIndex: 'name',
  },
  {
    title: '学校简称',
    dataIndex: 'abbreviation',
  },
  {
    title: '创办年份',
    dataIndex: 'establishYear',
  },
  {
    title: '主管部门',
    dataIndex: 'competentDepartment',
  },
  {
    title: '校长名字',
    dataIndex: 'principal',
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
  {
    title: '简介',
    dataIndex: 'introduction',
  },
  
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '学校名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  
];

export const formSchema: FormSchema[] = [
  
  {
    field: 'name',
    label: '学校名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'abbreviation',
    label: '简称',
    required: true,
    component: 'Input',
  },
  {
    field: 'badgeUrl',
    label: '校徽',
    component: 'Input',
    // component: 'CustomUpload',
    rules: [{ required: true, message: '请选择图片' }],
    componentProps: {
      api: uploadApi,
    },
    render: ({ model, field }) => {
      return h(CustomUpload,{
        api: uploadApi,
        onChange: (value: string) => {
          console.log('value=>',value)
          model[field] = value;
        },
      });
    },

    // render: ({ model, field }) => {
    //   // console.log('校徽',model, field)
    //   return h(uploadBtn,{
    //     model, field,
    //     onChange: (value: string) => {
    //       model[field] = value;
    //     },
    //   });
    // },

    // render: ({ model, field }) => {
    //   return h(Input, {
    //     placeholder: '请输入',
    //     value: model[field],
    //     onChange: (e: ChangeEvent) => {
    //       model[field] = e.target.value;
    //     },
    //   });
    // },
    // componentProps: {
    //   api: uploadApi,
    //   maxNumber:1
      
    // },
  },
  // {
  //   field: 'badgeUrl',
  //   label: '校徽',
  //   component: 'Upload',
  //   rules: [{ required: true, message: '请选择图片' }],
  //   componentProps: {
  //     api: uploadApi,
  //     maxNumber:1
      
  //   },
  // },
  {
    label: '创建年份',
    field: 'establishYear',
    component: 'DatePicker',
    componentProps: {
      style: { width: '100%' },
      picker:"year",
      valueFormat:'x'
    },
    required: true,
  },
  {
    label: '办学性质',
    field: 'property',
    // component: 'Input',
    component: 'ApiSelect',
    componentProps: {
      api: getDictType,
      params:{
        type:'school_property'
      },
      resultField: 'obj',
      labelField: 'label',
      valueField: 'value',
    },
    required: true,
  },
  {
    label: '主管部门',
    field: 'competentDepartment',
    component: 'Input',
  },
  {
    label: '现任校长',
    field: 'principal',
    component: 'Input',
  },
  {
    label: '学校地址',
    field: 'address',
    component: 'Input',
  },
  {
    label: '学校简介',
    field: 'introduction',
    component: 'InputTextArea',
  },
];

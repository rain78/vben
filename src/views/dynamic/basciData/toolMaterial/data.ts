import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Image,  } from 'ant-design-vue'
import { getDictType } from '/@/api/common/index';
import { changeData } from '/@/utils';
import AddImg from './components/AddImg.vue'

const { obj: typeData } = await getDictType({ type: 'tool_material_type' })
const { obj: unitData } = await getDictType({ type: 'tool_material_unit' })



export const columns: BasicColumn[] = [
  {
    dataIndex: 'name',
    title: '名称',
  },
  {
    title: '头像',
    customRender: ({ record }) => {
      let url = record.sourceMaterialUrl
      if (!url) return ''
      return h(Image, { src: url, style: { width: '75px', height: '75px' } });
    },
  },
  {
    dataIndex: 'scientificName',
    title: '学名',
  },
  {
    dataIndex: 'unit',
    title: '单位',
    customRender: ({ record }) => {
      return changeData(record.unit, unitData);
    },
  },
  {
    dataIndex: 'type',
    title: '类型',
    customRender: ({ record }) => {
      return changeData(record.type, typeData);
    },
  },
  {
    dataIndex: 'remark',
    title: '说明',
  },



];
export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    colProps: {
      xs: 24, sm: 24, md: 12, lg: 6, xl: 6
    },
  },
  {
    field: 'type',
    label: '类型',
    component: 'Select',
    colProps: {
      xs: 24, sm: 24, md: 12, lg: 6, xl: 6
    },
    componentProps: {
      options:typeData
    },
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
    field: 'scientificName',
    label: '学名',
    required: true,
    component: 'Input',
  },
  {
    field: 'unit',
    component: 'Select',
    label: '单位',
    rules: [{ required: true }],
    componentProps: {
      options: unitData,
    },
  },
  {
    field: 'type',
    component: 'Select',
    label: '类型',
    rules: [{ required: true }],
    componentProps: {
      options: typeData,
    },
  },
  {
    field: 'sourceMaterialId',
    label: '图片',
    required: true,
    component: 'Input',
    render: ({ model, field }) => {
      return h(AddImg, {
        value: model[field],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },
  {
    field: 'remark',
    label: '说明',
    component: 'InputTextArea',
  },
  

];

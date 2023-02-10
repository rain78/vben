import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getDictType } from '/@/api/common/index';
import { changeData } from '/@/utils';
import { h } from 'vue';
import { Tag } from 'ant-design-vue'
import Rate from './components/rate.vue'
const { obj: gradeData } = await getDictType({ type: 'grade' })
import { useDebounceFn } from '@vueuse/core';

export const columns: BasicColumn[] = [
  {
    dataIndex: 'dictItemGradeId',
    title: '年级',
    customRender: ({ record }) => {
      return changeData(record.dictItemGradeId || '', gradeData);
    },
  },
  {
    title: '分数权重',
    dataIndex: 'rate',
    customRender: ({ record }) => {
      const rates = JSON.parse(record.rate)
      const tags = rates.map(o => {
        const colors = new Map([['优秀', 'success'],
        ['良好', 'processing'],
        ['一般', 'warning'],
        ['无效', 'error'],
        ])
        return h('span',{class:'mr-2'},[
          h('span', {},o.level||''+':'),
          h(Tag, { color:colors.get(o.level)||'default'}, () => o.weight||'')
        ])
      })
      return h('span', {},tags);
    },
  },
  {
    title: '评价标准',
    dataIndex: 'content',
  },


];
const colProps={
  xs:24,sm:24,md:12,lg:6,xl:6,
}
export const searchFormSchema: FormSchema[] = [
  {
    field: 'dictItemGradeId',
    component: 'Select',
    label: '班级',
    colProps,
    componentProps: {
      options: gradeData,
    },
  },
  {
    field: 'content',
    label: '内容',
    colProps,
    component: 'Input',
  },

];

export const formSchema: FormSchema[] = [
  {
    field: 'dictItemGradeId',
    label: '班级',
    component: 'Select',
    required: true,
    componentProps: {
      options: gradeData,
    },
  },
  {
    field: 'content',
    label: '评价标准',
    required: true,
    component: 'Input',
  },
  {
    field: 'rate',
    label: '评价等级',
    component: 'Input',
    render: ({ model, field }) => {
      return h(Rate,{
        value:model[field]&&JSON.parse(model[field]),
        onChange:(value)=>{
          model[field]=JSON.stringify(value)
        }

      });
    }
  },

  
];

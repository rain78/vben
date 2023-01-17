import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Image, Tag, Switch } from 'ant-design-vue'
import { getDictType } from '/@/api/common/index';
import { CustomUpload } from '/@/components/Upload';
import { uploadApi } from '/@/api/sys/upload';
import { parseTime } from '/@/utils/dateUtil';
import { changeData } from '/@/utils';
import { schoolSelect, classSelect } from '/@/api/dynamic/agencyPersonnel';

const { obj: genderData } = await getDictType({ type: 'gender' })
const { obj: schoolData } = await schoolSelect()
import dayjs, { Dayjs } from 'dayjs';



export const columns: BasicColumn[] = [
  {
    title: '头像',
    customRender: ({ record }) => {
      let url = record.user.avatar
      if (!url) return ''
      return h(Image, { src: url, style: { width: '75px', height: '75px' } });
    },
  },
  {
    title: '学号',
    customRender: ({ record }) => {
      return record.student.number || ''
    }
  },
  {
    title: '用户名',
    customRender: ({ record }) => {
      return record.user.username || ''
    }
  },
  {
    title: '学校名称',
    customRender: ({ record }) => {
      return record.student.schoolName || '';
    },
  },
  {
    title: '班级',
    customRender: ({ record }) => {
      return record.student.clazzName || '';
    },
  },
  {
    title: '姓名',
    customRender: ({ record }) => {
      return record.user.name || '';
    },
  },
  {
    title: '性别',
    customRender: ({ record }) => {
      return changeData(record.user.gender || '', genderData);
    },
  },
  {
    title: '出生日期',
    customRender: ({ record }) => {
      let time = record.user.birth || '';
      if (time) time = parseTime(time, '{y}-{m}-{d}')
      return time;
    },
  },
  {
    title: '邮箱',
    customRender: ({ record }) => {
      return record.user.email || '';
    },
  },
  {
    title: '手机号',
    customRender: ({ record }) => {
      return record.user.phone || '';
    },
  },
  {
    title: '微信状态',
    customRender: ({ record }) => {
      const enable = record.user.openId;
      const color = enable ? 'green' : 'red';
      const text = enable ? '已绑定' : '未绑定';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '启用状态',
    customRender: ({ record }) => {
      const enable = !record.user.lockFlag;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '禁用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '创建日期',
    customRender: ({ record }) => {
      return record.user.createTime || '';
    },
  },

];
//202301151
export const searchFormSchema: FormSchema[] = [
  {
    field: 'schoolId',
    label: '学校',
    component: 'Select',
    colProps: { span: 8 },
    componentProps: ({ formModel, formActionType }) => {
      return {
        options: schoolData,
        onChange: async (e: any) => {
          const { obj } = await classSelect({ schoolId: e })
          formModel.clazzId = undefined;
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'clazzId',
            componentProps: {
              placeholder: '请选择',
              options: obj || [],
            },
          });
        },
      };
    },
  },
  {
    field: 'clazzId',
    component: 'Select',
    label: '班级',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [], // defalut []
      placeholder: '请先选择学校',
    },
  },
  {
    field: 'number',
    label: '学号',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'name',
    label: '姓名',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },

];

export const formSchema: FormSchema[] = [
  {
    field: 'schoolId',
    label: '学校',
    component: 'Select',
    rules: [{ required: true, message: '请选择学校', trigger: 'blur', }],
    componentProps: ({ formModel, formActionType }) => {
      return {
        options: schoolData,
        onChange: async (e: any) => {
          const { obj } = await classSelect({ schoolId: e })
          formModel.clazzId = undefined;
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'clazzId',
            componentProps: {
              placeholder: '请选择',
              options: obj || [],
            },
          });
        },
      };
    },
  },
  {
    field: 'clazzId',
    component: 'Select',
    label: '班级',
    rules: [{ required: true, message: '请选择班级', trigger: 'blur', }],
    componentProps: {
      options: [], // defalut []
      placeholder: '请先选择学校',
    },
  },
  {
    field: 'number',
    label: '学号',
    required: true,
    component: 'Input',
  },
  {
    field: 'username',
    label: '用户名',
    required: true,
    component: 'Input',
  },
  {
    field: 'name',
    label: '姓名',
    required: true,
    component: 'Input',
  },
  {
    field: 'gender',
    label: '性别',
    required: true,
    component: 'Select',
    componentProps: {
      options: genderData,
    },
  },
  {
    label: '出生日期',
    field: 'birth',
    component: 'DatePicker',
    componentProps: {
      style: { width: '100%' },
      valueFormat: 'x',
      disabledDate: (current) => {
        return current && current > dayjs().endOf('day');
      }
    },
    required: true,
  },
  {
    field: 'phone',
    label: '电话',
    component: 'Input',
    rules: [
      {
        validator: (_, value) => {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
          if (reg.test(value) || !value) {
            return Promise.resolve();
          }else{
            return Promise.reject('请输入正确的手机号');
          }
          
        },
        trigger: "blur"
      },
    ]
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    rules: [
      {
        validator: (_, value) => {
          const reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
          if (reg.test(value) || !value) {
            return Promise.resolve();
          }else{
            return Promise.reject('请输入正确的邮箱格式');
          }
          
        },
        trigger: "blur"
      },
    ]
  },
  {
    defaultValue: true,
    field: 'lockFlag',
    label: '启用',
    component: 'Switch',
  },

];

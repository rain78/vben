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
    dataIndex: 'avatar',
    title: '头像',
    customRender: ({ record }) => {
      const { avatar = '' } = record || {};
      return avatar && h(Image, { src: avatar, style: { width: '75px', height: '75px' } });
    },
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    customRender: ({ record }) => {
      return changeData(record.gender || '', genderData);
    },
  },
  {
    title: '出生日期',
    dataIndex: 'birth',
    customRender: ({ record }) => {
      let time = record.birth || '';
      if (time) time = parseTime(time, '{y}-{m}-{d}')
      return time;
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '角色',
    dataIndex: 'roleIds',
    customRender: ({ record }) => {
      // console.log()
      return record.roles ? record.roles + '' : '';
    },
  },
  {
    title: '微信状态',
    dataIndex: 'openId',
    customRender: ({ record }) => {
      const enable = record.openId;
      const color = enable ? 'green' : 'red';
      const text = enable ? '已绑定' : '未绑定';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '启用状态',
    dataIndex: 'lockFlag',
    customRender: ({ record }) => {
      const enable = !record.lockFlag;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '禁用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '创建日期',
    dataIndex: 'createTime',
    customRender: ({ record }) => {
      return record.createTime || '';
    },
  },

];

const colProps = { xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '姓名',
    component: 'Input',
    colProps,
  },
  {
    field: 'phone',
    label: '手机',
    component: 'Input',
    colProps,
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    colProps,
  },

];

export const formSchema: FormSchema[] = [
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
    field: 'roleIds',
    label: '角色',
    required: true,
    component: 'Select',
    componentProps: ({ formModel, formActionType }) => {
      return {
        options: userData,
        mode: "multiple",
        onChange: async (e: any) => {
          const roleIds = e
          const { updateSchema } = formActionType;
          const roleDate=['2', '3', '1565158785437265921']
          updateSchema({
            field: 'schoolId',
            show: roleIds.some(roleId => roleDate.includes(roleId))
          })
          updateSchema({
            field: 'clazzId',
            rules: [{ required: roleIds.some(roleId => ['2'].includes(roleId)), message: '请选择班级', trigger: 'blur', }],
            show: roleIds.some(roleId => roleDate.includes(roleId))
          })
          updateSchema({
            field: 'number',
            required:roleIds.some(roleId => ['2'].includes(roleId)),
            show: roleIds.some(roleId => ['2'].includes(roleId))
          })
          
        }
      }
    },
  },
  {
    field: 'schoolId',
    label: '学校',
    component: 'Select',
    show: false,
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
    show: false,
    // rules: [{ required: true, message: '请选择班级', trigger: 'blur', }],
    componentProps: {
      options: [], // defalut []
      placeholder: '请先选择学校',
    },
  },
  {
    field: 'number',
    label: '学号',
    show: false,

    // required: true,
    component: 'Input',
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
          } else {
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
          } else {
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
]

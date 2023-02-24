import { FormSchema } from '/@/components/Form/index';
import { getDictType } from '/@/api/common/index';
const { obj: genderData } = await getDictType({ type: 'gender' })
import dayjs, { Dayjs } from 'dayjs';

export interface ListItem {
  key: string;
  title: string;
  description: string;
  extra?: string;
  avatar?: string;
  color?: string;
}



// 基础设置 form
const colProps={ xs:24,sm:24,md:18,lg:18,xl:18 }
export const baseSetschemas: FormSchema[] = [
  {
    field: 'username',
    component: 'Input',
    label: '用户名',
    componentProps: {
      disabled:true
    },
    colProps,
    required: true,
  },
  {
    field: 'name',
    component: 'Input',
    label: '姓名',
    colProps,
    required: true,
  },
  {
    field: 'newPassword',
    component: 'InputPassword',
    label: '密码',
    colProps,
  },
  {
    field: 'gender',
    label: '性别',
    required: true,
    component: 'Select',
    componentProps: {
      options: genderData,
    },
    colProps
  },
  {
    label: '出生日期',
    field: 'birth',
    component: 'DatePicker',
    required: true,
    componentProps: {
      style: { width: '100%' },
      valueFormat: 'x',
      disabledDate: (current) => {
        return current && current > dayjs().endOf('day');
      }
    },
    colProps,
  },
  {
    field: 'phone',
    label: '电话',
    component: 'InputSearch',
    //enterButton
    slot: 'phone1',
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
    ],
    colProps,
  },
  {
    field: 'phoneCode',
    label: '手机验证码',
    component: 'InputSearch',
    slot: 'phoneCode',
    rules: [
      {
        required: true,
        trigger: "blur"
      },
    ],
    colProps,
    show: false,
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    slot: 'email1',
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
    ],
    colProps,
  },
  {
    field: 'emailCode',
    label: '邮箱验证码',
    component: 'InputSearch',
    slot: 'emailCode',
    rules: [
      {
        required: true,
        trigger: "blur"
      },
    ],
    colProps,
    show: false,
  },
  {
    field: 'openId',
    label: '微信',
    component: 'Input',
    slot: 'openId',
    colProps,
  },
];



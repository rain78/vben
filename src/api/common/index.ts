//dictType

import { apiHttp } from '/@/utils/http/axios';
import { parseTime } from '/@/utils/dateUtil';
enum Api {
  dictType='/dict/type',
  user='/user',
  emailCode='/email/code',
  phoneCode='/code',
  userPhone='/user/phone',
  userEmail='/user/email',
}





export const getDictType = (params) => {
  let a=params?.type?'/'+params.type:''
  return apiHttp.get({ url:Api.dictType+a})
};


const classData=['一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级']

export function sendVerification(type,params){
	if(type==='phone') return apiHttp.post({ url: Api.phoneCode,params});
	else if(type==='email') return apiHttp.get({ url: Api.emailCode,params});
}
export function doVerification(type,params){
  console.log(type=='phone')
  console.log(type=='email')
	if(type=='phone') return apiHttp.put({ url: Api.userPhone,params});
	else if(type=='email') return apiHttp.put({ url: Api.userEmail,params});
}
export function formartClazz(value){
	if(!value) return '班级未知'
	let a=parseTime(new Date().getTime(), '{y}')*1-parseTime(value, '{y}')*1
	return classData[a]
}

export const userDetail = (params) => apiHttp.get({ url: Api.user+(params.id?`/${params.id}`:'')});




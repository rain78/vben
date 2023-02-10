//dictType

import { apiHttp } from '/@/utils/http/axios';
import { parseTime } from '/@/utils/dateUtil';
enum Api {
  dictType='/dict/type',
}





export const getDictType = (params) => {
  let a=params?.type?'/'+params.type:''
  return apiHttp.get({ url:Api.dictType+a})
};


const classData=['一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级']

export function formartClazz(value){
	if(!value) return '班级未知'
	let a=parseTime(new Date().getTime(), '{y}')*1-parseTime(value, '{y}')*1
	return classData[a]
}




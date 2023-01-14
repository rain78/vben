
import { apiHttp } from '/@/utils/http/axios';

enum Api {
  schoolList='/school/page',
  schoolEdit='/school',
  schoolSelect='/school/select',

  classList='/clazz/page',
  classEdit='/clazz',

}





export const getsSchoolList = (params) => apiHttp.get({ url: Api.schoolList, params });
export const schoolSelect = () => apiHttp.get({ url: Api.schoolSelect});
export const upSchooldate = (params,type='post') =>{
  if(type==='post') return apiHttp.post({ url: Api.schoolEdit, params })
  else return apiHttp.put({ url: Api.schoolEdit, params })
}
export const deleteSchoolData = (params='') => apiHttp.delete({ url: Api.schoolEdit+params })

export const getsClassList = (params) => apiHttp.get({ url: Api.classList, params });
export const upClassdate = (params,type='post') =>{
  if(type==='post') return apiHttp.post({ url: Api.classEdit, params })
  else return apiHttp.put({ url: Api.classEdit, params })
}
export const deleteClassData = (params='') => apiHttp.delete({ url: Api.classEdit+params })




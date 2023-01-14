
import { apiHttp } from '/@/utils/http/axios';

enum Api {
  list='/school/page',
  edit='/school'
}





export const getList = (params) => apiHttp.get({ url: Api.list, params });
export const update = (params,type='post') =>{
  if(type==='post') return apiHttp.post({ url: Api.edit, params })
  else return apiHttp.put({ url: Api.edit, params })
}
export const deleteData = (params='') => apiHttp.delete({ url: Api.edit+params })



import { apiHttp } from '/@/utils/http/axios';

enum Api {
  roleList = '/role/page',
  roleEdit = '/role',
  roleMenu = '/role/menu',

  menuTree = '/menu/tree',
  

}



export const roleList = (params) => apiHttp.get({ url: Api.roleList, params });
export const roleDelete = (params = '') => apiHttp.delete({ url: Api.roleEdit + (params ? `/${params.ids}` : '') })
export const roleEdit = (params, type = 'post') => {
  if (type === 'post') return apiHttp.post({ url: Api.roleEdit, params })
  else return apiHttp.put({ url: Api.roleEdit, params })
}
export const roleMenu = (params) => apiHttp.put({ url: Api.roleMenu, params })


export const menuTree = (params) => apiHttp.get({ url: Api.menuTree + (params.id ? `/${params.id}` : '') });


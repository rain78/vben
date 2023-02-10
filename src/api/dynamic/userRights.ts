
import { apiHttp } from '/@/utils/http/axios';

enum Api {
  userList='/user/page',
  userEdit='/user',
  userEditSelect='/role/select',

}



export const userList = (params) => apiHttp.get({ url: Api.userList, params });
export const userDetail = (params) => apiHttp.get({ url: Api.userEdit+(params.ids?`/${params.ids}`:'')});
export const userGetDetail = () => apiHttp.get({ url: Api.userEdit});
export const userDelete = (params='') => apiHttp.delete({ url: Api.userEdit+(params?`/${params.ids}`:'')})
export const userEdit = (params, type = 'post') => {
  if (type === 'post') return apiHttp.post({ url: Api.userEdit, params })
  else return apiHttp.put({ url: Api.userEdit, params })
}
export const userSelect = () => apiHttp.get({ url: Api.userEditSelect });



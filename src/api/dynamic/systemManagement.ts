
import { apiHttp } from '/@/utils/http/axios';

enum Api {
  dictList='/dict/page',
  dictEdit='/dict',

  dictItemList='/dict/item/page',
  dictItemEdit='/dict/item',

}



export const dictList = (params) => apiHttp.get({ url: Api.dictList, params });
export const dictDetail = (params) => apiHttp.get({ url: Api.dictEdit+(params.ids?`/${params.ids}`:'')});
export const dictGetDetail = () => apiHttp.get({ url: Api.dictEdit});
export const dictDelete = (params='') => apiHttp.delete({ url: Api.dictEdit+(params?`/${params.ids}`:'')})
export const dictEdit = (params, type = 'post') => {
  if (type === 'post') return apiHttp.post({ url: Api.dictEdit, params })
  else return apiHttp.put({ url: Api.dictEdit, params })
}

export const dictItemList = (params) => apiHttp.get({ url: Api.dictItemList, params });
// export const dictItem = (params) => ()=>apiHttp.get({ url: `/dict/${params.id}/item` });;
export const dictItem = (params) => apiHttp.get({ url: `/dict/${params.id}/item` });
export const dictItemEdit = (params, type = 'post') => {
  if (type === 'post') return apiHttp.post({ url: Api.dictItemEdit, params })
  else return apiHttp.put({ url: Api.dictItemEdit, params })
}
export const dictItemDelete = (params='') => apiHttp.delete({ url: Api.dictItemEdit+(params?`/${params.ids}`:'')})




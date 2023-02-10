
import { apiHttp, api as url } from '/@/utils/http/axios';
enum Api {
  sourceMaterialList = '/sourceMaterial/page',
  sourceMaterialEdit = '/sourceMaterial',

  albumList = '/album/page',
  albumEdit = '/album',
  albumShare='/album/share',

  recycleList = '/sourceMaterial/recycle/page',
  recycleEdit = '/sourceMaterial/recycle'




}





export const getSourceMaterialList = (params) => apiHttp.get({ url: Api.sourceMaterialList, params });
export const deleteSourceMaterial = (params = '') => apiHttp.delete({ url: Api.sourceMaterialEdit + (params ? `/${params.ids}` : '') })
export const sourceMaterialEdit = (params, type = 'post') => {
  if (type === 'post') return apiHttp.post({ url: Api.sourceMaterialEdit, params })
  else return apiHttp.put({ url: Api.sourceMaterialEdit, params })
}
export const sourceMaterialDetail = (params) => apiHttp.get({ url: Api.sourceMaterialEdit + (params ? `/${params}` : '') });

export const albumList = (params) => apiHttp.get({ url: Api.albumList, params });
export const albumDelete = (params = '') => apiHttp.delete({ url: Api.albumEdit + (params ? `/${params.ids}` : '') })
export const albumSourceDelete = (param) => 
apiHttp.delete({ 
  url: `${Api.albumEdit}/${param.album}/sourceMaterial/${param.sourceMaterial}`
})
export const albumEdit = (params, type = 'post') => {
  return apiHttp.uploadFile({
    url: url + Api.albumEdit,
    method:type
  },
    params,
  )
}
export const albumDetail = (params) => apiHttp.get({ url: `${Api.albumEdit}/${params.album}/sourceMaterial/page`},params.page);
export const albumShare = (params) => apiHttp.put({ url: Api.albumShare, params });
export const albumShareSource = (params) => 
apiHttp.get({ url: `${Api.albumShare}/${params.clazzId}/sourceMaterial`, params:params.data});

export const recycleList = (params) => apiHttp.get({ url: Api.recycleList, params });
export const recycleDelete = (params = '') => apiHttp.delete({ url: Api.recycleEdit + (params ? `/${params.ids}` : '') })
export const recycleEdit = (params, type = 'post') => {
  if (type === 'post') return apiHttp.post({ url: Api.recycleEdit, params })
  else return apiHttp.put({ url: Api.recycleEdit, params })
}



export function upLoadSourceMaterial(
  params,
) {
  console.log('upLoadSourceMaterial')
  return apiHttp.uploadFile(
    {
      url: url + Api.sourceMaterialEdit,
    },
    params,
  );
}

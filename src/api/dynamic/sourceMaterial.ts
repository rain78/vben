
import { apiHttp } from '/@/utils/http/axios';
const url='http://ioteduendpoint.stepiot.com'
enum Api {
  sourceMaterialList='/sourceMaterial/page',
  sourceMaterialEdit='/sourceMaterial',

}





export const getSourceMaterialList = (params) => apiHttp.get({ url: Api.sourceMaterialList, params });

export const deleteSourceMaterial = (params='') => apiHttp.delete({ url: Api.sourceMaterialEdit+(params?`/${params.ids}`:'')})
// export const upLoadSourceMaterial = (params='') => apiHttp.delete({ url: Api.sourceMaterialEdit+(params?`/${params.ids}`:'')})
export function upLoadSourceMaterial(
  params,
) {
  console.log('upLoadSourceMaterial')
  return apiHttp.uploadFile(
    {
      url: url+Api.sourceMaterialEdit,
    },
    params,
  );
}

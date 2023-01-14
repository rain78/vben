//dictType

import { apiHttp } from '/@/utils/http/axios';

enum Api {
  dictType='/dict/type',
}





export const getDictType = (params) => {
  let a=params?.type?'/'+params.type:''
  return apiHttp.get({ url:Api.dictType+a})
};



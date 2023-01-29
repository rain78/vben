
import { apiHttp } from '/@/utils/http/axios';

enum Api {
  loginLogList='/loginLog/page',
  operLogList='/operlog/page',


}





export const getLoginLogList = (params) => apiHttp.get({ url: Api.loginLogList, params });
export const getOperLogList = (params) => apiHttp.get({ url: Api.operLogList, params });

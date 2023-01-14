import { defHttp ,apiHttp} from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel,reqCheckParams,
  reqCheckResultModel,reqGetParams,reqGetResultModel} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/user',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
  reqCheck='/captcha/check',
  reqGet='/captcha/get',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  // return defHttp.post<LoginResultModel>(
  //   {
  //     url: Api.Login,
  //     params,
  //   },
  //   {
  //     errorMessageMode: mode,
  //   },
  // );

   return apiHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );

}

export function reqCheck(params: reqCheckParams, mode: ErrorMessageMode = 'modal') {

   return apiHttp.post1<reqCheckResultModel>(
    {
      url: Api.reqCheck,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );

}
//reqGet
export function reqGet(params: reqGetParams, mode: ErrorMessageMode = 'modal') {
  return apiHttp.post1<reqGetResultModel>(
   {
     url: Api.reqGet,
     params,
   },
   {
     errorMessageMode: mode,
   },
 );

}


/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  // return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
  return apiHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}

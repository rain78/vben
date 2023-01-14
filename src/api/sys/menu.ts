import { defHttp,apiHttp } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenuList = '/getMenuList',
  GetMenuList2 = '/menu/roles',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};
export const getMenuList2 = () => {
  return apiHttp.get<getMenuListResultModel>({ url: Api.GetMenuList2 });
};

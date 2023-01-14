/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface reqCheckParams {
  captchaType: string;
  pointJson: string;
  token: string;
}
export interface reqGetParams {
  captchaType: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface reqCheckResultModel {
  [propName: string]: any
}

export interface reqGetResultModel {
  [propName: string]: any
}

export interface LoginResultModel {
  // userId: string | number;
  // token: string;
  // role: RoleInfo;
  [propName: string]: any
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  // roles: RoleInfo[];
  // // 用户id
  // userId: string | number;
  // // 用户名
  // username: string;
  // // 真实名字
  // realName: string;
  // // 头像
  // avatar: string;
  // // 介绍
  // desc?: string;
  [propName: string]: any
}

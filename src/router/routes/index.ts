import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic';

import { mainOutRoutes } from './mainOut';
import { PageEnum } from '/@/enums/pageEnum';
import { t } from '/@/hooks/web/useI18n';

// import.meta.globEager() 直接引入所有的模块 Vite 独有的功能
const modules = import.meta.globEager('./modules/**/*.ts');
const routeModuleList: AppRouteModule[] = [];
import { LAYOUT } from '/@/router/constant';
// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};
export const UserInfo: AppRouteRecordRaw = {
  path: '/userInfo',
  component: LAYOUT,
  redirect: "/userInfo/user",
  children: [
    {
      path: "user/:id?",
      component: () => import('/@/views//common/userInfo/index.vue'),
      meta: {
        // "hideMenu": true,
        // "hideBreadcrumb": true,
        title: '个人中心',
        name: '个人中心',
        // "currentActiveMenu": "/dashboard",
        // "icon": "bx:bx-home"
      }
    },
  ],
  meta: {
    // "hideMenu": true,
    // "hideBreadcrumb": true,
    title: '个人中心',
    name: '个人中心',
    // "currentActiveMenu": "/dashboard",
    // "icon": "bx:bx-home"
  }

};

export const dashboardRoute: AppRouteRecordRaw = {
  "path": "/dashboard",
  "name": "Dashboard",
  "component": "LAYOUT",
  "redirect": "/dashboard/analysis",
  "meta": {
    "title": "routes.dashboard.dashboard",
    "hideChildrenInMenu": true,
    "icon": "bx:bx-home"
  },
  "children": [
    {
      "path": "analysis",
      "name": "Analysis",
      "component": "/dashboard/analysis/index",
      "meta": {
        "hideMenu": true,
        "hideBreadcrumb": true,
        "title": "routes.dashboard.analysis",
        "currentActiveMenu": "/dashboard",
        "icon": "bx:bx-home"
      }
    },
    {
      "path": "workbench",
      "name": "Workbench",
      "component": "/dashboard/workbench/index",
      "meta": {
        "hideMenu": true,
        "hideBreadcrumb": true,
        "title": "routes.dashboard.workbench",
        "currentActiveMenu": "/dashboard",
        "icon": "bx:bx-home"
      }
    }
  ]
}


// Basic routing without permission
// 未经许可的基本路由
export const basicRoutes = [
  LoginRoute,
  RootRoute,
  UserInfo,
  // dashboardRoute,
  ...mainOutRoutes,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
];

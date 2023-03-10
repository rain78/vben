import type { AppRouteModule, AppRouteRecordRaw } from '/@/router/types';
import type { Router, RouteRecordNormalized } from 'vue-router';

import { getParentLayout, LAYOUT, EXCEPTION_COMPONENT } from '/@/router/constant';
import { cloneDeep, omit } from 'lodash-es';
import { warn } from '/@/utils/log';
import { createRouter, createWebHashHistory } from 'vue-router';

export type LayoutMapKey = 'LAYOUT';
const IFRAME = () => import('/@/views/sys/iframe/FrameBlank.vue');

const LayoutMap = new Map<string, () => Promise<typeof import('*.vue')>>();

LayoutMap.set('LAYOUT', LAYOUT);
LayoutMap.set('IFRAME', IFRAME);

let dynamicViewsModules: Record<string, () => Promise<Recordable>>;

// Dynamic introduction
function asyncImportRoute(routes: AppRouteRecordRaw[] | undefined) {
// console.log('dynamicViewsModules=>',dynamicViewsModules)


  dynamicViewsModules = dynamicViewsModules || import.meta.glob('../../views/**/*.{vue,tsx}');
  if (!routes) return;
  routes.forEach((item) => {
    // item.meta=JSON.parse(item.meta)
    if(item.meta&&(typeof item.meta==='string')){
      item.meta=JSON.parse(item.meta)
    }
    if (!item.component && item.meta?.frameSrc) {
      item.component = 'IFRAME';
    }
    const { component, name } = item;
    const { children } = item;
    if (component) {
      const layoutFound = LayoutMap.get(component.toUpperCase());
      if (layoutFound) {
        item.component = layoutFound;
      } else {
      
        item.component = dynamicImport(dynamicViewsModules, component as string);
      }
    } else if (name) {
      item.component = getParentLayout();
    }
    children && asyncImportRoute(children);
  });
}

function dynamicImport(
  dynamicViewsModules: Record<string, () => Promise<Recordable>>,
  component: string,
) {
  const keys = Object.keys(dynamicViewsModules);
  // debugger
  const matchKeys = keys.filter((key) => {
    
    const k = key.replace('../../views', '');
    const startFlag = component.startsWith('/');
    const endFlag = component.endsWith('.vue') || component.endsWith('.tsx');
    const startIndex = startFlag ? 0 : 1;
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.');
    
    return k.substring(startIndex, lastIndex) === component;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    // console.log('dynamicViewsModules=>',dynamicViewsModules[matchKey])
    return dynamicViewsModules[matchKey];
  } else if (matchKeys?.length > 1) {
    warn(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure',
    );
    return;
  } else {
    warn('???src/views/????????????`' + component + '.vue` ??? `' + component + '.tsx`, ???????????????!');
    return EXCEPTION_COMPONENT;
  }
}

// Turn background objects into routing objects
// ?????????????????????????????????
export function transformObjToRoute<T = AppRouteModule>(routeList: any): T[] {
  routeList.forEach((route) => {
    if(route.meta&&(typeof route.meta==='string')){
      route.meta=JSON.parse(route.meta)
    }
    const component = route.component as string;
    if (component) {
      // console.log('component=>',component)
      if (component.toUpperCase() === 'LAYOUT') {
        route.component = LayoutMap.get(component.toUpperCase());
      } else {
        route.children = [cloneDeep(route)];
        route.component = LAYOUT;
        route.name = `${route.name}Parent`;
        route.path = '';
        const meta = route.meta || {};
        meta.single = true;
        meta.affix = false;
        route.meta = meta;
      }
    } else {
      warn('????????????????????????' + route?.name + '???component??????');
    }
    route.children && asyncImportRoute(route.children);
  });
  return routeList as unknown as T[];
}

/**
 * Convert multi-level routing to level 2 routing
 * ???????????????????????? 2 ?????????
 */
export function flatMultiLevelRoutes(routeModules: AppRouteModule[]) {
  const modules: AppRouteModule[] = cloneDeep(routeModules);

  for (let index = 0; index < modules.length; index++) {
    const routeModule = modules[index];
    // ?????????????????? ?????? ??????
    if (!isMultipleRoute(routeModule)) {
      // ??????????????????????????? ???????????????????????????????????????
      continue;
    }
    // ??????????????????
    promoteRouteLevel(routeModule);
  }
  return modules;
}

// Routing level upgrade
// ??????????????????
function promoteRouteLevel(routeModule: AppRouteModule) {
  // Use vue-router to splice menus
  // ??????vue-router????????????
  // createRouter ????????????????????? Vue ?????????????????????????????????
  let router: Router | null = createRouter({
    routes: [routeModule as unknown as RouteRecordNormalized],
    history: createWebHashHistory(),
  });
  // getRoutes??? ???????????? ??????????????????????????????
  const routes = router.getRoutes();
  // ???????????????????????????????????????
  addToChildren(routes, routeModule.children || [], routeModule);
  router = null;

  // omit lodash????????? ????????????item?????????children????????????
  routeModule.children = routeModule.children?.map((item) => omit(item, 'children'));
}

// Add all sub-routes to the secondary route
// ???????????????????????????????????????
function addToChildren(
  routes: RouteRecordNormalized[],
  children: AppRouteRecordRaw[],
  routeModule: AppRouteModule,
) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    const route = routes.find((item) => item.name === child.name);
    if (!route) {
      continue;
    }
    routeModule.children = routeModule.children || [];
    if (!routeModule.children.find((item) => item.name === route.name)) {
      routeModule.children?.push(route as unknown as AppRouteModule);
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule);
    }
  }
}

// Determine whether the level exceeds 2 levels
// ????????????????????????2???
function isMultipleRoute(routeModule: AppRouteModule) {
  // Reflect.has ??? in ????????? ??????, ????????????????????????(?????????????????????)????????????????????????
  if (!routeModule || !Reflect.has(routeModule, 'children') || !routeModule.children?.length) {
    return false;
  }

  const children = routeModule.children;

  let flag = false;
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    if (child.children?.length) {
      flag = true;
      break;
    }
  }
  return flag;
}

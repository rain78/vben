<template>
  <div :class="[prefixCls, `${prefixCls}--${theme}`]" v-if="routes.length">
    <a-breadcrumb :routes="routes" separator=">">
      <template #itemRender="{ route, routes: routesMatched, paths }">
        <Icon
          :icon="getIcon(route)"
          v-if="getShowBreadCrumbIcon && getIcon(route) && route.index == 0"
        />

        <span v-if="!hasRedirect(routesMatched, route)">
          {{ route.meta.name }}
        </span>
        <router-link v-else to="" @click="handleClick(route, paths, $event)">
          {{ route.meta.name }}
        </router-link>
      </template>
    </a-breadcrumb>
    <div id="breadBtn" class="ml-auto"></div>
  </div>
</template>
<script lang="ts">
  import type { RouteLocationMatched } from 'vue-router';
  import { useRouter } from 'vue-router';
  import type { Menu } from '/@/router/types';

  import { defineComponent, ref, watchEffect, watch } from 'vue';

  import { Breadcrumb, Card } from 'ant-design-vue';
  import Icon from '/@/components/Icon';

  import { useDesign } from '/@/hooks/web/useDesign';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useGo } from '/@/hooks/web/usePage';
  import { useI18n } from '/@/hooks/web/useI18n';

  import { propTypes } from '/@/utils/propTypes';
  import { isString } from '/@/utils/is';
  import { filter } from '/@/utils/helper/treeHelper';
  import { getMenus } from '/@/router/menus';

  import { REDIRECT_NAME } from '/@/router/constant';
  import { getAllParentPath } from '/@/router/helper/menuHelper';

  export default defineComponent({
    name: 'LayoutBreadcrumb',
    components: { Icon, [Breadcrumb.name]: Breadcrumb, Card },
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
    },
    setup() {
      const routes = ref<RouteLocationMatched[]>([]);
      const { currentRoute } = useRouter();
      const { prefixCls } = useDesign('layout-breadcrumb');
      const { getShowBreadCrumbIcon } = useRootSetting();
      const go = useGo();
      // console.log('currentRoute=>',currentRoute)
      watch(
        currentRoute,
       async (newValue, oldValue) => {
          if (currentRoute.value.name === REDIRECT_NAME) return;
          const menus = await getMenus();

          const routeMatched = currentRoute.value.matched;
          const cur = routeMatched?.[routeMatched.length - 1];
          let path = currentRoute.value.path;
          let dynamicLevel=currentRoute.value.meta.dynamicLevel||0
          if(dynamicLevel){
            const index=path.lastIndexOf('/')
            path=path.slice(0,index)+'/:id?'
          }

          if (cur && cur?.meta?.currentActiveMenu) {
            path = cur.meta.currentActiveMenu as string;
          }
          // console.log(currentRoute.value)

          const parent = getAllParentPath(menus, path);
          // console.log('parent=>',parent)
          // console.log('menus=>',menus)
          const filterMenus = menus.filter((item) => item.path === parent[0]);

          const matched = getMatched(filterMenus, parent) as any;
          // console.log('matched=>',matched)

          if (!matched || matched.length === 0) return;

          const breadcrumbList = filterItem(matched);

          if (currentRoute.value.meta?.currentActiveMenu) {
            breadcrumbList.push({
              ...currentRoute.value,
              name: currentRoute.value.meta?.name || '',
            } as unknown as RouteLocationMatched);
          }
          breadcrumbList.forEach((val, index) => {
            val.index = index;
          });
          routes.value = breadcrumbList;
        },
        { immediate: true },
      );

      const { t } = useI18n();
      watchEffect(async () => {
        //  console.log(currentRoute.value,REDIRECT_NAME)
        // if (currentRoute.value.name === REDIRECT_NAME) return;
        // const menus = await getMenus();

        // const routeMatched = currentRoute.value.matched;
        // const cur = routeMatched?.[routeMatched.length - 1];
        // let path = currentRoute.value.path;

        // if (cur && cur?.meta?.currentActiveMenu) {
        //   path = cur.meta.currentActiveMenu as string;
        // }
        // const parent = getAllParentPath(menus, path);

        // const filterMenus = menus.filter((item) => item.path === parent[0]);

        // const matched = getMatched(filterMenus, parent) as any;
        // // console.log('matched=>',matched)

        // if (!matched || matched.length === 0) return;

        // const breadcrumbList = filterItem(matched);
        // console.log('breadcrumbList=>', breadcrumbList);

        // if (currentRoute.value.meta?.currentActiveMenu) {
        //   breadcrumbList.push({
        //     ...currentRoute.value,
        //     name: currentRoute.value.meta?.name || '',
        //   } as unknown as RouteLocationMatched);
        // }
        // // console.log('breadcrumbList=>',breadcrumbList)
        // breadcrumbList.forEach((val, index) => {
        //   // val.children=[]
        //   val.index = index;
        // });
        // // console.log('breadcrumbList=>',breadcrumbList)
        // routes.value = breadcrumbList;
      });

      function getMatched(menus: Menu[], parent: string[]) {
        const metched: Menu[] = [];
        menus.forEach((item) => {
          if (parent.includes(item.path)) {
            metched.push({
              ...item,
              name: item.meta?.title || item.name,
            });
          }
          if (item.children?.length) {
            metched.push(...getMatched(item.children, parent));
          }
        });
        // console.log('getMatched=>',matched)

        return metched;
      }

      function filterItem(list: RouteLocationMatched[]) {
        return filter(list, (item) => {
          const { meta } = item;
          if (!meta) {
            return false;
            // return !!name;
          }
          const { title, hideBreadcrumb, hideMenu, name } = meta;
          if (!name || hideBreadcrumb || hideMenu) {
            return false;
          }
          return true;
        }).filter((item) => !item.meta?.hideBreadcrumb);
      }

      function handleClick(route: RouteLocationMatched, paths: string[], e: Event) {
        e?.preventDefault();
        const { children, redirect, meta } = route;

        if (children?.length && !redirect) {
          e?.stopPropagation();
          return;
        }
        if (meta?.carryParam) {
          return;
        }

        if (redirect && isString(redirect)) {
          go(redirect);
        } else {
          let goPath = '';
          if (paths.length === 1) {
            goPath = paths[0];
          } else {
            const ps = paths.slice(1);
            const lastPath = ps.pop() || '';
            goPath = `${lastPath}`;
          }
          goPath = /^\//.test(goPath) ? goPath : `/${goPath}`;
          go(goPath);
        }
      }

      function hasRedirect(routes: RouteLocationMatched[], route: RouteLocationMatched) {
        return routes.indexOf(route) !== routes.length - 1;
      }

      function getIcon(route) {
        return route.icon || route.meta?.icon;
      }

      return { routes, t, prefixCls, getIcon, getShowBreadCrumbIcon, handleClick, hasRedirect };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-breadcrumb';

  .@{prefix-cls} {
    display: flex;
    padding: 16px;
    // padding: 0 8px;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%),
      0 1px 5px 0 rgb(0 0 0 / 20%);

    .ant-breadcrumb-link {
      .anticon {
        margin-right: 4px;
        margin-bottom: 2px;
      }
    }

    &--light {
      .ant-breadcrumb-link {
        color: @breadcrumb-item-normal-color;

        a {
          color: @breadcrumb-item-normal-color;

          &:hover {
            color: @primary-color;
          }
        }
      }

      .ant-breadcrumb-separator {
        color: @breadcrumb-item-normal-color;
        // color: @breadcrumb-item-normal-color;
      }
    }

    &--dark {
      .ant-breadcrumb-link {
        // color: rgb(255 255 255 / 60%);

        a {
          // color: rgb(255 255 255 / 80%);

          &:hover {
            // color: @white;
          }
        }
      }

      .ant-breadcrumb-separator,
      .anticon {
        // color: rgb(255 255 255 / 80%);
        color: @breadcrumb-item-normal-color;
      }
    }
  }
</style>

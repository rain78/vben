<template>
  <div class="border-box @lg:(pt-64px) @xl:(pt-64px) @2xl:(pt-64px) @md:(pt-0px) @sm:(pt-0px)">
    <!-- <LayoutMultipleHeader > </LayoutMultipleHeader> -->
    <LayoutMultipleHeader :key="keyHeader"> </LayoutMultipleHeader>
    <RouterView>
      <template #default="{ Component, route }">
        <transition
          :name="
            getTransitionName({
              route,
              openCache,
              enableTransition: getEnableTransition,
              cacheTabs: getCaches,
              def: getBasicTransition,
            })
          "
          mode="out-in"
          appear
        >
          <keep-alive v-if="openCache" :include="getCaches">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
          <div v-else :key="route.name">
            <component :is="Component" :key="route.fullPath" />
          </div>
        </transition>
      </template>
    </RouterView>
    <FrameLayout v-if="getCanEmbedIFramePage" />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, unref,ref, watchEffect, watch } from 'vue';

  import FrameLayout from '/@/layouts/iframe/index.vue';

  import { useRootSetting } from '/@/hooks/setting/useRootSetting';

  import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
  import { useMultipleTabSetting } from '/@/hooks/setting/useMultipleTabSetting';
  import { getTransitionName } from './transition';

  import { useMultipleTabStore } from '/@/store/modules/multipleTab';
  import LayoutMultipleHeader from '/@/layouts/default/header/MultipleHeader.vue';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'PageLayout',
    components: { FrameLayout, LayoutMultipleHeader },
    setup() {
      const { getShowMultipleTab } = useMultipleTabSetting();
      const tabStore = useMultipleTabStore();

      const { getOpenKeepAlive, getCanEmbedIFramePage } = useRootSetting();

      const { getBasicTransition, getEnableTransition } = useTransitionSetting();

      const openCache = computed(() => unref(getOpenKeepAlive) && unref(getShowMultipleTab));

      const getCaches = computed((): string[] => {
        if (!unref(getOpenKeepAlive)) {
          return [];
        }
        return tabStore.getCachedTabList;
      });
      const route = useRoute();
      // watchEffect(async () => {
      //   console.log('route=>',route)
      // })
      const keyHeader=ref('')
      watch(
        route,
        (newValue, oldValue) => {
          keyHeader.value=newValue.fullPath
          // console.log('keyHeader=>',keyHeader.value)
        },
        { immediate: true },
      );

      return {
        getTransitionName,
        openCache,
        getEnableTransition,
        getBasicTransition,
        getCaches,
        getCanEmbedIFramePage,
        keyHeader,
      };
    },
  });
</script>

<style lang="less" scoped>
</style>

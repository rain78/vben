<template>
  <div class="p-15px border-box">
    <div>
      <div
        class="w-full h-200px rounded-14px bg-no-repeat bg-left-top border-box"
        
        :style="clazzmemberData.sourceMaterialUrl?{
          'background-image': `url(${clazzmemberData.sourceMaterialUrl})`,
          'background-size': '100% 100%',
        }:{
          background:'#90939991'
        }"
      >
        <div class="!text-hex-fff pt-20px pl-20px border-box">
          <h2 class="!text-hex-fff text-28px font-bold mt-15px">{{ clazzmemberData.name }}</h2>
          <h4 class="!text-hex-fff text-22px mt-15px mb-15px">{{ formartClazz(clazzmemberData.startYear) }}</h4>
          <h4 class="!text-hex-fff text-22px mt-15px mb-15px">{{ clazzmemberData.schoolName }}</h4>
          
        </div>
      </div>
      <Tabs v-model:activeKey="activeKey">
        <TabPane   v-for="item in tabs" :key="item.key">
          <template #tab>
            <span>
              <Icon :icon="item.icon" />
              {{ item.label }}
            </span>
          </template>
          <div>
            <component :is="item.component" :clazzmemberData="clazzmemberData"> </component>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script  lang="ts" setup>
  import { formartClazz } from '/@/api/common/index';

  import { ref, unref, reactive, } from 'vue';
  import { useRoute } from 'vue-router';
  import { Tabs, TabPane } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { Button } from '/@/components/Button';
  import { industriallaborClazzmember } from '/@/api/dynamic/industriallabor';
  import Labor from './components/Labor/index.vue';
  import Person from './components/Person/index.vue';
  import Source from './components/Source/index.vue';
  const route = useRoute();
  const clazzId = ref(route.params.id || '');
  const clazzmemberData = ref({});
  const activeKey = ref('Person');
  const tabs = reactive([
    {
      label: '人员信息',
      icon: 'mdi:account-group',
      key: 'Person',
      component: Person,
    },
    {
      label: '劳动作业',
      icon: 'mdi:notebook',
      key: 'Labor',
      component: Labor,
    },
    {
      label: '素材列表',
      icon: 'mdi:folder',
      key: 'Source',
      component: Source,
    },
  ]);
  getDetail();
  async function getDetail() {
    const { success, obj } = await industriallaborClazzmember({ clazzId: unref(clazzId) });
    clazzmemberData.value = obj;
    
  }
</script>

<style lang="less" scoped>
::v-deep(.ant-tabs-top > .ant-tabs-nav::before){
  // @apply
  border-bottom: 1px solid #bdbaba !important;
}
</style>
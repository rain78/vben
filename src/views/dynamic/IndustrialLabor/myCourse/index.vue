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
            <component :is="item.component" :userInfo="userInfo" :clazzmemberData="clazzmemberData"> </component>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script  lang="ts" setup>
  import { formartClazz } from '/@/api/common/index';

  import { ref, unref, reactive,computed } from 'vue';
  import { Tabs, TabPane } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { Button } from '/@/components/Button';
  import { classStu } from '/@/api/dynamic/agencyPersonnel';
  import { userGetDetail} from '/@/api/dynamic/userRights';
  import Labor from './components/Labor/index.vue';
  import Notice from './components/Notice/index.vue';
  const clazzmemberData = ref({});
  const activeKey = ref('Labor');
  const tabs = reactive([
    {
      label: '劳动作业',
      icon: 'mdi:notebook',
      key: 'Labor',
      component: Labor,
    },
    {
      label: '素材列表',
      icon: 'mdi:message-processing',
      key: 'Notice',
      component: Notice,
    },
  ]); 
  const userInfo=ref({})
  userGetDetail().then(({obj,success})=>{
    userInfo.value=success?obj:{}
    console.log('userGetDetail=>',obj)

    getDetail()
  })
  async function getDetail() {
    // console.log('clazzId')
    const {clazzIds}=unref(userInfo)
    const { success, obj } = await classStu({ clazzId: clazzIds[0] });
    console.log('getDetail=>',obj)
    clazzmemberData.value = obj;
    
  }
  // const clazzId=computed(()=>{
  //   return unref(userInfo).clazzIds[0]||''
  // })
</script>

<style lang="less" scoped>
::v-deep(.ant-tabs-top > .ant-tabs-nav::before){
  // @apply
  border-bottom: 1px solid #bdbaba !important;
}
</style>
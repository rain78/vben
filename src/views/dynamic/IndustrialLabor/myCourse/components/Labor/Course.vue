<template>
  <div>
    <Tabs v-model:activeKey="activeKey" centered class="tab_self">
      <TabPane v-for="item in tabs" :key="item.key">
        <template #tab>
          <span>
            <!-- <Icon :icon="item.icon" /> -->
            {{ item.label }}
          </span>
        </template>
        <div class="border-box">
          <component :is="item.component" :key="laborCourseId" :laborCourseId="laborCourseId" :spanNum="17"> </component>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script lang="ts" setup>
  import { ref, unref, reactive, computed, inject, watch } from 'vue';
  import { Row, Col, Divider, List, ListItem, Tabs, TabPane } from 'ant-design-vue';
  import Mask from './Mask.vue';
  import CourseDetail from '/@/views/dynamic/basciData/laborCourses/detail.vue';
  const props = defineProps({
    laborCourseId: { type: String },
  });
  // const laborCourseId=inject('laborCourseId')
  // const activeKey = ref('Mask');
  const activeKey = ref('');
  // const key = ref(new Date().valueOf());
  watch(
    () => props.laborCourseId,
    () => {
      if (!props.laborCourseId) {
        activeKey.value = '';
      } else {
        activeKey.value = 'CourseDetail';
      }
      // key.value = new Date().valueOf();
    },
    {
      immediate: true,
    },
  );
  const tabs = reactive([
    {
      label: '劳动作业',
      // icon: 'mdi:notebook',
      key: 'CourseDetail',
      component: CourseDetail,
    },
    {
      label: '劳动任务',
      // icon: 'mdi:message-processing',
      key: 'Mask',
      component: Mask,
    },
  ]);
</script>

<style lang="less" scoped>
  .tab_self {
    ::v-deep(.ant-tabs-nav-list) {
      flex: 1;
      justify-content: center;
      .ant-tabs-tab {
        width: 35%;
        justify-content: center;
      }
      .ant-tabs-tab-active {
        background-color: rgba(57, 73, 172, 0.15);
        border-radius: 5px;
      }
    }
  }
</style>
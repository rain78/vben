<template>
  <div :class="prefixCls">
    <Badge :count="count"  :numberStyle="numberStyle"  @click="onNoticeClick">
        <Icon icon="mdi:bell"   />
    </Badge>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, ref } from 'vue';
  import { Popover, Tabs, Badge } from 'ant-design-vue';
  import { BellOutlined } from '@ant-design/icons-vue';
  import { tabListData, ListItem } from './data';
  import NoticeList from './NoticeList.vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Icon } from '/@/components/Icon';
  import { useUserStore } from '/@/store/modules/user';
  import { getUnreadCount } from '/@/api/common/index';
  import { router, } from '/@/router';




  export default defineComponent({
    components: { Popover, BellOutlined, Tabs, TabPane: Tabs.TabPane, Badge, NoticeList,Icon },
    setup() {
      const { prefixCls } = useDesign('header-notify');
      const { createMessage } = useMessage();
      const listData = ref(tabListData);
      const userStore = useUserStore();
      const count=ref(0)
      getUnreadCount({id:userStore.getUserInfo.id}).then(({obj})=>{
        count.value=obj||0
      })

      function onNoticeClick() {
        router.push(`/IndustrialLabors/myCourse?activeKey=Notice`)
      }

      return {
        prefixCls,
        listData,
        count,
        onNoticeClick,
        numberStyle: {},
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-notify';

  .@{prefix-cls} {
    padding-top: 2px;
    line-height: 1;

    &__overlay {
      max-width: 360px;
    }

    .ant-tabs-content {
      width: 300px;
    }

    .ant-badge {
      font-size: 18px;

      .ant-badge-multiple-words {
        padding: 0 4px;
      }

      svg {
        width: 0.9em;
      }
    }
  }
</style>

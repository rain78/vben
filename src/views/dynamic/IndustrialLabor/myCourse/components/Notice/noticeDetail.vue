<template>
  <div class="border-box">
    <Row :gutter="[8, { xs: 8, sm: 8, md: 8, lg: 8 }]">
      <Col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="!pr-0 border-box">
        111
      </Col>
      
    </Row>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, watch, unref, inject, reactive } from 'vue';
  import { Row, Col, Divider,Card } from 'ant-design-vue';
  import projectSetting from '/@/settings/projectSetting';
  import { Button } from '/@/components/Button';
  import { Icon } from '/@/components/Icon';
  const props=defineProps(
    {
      
    }
  )
  
</script>

<style lang="less" scoped>
  .listSelf {
    ::v-deep(.ant-list-item) {
      padding: 0px;
    }
  }
  .notifyActive {
    background: var(--theme);
    color: #fff;
  }
  .noread {
    color: var(--theme);
  }
</style>
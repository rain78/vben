<template>
  <Card :bordered="false" :hoverable="false" class="cardListItem">
    <div class="cardBox">
      <div class="cardImg" @click="goDetail">
        <img class="w-full !h-full" :src="data.sourceMaterialUrl" v-if="data.sourceMaterialUrl" />
        <div v-else class="w-full !h-full bg-hex-90939991"></div>
      </div>
      <div class="absolute p-15px border-box text-hex-fff top-0 left-0 w-full">
        <div class="text-right">
          <Icon icon="mdi:dots-vertical" class="font-bold text-20px" />
        </div>
        <div class="!text-hex-fff">
          <h2 class="!text-hex-fff text-28px font-bold mt-15px">{{ data.name }}</h2>
          <h4 class="!text-hex-fff text-22px mt-15px mb-15px">{{ data.schoolName }}</h4>
          <span
            ><Icon icon="mdi:account-school" class="text-20px" /> &nbsp;&nbsp;{{
              data.studentCounts
            }}名</span
          >
        </div>
      </div>
    </div>
    <template #actions>
      <div class="p-10px text-right">
        <a-button type="link" :size="size" @click="goDetail">进入班级</a-button>
      </div>
    </template>
  </Card>
</template>
<script lang="ts" setup>
  import {ref, defineProps } from 'vue';
  import { Card} from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { Button } from '/@/components/Button';
  import { router } from '/@/router';

  function goDetail() {
    const { data } = props;
    router.push('/IndustrialLabor/myClass/detail/' + data.id);
  }

  const props = defineProps({
    data: { type: Object },
    index: { type: Number },
  });
</script>

<style >
  .cardListItem .ant-card-body {
    padding: 0 !important;
  }
</style>

<style lang="less" scoped>
  div.ant-typography {
    margin-bottom: 0 !important;
  }
  .cardListItem {
    .cardBox {
      position: relative;

      .cardImg {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        aspect-ratio: 1/1 !important;
        cursor: pointer;
      }
    }
  }
</style>

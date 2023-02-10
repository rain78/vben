<template>
  <Card :bordered="false" :hoverable="false" class="cardListItem">
    <div class="cardBox">
      <div class="cardIcon" @click="doSelect">
        <Icon icon="mdi:check-circle" v-if="idSelect" />
        <Icon icon="mdi:checkbox-blank-circle-outline" v-else />
      </div>
      <div class="cardImg" @click="goDetail">
        <Image class="cardImglist" :src="data.sourceMaterialCoverUrl" :preview="false" />
      </div>
      <div class="cardText">
        <div>{{ index + 1 }}.{{ data.name }}</div>
        <div>{{ data.grade }}</div>
      </div>
    </div>
    <template #actions>
      
      <slot name="actionsOption1" :data="data"> </slot>
      <slot name="actionsOption2" :data="data"> </slot>
    </template>
  </Card>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { Card, Image } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { router } from '/@/router';
  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    name: 'laborCoursesCard',
    components: { Card, Image ,Icon},
    props: ['data', 'index'],
    emits: ['select',],
    setup(props, { emit }) {
      const idSelect=ref(false)
      function goDetail(){
        const {data}=props
        router.push('/basciData/laborCourses/detail/' + data.id);
      }

      function doSelect(){
        idSelect.value=!idSelect.value
        const {data,index}=props
        emit('select', data,index,idSelect.value);
      }
      return {
        goDetail,
        doSelect,
        idSelect
      }
    },
  });
</script>

<style >
  .cardListItem .ant-card-body {
    padding: 0 !important;
  }
</style>

<style lang="less" scoped>
  .cardListItem {
    .cardBox {
      position: relative;
      .cardIcon {
        position: absolute;
        top: 5px;
        left: 5px;
        color:  @primary-color;
        z-index: 9;
        cursor: pointer;

        // font-size: 30px;
      }
      .cardImg {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        aspect-ratio: 1/1;
        cursor: pointer;

        .cardImglist {
          max-width: 100%;
          max-height: 100%;
        }
      }

      .cardText {
        padding: 10px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
</style>

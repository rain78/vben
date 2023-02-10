<template>
  <Card :bordered="false" :hoverable="false" class="cardListItem">
    <div class="cardBox">
      <div class="cardIcon" @click="doSelect">
        <Icon icon="mdi:check-circle" v-if="idSelect" />
        <Icon icon="mdi:checkbox-blank-circle-outline" v-else />
      </div>
      <div class="cardImg" @click="goDetail">
        <Image class="cardImglist" :src="data.url" :preview="false" v-if="data.suffix!='mp4'&&data.suffix!='mov'"/>
       
        <video class="cardVideolist"  v-else>
          <source :src="data.url" type="video/mp4" >
        </video>
      </div>
    </div>
  </Card>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Card, Image } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { router } from '/@/router';
  export default defineComponent({
    components: { Card, Image ,Icon},
    props: ['data', 'index'],
    emits: ['select',],
    setup(props, { emit }) {
      const idSelect=ref(false)
      function goDetail(){
        const {data}=props
        // router.push('/sourceMaterial/sourceManagement/detail/'+data.id)
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
        aspect-ratio: 1/1 !important;
        cursor: pointer;

        .cardImglist {
          max-width: 100%;
          max-height: 100%;
        }
        .cardVideolist{
          max-width: 100% !important;
          max-height: 100% !important;
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

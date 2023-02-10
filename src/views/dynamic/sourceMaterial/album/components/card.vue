<template>
  <Card :bordered="false" :hoverable="false" class="cardListItem">
    <div class="cardBox">
      <div class="cardIcon" @click="doSelect">
        <Icon icon="mdi:check-circle" v-if="idSelect" />
        <Icon icon="mdi:checkbox-blank-circle-outline" v-else />
      </div>
      <div class="cardImg" @click="goDetail">
        <Image class="cardImglist" :src="data.coverUrl" :preview="false" />
      </div>
      <div class="cardText">
        <div class="flex items-center">
          <Icon icon="mdi:account-multiple" class="mr-1" v-if="data.shareClazzIds" />
          <TypographyParagraph
            v-model:content="data.name"
            :editable="{
              onEnd: doEdit,
              onStart,
            }"
            :style="{ width: '150px' }"
            ellipsis
          />
        </div>
        <div class="text-center">
          <Button type="link" class="!font-bold !text-2xl" @click="goDetail">{{ data.sourceMaterialCount }}</Button>
          <p class="text-hex-00000073">{{ parseTime(data.createTime, '{y}-{m}-{d}') }}</p>
        </div>
      </div>
    </div>
  </Card>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Card, Image ,CardMeta,TypographyParagraph} from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { Button } from '/@/components/Button';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { router } from '/@/router';
  import { parseTime } from '/@/utils/dateUtil';
    import {
    albumEdit as updata,
  } from '/@/api/dynamic/sourceMaterial';
  export default defineComponent({
    components: { Card, Image, Icon,TypographyParagraph,Button },
    props: ['data', 'index'],
    emits: ['select'],
    setup(props, { emit }) {
      const { createMessage } = useMessage();
      const idSelect = ref(false);
      function goDetail() {
        const { data } = props;
        router.push('/sourceMaterial/album/detail/' + data.id);
      }

      function doSelect() {
        idSelect.value = !idSelect.value;
        const { data, index } = props;
        emit('select', data, index, idSelect.value);
      }

      let startVal=''
      async function doEdit(){
        const { data } = props;
        if(startVal!==data.name)
        try {
          const {success}=await updata({
            name:data.name,
						id:data.id
          },"put")
          if(success) createMessage.success('操作成功')
          else createMessage.error('操作失败')
        } catch (err) {
          console.log(err)
        }
      }
      function onStart(){
        const { data } = props;
        startVal=data.name
      }
      return {
        goDetail,
        doSelect,
        idSelect,
        parseTime,
        doEdit
      };
    },
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
      .cardIcon {
        position: absolute;
        top: 5px;
        left: 5px;
        color: @primary-color;
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
        .cardVideolist {
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

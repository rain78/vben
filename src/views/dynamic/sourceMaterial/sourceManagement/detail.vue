<template>
  <div class="detail">
    <Row :gutter="10">
      <Col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <Image :src="detailData.url" width="100%" />
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <Card title="元数据">
          <Descriptions title="" :column="1">
            <DescriptionsItem label="上传时间">{{ detailData.createTime }}</DescriptionsItem>
            <DescriptionsItem label="上传用户">{{ detailData.creator }}</DescriptionsItem>
            <DescriptionsItem label="文件类型">{{ detailData.suffix }}</DescriptionsItem>
            <DescriptionsItem label="文件大小">{{ bytesToSize(detailData.size) }}</DescriptionsItem>
            <DescriptionsItem label="SHA256">{{ detailData.sha256 }}</DescriptionsItem>
            <DescriptionsItem label="所属专辑">
              <Tag
                v-for="(item, index) in detailData.albums"
                :key="index"
                :color="colors[index % 7]"
              >
                {{ item.name }}
              </Tag>
            </DescriptionsItem>
            <DescriptionsItem label="访问地址">{{ detailData.url }}</DescriptionsItem>
            <DescriptionsItem label="素材描述">
              <Textarea v-model:value="detailData.remark" auto-size />
            </DescriptionsItem>
          </Descriptions>
          <template #actions>
            <Button type="link" @click="handleDelete">删除</Button>
            <Button type="link" @click="downLoadSigleFile(detailData)">下载</Button>
            <Button type="link" @click="save">保存</Button>
          </template>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script lang="ts" setup>
  import { ref,reactive } from 'vue';
  import { downLoadSigleFile, strSize, bytesToSize } from '/@/utils/file/download';
  import { Button } from '/@/components/Button';
  import { Row, Col, Image, Card, Descriptions, DescriptionsItem,Tag,Textarea } from 'ant-design-vue';
  import { sourceMaterialDetail as getDetail ,sourceMaterialEdit as updata,deleteSourceMaterial as deleteData} from '/@/api/dynamic/sourceMaterial';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useRoute } from 'vue-router';
  import { router } from '/@/router';
  const route = useRoute();
  const { createConfirm, createMessage } = useMessage();
  const detailData = ref({});
  const colors=reactive(['pink','red','orange','green','cyan','blue','purple'])
  getDetail(route.params.id).then(({ success, obj }) => {
    detailData.value = success && obj;
  });
  function save() {
    const remark=detailData.value.remark
    if(strSize(remark+'')>512) return createMessage.warn('素材描述超过512字节,请删除一些')
    createConfirm({
      iconType: 'warning',
      title: '温馨提示',
      content: '确定此操作吗',
      onOk: async () => {
        try {
          const { success } = await updata({id:route.params.id, remark},'put');
          
          if (success){
            createMessage.success('保存成功')
            router.go(-1)
          };
        } catch (error) {
          console.log(error);
        }
      },
    });
  }

  function handleDelete(){
    createConfirm({
      iconType: 'warning',
      title: '温馨提示',
      content: '确定此操作吗',
      onOk: async () => {
        try {
          const { success } = await deleteData({ ids: route.params.id });

          if (success){
            createMessage.success('操作成功')
            router.go(-1);
          }

        } catch (error) {
          console.log(error);
        }
      },
    });
  }
</script>
<style lang="less" scoped>
  .detail {
    padding:16px;
    box-sizing: border-box;
  }
</style>

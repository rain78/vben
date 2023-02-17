<template>
  <div class="border-box">
    <Row :gutter="[8, { xs: 8, sm: 8, md: 8, lg: 8 }]">
      <Col :xs="24" :sm="24" :md="3" :lg="3" :xl="3" class="!pr-0 border-box">
        <div class="p-10px border-box flex flex-col">
          <span
            class="py-5px mb-10px text-center cursor-pointer"
            :class="{ notifyActive: notifyActive == 0 }"
            @click="selectNotify(0)"
            >收件箱</span
          >
          <span
            class="py-5px text-center cursor-pointer"
            :class="{ notifyActive: notifyActive == 1 }"
            @click="selectNotify(1)"
            >已归档</span
          >
          <!-- <span>已归档</span> -->
        </div>
      </Col>
      <Col :xs="24" :sm="24" :md="21" :lg="21" :xl="21" class="!pl-0 border-box">
        <div class="flex border-box">
          <div class="h-auto">
            <Divider
              type="vertical"
              class="!h-full w-3px"
              :style="{ 'background-color': projectSetting.themeColor }"
            />
          </div>
          <div class="flex-1 border-box">
            <div v-if="!detailShow">
              <List
                item-layout="horizontal"
                :data-source="noticeData"
                class="listSelf"
                :pagination="pagination"
              >
                <template #renderItem="{ item }">
                  <ListItem>
                    <div class="w-full">
                      <div
                        class="flex items-center cursor-pointer"
                        :class="{ noread: !item.readStatus }"
                        @click="noticeShow(item)"
                      >
                        <div class="px-15px py-10px border-box">{{ item.sender }}</div>
                        <div class="flex-1 px-15px py-10px border-box">
                          {{ item.title }}
                        </div>
                        <div class="px-15px py-10px border-box"
                          ><Icon icon="mdi:attachment" :color="projectSetting.themeColor"
                        /></div>
                        <div class="px-15px py-10px border-box">发送日期:{{ item.createTime }}</div>
                      </div>
                      <Divider class="!mt-0px !mb-0px bg-hex-bdbaba" />
                    </div>
                  </ListItem>
                </template>
              </List>
            </div>
            <div v-else>
              <div class="pl-10px border-box">
                <div class="flex items-center">
                  <Icon
                    class="cursor-pointer"
                    icon="mdi:arrow-left"
                    :size="24"
                    :color="projectSetting.themeColor"
                    @click="goBack()"
                  />&nbsp;&nbsp; 
                  <Button type="primary" preIcon="mdi:package-down" @click="goFile" :disabled="noticeDetailData?.archiveStatus||notifyActive==1" >{{noticedetailData?.archiveStatus?'已归档':'归档'}}</Button>
                </div>
                <div class="border-box p-5px pt-10px">
                  <!-- <noticeDetail :noticedetailData="noticedetailData"></noticeDetail> -->
                  <Row>
                    <Col :xs="24" :sm="24" :md="12" :lg="10" :xl="10" class="!pr-0 border-box">
                      <Card :title="noticedetailData.title" :bordered="false" style="width: 300px">
                        <div>
                          <div class="pb-20px">
                            {{ noticedetailData.content }}
                          </div>
                          <div class="pb-20px">
                            <span v-for="item in noticedetailData.sourceMaterials"
                            :key="item.id">
                              <!-- <Icon :icon="files.fileFormat.get(item.suffix)" /> -->
                              <Button type="link" @click="downLoadSigleFile(item)">
                                {{item.originalFilename ? item.originalFilename : '没有文件名'}}
                              </Button>
                              
                              </span>
                          </div>
                          
                          <div class="text-right">
                            {{ noticedetailData.sender }}:{{ noticedetailData.createTime }}
                          </div>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, watch, unref, inject, reactive } from 'vue';
  import {
    Row,
    Col,
    Divider,
    List,
    ListItem,
    Skeleton,
    ListItemMeta,
    Avatar,
    Card,
  } from 'ant-design-vue';
  import projectSetting from '/@/settings/projectSetting';
  import { Button } from '/@/components/Button';
  import { Icon } from '/@/components/Icon';
  import { notifyUserList as getList, notifyGet,notifyUser } from '/@/api/dynamic/industriallabor';
  import { useModal } from '/@/components/Modal';
  import { downLoadSigleFile } from '/@/utils/file/download';
import { func } from 'vue-types';

  // import noticeDetail from './noticeDetail.vue'

  const notifyActive = ref(0);
  function selectNotify(num) {
    notifyActive.value = num;
    // getNoticeData()
  }
  const noticeData = ref([]);
  const total = ref(0);
  const pagination = reactive({
    onChange: (page: number) => {
      pagination.current = page;
      getNoticeData();
    },
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const detailShow = ref(false);
  
  watch(
    () => unref(notifyActive),
    () => {
      if (unref(notifyActive) != 0 && !unref(notifyActive)) {
        noticeData.value = [];
        return false;
      }
      detailShow.value=false
      getNoticeData();
    },
    {
      immediate: true,
    },
  );

  async function getNoticeData() {
    try {
      const { obj, success } = await getList({
        archiveStatus: unref(notifyActive),
        size: 10,
        current: pagination.current,
      });
      if (success) {
        const { records, total } = obj;
        noticeData.value = records || [];
        // total.value = total * 1;
        pagination.total = total * 1;
      }
    } catch (error) {}
  }

  const noticedetailData = ref({});
  const fileFormat=new Map([['xls', 'mdi:file-excel-box'],['xlsx', 'mdi:file-excel-box'],['doc', 'mdi:file-word-box'],['docx', 'mdi:file-word-box']
            ,['ppt', 'mdi:file-powerpoint-box'],['pptx', 'mdi:file-powerpoint-box'],['jpg', 'mdi:image-size-select-actual'],['png', 'mdi:image-size-select-actual']
            ,['jpeg', 'mdi:image-size-select-actual'],['map4', 'mdi:movie-open'],['mov', 'mdi:movie-open']])
  const files=ref({
    fileFormat,
  })
  
  async function noticeShow(item) {
    detailShow.value = true;
    // noticedetailData.value = item;
    const { obj, success } = await notifyGet({ notifyId: item.notifyId });
    noticedetailData.value = {
      ...item,
      ...obj,
    };
  }
  function goBack() {
    detailShow.value = false;
    getNoticeData();
  }

  async function goFile(){
     const { obj, success } = await notifyUser({ notifyId: unref(noticedetailData).notifyId },'put');
     if(success) goBack()

  }
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
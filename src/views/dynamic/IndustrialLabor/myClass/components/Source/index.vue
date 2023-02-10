<template>
  <div>
    <Row :gutter="[8, { xs: 8, sm: 8, md: 8, lg: 8 }]">
      <Col :xs="24" :sm="24" :md="5" :lg="5" :xl="5" class="!pr-0">
        <div>
          <div class="flex">
            <div class="flex-1 border-box">
              <div>
                <List class="laborCourseList" item-layout="horizontal" :data-source="albumData">
                  <template #renderItem="{ item, index }">
                    <ListItem>
                      <div
                        :key="item.id"
                        class="w-full flex items-center"
                        @click="selectAlbum(item)"
                      >
                        <span class="flex-1 p-2px border-box flex">
                          <span class="laborCourseShadow flex-1 flex border-box items-center">
                            <span class="pt-7px pb-7px ml-10px"
                              >{{ index + 1 }}.{{ item.name }}</span
                            >
                          </span>
                        </span>
                        <span
                          class="laborCourseIcon"
                          :class="{ laborCourseIconActive: selectAlbumId == item.id }"
                        >
                          <Icon icon="mdi:triangle" :color="projectSetting.themeColor" />
                        </span>
                      </div>
                    </ListItem>
                  </template>
                </List>
              </div>
            </div>
            <!-- <div class="h-auto">
              <Divider
                type="vertical"
                class="!h-full w-3px"
                :style="{ 'background-color': projectSetting.themeColor }"
              />
            </div> -->
          </div>
        </div>
      </Col>
      <Col :xs="24" :sm="24" :md="19" :lg="19" :xl="19" class="!pl-0">
        <div class="flex">
          <div class="h-auto">
            <Divider
              type="vertical"
              class="!h-full w-3px"
              :style="{ 'background-color': projectSetting.themeColor }"
            />
          </div>
          <div class="flex-1 border-box">
            <List
              :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 5, xl: 5, xxl: 5, xxxl: 6 }"
              :data-source="sourceData"
            >
              <template #renderItem="{ item }">
                <ListItem>
                  <!-- <Card>Card content</Card> -->
                  <div class="w-full imgBox">
                    <Image
                      class="imglist"
                      :src="item.url"
                      :preview="false"
                      v-if="item.suffix != 'mp4' && item.suffix != 'mov'"
                    />
                    <video class="imglist" v-else>
                      <source :src="item.url" type="video/mp4" />
                    </video>
                  </div>
                </ListItem>
              </template>
            </List>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineProps, computed, watch, unref } from 'vue';
  import { useRoute } from 'vue-router';
  import { Row, Col, Divider, List, ListItem, Image } from 'ant-design-vue';
  import projectSetting from '/@/settings/projectSetting';
  import { albumShareSource } from '/@/api/dynamic/sourceMaterial';

  import { Button } from '/@/components/Button';
  import { Icon } from '/@/components/Icon';
  import { CardList } from '/@/components/CardList';

  import { albumDetail as detail } from '/@/api/dynamic/sourceMaterial';

  const route = useRoute();
  const clazzId = ref(route.params.id || '');
  const props = defineProps({
    clazzmemberData: { type: Object },
  });
  const albumData = ref([]);
  watch(
    () => clazzId.value,
    async () => {
      if (!clazzId.value) {
        albumData.value = [];
        return false;
      }
      const { success, obj } = await albumShareSource({
        data: {},
        clazzId: unref(clazzId),
      });
      albumData.value = success ? obj || [] : [];
      selectAlbumId.value = albumData.value.length > 0 && obj[0].id;
    },
    {
      immediate: true,
    },
  );

  const selectAlbumId = ref('');
  const selectAlbum = (item) => {
    selectAlbumId.value = item.id;
  };

  const sourceData = ref([]);

  watch(
    () => selectAlbumId.value,
    async () => {
      if (!selectAlbumId.value) {
        sourceData.value = [];
        return false;
      }
      getSourceList();
    },
    {
      immediate: true,
    },
  );

  // const data1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  const getSourceList = async () => {
    const params = {
      album: unref(selectAlbumId),
    };
    const { success, obj } = await detail({ ...params });
    console.log(obj.sourceMaterialPage.records);
    if (success) sourceData.value = obj.sourceMaterialPage.records || [];
  };
</script>

<style lang="less" scoped>
  .laborCourseIcon {
    transform: rotate(-30deg);
    visibility: hidden;
  }
  .laborCourseIconActive {
    visibility: visible;
  }

  .laborCourseShadow {
    box-shadow: 0px 0px 2px 0px #867d7d;
  }
  .laborCourseList {
    ::v-deep(.ant-list-item) {
      padding-bottom: 0px;
    }
  }
  .imgBox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    aspect-ratio: 1/1 !important;
    cursor: pointer;
    .imglist {
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>
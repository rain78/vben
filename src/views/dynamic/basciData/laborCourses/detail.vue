<template>
  <!-- <template v-slot:BreadcrumbRight>
      ccc
    </template> -->
  <div class="p-16px border-box">
    <div>
      <Row :gutter="10">
        <Col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="spanNum"
          :xl="spanNum"
          :xxl="spanNum"
          class="mb-10px border-box"
        >
          <Card class="boxShadow" :bordered="false">
            <h1 class="font-bold text-30px mb-15px">{{ previewData.name }}</h1>
            <div v-for="(sort, index) in sortDate" class="mt-1" :key="index">
              <h3 class="font-bold-500 text-20px">{{ sort.lable }}</h3>
              <List
                :grid="{ gutter: 16, xs: 1, sm: 3, md: 5, lg: 5, xl: 5, xxl: 6, xxxl: 6 }"
                :data-source="sort.data"
              >
                <template #renderItem="{ item }">
                  <ListItem>
                    <!-- <Card :title="item.name">{{item.sourceMaterialUrl}}</Card> -->
                    <div class="tool">
                      <div
                        class="
                          tool_top
                          relative
                          flex
                          justify-center
                          items-center
                          text-1xl
                          p-2
                          border-box
                          pb-0
                        "
                      >
                        <span class="text-hex-7f7f7f">{{ item.name }}</span>
                      </div>
                      <div class="tool_bottom p-1 border-box">
                        <div class="w-full tool_bottom_img flex justify-center items-center">
                          <img :src="item.sourceMaterialUrl" class="tool_bottom_img_list" />
                        </div>
                      </div>
                    </div>
                  </ListItem>
                </template>
              </List>
            </div>
            <h3 class="font-bold-500 text-20px">步骤</h3>
            <div>
              <MarkdownViewer :value="previewData.stepContent" />
            </div>
          </Card>
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="24 - spanNum"
          :xl="24 - spanNum"
          :xxl="24 - spanNum"
          class="border-box"
        >
          <!-- <div class=""></div> -->
          <Card class="boxShadow !mb-10px" :bordered="false" title="课程说明 ">
            <template #cover>
              <img :src="previewData.sourceMaterialCoverUrl" />
            </template>
            <Descriptions title="" :column="1">
              <DescriptionsItem>
                <template #label>
                  <div class="flex justify-center items-center">
                    <Icon
                      icon="mdi:google-classroom"
                      class="mr-10px"
                      :size="20"
                      :color="projectSetting.themeColor"
                    />
                    <span>适合年级</span>
                  </div>
                </template>
                {{ changeData(previewData.grade, gradeData) }}
              </DescriptionsItem>
              <DescriptionsItem>
                <template #label>
                  <div class="flex justify-center items-center">
                    <Icon
                      icon="mdi:clock-time-three"
                      class="mr-10px"
                      :size="20"
                      :color="projectSetting.themeColor"
                    />
                    <span>活动时常</span>
                  </div>
                </template>
                {{ previewData.classHour }}
              </DescriptionsItem>
              <DescriptionsItem>
                <template #label>
                  <div class="flex justify-center items-center">
                    <Icon
                      icon="mdi:shape"
                      class="mr-10px"
                      :size="20"
                      :color="projectSetting.themeColor"
                    />
                    <span>活动形式</span>
                  </div>
                </template>
                {{ changeData(previewData.activityForm, activityFormData) }}
              </DescriptionsItem>
              <DescriptionsItem>
                <template #label>
                  <div class="flex justify-center items-center">
                    <Icon
                      icon="mdi:sign-direction"
                      class="mr-10px"
                      :size="20"
                      :color="projectSetting.themeColor"
                    />
                    <span>课程目标</span>
                  </div>
                </template>
                <TypographyParagraph
                  :content="previewData.courseObjectives"
                  :ellipsis="{ rows: 2, expandable: true, symbol: 'more' }"
                />
              </DescriptionsItem>
            </Descriptions>
          </Card>

          <List
            :grid="{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1, xxxl: 1 }"
            :data-source="previewData.safetyGuides"
          >
            <template #renderItem="{ item }">
              <ListItem>
                <Card class="boxShadow !mb-10px" :bordered="false">
                  <CardMeta description="">
                    <template #avatar>
                      <Icon
                        icon="mdi:security"
                        class="mr-10px"
                        :size="20"
                        :color="projectSetting.themeColor"
                      />
                    </template>
                    <template #title>
                      <span :title="item.title">{{ item.title }}</span>
                    </template>
                  </CardMeta>
                  <Divider />
                  <div class="safetyGuideContent">
                    <MarkdownViewer :value="item.content"></MarkdownViewer>
                  </div>
                </Card>
              </ListItem>
            </template>
          </List>

          <Card class="boxShadow mb-10px" title="热爱劳动教育视频" :bordered="false">
            <div class="w-full">
              <video controls v-if="previewData.sourceMaterialVideoUrl">
                <source :src="previewData.sourceMaterialVideoUrl" alt="热爱劳动教育视频" />
              </video>
              <el-empty description="暂无数据" v-else></el-empty>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {
    Row,
    Col,
    Card,
    List,
    ListItem,
    Descriptions,
    DescriptionsItem,
    TypographyParagraph,
    CardMeta,
    Divider,
  } from 'ant-design-vue';
  import { ref, computed, unref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { laborCourseDetail as getDetail } from '/@/api/dynamic/basciData';
  import { getDictType } from '/@/api/common/index';
  import { MarkdownViewer } from '/@/components/Markdown';
  import { Icon } from '/@/components/Icon';
  import projectSetting from '/@/settings/projectSetting';
  import { changeData } from '/@/utils';

  const route = useRoute();
  const props = defineProps({
    laborCourseId: { type: String },
    spanNum: {
      type: Number,
      default: 19,
    },
  });
  const ID = computed(() => props.laborCourseId || route.params.id || '');
  const previewData = ref({});

  watch(
    () => ID.value,
    async () => {
      try {
        let id = ID.value;
        if (!id) {
          previewData.value = {};
          return false;
        }
        const { obj } =await getDetail({ id })
        previewData.value = obj || {};
      } catch (error) {
        console.log('error=>', error);
      }

      // getDetail({ id }).then(({ obj }) => {
      //   previewData.value = obj || {};
      // });
    },
    {
      immediate: true,
    },
  );

  let gradeData = ref([]);
  let activityFormData = ref([]);
  getDictType({ type: 'grade' }).then(({ obj }) => {
    gradeData.value = obj;
  });
  getDictType({ type: 'activity_form' }).then(({ obj }) => {
    activityFormData.value = obj;
  });

  const typeData = ref([]);
  getDictType({ type: 'tool_material_type' }).then(({ obj }) => {
    typeData.value = obj;
  });

  const sortDate = computed(() => {
    const types = typeData.value || [];
    const selects = previewData.value.toolMaterialVOS || [];
    const news = types.map((item) => {
      const data1 = selects.filter((o) => {
        return o.type === item.value;
      });
      const data2 = {
        lable: item.label,
        data: data1 || [],
      };
      return data2;
    });
    return news;
  });
</script>

<style lang="less" scoped>
  .safetyGuideContent {
    max-height: 400px;
    overflow-y: auto;
  }
  ::v-deep(.ant-card-meta-avata) {
    padding-right: 0 !important;
  }
  .ant-card-meta {
    display: flex;
    align-items: center;
  }
  .boxShadow {
    border-radius: 4px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.35);
    background-color: #ffffff;
    // padding: 15px;
  }
  .tool {
    padding: 2px 2px 2px 2px;
    border-radius: 3px;
    background-color: #f2f2f2;
    box-sizing: border-box;
    box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.35);
    .tool_bottom {
      .tool_bottom_img {
        aspect-ratio: 1/1;
        .tool_bottom_img_list {
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
</style>
<template>
  <div  class="border-box">
    <Row :gutter="[8, { xs: 8, sm: 8, md: 8, lg: 8 }]">
      <Col :xs="24" :sm="24" :md="5" :lg="5" :xl="5" class="!pr-0 border-box">
        <div>
          <div class="flex">
            <div class="flex-1 border-box">
              <div>
                <List
                  class="laborCourseList"
                  item-layout="horizontal"
                  :data-source="laborCourseClazzData"
                >
                  <template #renderItem="{ item, index }">
                    <ListItem>
                      <div
                        :key="item.id"
                        class="w-full flex items-center"
                        @click="selectLaborCourseId(item)"
                      >
                        <span class="flex-1 p-2px border-box flex">
                          <span class="laborCourseShadow flex-1 flex border-box items-center">
                            <img
                              style="height: 36px; aspect-ratio: 1/1"
                              :src="item.sourceMaterialCoverUrl"
                              alt=""
                            />
                            <span class="ml-10px flex">{{ index + 1 }}.{{ item.name }}</span>
                          </span>
                        </span>
                        <span
                          class="laborCourseIcon"
                          :class="{ laborCourseIconActive: laborCourseId == item.id }"
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
      <Col :xs="24" :sm="24" :md="19" :lg="19" :xl="19" class="!pl-0 border-box">
        <div class="flex border-box">
          <div class="h-auto">
            <Divider
              type="vertical"
              class="!h-full w-3px"
              :style="{ 'background-color': projectSetting.themeColor }"
            />
           
          </div>
           <div class="flex-1 border-box">
              <!-- <Course ></Course> -->
              <Course :laborCourseId="laborCourseId" :key="laborCourseId"></Course>
            </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, watch, unref,inject  } from 'vue';
  import { Row, Col, Divider, List, ListItem, Select, SelectOption } from 'ant-design-vue';
  import projectSetting from '/@/settings/projectSetting';
  import { Button } from '/@/components/Button';
  import { Icon } from '/@/components/Icon';
  import { laborCourseClazz, laborCourseGrade } from '/@/api/dynamic/basciData';
  import { laborHomeworkDetail } from '/@/api/dynamic/industriallabor';
  import { useModal } from '/@/components/Modal';
  import Course from './Course.vue';
  const [registerModal, { openModal }] = useModal();

  const clazzmemberData= inject('clazzmemberData')
  const userInfo= inject('userInfo')

  // const props = defineProps({
  //   clazzmemberData: { type: Object },
  //   userInfo: { type: Object },
  // });
  const clazzId = computed(() => {
    return unref(userInfo)?.clazzIds?.[0];
  });

  const laborCourseClazzData = ref([]);
  const laborCourseId = ref(null);
  watch(
    () => clazzId.value,
    async () => {
      if (!clazzId.value) {
        laborCourseClazzData.value = [];
        laborCourseId.value = '';
        return false;
      }
      const { success, obj } = await laborCourseClazz({ clazzId: unref(clazzId) });
      laborCourseClazzData.value = success && (obj || []);
      laborCourseId.value = unref(laborCourseClazzData).length > 0 && obj[0].id;
    },
    {
      immediate: true,
    },
  );

  function selectLaborCourseId(item){
    laborCourseId.value=item.id
  }
  // provide('laborCourseId', laborCourseId)

</script>

<style lang="less" scoped>
  .laborCourseIcon {
    transform: rotate(-30deg);
    visibility: hidden;
  }
  .laborCourseIconActive {
    visibility: visible;
  }
  .gradeSelect {
    ::v-deep(.ant-select-selector) {
      background-color: transparent !important;
    }
  }
  .laborCourseShadow {
    box-shadow: 0px 0px 2px 0px #867d7d;
  }
  .laborCourseList {
    ::v-deep(.ant-list-item) {
      padding-top: 0px;
    }
  }
</style>
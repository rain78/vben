<template>
  <div>
    <Row :gutter="[8, { xs: 8, sm: 8, md: 8, lg: 8 }]">
      <Col :xs="24" :sm="24" :md="5" :lg="5" :xl="5" class="!pr-0">
        <div>
          <div class="flex">
            <div class="flex-1 border-box">
              <div class="flex">
                <div class="flex-1">
                  <Select
                    class="gradeSelect"
                    ref="select"
                    v-model:value="gradeId"
                    style="width: 100%"
                  >
                    <SelectOption :value="item.value" v-for="item in gradeData" :key="item.value">{{
                      item.label
                    }}</SelectOption>
                  </Select>
                </div>

                <span class="laborCourseIcon" style="visibility: hidden">
                  <Icon icon="mdi:triangle" :color="projectSetting.themeColor" />
                </span>
              </div>
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
                        @click="selectLaborCourse(item)"
                      >
                        <span class="flex-1 p-2px border-box flex">
                          <span class="laborCourseShadow flex-1 flex border-box items-center">
                            <img
                              style="height: 36px; aspect-ratio: 1/1"
                              :src="item.sourceMaterialCoverUrl"
                              alt=""
                            />
                            <span class="pt-7px pb-7px ml-10px"
                              >{{ index + 1 }}.{{ item.name }}</span
                            >
                          </span>
                        </span>
                        <span
                          class="laborCourseIcon"
                          :class="{ laborCourseIconActive: laborCourseId === item.id }"
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
          <div class="h-auto" >
            <Divider
              type="vertical"
              class="!h-full w-3px"
              :style="{ 'background-color': projectSetting.themeColor }"
            />
          </div>
          <div class="flex-1 border-box" v-if="!maskDetailShow">
            <Button type="primary" preIcon="mdi-plus" @click="addTask" :disabled="gradeId !== gradeDefaultId">任务</Button>
            <List
              item-layout="horizontal"
              :data-source="laborRemaskData"
              :loading="laborRemaskLoading"
              class="taskList"
            >
              <template #renderItem="{ item, index }">
                <ListItem >
                  <LaborRemask :item="item" :index="index" @maskDetail="maskDetail"></LaborRemask>
                </ListItem>
              </template>
            </List>
          </div>
          <div class="flex-1 border-box" v-else>
            <MaskDetail :gradeId="gradeId" :gradeDefaultId="gradeDefaultId" :maskdetailData="maskdetailData"  @maskDetailBack="maskDetailBack">

            </MaskDetail>
          </div>

        </div>
      </Col>
    </Row>
    <AddTask
      @register="registerModal"
      :clazzId="clazzId"
      :laborCourseId="laborCourseId"
      :studentData="studentData"
      @success="handleSuccess"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineProps, computed, watch, unref } from 'vue';
  import { useRoute } from 'vue-router';
  import { Row, Col, Divider, List, ListItem ,Select,SelectOption} from 'ant-design-vue';
  import projectSetting from '/@/settings/projectSetting';
  import { getDictType } from '/@/api/common/index';
  import { gradeData } from './data';
  import { formartClazz } from '/@/api/common/index';
  import { Button } from '/@/components/Button';
  import { Icon } from '/@/components/Icon';
  import { laborCourseClazz,laborCourseGrade } from '/@/api/dynamic/basciData';
  import { laborHomeworkDetail } from '/@/api/dynamic/industriallabor';
  import LaborRemask from './LaborRemask.vue';
  import AddTask from './AddTask.vue';
  import MaskDetail from './MaskDetail.vue';
  import { useModal } from '/@/components/Modal';
  const [registerModal, { openModal }] = useModal();

  const route = useRoute();
  const clazzId = ref(route.params.id || '');
  const props = defineProps({
    clazzmemberData: { type: Object },
  });
  const gradeDefaultId = computed(() => {
    const {
      clazzmemberData: { startYear },
    } = props;
    let gradeName = formartClazz(startYear);
    let gradefilter = gradeData.filter((item) => item.label == gradeName);
    const res = (gradeId.value = gradefilter.length > 0 ? gradefilter[0].value : '');
    return res;
  });
  const studentData = computed(() => {
    const { students } = props.clazzmemberData;
    return students || [];
  });

  const gradeId = ref(null);
  const laborCourseClazzData = ref([]);
  const laborCourseId = ref(null);
  const laborRemaskData = ref([]);
  const laborRemaskLoading = ref(false);

  const maskDetailShow=ref(false)
  watch(
    () => gradeId.value,
    async () => {
      maskDetailShow.value=false
      if (!gradeId.value) {
        laborCourseClazzData.value = [];
        laborCourseId.value = '';
        return false;
      }
      let res
      if(gradeId.value===gradeDefaultId.value){
        res = await laborCourseClazz({ clazzId: unref(clazzId) });
      }else{
        res = await laborCourseGrade({ grade: unref(gradeId) });
      }  
      const { success, obj }=res
      laborCourseClazzData.value = success && (obj || []);
      laborCourseId.value = unref(laborCourseClazzData).length > 0 && obj[0].id;
    },
    {
      immediate: true,
    },
  );

  const selectLaborCourse = (val) => {
    laborCourseId.value = val.id;
  };
  watch(
    () => laborCourseId.value,
    async () => {
      if (!laborCourseId.value) {
        laborRemaskData.value = [];
        return false;
      }
      getMaskList()
    },
    {
      immediate: true,
    },
  );

  async function getMaskList() {
    laborRemaskLoading.value = true;
    const { success, obj } = await laborHomeworkDetail({
      clazzId: unref(clazzId),
      laborCourseId: unref(laborCourseId),
    });
    laborRemaskData.value = success && (obj || []);
    laborRemaskLoading.value = false;
  }

  const addTask = () => {
    openModal(true, {
      isUpdate: false,
    });
  };
  const handleSuccess = () => {
    getMaskList()
  };

  const maskName=ref('')
  const maskdetailData=ref({})
  const maskDetail=(item)=>{
    maskDetailShow.value=true
    // console.log('maskDetail=>',item)
    // maskName.value=item.name
    maskdetailData.value=item
  }
  const maskDetailBack=()=>{
    maskDetailShow.value=false
  }
</script>

<style lang="less" scoped>
.taskList{
  ::v-deep(.ant-list-item){
    padding-bottom: 0;
  }
}

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
      padding-bottom: 0px;
    }
  }
</style>
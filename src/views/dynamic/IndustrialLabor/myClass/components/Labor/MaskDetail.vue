<template>
  <div>
    <Row :gutter="[8, { xs: 8, sm: 8, md: 8, lg: 8 }]">
      <Col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" class="!pr-0">
        <div class="flex items-center">
          <Icon
            class="cursor-pointer"
            icon="mdi:arrow-left"
            :size="24"
            :color="projectSetting.themeColor"
            @click="$emit('maskDetailBack')"
          />&nbsp;&nbsp;{{ maskdetailData.name }}
        </div>
        <div class="mt-15px">
          <div v-for="item in studentsData" :key="item.student.id" class="flex items-center">
            <div class="flex-1">
              <div class="flex p-10px">
                <span class="pr-10px">
                  <Checkbox
                    :checked="selectStu === item.student.id"
                    @change="changeStu(item.student.id)"
                  ></Checkbox>
                </span>
                <div>
                  <Avatar :src="item.user.avatar" v-if="item.user.avatar"></Avatar>
                  <Icon v-else icon="mdi:account-school" :color="projectSetting.themeColor" />

                  &nbsp;&nbsp;<span>{{ item.student.name }}</span>
                </div>
              </div>
              <Divider
                :key="'Divider' + item.student.id"
                class="!mt-0 !mb-0"
                style="height: 2px; background-color: var(--theme)"
                v-if="selectStu === item.student.id"
              />
              <Divider
                :key="'Divider' + item.student.id"
                class="!mt-0 !mb-0"
                style="height: 1px; background-color: rgba(0, 0, 0, 0.11)"
                v-else
              />
            </div>
            <span
              class="laborCourseIcon"
              :class="{ laborCourseIconActive: selectStu === item.student.id }"
            >
              <Icon icon="mdi:triangle" :color="projectSetting.themeColor" />
            </span>
          </div>
        </div>
      </Col>
      <Col :xs="24" :sm="24" :md="18" :lg="18" :xl="18" class="!pl-0">
        <HomeWork
          :gradeDefaultId="gradeDefaultId"
          :homeWorkData="homeWorkData"
          :gradeId="gradeId"
          @getLaborHomeworkStudentAnswer="getLaborHomeworkStudentAnswer"
        ></HomeWork>
      </Col>
    </Row>
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineProps, computed, watch, unref, defineEmits } from 'vue';
  import projectSetting from '/@/settings/projectSetting';
  import { Row, Col, Divider, List, ListItem, Checkbox, CheckboxGroup, Avatar } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { laborHomeworkStudents, laborHomeworkStudentAnswer } from '/@/api/dynamic/industriallabor';
  import HomeWork from './HomeWork.vue';
  import { func } from 'vue-types';

  const props = defineProps({
    gradeId: { type: String },
    gradeDefaultId: { type: String },
    maskdetailData: { type: Object },
  });
  const emit = defineEmits(['maskDetailBack']);
  const laborHomeworkId = computed(() => props.maskdetailData.id || '');

  const studentsData = ref([]);
  watch(
    () => laborHomeworkId.value,
    async () => {
      if (!laborHomeworkId.value) {
        studentsData.value = [];
        return false;
      }
      const { success, obj } = await laborHomeworkStudents({
        laborHomeworkId: unref(laborHomeworkId),
      });
      studentsData.value = success ? obj : [];
      selectStu.value = obj.length > 0 ? obj[0].student.id : '';
    },
    { immediate: true },
  );
  const selectStu = ref('');
  const changeStu = (stu) => {
    if (stu === unref(selectStu)) selectStu.value = '';
    else selectStu.value = stu;
  };
  const homeWorkData = ref({});
  watch(
    () => selectStu.value,
    async () => {
      if (!selectStu.value) {
        homeWorkData.value = {};
        return false;
      }
      getLaborHomeworkStudentAnswer(unref(laborHomeworkId),unref(selectStu))
    },
    { immediate: true },
  );
  async function getLaborHomeworkStudentAnswer(laborHomeworkId, studentId) {
    const { success, obj } = await laborHomeworkStudentAnswer({
      data: {
        laborHomeworkId,
      },
      studentId,
    });
    homeWorkData.value = success ? obj : {};
  }
</script>

<style lang="less" scoped>
  .laborCourseIcon {
    transform: rotate(-30deg);
    visibility: hidden;
  }
  .laborCourseIconActive {
    visibility: visible;
  }
</style>
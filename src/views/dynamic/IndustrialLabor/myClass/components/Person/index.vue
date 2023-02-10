<template>
  <div>
    <Row>
      <Col :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
        <div class="flex items-center mt-10px">
          <Icon
            icon="mdi:human-male-board"
            :size="28"
            :color="projectSetting.themeColor"
          />&nbsp;&nbsp;<span class="text-20px">教师</span>
        </div>
        <Divider class="!mt-10px !mb-15px bg-hex-bdbaba" />
        <div>
          <div
            class="flex items-center p-15px border-box"
            v-for="item in clazzmemberData.teachers"
            :key="item.teacher.id"
          >
            <Avatar :src="item.user.avatar" v-if="item.user.avatar"></Avatar>
            <Icon v-else icon="mdi:human-male-board" :color="projectSetting.themeColor" />

            &nbsp;&nbsp;<span>{{ item.teacher.name }}</span>
          </div>
        </div>

        <div class="flex items-center mt-20px">
          <Icon
            icon="mdi:account-school"
            :size="28"
            :color="projectSetting.themeColor"
          />&nbsp;&nbsp;<span class="text-20px">学生</span>
        </div>
        <Divider class="!mt-10px !mb-15px bg-hex-bdbaba" />
        <div>
          <div>
            <div class="flex p-10px items-center">
              <span class="pr-10px">
                <Checkbox
                  v-model:checked="selectStuAll"
                  :indeterminate="indeterminate"
                  @change="onCheckAllChange"
                ></Checkbox>
              </span>
              <div class="flex-1">
                <a-button class="mr-2" @click="send" :iconSize="16" type="primary">
                  发送通知
                </a-button>
              </div>
            </div>
            <Divider class="!mt-10px !mb-15px bg-hex-bdbaba" />
          </div>
          <CheckboxGroup style="width: 100%" v-model:value="selectGroup">
            <div v-for="item in clazzmemberData.students" :key="item.student.id">
              <div class="flex p-10px">
                <span class="pr-10px">
                  <Checkbox :value="item.student.id"></Checkbox>
                </span>
                <div class="flex-1">
                  <Avatar :src="item.user.avatar" v-if="item.user.avatar"></Avatar>
                  <Icon v-else icon="mdi:account-school" :color="projectSetting.themeColor" />

                  &nbsp;&nbsp;<span>{{ item.student.name }}</span>
                </div>
                <Icon icon="mdi:dots-vertical" />
              </div>
              <Divider class="!mt-10px !mb-15px bg-hex-bdbaba" />
            </div>
          </CheckboxGroup>
        </div>
      </Col>
    </Row>
    <Send  :clazzmemberData="clazzmemberData" @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script  lang="ts" setup>
  import { ref, unref, reactive, defineProps, watch, computed } from 'vue';
  import { Row, Col, Divider, Avatar, Checkbox, CheckboxGroup } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { Button } from '/@/components/Button';
  import projectSetting from '/@/settings/projectSetting';
  import Send from './Send.vue';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  const [registerModal, { openModal }] = useModal();
  const { createConfirm,createMessage } = useMessage();
  const props = defineProps({
    clazzmemberData: { type: Object },
  });
  const students = computed(() => {
    const { students } = props.clazzmemberData;
    return students || [];
  });

  const selectStuAll = ref(false);
  const selectGroup = ref([]);
  const indeterminate = ref(true);
  const onCheckAllChange = (e: any) => {
    selectGroup.value = e.target.checked ? students.value.map((o) => o.student.id) : [];
    indeterminate.value = false;
  };
  watch(
    () => selectGroup.value,
    (val) => {
      indeterminate.value = !!val.length && val.length < students.value.length;
      selectStuAll.value = val.length === students.value.length;
    },
  );

  function send() {
    const selectData = selectGroup.value;
    if (selectData.length <= 0) {
      createMessage.warn(`请至少选中一条数据操作`);
      return false;
    }
    
    openModal(true, {
      record: {
        studentIds: selectData,
        id: props.clazzmemberData.id,
        sourceMaterialIds:'',
        key:new Date().valueOf()
      },
      isUpdate: true,
    });
  }
  function handleSuccess() {
    selectGroup.value=[]
  }
</script>

<style>
</style>
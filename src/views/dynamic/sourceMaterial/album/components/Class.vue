<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="选择班级" @ok="handleSubmit">
    <CheckboxGroup v-model:value="value" style="width: 100%">
      <Row>
        <Col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="12"
          :xl="12"
          v-for="item in clazzData"
          :key="item.value"
        >
          <Checkbox :value="item.value">{{ item.label }}</Checkbox>
        </Col>
      </Row>
    </CheckboxGroup>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref, defineProps,defineEmits,watch } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { message, CheckboxGroup, Checkbox, Row, Col } from 'ant-design-vue';
  import { classSelect } from '/@/api/dynamic/agencyPersonnel';
  import { albumList as getList, albumDelete as deleteData } from '/@/api/dynamic/sourceMaterial';
  import { albumShare } from '/@/api/dynamic/sourceMaterial';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();

  const props = defineProps({
    id: { type: String},
    shareClazzIds: { type: String},
  });
  const emit = defineEmits(['success'])
  const value = ref([]);
  watch(
    ()=>props.shareClazzIds,
    (shareClazzIds)=>{
      console.log('watch=>',shareClazzIds)
      value.value=shareClazzIds?(shareClazzIds.split(',')):[]

    }
  )
  const clazzData = ref([]);

  classSelect().then(({ obj }) => {
    clazzData.value = obj;
  });

  const [registerModal, { closeModal }] = useModalInner(async (data) => {});
  async function handleSubmit() {
    
    const { success } = await albumShare({
      id: props.id,
      shareClazzIds:unref(value).join(','),
    });
    if (success) {
      createMessage.success('操作成功');
      emit('success')
      closeModal();
    } else {
      createMessage.error('操作失败');
    }
  }
</script>
<style lang="less" scoped>
  .fileList {
    display: flex;
    justify-content: space-between;
  }
</style>


<template>
  <div>
    <a-button
      @click="openSorce"
      type="primary"
      class="mr-2"
      preIcon="mdi:image-plus"
      :iconSize="16"
    >
      添加
    </a-button>
    <br />
    <div v-for="(item, index) in selectData" :key="index" class="w-40 mt-2">
      <Image :src="item.thumbUrl"  />
    </div>

    <SourceModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { ref, unref, defineProps, defineEmits, watch } from 'vue';
  import { Button } from '/@/components/Button';
  import SourceModal from '/@/components/BaseComponents/SourceModal/index.vue';
  import { useModal } from '/@/components/Modal';
  import { Image } from 'ant-design-vue';
  const props = defineProps({
    value: { type: String },
    thumbUrl: { type: String },
  });
  const emit = defineEmits(['change']);
  const [registerModal, { openModal }] = useModal();
  const selectData = ref([]);

  watch([ () => props.thumbUrl], () => {
    if (props.thumbUrl) {
      selectData.value = [
        {
          id: props.value,
          thumbUrl: props.thumbUrl,
        },
      ];
    } else {
      selectData.value = [];
    }
  });

  function openSorce() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleSuccess(data) {
    selectData.value = data.filter(Boolean);
    emit('change', unref(selectData)[0].id);
  }
</script>
<style lang="less" scoped>
</style>


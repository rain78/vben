<template>
  <div>
    <a-button
      @click="openSorce"
      type="primary"
      class="mr-2"
      :iconSize="16"
    >
      添加
    </a-button>
    <br />
    <div v-for="(item, index) in selectData" :key="index" class="w-100 mt-2">
      <video :src="item.url" controls></video>

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
    sourceMaterialVideoUrl: { type: String },
  });
  const emit = defineEmits(['change']);
  const [registerModal, { openModal }] = useModal();
  const selectData = ref([]);

  watch([ () => props.sourceMaterialVideoUrl], () => {
    if (props.sourceMaterialVideoUrl) {
      selectData.value = [
        {
          id: props.value,
          url: props.sourceMaterialVideoUrl,
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
    console.log('selectData=>',selectData)
    emit('change', unref(selectData)[0].id);
  }
</script>
<style lang="less" scoped>
</style>


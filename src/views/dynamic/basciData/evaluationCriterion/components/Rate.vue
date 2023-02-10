<template>
  <div>
    <Table :dataSource="dataSource" :columns="columns" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'weight'">
          <InputNumber v-model:value="record.weight" @change="changeVal"/>
        </template>
      </template>
    </Table>
  </div>
</template>
<script lang="ts" setup>
  import { ref, unref, defineProps, computed,defineEmits } from 'vue';
  import { Table, InputNumber } from 'ant-design-vue';
  
  const props = defineProps({
    value: { type: String },
  });
  const emit = defineEmits(['change']);
  const addValue = [
    {
      key: '1',
      level: '优秀',
      weight: 0,
    },
    {
      key: '2',
      level: '良好',
      weight: 0,
    },
    {
      key: '3',
      level: '一般',
      weight:0,
    },
    {
      key: '4',
      level: '无效',
      weight: 0,
    },
  ];
  const dataSource = computed(() => {
    let editValue=[]
    if (!props.value) editValue= addValue;
    else editValue=props.value
    return editValue;
  });

  function changeVal(){
    emit('change',dataSource.value)
  }

   const columns = ref([
    {
      title: '等级',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: '分数权重',
      dataIndex: 'weight',
      key: 'weight',
    },
  ]);
</script>
<style lang="less" scoped>
  .fileList {
    display: flex;
    justify-content: space-between;
  }
</style>


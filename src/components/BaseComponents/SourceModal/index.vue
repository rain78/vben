<template>
  <BasicModal
    width="800px"
    v-bind="$attrs"
    @register="registerModal"
    title="选择素材"
    @ok="handleSubmit"
    :minHeight="100"
  >
    <CardList
      :actionColOptions="{ xs: 24, sm: 24, md: 8, lg: 8, xl: 8 }"
      :searchFormSchema="searchFormSchema"
      :params="params"
      :api="getList"
      @get-method="getMethod"
      :card="card"
      :boxShadow="false"
      :key="key"
      :gridData="{
        gutter: 10,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 5,
        xl: 5,
        xxl: 6,
      }"
    >
    

    </CardList>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { CardList } from '/@/components/CardList';
  import {searchFormSchema} from './data'
  import {
    getSourceMaterialList as getList,
  } from '/@/api/dynamic/sourceMaterial';
  import card from './components/card.vue';
  export default defineComponent({
    name: 'SourceModal',
    components: { BasicModal, CardList },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const { createMessage } = useMessage();
      const { success, error } = createMessage;
      const key=ref(new Date().valueOf())
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        // reload&&reload()
        key.value=new Date().valueOf()
      
      });
      const params = {};

      

      let reload = () => {};
      let handleDel = () => {};
      let select = () => {};
      // 获取内部fetch方法;
      function getMethod(m: any, flag) {
        if(flag === 'select') select=m
      }

      async function handleSubmit() {
        const selectData=select()
        emit('success',selectData)
        closeModal();
      }

      return {
        registerModal,
        handleSubmit,
        params,
        getList,
        card,
        searchFormSchema,
        getMethod,
        key
      };
    },
  });
</script>

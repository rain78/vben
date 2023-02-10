<template>
  <!-- class="w-50%" -->
  <Card :bordered="false" :title="data.title" :hoverable="false">
    <template #extra>
      <Icon @click="$emit('delete',index)" icon="mdi:close-circle-outline" v-if="icon" color="red" class="cursor-pointer" title="移除"/>
    </template>
    <div class="markdownBox">
      <MarkdownViewer :value="data.content" />
    </div>
    <template #actions>
      
      <slot name="actionsOption1" :data="data"> </slot>
      <slot name="actionsOption2" :data="data"> </slot>
    </template>
  </Card>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
  import { Card, Space } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { Button } from '/@/components/Button';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { router } from '/@/router';
  import { parseTime } from '/@/utils/dateUtil';
  import projectSetting from '/@/settings/projectSetting';
  import { MarkdownViewer } from '/@/components/Markdown';

  import { albumEdit as updata } from '/@/api/dynamic/sourceMaterial';
  export default defineComponent({
    components: { Card, Icon, Button, MarkdownViewer },
    props: ['data', 'index','icon'],
    emits: ['select','delete'],
    setup(props, { emit }) {
      const { createMessage } = useMessage();
      const idSelect = ref(false);
      function goDetail() {
        const { data } = props;
        router.push('/sourceMaterial/album/detail/' + data.id);
      }

      function doSelect() {
        idSelect.value = !idSelect.value;
        const { data, index } = props;
        emit('select', data, index, idSelect.value);
      }

      let startVal = '';
      async function doEdit() {
        const { data } = props;
        if (startVal !== data.name)
          try {
            const { success } = await updata(
              {
                name: data.name,
                id: data.id,
              },
              'put',
            );
            if (success) createMessage.success('操作成功');
            else createMessage.error('操作失败');
          } catch (err) {
            console.log(err);
          }
      }
      function onStart() {
        const { data } = props;
        startVal = data.name;
      }
      return {
        goDetail,
        doSelect,
        idSelect,
        parseTime,
        doEdit,
        themeColor: ref(projectSetting.themeColor),
      };
    },
  });
</script>



<style lang="less" scoped>
.markdownBox{
  max-height: 400px;
  overflow-y:auto ;
  cursor: pointer;
}
</style>

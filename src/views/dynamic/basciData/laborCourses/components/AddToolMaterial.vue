<template>
  <div>
    <a-button @click="openSafeGuide" type="primary" class="mr-2" :iconSize="16"> 添加 </a-button>
    <br />
    <div v-for="sort in sortDate" class="mt-1">
      <template v-if="sort.data.length > 0">
        <h3 class="text-20px mb-2 mt-5">{{ sort.lable }}</h3>
        <Row :gutter="10">
          <Col
            class="mt-2"
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
            :xl="8"
            :xxl="6"
            v-for="item in sort.data"
            :key="item.id"
          >
            <div class="tool">
              <div
                class="
                  tool_top
                  relative
                  flex
                  justify-center
                  items-center
                  text-1xl
                  p-2
                  border-box
                  pb-0
                "
              >
                <span class="text-hex-7f7f7f">{{ item.name }}</span>
                <span class="absolute right-2">
                  <Icon
                    @click="remove(item.id)"
                    icon="mdi:close-circle-outline"
                    color="red"
                    class="cursor-pointer"
                    title="移除"
                  />
                </span>
              </div>
              <div class="tool_bottom p-1 border-box">
                <div class="w-full tool_bottom_img flex justify-center items-center">
                  <img :src="item.sourceMaterialUrl" class="tool_bottom_img_list" />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </template>
    </div>

    <BasicModal
      v-bind="$attrs"
      @register="registerModal"
      title="安全指南"
      @ok="handleSuccess"
      :minHeight="500"
      width="800px"
    >
      <BasicTable @register="registerTable" :boxShadow="false" :key="key"> </BasicTable>
    </BasicModal>
  </div>
</template>
<script lang="ts" setup>
  import { ref, unref, defineProps, defineEmits, watch, computed } from 'vue';
  import { Icon } from '/@/components/Icon';
  import { Button } from '/@/components/Button';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Row, Col, Card, Image } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { toolMaterialList as getList } from '/@/api/dynamic/basciData';
  import { MarkdownViewer } from '/@/components/Markdown';
  import { searchFormSchema, columns } from '/@/views/dynamic/basciData/toolMaterial/data';
  import { getDictType } from '/@/api/common/index';
  const typeData = ref([]);
  const key=ref(new Date().valueOf())
  getDictType({ type: 'tool_material_type' }).then(({ obj }) => {
    typeData.value = obj;
  });

  const colProps = {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 12 },
    lg: { span: 12 },
    xl: { span: 12 },
  };

  const emit = defineEmits(['change']);

  const props = defineProps({
    value: { type: String },
    toolMaterialVOS: { type: Array },
  });

  const selectData = ref([]);

  watch([() => props.toolMaterialVOS], () => {
    if (props.toolMaterialVOS) {
      selectData.value = props.toolMaterialVOS;
    }
  });

  const sortDate = computed(() => {
    const types = typeData.value || [];
    const selects = selectData.value || [];
    const news = types.map((item) => {
      const data1 = selects.filter((o) => {
        return o.type === item.value;
      });
      const data2 = {
        lable: item.label,
        data: data1 || [],
      };
      return data2;
    });
    return news;
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {});

  const [registerTable, { reload, getSelectRows }] = useTable({
    api: getList,
    columns: columns,
    formConfig: {
      rowProps: { gutter: 5 },
      schemas: searchFormSchema.map((o) => {
        return {
          ...o,
          colProps,
        };
      }),
    },
    useSearchForm: true,
    bordered: false,
    showIndexColumn: false,
    rowSelection: {
      type: 'checkbox',
    },
    fetchSetting: {
      pageField: 'current',
      sizeField: 'size',
      listField: 'records',
      totalField: 'total',
    },
    scroll: { x: 'max-content' },
  });

  function remove(id){
    const selects = selectData.value || [];
    const news=selects.filter(o=>o.id!==id)
    selectData.value=news
    emit('change', news.map((o) => o.id).join(','));
  }

  function openSafeGuide() {
    key.value=new Date().valueOf()
    setModalProps({ visible: true });
  }

  function handleSuccess() {
    const data = getSelectRows();
    selectData.value = data;
    // console.log('selectData=>', data);

    emit('change', data.map((o) => o.id).join(','));
    closeModal();
  }
</script>
<style lang="less" scoped>
  .tool {
    padding: 2px 2px 2px 2px;
    border-radius: 3px;
    background-color: #f2f2f2;
    box-sizing: border-box;
    box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.35);
    .tool_bottom {
      .tool_bottom_img {
        aspect-ratio: 1/1;
        .tool_bottom_img_list {
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
</style>


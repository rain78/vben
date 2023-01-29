<template>
  <div class="cardList">
    <!-- <div class="cardListBox"> -->
    <div :class="boxShadow?'cardListBox':''">
      <div class="p-2 bg-white">
        <div class="">
          <BasicForm @register="registerForm" />
        </div>
        <Divider class="cardListDivider"/>
        <div class="p-2">
          <List
            :grid="{ gutter: 5, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: grid }"
            :data-source="data"
            :pagination="paginationProp"
          >
            
            <template #renderItem="{ item }">
              <ListItem>
                <Card>
                  <template #title></template>
                  <template #cover>
                    <div :class="height">
                      <Image :src="item.imgs[0]" />
                    </div>
                  </template>
                  <template #actions>
                    <!--              <SettingOutlined key="setting" />-->
                    <EditOutlined key="edit" />
                    <Dropdown
                      :trigger="['hover']"
                      :dropMenuList="[
                        {
                          text: '删除',
                          event: '1',
                          popConfirm: {
                            title: '是否确认删除',
                            confirm: handleDelete.bind(null, item.id),
                          },
                        },
                      ]"
                      popconfirm
                    >
                      <EllipsisOutlined key="ellipsis" />
                    </Dropdown>
                  </template>

                  <CardMeta>
                    <template #title>
                      <TypographyText :content="item.name" :ellipsis="{ tooltip: item.address }" />
                    </template>
                    <template #avatar>
                      <Avatar :src="item.avatar" />
                    </template>
                    <template #description>{{ item.time }}</template>
                  </CardMeta>
                </Card>
              </ListItem>
            </template>
          </List>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue';
  import { EditOutlined, EllipsisOutlined, RedoOutlined, TableOutlined } from '@ant-design/icons-vue';
  import { List, Card, Image, Typography, Tooltip, Slider, Avatar ,Divider} from 'ant-design-vue';
  import { Dropdown } from '/@/components/Dropdown';
  import { BasicForm, useForm } from '/@/components/Form';
  import { propTypes } from '/@/utils/propTypes';
  import { Button } from '/@/components/Button';
  import { isFunction } from '/@/utils/is';
  import { useSlider, grid } from './data';
  const ListItem = List.Item;
  const CardMeta = Card.Meta;
  const TypographyText = Typography.Text;
  // 获取slider属性
  const sliderProp = computed(() => useSlider(4));
  // 组件接收参数
  const props = defineProps({
    // 请求API的参数
    params: propTypes.object.def({}),
    //api
    api: propTypes.func,
    boxShadow:{ type: Boolean, default: true }
  });
  //暴露内部方法
  const emit = defineEmits(['getMethod', 'delete']);
  //数据
  const data = ref([]);
  // 切换每行个数
  // cover图片自适应高度
  //修改pageSize并重新请求数据

  const height = computed(() => {
    return `h-${120 - grid.value * 6}`;
  });
  //表单
  const [registerForm, { validate }] = useForm({
    schemas: [{ field: 'type', component: 'Input', label: '类型',colProps:{ xs:24,sm:24,md:12,lg:6,xl:6 }}],
    
    autoSubmitOnEnter: true,
    submitFunc: handleSubmit,
    rowProps:{gutter:24},
  });
  //表单提交
  async function handleSubmit() {
    const data = await validate();
    await fetch(data);
  }
  function sliderChange(n) {
    pageSize.value = n * 4;
    fetch();
  }

  // 自动请求并暴露内部方法
  onMounted(() => {
    fetch();
    emit('getMethod', fetch);
  });

  async function fetch(p = {}) {
    const { api, params } = props;
    if (api && isFunction(api)) {
      const res = await api({ ...params, page: page.value, pageSize: pageSize.value, ...p });
      data.value = res.items;
      total.value = res.total;
    }
  }
  //分页相关
  const page = ref(1);
  const pageSize = ref(36);
  const total = ref(0);
  const paginationProp = ref({
    showSizeChanger: false,
    showQuickJumper: true,
    pageSize,
    current: page,
    total,
    showTotal: (total) => `总 ${total} 条`,
    onChange: pageChange,
    onShowSizeChange: pageSizeChange,
  });

  function pageChange(p, pz) {
    page.value = p;
    pageSize.value = pz;
    fetch();
  }
  function pageSizeChange(_current, size) {
    pageSize.value = size;
    fetch();
  }

  async function handleDelete(id) {
    emit('delete', id);
  }
</script>
<style >
.cardListDivider{
  margin: 0px 0px 16px 0px;
}
</style>
<style lang="less">
.cardList{
  padding: 16px;
  box-sizing: border-box;
  .cardListBox{
    //  background-color: #fff;
  // background-color: @app-content-background;
  box-shadow:0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%), 0 1px 5px 0 rgb(0 0 0 / 20%);

  }
}
</style>
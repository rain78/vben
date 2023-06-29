<template>
  <div class="cardList">
    <div>
      <!-- <div :class="boxShadow ? 'cardListBox' : ''"> -->
      <div class="p-2">
        <div class="">
          <BasicForm @register="registerForm" v-bind="getFormProps" v-show="BasicFormShow">
            <template #formBtn="data">
              <slot name="formBtn" v-bind="data || {}"></slot>
            </template>
          </BasicForm>
        </div>
        <Divider class="cardListDivider" v-if="BasicFormShow" />
        <div class="p-2">
          <List :grid="gridData" :data-source="data" :pagination="paginationProp">
            <template #renderItem="{ item, index }">
              <ListItem>
                <component
                  :is="card"
                  :data="item"
                  :index="index"
                  @select="handleSelect"
                  :key="item.id || index"
                >
                  <template #[item]="data" v-for="item in Object.keys($slots)">
                    <slot :name="item" v-bind="data || {}"></slot>
                  </template>
                </component>
              </ListItem>
            </template>
          </List>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed, onMounted, ref, reactive } from 'vue';
  import { EditOutlined, EllipsisOutlined, RedoOutlined, TableOutlined } from '@ant-design/icons-vue';
  import { List, Card, Image, Typography, Tooltip, Slider, Avatar, Divider } from 'ant-design-vue';
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
    card: propTypes.object.def({}),
    //api
    api: propTypes.func,
    boxShadow: { type: Boolean, default: true },
    searchFormSchema: propTypes.object.def([]),
    paginationProp:{ type: Boolean, default: true },
    actionColOptions: propTypes.object.def({}),
    BasicFormShow: { type: Boolean, default: true },
    showSubmitButton: { type: Boolean, default: true },
    fetchSetting: {
      type: Object,
      default: {
        pageField: 'current',
        // The number field name of each page displayed in the background
        sizeField: 'size',
        // Field name of the form data returned by the interface
        listField: 'records',
        // Total number of tables returned by the interface field name
        totalField: 'total',
      },
    },
    gridData: {
      type: Object,
      default: {
        gutter: 10,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 6,
        xl: 6,
        xxl: 6,
      },
    },
  });
  //暴露内部方法
  const emit = defineEmits(['getMethod', 'delete']);
  //数据
  const data = ref([]);
  const selectData = [];
  // const selectData=reactive([])
  // 切换每行个数
  // cover图片自适应高度
  //修改pageSize并重新请求数据

  const height = computed(() => {
    return `h-${120 - grid.value * 6}`;
  });

  const [registerForm, { validate, setProps }] = useForm();
  const getFormProps = computed((): Partial<FormProps> => {
    return {
      schemas: props.searchFormSchema,
      rowProps: { gutter: 24 },
      submitFunc: handleSubmit,
      showSubmitButton: props.showSubmitButton,
      // actionColOpt:{span:18},
      actionColOptions: props.actionColOptions,
      autoSubmitOnEnter: true,
    };
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
  onMounted(() => {
    fetch();
    emit('getMethod', fetch, 'reload');
    emit('getMethod', handleDel, 'delete');
    emit('getMethod', getSelect, 'select');
    emit('getMethod', getSelectLast, 'getSelectLast');
  });

  function GetProperty(obj, str) {
    str = str.replace(/\[(\w+)\]/g, '.$1'); // 处理数组下标
    let arr = str.split('.');
    for (let i in arr) {
      obj = obj[arr[i]] || '';
    }
    return obj;
  }

  async function fetch(p = {}) {
    const { api, params, fetchSetting } = props;
    setProps({
      submitButtonOptions: {
        disabled: true,
        loading: true,
      },
    });
    if (api && isFunction(api)) {
      const { obj } = await api({
        [fetchSetting.pageField]: page.value,
        [fetchSetting.sizeField]: pageSize.value,
        ...params,
        ...p,
      });
      data.value = fetchSetting.listField?GetProperty(obj, fetchSetting.listField):obj;
      total.value = fetchSetting.totalField?GetProperty(obj, fetchSetting.totalField):0;
      setProps({
        submitButtonOptions: {
          disabled: false,
          loading: false,
        },
      });
    }
  }
  const selectLast=null
  function handleSelect(data, index, flag) {
    if (flag) {
      selectData[index] = data;
      selectLast.value=data
    } else {
      selectData[index] = null;
      selectLast.value=null
    }
  }

   function getSelectLast() {
    return selectLast;
  }

  function getSelect() {
    return selectData;
  }

  function handleDel() {
    return selectData;
  }
  //分页相关
  const page = ref(1);
  const pageSize = ref(props.params.size || 30);
  const total = ref(0);
  const paginationProp = ref(props.paginationProp&&{
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

  // async function handleDelete(id) {
  //   emit('delete', id);
  // }
</script>
<style >
  .cardListDivider {
    margin: 0px 0px 10px 0px;
  }
  .cardListItem .ant-card-body {
    padding: 0 !important;
  }
</style>

<style lang="less" scoped>
  .cardListItem {
    .cardBox {
      position: relative;
      .cardImg {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        aspect-ratio: 1/1;
        .cardImglist {
          max-width: 100%;
          max-height: 100%;
        }
      }

      .cardText {
        padding: 10px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .cardList {
    padding: 16px;
    box-sizing: border-box;
    .cardListBox {
      box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%),
        0 1px 5px 0 rgb(0 0 0 / 20%);
    }
  }
</style>
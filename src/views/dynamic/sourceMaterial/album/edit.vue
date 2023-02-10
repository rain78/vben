<template>
  <div class="p-5">
    <Row :gutter="10">
      <Col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <Form :model="formState" ref="formRef" autocomplete="off">
          <FormItem
            name="albumName"
            :rules="[{ required: true, message: '请输入专辑名称', trigger: 'blur' }]"
          >
            <a-input
              v-model:value="formState.albumName"
              required
              :bordered="false"
              placeholder="请输入专辑名称"
            />
          </FormItem>
        </Form>
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="text-right">
        <a-button
          color="success"
          @click="
            openModal(true, {
              isUpdate: false,
            })
          "
          class="mr-2"
          preIcon="mdi:select-group"
          :iconSize="16"
        >
          选择素材
        </a-button>
        <a-button
          color="warning"
          class="mr-2"
          preIcon="mdi:image-plus"
          :iconSize="16"
          @click="upload"
        >
          上传素材
        </a-button>
        <a-button
          type="danger"
          class="mr-2"
          preIcon="mdi:delete"
          :iconSize="16"
          @click="doDel"
          v-if="id"
        >
          移除
        </a-button>

        <a-button
          type="primary"
          class="mr-2"
          preIcon="mdi:content-save"
          :iconSize="16"
          @click="save"
        >
          保存
        </a-button>

        <Popover title="" trigger="click" v-model:visible="visible" v-if="id">
          <template #content>
            <p @click="deleteAlbum">删除专辑</p>
            <p @click="doShare">分享专辑</p>
          </template>
          <Icon icon="mdi:dots-vertical" class="font-bold text-4xl" />
        </Popover>
      </Col>
    </Row>
    <Divider class="!m-0" />
    <div>
      <!-- <div class="p-2"> -->
      <List
        v-if="!id"
        :grid="{
          gutter: 10,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 6,
          xl: 6,
          xxl: 6,
        }"
        :data-source="sourceData"
        :pagination="false"
      >
        <template #renderItem="{ item, index }">
          <ListItem>
            <component :is="card" :data="item" :index="index" @select="handleSelect"></component>
          </ListItem>
        </template>
      </List>
      <CardList
        v-else
        :actionColOptions="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }"
        :searchFormSchema="[]"
        :params="params"
        :BasicFormShow="false"
        :api="detail"
        @get-method="getMethod"
        :card="card"
        :boxShadow="false"
        :gridData="{
          gutter: 10,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 5,
          xl: 5,
          xxl: 6,
        }"
        :fetchSetting="{
          pageField: 'current',
          sizeField: 'size',
          listField: 'sourceMaterialPage.records',
          totalField: 'sourceMaterialPage.total',
        }"
      >
      </CardList>
    </div>

    <SourceModal @register="registerModal" @success="handleSuccess" />
    <CommonUpload @register="registerModal1" @success="handleSuccess1"></CommonUpload>
    <Class @register="registerModal2" :id="id" @success="handleSuccess2" :shareClazzIds="shareClazzIds"></Class>
  </div>
</template>
<script lang="ts" setup>
  import { ref, unref, reactive, watch } from 'vue';
  import { Icon } from '/@/components/Icon';

  import {
    Row,
    Col,
    Image,
    Card,
    Divider,
    List,
    ListItem,
    Form,
    FormItem,
    Popover,
  } from 'ant-design-vue';
  import { Button } from '/@/components/Button';
  import SourceModal from '/@/components/BaseComponents/SourceModal/index.vue';
  import { useModal } from '/@/components/Modal';
  import card from './components/editCard.vue';
  import Class from './components/Class.vue';
  import { CommonUpload } from '/@/components/Upload';
  import { cloneDeep } from 'lodash-es';
  import {
    albumEdit as updata,
    albumDetail as detail,
    albumSourceDelete,
    albumDelete as deleteData,
  } from '/@/api/dynamic/sourceMaterial';
  import { router } from '/@/router';
  import { useRoute } from 'vue-router';
  import { CardList } from '/@/components/CardList';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createConfirm, createMessage } = useMessage();

  const route = useRoute();
  const id = ref(route.params.id || null);
  const shareClazzIds=ref('')
  const params = reactive({
    album: '',
  });
  const sourceData = ref([]);
  const formState = reactive({
    albumName: '',
  });
  const formRef = ref();
  let detailData = null;
  const visible = ref(false);
  watch(
    id,
    (newValue, oldValue) => {
      if (!newValue) return;
      params.album = newValue;
      getDetail()
    },
    { immediate: true },
  );
  function getDetail() {
    detail({ ...params, size: 1, current: 1 }).then(({ success, obj }) => {
      if (success) {
        detailData = obj;
        // console.log('obj=>',obj)
        shareClazzIds.value=obj.shareClazzIds
        formState.albumName = obj?.name;
      }
    });
  }

  function handleSuccess2(){
    getDetail()
  }

  function doShare() {
    visible.value = false;
    openModal2();
  }

  function deleteAlbum() {
    visible.value = false;
    createConfirm({
      iconType: 'warning',
      title: '温馨提示',
      content: '确定此操作吗',
      onOk: async () => {
        try {
          const { success } = await deleteData({ ids: unref(id) });
          if (success) router.go(-1);
        } catch (error) {
          console.log(error);
        }
      },
    });
  }

  let reload = () => {};
  let select = () => {};
  // 获取内部fetch方法;
  function getMethod(m: any, flag) {
    if (flag === 'reload') reload = m;
    else if (flag === 'select') select = m;
  }

  const [registerModal, { openModal }] = useModal();
  const [registerModal1, { openModal: openModal1, closeModal: closeModal1 }] = useModal();
  const [registerModal2, { openModal: openModal2, closeModal: closeModal2 }] = useModal();

  async function save() {
    try {
      const values = await formRef.value.validateFields();
      let subData = new FormData();
      subData.append('name', values.albumName);
      sourceData.value.forEach((item) => {
        item.id
          ? subData.append('sourceMaterialIds', item.id)
          : subData.append('files', item.originFileObj);
      });
      if (unref(id)) {
        subData.append('id', unref(id));
      }
      console.log('subData=>', subData);
      const {
        data: { success },
      } = await updata(subData, unref(id) ? 'put' : 'post');

      if (success && !unref(id)) return router.go(-1);
      if (success && unref(id)) return reload();
      else throw new Error('添加失败');
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }

  async function doDel() {
    try {
      const selectData = select();
      if (selectData.length <= 0) return createMessage.warning('请至少选择一条数据操作');
      createConfirm({
        iconType: 'warning',
        title: '温馨提示',
        content: '确定此操作吗',
        onOk: async () => {
          const { success } = await albumSourceDelete({
            album: unref(id),
            sourceMaterial: selectData.map((o) => o.id).join(','),
          });
          if (success) {
            createMessage.success('操作成功');
            reload();
          } else {
            createMessage.error('操作失败');
          }
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleSuccess1(fileList) {
    const uploadData = cloneDeep(fileList);
    uploadData.forEach((item) => {
      item.url = URL.createObjectURL(item.originFileObj);
    });
    sourceData.value = [...unref(sourceData), ...uploadData];
    closeModal1();
    if (unref(id)) {
      save();
    }
  }

  function handleSuccess(data) {
    sourceData.value = [...unref(sourceData), ...data.filter(Boolean)];
    if (unref(id)) {
      save();
    }
  }

  function upload() {
    openModal1(true, {
      isUpdate: false,
    });
  }
</script>
<style lang="less" scoped>
  // .p-5{
  //   box-sizing: border-box;
  // }
</style>

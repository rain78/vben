<template>
  <div class="p-16px border-box">
    <div class="boxShadow">
      <CollapseContainer title="基本设置" :canExpan="false" :isShow="false">
        <div class="p-16px border-box">
          <a-row :gutter="24" >
            <a-col :xs="24" :sm="24" :md="12" :lg="14" :xl="14">
              <BasicForm @register="register" />
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="10" :xl="10">
              <div class="change-avatar">
                <div class="mb-2">头像</div>
                <CropperAvatar
                  :uploadApi="uploadApi"
                  :value="avatar"
                  btnText="更换头像"
                  :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
                  @change="updateAvatar"
                  width="150"
                />
              </div>
            </a-col>
          </a-row>
          <Button type="primary" @click="handleSubmit"> 更新基本信息 </Button>
        </div>
      </CollapseContainer>
    </div>
  </div>
</template>

<script lang="ts">
  import { Button, Row, Col } from 'ant-design-vue';
  import { computed, defineComponent, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { CropperAvatar } from '/@/components/Cropper';

  import { useMessage } from '/@/hooks/web/useMessage';

  import headerImg from '/@/assets/images/header.jpg';
  import { accountInfoApi } from '/@/api/demo/account';
  import { baseSetschemas } from './data';
  import { useUserStore } from '/@/store/modules/user';
  import { uploadApi } from '/@/api/sys/upload';

  

  export default defineComponent({
    components: {
      BasicForm,
      CollapseContainer,
      Button,
      ARow: Row,
      ACol: Col,
      CropperAvatar,
    },
    setup() {
      const { createMessage } = useMessage();
      const userStore = useUserStore();

      const [register, { setFieldsValue }] = useForm({
        labelWidth: 120,
        schemas: baseSetschemas,
        showActionButtonGroup: false,
      });

      onMounted(async () => {
        const data = await accountInfoApi();
        setFieldsValue(data);
      });

      const avatar = computed(() => {
        const { avatar } = userStore.getUserInfo;
        return avatar || headerImg;
      });

      function updateAvatar({ src, data }) {
        const userinfo = userStore.getUserInfo;
        userinfo.avatar = src;
        userStore.setUserInfo(userinfo);
        console.log('data', data);
      }

      return {
        avatar,
        register,
        uploadApi: uploadApi as any,
        updateAvatar,
        handleSubmit: () => {
          createMessage.success('更新成功！');
        },
      };
    },
  });
</script>

<style lang="less" scoped>
  .boxShadow {
    background-color: #fff;
    box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%),
      0 1px 5px 0 rgb(0 0 0 / 20%);
  }
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
</style>
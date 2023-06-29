<template>
  <!-- <LoginFormTitle v-show="getShow" class="enter-x" /> -->
  <div class="loginForm">
    <Card :bordered="false" style="box-shadow: 0 0 10pxrgba (0, 0, 0, 0.2)">
      <div class="titleBox flex justify-center p-4">
        <img :alt="title" src="../../../assets/images/logo.png" class="logo" />
      </div>
      <div class="titleBox flex justify-center p-4">
        <img :alt="title" src="../../../assets/images/title.png" class="title" />
      </div>

      <Form
        class="p-4 enter-x"
        :model="formData"
        :rules="getFormRules"
        ref="formRef"
        v-show="getShow"
        @keypress.enter="onSubmit"
      >
        <FormItem name="account" class="enter-x">
          <Input
            size="large"
            v-model:value="formData.account"
            :placeholder="t('sys.login.userName')"
          >
            <template #prefix>
              <Icon icon="mdi:account" />
            </template>
          </Input>
        </FormItem>

        <FormItem name="password" class="enter-x">
          <InputPassword
            size="large"
            visibilityToggle
            v-model:value="formData.password"
            :placeholder="t('sys.login.password')"
          >
            <template #prefix>
              <Icon icon="mdi:lock" />
            </template>
          </InputPassword>
        </FormItem>

        <FormItem class="enter-x">
          <Button type="primary" size="large" block @click="onSubmit" :loading="loading">
            {{ t('sys.login.loginButton') }}
          </Button>
        </FormItem>

        <Divider class="enter-x">{{ t('sys.login.otherSignIn') }}</Divider>

        <div class="flex justify-evenly enter-x" :class="`${prefixCls}-sign-in-way`" @click="goWxLogin">
          <WechatFilled />
        </div>
      </Form>
    </Card>

    
  </div>
  
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';
 
  import { Checkbox, Form, Input, Row, Col, Button, Divider, Card } from 'ant-design-vue';
  import {
    GithubFilled,
    WechatFilled,
    AlipayCircleFilled,
    GoogleCircleFilled,
    TwitterCircleFilled,
  } from '@ant-design/icons-vue';
  import LoginFormTitle from './LoginFormTitle.vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { Icon } from '/@/components/Icon';
  import { getQRCode } from '/@/api/common/index';

  //import { onKeyStroke } from '@vueuse/core';
   const emit = defineEmits(['doSubmit']);
  const ACol = Col;
  const ARow = Row;
  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { notification, createErrorModal } = useMessage();
  const { prefixCls } = useDesign('login');
  const userStore = useUserStore();

  const { setLoginState, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);
  const rememberMe = ref(false);

  const formData = reactive({
    account: 'admin',
    password: '123456',
  });

  const onSubmit = async () => {
    const data = await validForm();
    if (!data) return;

    emit('doSubmit')
  };

  // const formData = reactive({
  //   account: 'vben',
  //   password: '123456',
  // });

  const { validForm } = useFormValid(formRef);

  //onKeyStroke('Enter', handleLogin);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

 

  

  async function handleLogin({captchaVerification}) {
    const data = await validForm();
    if (!data) return;
    try {
      loading.value = true;
      // debugger
      const userInfo = await userStore.login({
        username: data.account,
        password: data.password,
        captchaVerification,
        // mode: 'none', //不要默认的错误提示
      });
      // debugger
      // console.log('userInfo=>',userInfo)
      if (userInfo) {
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.name}`,
          // description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
          duration: 3,
        });
      }
    } catch (error) {
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
        getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
      });
    } finally {
      loading.value = false;
    }
  }

  defineExpose({ handleLogin })

  const goWxLogin=async ()=>{
	const {success,obj} = await getQRCode();
	if(success){
		window.open(obj)
	}
}
</script>
<style lang="less" >
// .verifybox{
//   position:fixed ;
//   left: 50%;
//   top:50%;
//   transform: translate(-50%,-50%);
// }
  .loginForm {
    //  width: 350px;
    // margin-left: 100px;
  }
  .logo {
    width: 60px;
  }
  .title {
    width: 250px;
    // text-align: center;
  }
</style>

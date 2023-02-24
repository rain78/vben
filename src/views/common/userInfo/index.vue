<template>
  <div class="p-16px border-box">
    <div class="boxShadow">
      <CollapseContainer title="基本设置" :canExpan="false" :isShow="false">
        <div class="p-16px border-box">
          <a-row :gutter="24">
            <a-col :xs="24" :sm="24" :md="12" :lg="14" :xl="14">
              <BasicForm @register="register">
                <template #phone1="{ model, field }">
                  <div>
                    <div class="flex items-center">
                      <div class="flex-1">
                        <InputSearch
                          v-model:value="model[field]"
                          allowClear
                          v-if="!userData.verifyPhoneFlag"
                        >
                          <template #enterButton>
                            <span v-if="fields.phone.disabled">{{ fields.phone.text }}</span>
                            <span @click="verifyFields('phone')" title="获取验证码" v-else>{{
                              fields.phone.text
                            }}</span>
                          </template>
                        </InputSearch>
                        <Input v-model:value="model[field]" allowClear v-else> </Input>
                      </div>

                      <Tag color="green" class="!mr-0px !ml-5px" v-if="userData.verifyPhoneFlag"
                        >已验证</Tag
                      >
                      <Tag color="pink " class="!mr-0px !ml-5px" v-else>未验证</Tag>
                    </div>
                  </div>
                </template>
                <template #phoneCode="{ model, field }">
                  <InputSearch v-model:value="model[field]" allowClear>
                    <template #enterButton>
                      <span title="获取验证码" @click="doVerify('phone', 'phoneCode')">验证</span>
                    </template>
                  </InputSearch>
                </template>

                <template #email1="{ model, field }">
                  <div>
                    <div class="flex items-center">
                      <div class="flex-1">
                        <InputSearch
                          v-model:value="model[field]"
                          allowClear
                          v-if="!userData.verifyEmailFlag"
                        >
                          <template #enterButton>
                            <span v-if="fields.email.disabled">{{ fields.email.text }}</span>
                            <span @click="verifyFields('email')" title="获取验证码" v-else>{{
                              fields.email.text
                            }}</span>
                          </template>
                        </InputSearch>
                        <Input v-model:value="model[field]" allowClear v-else> </Input>
                      </div>

                      <Tag color="green" class="!mr-0px !ml-5px" v-if="userData.verifyEmailFlag"
                        >已验证</Tag
                      >
                      <Tag color="pink " class="!mr-0px !ml-5px" v-else>未验证</Tag>
                    </div>
                  </div>
                </template>
                <template #emailCode="{ model, field }">
                  <InputSearch v-model:value="model[field]" allowClear>
                    <template #enterButton>
                      <span title="获取验证码" @click="doVerify('email', 'emailCode')">验证</span>
                    </template>
                  </InputSearch>
                </template>
                <template #openId>
                  <Tag color="green" class="!mr-0px !ml-5px" v-if="userData.openId"
                    >已验证</Tag
                  >
                  <Tag color="pink " class="!mr-0px !ml-5px" v-else>未验证</Tag>
                </template>
              </BasicForm>
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
          <a-row :gutter="24">
            <a-col
              :xs="{
                span: 24,
                offset: 0,
              }"
              :sm="{
                span: 24,
                offset: 0,
              }"
              :md="{
                span: 12,
                offset: 2,
              }"
              :lg="{
                span: 14,
                offset: 2,
              }"
              :xl="{
                span: 13,
                offset: 2,
              }"
            >
              <div>
                <Button :loading="loading" type="primary" @click="handleSubmit">
                  更新基本信息
                </Button>
              </div>
            </a-col>
          </a-row>
        </div>
      </CollapseContainer>
      <div v-if="verifyShow">
        <Verifition
          mode="pop"
          captchaType="blockPuzzle"
          :imgSize="{ width: '400px', height: '200px' }"
          ref="verify"
          @success="getCode"
        ></Verifition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Button, Row, Col, InputSearch, Tag, Input } from 'ant-design-vue';
  import { computed, defineComponent, onMounted, watch, ref, reactive } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { CropperAvatar } from '/@/components/Cropper';

  import { useMessage } from '/@/hooks/web/useMessage';

  import headerImg from '/@/assets/images/header.jpg';
  import { accountInfoApi } from '/@/api/demo/account';
  import { baseSetschemas } from './data';
  import { useUserStore } from '/@/store/modules/user';
  // import { uploadApi } from '/@/api/sys/upload';
  import { upLoadSourceMaterial as uploadApi } from '/@/api/dynamic/sourceMaterial';
  import { userEdit as update } from '/@/api/dynamic/userRights';

  import { useRoute } from 'vue-router';
  import { userDetail as getDetail, sendVerification, doVerification } from '/@/api/common/index';

  import { Verifition } from '/@/components/Verify/index';

  export default defineComponent({
    components: {
      BasicForm,
      CollapseContainer,
      Button,
      ARow: Row,
      ACol: Col,
      CropperAvatar,
      InputSearch,
      Verifition,
      Tag,
      Input,
    },
    setup() {
      const { createMessage } = useMessage();
      const userStore = useUserStore();
      const route = useRoute();
      const uid = computed(() => route.params.id || '');
      const userData = ref({});
      const loading = ref(false);

      const [register, { setFieldsValue, validateFields, updateSchema, validate }] = useForm({
        labelWidth: 120,
        schemas: baseSetschemas,
        showActionButtonGroup: false,
      });

      watch(
        () => uid.value,
        async () => {
          if (!uid.value) {
            userData.value = {};
            return false;
          }
          getUserDetail();
        },
        {
          immediate: true,
        },
      );

      async function getUserDetail() {
        const { obj } = await getDetail({ id: uid.value });
        userData.value = obj;
        setFieldsValue(obj);
      }

      const fields = reactive({
        type: null,
        phone: {
          disabled: false,
          text: '验证码',
          origin: '',
          code: '',
          codeShow: false,
          value: '',
        },
        email: {
          disabled: false,
          text: '验证码',
          origin: '',
          code: '',
          codeShow: false,
          value: '',
        },
      });
      const verify = ref(null);
      const verifyShow = ref(false);
      const verifyFields = async (field) => {
        try {
          fields.type = field;
          const data = await validateFields(field);
          if (!data[field]) return false;
          fields[field].value = data[field];
          onShow();
        } catch (error) {
          console.log('error=>', error);
        }
      };

      const onShow = async () => {
        if (verifyShow.value) {
          verify.value.refreshImg();
        } else {
          verifyShow.value = true;
        }
        setTimeout(() => {
          verify.value.show();
        }, 1500);
      };

      const getCode = async ({ captchaVerification }) => {
        try {
          const type = fields.type;
          let data = {};

          if (type == 'phone') {
            data = {
              phoneNum: fields[type].value,
              verification: captchaVerification,
            };
          } else if (type == 'email') {
            data = {
              email: fields[type].value,
              verification: captchaVerification,
            };
          }
          let { success } = await sendVerification(type, data);
          // const { success } = res;

          if (success) {
            // fields[type].codeShow = true;
            fields[type].disabled = true;
            fields[type].text = '请稍候...';
            updateSchema({
              field: type == 'phone' ? 'phoneCode' : 'emailCode',
              show: true,
            });

            setTimeout(() => {
              doLoop(60, type);
            }, 500);
          }
        } catch (e) {
          console.log(e);
        }
      };

      function doLoop(seconds, typeVerify) {
        seconds = seconds ? seconds : 60;
        fields[typeVerify].text = seconds + 's后重新发送';
        let countdown = setInterval(() => {
          if (seconds > 0) {
            fields[typeVerify].text = seconds + 's后重新发送';
            --seconds;
          } else {
            fields[typeVerify].text = '验证码';
            fields[typeVerify].disabled = false;
            clearInterval(countdown);
          }
        }, 1000);
      }

      async function doVerify(type, field) {
        try {
          const data = await validateFields(field);
          if (!data[field]) return false;
          let code = field === 'phoneCode' ? 'phoneCode' : 'code';
          let num = field === 'phoneCode' ? 'phoneNum' : 'email';
          const subData = {
            userId: uid.value,
            [code]: data[field],
            [num]: fields[type].value,
          };
          const { success } = await doVerification(type, subData);
          // console.log('success=>', success);
          if (success) {
            updateSchema({
              field,
              show: false,
            });
            getUserDetail();
          }
        } catch (error) {
          // createMessage.error(error)
          console.log('error=>', error);
        }
      }

      const avatar = computed(() => userData.value.avatar || '');

      function updateAvatar({ source, data }) {
        userData.value.avatar = data.url || '';
        console.log('data', data);
      }

      async function handleSubmit() {
        try {
          const values = await validate();
          loading.value = true;
          // console.log('values=>', values);
          // console.log('userData=>', userData.value);
          let subData = {
            ...userData.value,
            ...values,
          };
          console.log('subData=>', subData);
          const { obj, success } = await update(subData, 'put');

          if (success) {
            createMessage.success('更新成功');
            getUserDetail();
          } else {
            createMessage.error('更新失败');
          }
        } finally {
          loading.value = false;
        }
      }

      return {
        avatar,
        register,
        uploadApi: uploadApi as any,
        updateAvatar,
        handleSubmit,
        uid,
        userData,
        verify,
        verifyFields,
        verifyShow,
        onShow,
        fields,
        getCode,
        doVerify,
        loading,
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
<template>
  <div class="pl-5px pr-5px w-full">
    <Row class="w-full">
      <Col :xs="24" :sm="24" :md="18" :lg="15" :xl="15">
        <div
          class="remarkListBox rounded-6px bg-hex-fff w-full border-box mb-10px cursor-pointer"
          :key="item.id"
          @mouseenter="open = true" @mouseleave="open = false"
        >
          <div class="p-15px border-box flex justify-between items-center">
            <div class="remark_card_top_left flex items-center">
              <span class="mr-20px">
                <Icon icon="mdi:clipboard-list" :size="20" :color="projectSetting.themeColor" />
              </span>
              <span>{{ item.name }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-hex-00000073">创建日期：{{ item.createTime }}</span>
              <span class="ml-10px">
                <Icon icon="mdi:dots-vertical" :size="20" :color="projectSetting.themeColor" />
              </span>
            </div>
          </div>
          <transition name="fade">
            <template v-if="open">
              <div>
                <div class="remark_card_Content">
                  <div class="remark_content_info pt-7px pb-7px pl-15px pr-17px flex h-200px">
                    <div class="remark_content flex-1 pl-15px">
                      <span class="text-hex-00000073">
                        {{ item.content }}
                      </span>
                    </div>
                    <div class="flex flex-col justify-between text-hex-00000073 border-box">
                      <div
                        class="
                          flex
                          items-center
                          flex-1 flex-col
                          justify-between
                          pb-5px
                          border-box
                          pl-15px
                        "
                      >
                        <span>任务分配给</span>
                        <span class="bold text-18px">{{ item.assignedStudentCounts }}</span>
                        <span>名学生</span>
                      </div>
                      <div
                        class="
                          remark_complete
                          flex
                          items-center
                          flex-1 flex-col
                          justify-between
                          pt-5px
                          border-box
                          pl-15px
                        "
                      >
                        <span>已有</span>
                        <span class="bold text-18px">{{
                          item.completedAssignedStudentCounts
                        }}</span>
                        <span>名学生完成</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="p-15px border-box flex justify-between items-center text-hex-00000073">
                  <span>截止日期：{{ item.completionTime }}</span>
                  <span @click="$emit('maskDetail',item)" style="color: var(--theme)"
                    >查看</span
                  >
                </div>
              </div>
            </template>
          </transition>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineProps, computed, watch, unref,defineEmits } from 'vue';
  import projectSetting from '/@/settings/projectSetting';
  import { Row, Col, Divider,  List, ListItem } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';


  const props = defineProps({
    item: { type: Object },
    index: { type: Number },
  });
  const emit=defineEmits(['maskDetail'])
  const open=ref(false)
</script>

<style lang="less" scoped>
  .remarkListBox {
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.35);

    .remark_card_Content {
      border-top: 1px solid #d7d7d7;
      border-bottom: 1px solid #d7d7d7;

      .remark_content_info {
        .remark_content {
          border-right: 1px solid #d7d7d7;
          // padding-left: 15px;

          span {
            &:nth-child(1) {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              word-break: break-all; // 注意这个文字多行很重要
              -webkit-box-orient: vertical;
            }
          }
        }

        .remark_complete {
          border-top: 1px solid #d7d7d7;

          span {
            &:nth-child(2) {
              color: var(--theme);
            }
          }
        }
      }
    }
  }
</style>
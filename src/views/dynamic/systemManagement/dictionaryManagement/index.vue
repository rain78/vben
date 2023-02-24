<template>
  <div>
    <BasicTable @register="registerTable">
      <template #form-formBtn>
        <a-button
          color="success"
          @click="handleCreate"
          class="mr-2"
          preIcon="mdi:plus"
          :iconSize="16"
          >新增</a-button
        >
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <!-- {{column}} -->

          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '编辑',
                onClick: handleEdit.bind(null, record),
              },
              {
                label: '删除',
                color: 'error',
                onClick: handleDelete.bind(null, record),
              },
              {
                label: '字典项',
                color: 'warning',
                onClick: dictItemDetail.bind(null, record),
              },
            ]"
          />
        </template>
        <template v-else-if="column.key === 'establishYear'">
          {{ parseTime(record.establishYear, '{y}') }}
        </template>
      </template>
    </BasicTable>
    <editModal @register="registerModal" @success="handleSuccess" />
    <BasicModal
      @register="registerModal1"
      :title="(dictItemData.description || '') + '详情'"
      @ok="handleSuccess1"
      :minHeight="300"
      width="600px"
    >
      <BasicTable @register="registerTable1" :boxShadow="false" :dataSource="dictItemDataAll">
        <template #form-formBtn>
          <a-button @click="handleCreate1" color="success" class="mr-2" preIcon="mdi:plus" :iconSize="16">新增</a-button>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <!-- {{column}} -->

            <TableAction
              stopButtonPropagation
              :actions="[
                {
                  label: '编辑',
                  onClick: handleEdit1.bind(null, record),
                },
                {
                  label: '删除',
                  color: 'error',
                  onClick: handleDelete1.bind(null, record),
                },
              ]"
            />
          </template>
        </template>
      </BasicTable>
    </BasicModal>
    <BasicModal
      @register="registerModal2"
      title="字典项编辑"
      @ok="handleSuccess2"
      :minHeight="300"
    >
     <BasicForm @register="registerForm" />
    </BasicModal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref ,unref} from 'vue';
  import { parseTime } from '/@/utils/dateUtil';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import {
    dictList as getList,
    dictDelete as deleteData,
    dictItemList,
    dictItemEdit,
    dictItemDelete,
    dictItem,
  } from '/@/api/dynamic/systemManagement';

  import { useModal, BasicModal, useModalInner } from '/@/components/Modal';
  // import { BasicModal, useModalInner } from '/@/components/Modal';
  import editModal from './editModal.vue';

  import { useMessage } from '/@/hooks/web/useMessage';

  import { BasicForm, useForm } from '/@/components/Form/index';
  import { columns, columns1, searchFormSchema,formSchema1 } from './data';

  export default defineComponent({
    components: { BasicTable, editModal, TableAction, BasicModal,BasicForm },
    setup() {
      const { createConfirm,createMessage } = useMessage();
      const [registerModal, { openModal }] = useModal();
      const [registerModal1, { openModal: openModal1, closeModal: closeModal1 }] = useModal();
      
      const [registerModal2, { openModal: openModal2, closeModal: closeModal2,setModalProps:setModalProps2 }] = useModal();
      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: formSchema1,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerTable, { reload, getSelectRows }] = useTable({
        // title: '角色列表',
        api: getList,
        columns,
        formConfig: {
          rowProps: { gutter: 24 },
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        // showTableSetting: true,
        bordered: false,
        // bordered: true,
        showIndexColumn: false,
        // rowKey: 'id',
        // rowSelection: {
        //   type: 'checkbox',
        // },
        actionColumn: {
          // width: 80,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
          fixed: undefined,
        },
        fetchSetting: {
          pageField: 'current',
          // The number field name of each page displayed in the background
          sizeField: 'size',
          // Field name of the form data returned by the interface
          listField: 'records',
          // Total number of tables returned by the interface field name
          totalField: 'total',
        },
        scroll: { x: 'max-content' },
      });
      const [registerTable1] = useTable({
        columns: columns1,
        formConfig: {
          rowProps: { gutter: 24 },
          schemas: [],
          showSubmitButton: false,
        },
        useSearchForm: true,
        bordered: false,
        showIndexColumn: false,
        actionColumn: {
          title: '操作',
          dataIndex: 'action',
          fixed: undefined,
        },
        scroll: { x: 'max-content' },
        pagination:false
      });

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        // console.log(record);
        createConfirm({
          iconType: 'warning',
          title: '温馨提示',
          content: '确定此操作吗',
          onOk: async () => {
            try {
              const { success } = await deleteData({ ids: record.id });
              if (success) reload();
            } catch (error) {}
          },
        });
      }

      function handleSuccess() {
        reload();
      }

      const dictItemData = ref({});
      const dictItemDataAll = ref([]);
      async function dictItemDetail(record: Recordable) {
        dictItemData.value = record;
        getDictItemDataAll()
        openModal1(true);
      }

      async function getDictItemDataAll(){
        const { obj } = await dictItem(unref(dictItemData));
        dictItemDataAll.value = obj || [];
      }

      function handleSuccess1() {
        closeModal1();
      }
      const dictItemEditData=ref({})
      let isUpdate=false
      function handleEdit1(record: Recordable) {
        dictItemEditData.value=record
        setModalProps2({ visible: true })
        resetFields();
        setFieldsValue({
          ...dictItemEditData.value,
        });
        
        isUpdate=true
      }
     
      function handleCreate1(){
        isUpdate=false
        dictItemEditData.value={}
        setModalProps2({ visible: true })
        resetFields();
      }

      function handleDelete1(record: Recordable) {
        createConfirm({
          iconType: 'warning',
          title: '温馨提示',
          content: '确定此操作吗',
          onOk: async () => {
            try {
              const { success } = await dictItemDelete({ ids: record.id });
              if (success) getDictItemDataAll();
            } catch (error) {}
          },
        });
      }

      async function handleSuccess2() {
        try {
          const values = await validate();
          setModalProps2({ confirmLoading: true });
          let editData={
            dictId:unref(dictItemData).id
          }
          if(isUpdate){
            editData={
              id:dictItemEditData.value.id,
              dictId:unref(dictItemData).id
            }
          }
          const {obj,success}=await dictItemEdit({...values,...editData,},isUpdate?'put':'post')

          if(success){
            // const { obj } = await dictItem(unref(dictItemData));
            // dictItemDataAll.value = obj || [];
            getDictItemDataAll()
            createMessage.success('字典项编辑成功')
          }else{
            createMessage.error('字典项编辑失败')

          }
          closeModal2()
        } finally {
          setModalProps2({ confirmLoading: false });
        }
      }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        parseTime,
        registerModal1,
        dictItemDetail,
        dictItemData,
        registerTable1,
        handleEdit1,
        handleDelete1,
        dictItemDataAll,
        registerModal2,
        handleSuccess2,
        handleCreate1,
        registerForm,
        dictItemEditData
      };
    },
  });
</script>

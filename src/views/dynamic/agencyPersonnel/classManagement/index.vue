<template>
  <div>
    <BasicTable @register="registerTable">
      <template #form-formBtn>
        <a-button type="primary" @click="handleCreate" class="mr-2">新增</a-button>
        <a-button type="danger" @click="doDelete" class="mr-2">删除</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <!-- {{column}} -->

          <TableAction
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
            ]"
          />
        </template>
        <template v-else-if="column.key === 'establishYear'">
          {{ parseTime(record.establishYear, '{y}') }}
        </template>
      </template>
    </BasicTable>
    <editModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { parseTime } from '/@/utils/dateUtil';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getsClassList as getList,deleteClassData as deleteData } from '/@/api/dynamic/agencyPersonnel';


  import { useModal } from '/@/components/Modal';
  import editModal from './editModal.vue';

  import { useMessage } from '/@/hooks/web/useMessage';

  // import { searchFormSchema } from './role.data';
  import { columns, searchFormSchema } from './data';

  export default defineComponent({
    components: { BasicTable, editModal, TableAction },
    setup() {
      const { createConfirm,createMessage } = useMessage();
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload, getSelectRows }] = useTable({
        // title: '角色列表',
        api: getList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        // showTableSetting: true,
        bordered: false,
        // bordered: true,
        showIndexColumn: false,
        // rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
        },
        actionColumn: {
          // width: 80,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
          fixed: undefined,
        },
        fetchSetting:{
          pageField: 'current',
          // The number field name of each page displayed in the background
          sizeField: 'size',
          // Field name of the form data returned by the interface
          listField: 'records',
          // Total number of tables returned by the interface field name
          totalField: 'total',
        }
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

      


      function doDelete() {
        const selectData=getSelectRows()
        if(selectData.length<=0){
          createMessage.warn(`请至少选中一条数据操作`);
          return false;
        }
        handleDelete({id:selectData.map(o=>o.id).join(',')})
      }

      function handleDelete(record: Recordable) {
        // const selectData=getSelectRows()
        // console.log(record);
        
        createConfirm({
          iconType: 'warning',
          title: '温馨提示',
          content: '确定此操作吗',
          onOk: async () => {
            try {
              const {success} =await deleteData('/'+record.id)
              if(success) reload()
              
            } catch (error) {
              
            }
            // console.log(record);

          },
        });
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        parseTime,
        doDelete,
      };
    },
  });
</script>

<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #form-formBtn>
        <a-button type="primary" @click="handleCreate"> 新增菜单 </a-button>
      </template>
      <!-- <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增菜单 </a-button>
      </template> -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label:'编辑',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                label:'删除',
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <!-- <MenuDrawer @register="registerDrawer" @success="handleSuccess" /> -->
    <MenuModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, nextTick } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getMenuList,getMenuList1 } from '/@/api/demo/system';

  // import { useDrawer } from '/@/components/Drawer';
  // import MenuDrawer from './MenuDrawer.vue';

  import { useModal } from '/@/components/Modal';
  import MenuModal from './MenuModal.vue';

  import { columns,columns1, searchFormSchema } from './menu.data';

  export default defineComponent({
    components: { BasicTable, TableAction,MenuModal },
    setup() {
      const [registerModal, { openModal }] = useModal();

      // const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload, expandAll }] = useTable({
        title: '',
        api: getMenuList1,
        columns:columns1,
        formConfig: {
          labelWidth: 120,
          schemas: [],
        },
        isTreeTable: true,
        pagination: false,
        striped: false,
        useSearchForm: true,
        showTableSetting: false,
        bordered: false,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleCreate() {
        // openDrawer(true, {
        //   isUpdate: false,
        // });
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        // openDrawer(true, {
        //   record,
        //   isUpdate: true,
        // });
        console.log(record);
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        console.log(record);
      }

      function handleSuccess() {
        reload();
      }

      function onFetchSuccess() {
        // 演示默认展开所有表项
        nextTick(expandAll);
      }

      return {
        registerTable,
        // registerDrawer,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        onFetchSuccess,
      };
    },
   
  });
</script>

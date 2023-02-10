<template>
  <div>
    <BasicTable @register="registerTable">
      <template #form-formBtn>
        <a-button color="success" @click="handleCreate" class="mr-2">新增</a-button>
        <!-- <a-button type="danger" @click="doDelete" class="mr-2">删除</a-button> -->
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
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
  import {
    toolMaterialList as getList,
    toolMaterialDelete as deleteData,
  } from '/@/api/dynamic/basciData';

  import { useModal } from '/@/components/Modal';
  import editModal from './editModal.vue';

  import { useMessage } from '/@/hooks/web/useMessage';

  import { columns, searchFormSchema } from './data';

  export default defineComponent({
    components: { BasicTable, editModal, TableAction },
    setup() {
      const { createConfirm, createMessage } = useMessage();
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload, getSelectRows }] = useTable({
        api: getList,
        columns,
        formConfig: {
          rowProps: { gutter: 24 },
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        bordered: false,
        showIndexColumn: false,
        rowSelection: {
          type: 'checkbox',
        },
        actionColumn: {
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
        },
        fetchSetting: {
          pageField: 'current',
          sizeField: 'size',
          listField: 'records',
          totalField: 'total',
        },
        scroll: { x: 'max-content' },
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
        const selectData = getSelectRows();
        if (selectData.length <= 0) {
          createMessage.warn(`请至少选中一条数据操作`);
          return false;
        }
        handleDelete({ id: selectData.map((o) => o.id).join(',') });
      }

      function handleDelete(record: Recordable) {
        createConfirm({
          iconType: 'warning',
          title: '温馨提示',
          content: '确定此操作吗',
          onOk: async () => {
            try {
              const { success } = await deleteData({ids:record.id});
              if (success) reload();
            } catch (error) {}
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

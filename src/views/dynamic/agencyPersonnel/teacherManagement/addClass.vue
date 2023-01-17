<template>
  <div>
    <a-button
      type="primary"
      @click="
        open(true, {
          isUpdate: false,
        })
      "
      >添加班级</a-button
    >
    <BasicModal
      v-bind="$attrs"
      @register="registerModal"
      title="选择班级"
      @ok="handleSubmit"
      :width="800"
    >
      <BasicTable @register="registerTable"> </BasicTable>
    </BasicModal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, watch, ref, computed, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getsClassList as getList } from '/@/api/dynamic/agencyPersonnel';
  import { columns } from '/@/views/dynamic/agencyPersonnel/classManagement/data';
  import { FormSchema } from '/@/components/Table';
  import { classSelect } from '/@/api/dynamic/agencyPersonnel';
  import { useForm } from '/@/components/Form/index';

  export default defineComponent({
    name: 'AddClass',
    components: { BasicModal, BasicTable, nextTick },
    emits: ['change'],
    props: ['value', 'schoolId'],
    setup(props, { emit }) {
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {});
      const { schoolId } = props;
      const searchFormSchema = [
        {
          field: 'clazzId',
          component: 'ApiSelect',
          label: '班级',
          labelWidth: '60px',
          colProps: {
            span: 8,
          },
          componentProps: ({ formModel, formActionType }) => {
            return {
              api: classSelect,
              params: {
                schoolId,
              },
              resultField: 'obj',
            };
          },
        },
        {
          field: 'schoolId',
          label: '学校',
          component: 'Input',
          defaultValue: schoolId,
          show: false,
        },
      ];
      const [registerTable, { getSelectRows }] = useTable({
        // const useTableData = useTable({
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
        fetchSetting: {
          pageField: 'current',
          // The number field name of each page displayed in the background
          sizeField: 'size',
          // Field name of the form data returned by the interface
          listField: 'records',
          // Total number of tables returned by the interface field name
          totalField: 'total',
        },
      });

      const open = () => {
        setModalProps({ visible: true });
      };

      const handleSubmit = () => {
        closeModal();
      };

      return {
        registerModal,
        handleSubmit,
        open,
        registerTable,
      };
    },
  });
</script>

<style>
</style>
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
    <!-- <component :is="BasicModalShow"></component> -->
    <BasicModal
      v-bind="$attrs"
      @register="registerModal"
      title="选择班级"
      @ok="handleSubmit"
      :width="800"
    >
            
      <component :is="BasicTableShow" :boxShadow="false"  @register="registerTable" v-if="BasicTableShow"></component>
      <!-- <BasicTable @register="registerTable"> </BasicTable> -->
    </BasicModal>
    <div v-if="selectClassData && selectClassData.length > 0" style="margin-top: 10px">
      <BasicTable
        :columns="columns"
        :dataSource="selectClassData"
        :showIndexColumn="false"
        :striped="false"
        :bordered="false"
        :boxShadow="false"
        :actionColumn="{
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
        }"
        :scroll="{ x: 'max-content' }"
      >
      <template #bodyCell="{ column, record ,index}">
        <template v-if="column.key === 'action'">
          <!-- {{record}}
          {{column}} -->
          <!-- {{dataIndex}} -->
          <TableAction
            :actions="[
              
              {
                label: '删除',
                color: 'error',
                onClick: handleDelete.bind(null, index),
              },
            ]"
          />
        </template>
      </template>
      </BasicTable>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, watch, ref, nextTick, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable,TableAction } from '/@/components/Table';
  import { getsClassList as getList } from '/@/api/dynamic/agencyPersonnel';
  import { columns } from '/@/views/dynamic/agencyPersonnel/classManagement/data';
  import { FormSchema } from '/@/components/Table';
  import { classSelect } from '/@/api/dynamic/agencyPersonnel';
  import { useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';


  export default defineComponent({
    name: 'AddClass',
    components: { BasicModal, BasicTable,TableAction },
    emits: ['change'],
    props: ['value', 'schoolId'],
    setup(props, { emit }) {
      const { createConfirm,createMessage } = useMessage();
      const BasicTableShow = ref(undefined);
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {});
      const { schoolId } = props;
      const selectClassData = ref(undefined);
      let registerTable = ref(undefined);
      let getSelectRows = null;
      let setSelectedRowKeys = null;
      watch([() => props.schoolId, () => props.value], () => {
        BasicTableShow.value = undefined;
        registerTable.value = null;
        if (props.schoolId && props.value) {
          const { schoolId, value } = props;
      // console.log('value=>', value);

        selectClassData.value=value
          nextTick(async () => {
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
            //[registerTable, { getSelectRows }]
            const useTableData = await useTable({
              // const useTableData = useTable({
              api: getList,
              columns,
              formConfig: {
                rowProps:{gutter:24},
                schemas: searchFormSchema,
              },
              useSearchForm: true,
              // showTableSetting: true,
              bordered: false,
              // bordered: true,
              showIndexColumn: false,
              rowKey: 'id',
              rowSelection: {
                type: 'checkbox',
              },
              // boxShadow:true,
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
            registerTable.value = useTableData[0];
            // const { setSelectedRowKeys } = useTableData[1];
            getSelectRows = useTableData[1].getSelectRows;
            setSelectedRowKeys = useTableData[1].getSelectRows;
            // const { value } = props;
            // console.log('value=>', value);

            BasicTableShow.value = BasicTable;
            // setSelectedRowKeys(value.map(o=>o.id));
          });
        }
      });
     
      function handleDelete(index) {
        
        createConfirm({
          iconType: 'warning',
          title: '温馨提示',
          content: '确定此操作吗',
          onOk: async () => {
            selectClassData.value=selectClassData.value.splice(index,1)
          },
        });
      }
      const open = () => {
        setModalProps({ visible: true });
        // console.log(selectClassData.value.map(o=>o.id))
        // setSelectedRowKeys(selectClassData.value.map(o=>o.id))
      };

      const handleSubmit = () => {
        // console.log(getSelectRows())
        const selectData = getSelectRows();
        selectClassData.value = selectData;
        emit('change', selectData);
        // emit('change',selectData.map(o => o.id).join(','))
        closeModal();
      };

      return {
        columns,
        registerModal,
        handleSubmit,
        open,
        registerTable,
        BasicTableShow,
        selectClassData,
        handleDelete
      };
    },
  });
</script>

<style>
</style>
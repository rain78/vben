<template>
  <div>
    <BasicTable @register="registerTable">
      
    </BasicTable>
    <editModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getOperLogList as getList } from '/@/api/dynamic/loginLog';


 
  import { columns, searchFormSchema } from './data';

  export default defineComponent({
    components: { BasicTable, TableAction },
    setup() {
      const [registerTable, { reload, getSelectRows }] = useTable({
        api: getList,
        columns,
        formConfig: {
          rowProps:{gutter:24},
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        bordered: false,
        // bordered: true,
        showIndexColumn: false,
        fetchSetting:{
          pageField: 'current',
          sizeField: 'size',
          listField: 'records',
          totalField: 'total',
        }
      });
      return {
        registerTable,
       
      };
    },
  });
</script>

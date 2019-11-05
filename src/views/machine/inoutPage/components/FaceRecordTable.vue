<template>
    <div class="data-table">
 
    </div>
</template>
<script>
import { inoutFaceList,machinesLogList } from "@/api/machine";

  

  

  export default {
    data() {
      return {
        data,
        columns,
        pagination: {},
      };
    },
    props:{
        tableData:Array
    }
  };
</script>
<style scoped>
.data-table{
    margin-top:10px;
}
</style>
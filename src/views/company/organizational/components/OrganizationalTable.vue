<template>
  <div>
    <a-table :columns="columns" :dataSource="data" bordered rowKey="id">
      <!-- <p slot="expandedRowRender" slot-scope="record" style="margin: 0">{{record}}</p> -->
    </a-table>
    <!-- <organizational-table :data="data"></organizational-table> -->
  
  </div>
</template>

<script>
const columns = [
  {
    title: "id",
    dataIndex: "id"
  },
  {
    title: "name",
    dataIndex: "name"
  },
  {
    title: "operation",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];
import OrganizationalTable from "./OrganizationalTable";
export default {
  components: {
    OrganizationalTable
  },
  data() {
    return {
      columns
    };
  },
  props: {
    data: Array
  },
  methods: {}
};
</script>

<style>
</style>

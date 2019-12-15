<template>
  <div class="content-warp">
    <a-table
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="employeeData"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="operation" slot-scope="text, record">
        <a href="javascript:;">Delete</a>
      </template>
    </a-table>
  </div>
</template>

<script>
import { getEmployeeList } from "@/api/staff";
const columns = [
  {
    title: "id",
    dataIndex: "id"
  },
  {
    title: "姓名",
    dataIndex: "realName",
    sorter: true
  },
  {
    title: "性别",
    dataIndex: "sex",
    sorter: true
  },
  {
    title: "生日",
    dataIndex: "birth",
    sorter: true
  },
  {
    title: "身份证",
    dataIndex: "identify_card"
  },
  {
    title: "operation",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];
export default {
  data() {
    return {
      originalEmployeeData: [],
      data: [],
      pagination: {
        current: 1,
        pageSize: 20,
        total: 849
      },
      loading: false,
      columns,
      page: 1,
      per_page: 20
    };
  },
  created() {
    this.initEmployeeListData();
  },
  computed: {
    employeeData() {
      return this.originalEmployeeData.map(employee => {
        let people = {};
        people.id = employee.id;
        people.realName = employee.authorization.name;
        people.sex = employee.sex;
        people.birth = employee.authorization.birth;
        people.identify_card = employee.authorization.identify_card;
        return people;
      });
    }
  },
  methods: {
    initEmployeeListData() {
      let param = {
        page: 1,
        per_page: 20
      };
      this.getEmployeeListData(param);
    },
    getEmployeeListData(param) {
      getEmployeeList(param).then(res => {
        this.originalEmployeeData = res.data.data;
        console.log(res.data);
        console.log(res.data.meta.pagination.current_page)
        this.$set(
          this.pagination,
          "current",
          param.page
        );
      });
    },
    handleTableChange(pagination, filters, sorter, { currentDataSource }) {
      console.log(pagination);
      let param = {
        page: pagination.current,
        per_page: pagination.pageSize
      };
      this.getEmployeeListData(param);
    }
  }
};
</script>

<style>
</style>
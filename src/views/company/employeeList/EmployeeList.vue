<template>
  <div class="content-warp">
    <a-input-search placeholder="根据姓名搜索" style="width: 200px" @search="onSearch" />
    <a-table
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="employeeData"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="operation" slot-scope="text, record">
        <a-button type="link" @click="handleEmployeeDetail(record)">查看详情</a-button>
      </template>
      <template slot="identify_card" slot-scope="text,record">{{text.substring()}}</template>
    </a-table>
    <a-drawer
      width="40%"
      placement="right"
      :closable="true"
      @close="onClose"
      :visible="employeeDetailVisible"
    >
      <employee-profile :id="activeId"></employee-profile>
    </a-drawer>
  </div>
</template>

<script>
import { getEmployeeList } from "@/api/staff";
import EmployeeProfile from "@/views/company/employee/components/EmployeeProfile";
const columns = [
  {
    title: "id",
    dataIndex: "id"
  },
  {
    title: "姓名",
    dataIndex: "realName"
  },
  {
    title: "性别",
    dataIndex: "sex"
  },
  {
    title: "生日",
    dataIndex: "birth"
  },
  {
    title: "身份证",
    dataIndex: "identify_card",
    scopedSlots: { customRender: "identify_card" }
  },
  {
    title: "operation",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];
export default {
  components: {
    EmployeeProfile
  },
  data() {
    return {
      originalEmployeeData: [],
      data: [],
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
        showTotal: total => {
          return `总共${total}条记录`;
        },
        showSizeChanger: true
      },
      loading: false,
      columns,
      page: 1,
      per_page: 20,
      employeeDetailVisible: false,
      name: "",
      activeId: ""
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
        people.userId = employee.authorization.user_id;
        people.realName = employee.authorization.name;
        people.sex = employee.user.sex;
        people.birth = employee.authorization.birth;
        people.identify_card = employee.authorization.identify_card;
        return people;
      });
    },
    param() {
      return {
        page: this.pagination.current,
        per_page: this.pagination.pageSize,
        name: this.name
      };
    }
  },
  methods: {
    initEmployeeListData() {
      this.getEmployeeListData();
    },
    getEmployeeListData() {
      getEmployeeList(this.param).then(res => {
        this.originalEmployeeData = res.data.data;
        this.$set(this.pagination, "current", this.param.page);
        this.$set(this.pagination, "pageSize", this.param.per_page);
        this.$set(this.pagination, "total", res.data.meta.pagination.total);
      });
    },
    handleTableChange(pagination, filters, sorter, { currentDataSource }) {
      this.pagination = pagination;
      this.getEmployeeListData();
    },
    onSearch(value) {
      this.name = value;
      this.getEmployeeListData();
    },
    handleEmployeeDetail(record) {
      this.activeId = `${record.id}`;
      this.employeeDetailVisible = true;
    },
    onClose() {
      this.employeeDetailVisible = false;
    }
  }
};
</script>

<style>
</style>
<template>
  <div class="content-warp">
    <div class="control">
      <a-input-search placeholder="根据姓名搜索" style="width: 200px" @search="onSearch" />
      <a-tree-select
        style="width: 300px"
        :treeData="treeSelectOption"
        :value="value"
        placeholder="根据部门职位搜索"
        @change="onChange"
        treeCheckable
        :showCheckedStrategy="SHOW_PARENT"
        searchPlaceholder="Please select"
      />
      <a-button type="primary"> 导出数据</a-button>
    </div>
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
      <template slot="identify_card" slot-scope="text">{{text.substring()}}</template>
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
import { TreeSelect } from "ant-design-vue";
import { getInstitutions } from "@/api/institutions";
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

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
import XLSX from "xlsx";
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
      activeId: "",
      value: [],
      treeSelectOption: [],
      SHOW_PARENT
    };
  },
  created() {
    this.initEmployeeListData();
    this.initData();
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
        people.user = employee;
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
    initData() {
      this.getInstitutionsData();
    },
    getInstitutionsData() {
      getInstitutions().then(res => {
        console.log(res);
        this.treeSelectOption = this.generateOption(res.data.data);
        console.log(this.treeSelectOption);
      });
    },
    generateDataToExcel(){
       console.log(this.originalEmployeeData);
        let excelObject = this.originalEmployeeData.map(employee => {
          return {
            姓名:  employee.authorization.name,
            性别: employee.user.sex,
            生日: employee.authorization.birth,
            身份证: employee.authorization.identify_card
          };
        });
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(excelObject, {
          header: ["姓名", "性别", "生日", "身份证"]
        });
        console.log(excelObject)
        XLSX.utils.book_append_sheet(wb, ws, "员工");
        XLSX.writeFile(wb, "员工.xlsx");
    },
    generateOption(data) {
      if (!data instanceof Array || data.length == 0) {
        return [];
      }
      return data.map(institution => {
        let isDisable = false;
        if (
          institution.positions.data.length == 0 &&
          institution.children.data.length == 0
        ) {
          isDisable = true;
        }
        return {
          value: "institution-" + institution.id,
          title: institution.name,
          key: "institution-" + institution.id,
          disabled: isDisable,
          children: this.generateOption(institution.children.data).concat(
            this.generateRole(institution.positions.data)
          )
        };
      });
    },
    generateRole(roles) {
      return roles.map(role => {
        return {
          value: "role-" + role.id,
          key: "role-" + role.id,
          title: role.title
        };
      });
    },
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
    handleTableChange(pagination) {
      this.pagination = pagination;
      this.getEmployeeListData();
    },
    onSearch(value) {
      this.name = value;
      this.getEmployeeListData();
    },
    handleEmployeeDetail(record) {
      console.log(record);
      //
      this.activeId = `${record.user.user.id}`;
      this.employeeDetailVisible = true;
    },
    onClose() {
      this.employeeDetailVisible = false;
    },
    onChange(value) {
      console.log("onChange ", value);
      this.value = value;
      let institutionList = [];
      let roleList = [];
      value.forEach(element => {
        let keyMap = element.split("-");
        if (keyMap[0] == "institution") {
          institutionList.push(keyMap[1]);
        } else {
          roleList.push(keyMap[1]);
        }
      });
      getEmployeeList({ institutions: institutionList, roles: roleList }).then(
        res => {}
      );
    }
  }
};
</script>

<style lang="less" scoped>
.control{
  margin-bottom: 15px;
  & > *{
    margin-right: 8px;
  }
}
</style>
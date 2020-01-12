<template>
  <div class="content-warp">
    <a-table :columns="columns" :dataSource="userTableData">
      <a slot="realName" slot-scope="text" href="javascript:;">{{text}}</a>
      <span slot="customTitle">
        <a-icon type="smile-o" />真实姓名
      </span>
      <span slot="action" slot-scope="text, record">
        <a href="javascript:;">Invite 一 {{record.name}}</a>
        <a-divider type="vertical" />
        <a href="javascript:;">Delete</a>
        <a-divider type="vertical" />
        <a href="javascript:;" class="ant-dropdown-link">
          More actions
          <a-icon type="down" />
        </a>
      </span>
    </a-table>
  </div>
</template>

<script>
import { getUserList } from "@/api/user";
// const columns = [
//   {
//     dataIndex: "name",
//     key: "name",
//     slots: { title: "customTitle" },
//     scopedSlots: { customRender: "name" }
//   },
// ];
const columns = [
  {
    dataIndex: "id",
    key: "id",
    title: "用户id"
  },
  {
    dataIndex: "realName",
    key: "realName",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "realName" }
  },
  {
    dataIndex: "account",
    key: "account",
    title: "账户"
  },
  {
    dataIndex: "name",
    key: "name",
    title: "姓名"
  },
  {
    dataIndex: "sex",
    key: "sex",
    title: "性别"
  },
  {
    dataIndex: "role",
    key: "role",
    title: "会员等级"
  },
  {
    title: "操作",
    dataIndex: "",
    key: "x",
    scopedSlots: { customRender: "action" }
  }
];
export default {
  data() {
    return {
      userData: [],
      columns,
      params: {
        include: "credit.records,authorization.contact,user.roles",
        page: 1,
        per_page: 20
      }
    };
  },
  created() {
    this.init();
  },
  computed: {
    userTableData() {
      return this.userData.map(userInfo => {
        return {
          id: userInfo.user.id,
          realName: userInfo.authorization.name,
          account: userInfo.user.account,
          name: userInfo.authorization.name,
          sex: userInfo.user.sex,
          role: userInfo.user.roles.data[0].title
        };
      });
    }
  },
  methods: {
    init() {
      this.initUserData();
    },
    initUserData() {
      getUserList(this.params).then(res => {
        this.userData = res.data.data;
      });
    }
  }
};
</script>

<style>
</style>
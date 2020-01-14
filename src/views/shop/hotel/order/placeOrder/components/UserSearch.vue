<template>
  <div class="user-search-warp">
    <span class="search-label">用户手机号</span>
    <a-input-search placeholder="用户手机号" class="search-input" @search="onSearch" />
    <user-profile></user-profile>
    <create-user-button></create-user-button>
    <user-info :data="activeUserData" v-show="activeUserData != null"></user-info>
  </div>
</template>

<script>
import UserInfo from "./UserInfo";
import { CreateUserButton } from "@/components";
import { getUserList } from "@/api/user";
export default {
  components: {
    UserInfo,
    CreateUserButton
  },
  data() {
    return {
      activeUser: null,
      userList: [],
      showUserSelectVisible: false
    };
  },
  computed: {
    activeUserData() {
      let userModel = null;
      if (this.activeUser) {
        let role = null
        if(this.activeUser.user.roles.data instanceof Array && this.activeUser.user.roles.data.length > 0){
          role = this.activeUser.user.roles.data[0]
        }
        userModel = {
          realName: this.activeUser.authorization.name,
          nickName: this.activeUser.user.name,
          birth: this.activeUser.authorization.birth,
          location: "",
          phone: `+${this.activeUser.authorization.contact.area_code}  ${this.activeUser.authorization.contact.phone_number}`,
          role: role.title,
          point: ""
        };
      }
      return userModel;
    }
  },
  methods: {
    onSearch(value) {
      let params = {
        include: "credit.records,authorization.contact,user.roles",
        page: 1,
        per_page: 20,
        phone_number: value
      };
      getUserList(params).then(res => {
        this.activeUser = null;
        this.userList = [];
        let userList = res.data.data;
        if (userList instanceof Array) {
          if (userList.length == 0) {
            this.$message.error("查无用户");
          } else if (userList.length == 1) {
            this.activeUser = userList[0];
            console.log(this.activeUser);
          } else {
            this.userList = userList;
            this.showUserSelectVisible = true;
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.user-search-warp {
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 20px 0;
  width: 100%;
  min-width: 300px;
  .search-label {
    margin-right: 8px;
    font-size: 18px;
    font-weight: 700;
  }
  .search-input {
    width: 200px;
    margin-right: 8px;
  }
}
</style>

<template>
  <div class="user-search-warp">
    <span class="search-label">
      用户手机号
    </span>
    <a-input-search
      placeholder="用户手机号"
      class="search-input"
      @search="onSearch"
    />
    <a-button type="primary">确认</a-button>
    <user-info></user-info>
    <create-user-button></create-user-button>
  </div>
</template>

<script>
import UserInfo from "./UserInfo";
import {CreateUserButton} from '@/components'
export default {
  components:{
    UserInfo,
    CreateUserButton
  },
  methods: {
    onSearch() {}
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
  .search-label{
    margin-right: 8px;
    font-size: 18px;
    font-weight: 700;
  }
  .search-input{
    width: 200px;
    margin-right: 8px;
  }
}
</style>


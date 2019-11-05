<template>
  <div class="content-warp">
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="员工列表" key="1">
        <employee-list ref="employeeList"></employee-list>
      </a-tab-pane>
      <a-tab-pane tab="添加员工" key="2" forceRender>
        <add-employee @refresh="refresh"></add-employee >
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { mixinDevice } from "@/utils/mixin.js";
import AddEmployee from "./components/AddEmployee";
import EmployeeList from "./components/EmployeeList";
export default {
  components: {
    AddEmployee,
    EmployeeList
  },
  mixins: [mixinDevice],
  data() {
    return {
     
    };
  },
  created() {
    
  },
  methods: {
    refresh(){
      this.$refs.employeeList.refresh()
    }
  }
};
</script>

<style lang="less" scoped>
.page-header-wrapper-grid-content-main {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;
  .account-center-avatarHolder {
    text-align: center;
    margin-bottom: 24px;
    & > .avatar {
      margin: 0 auto;
      width: 104px;
      height: 104px;
      margin-bottom: 20px;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .username {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 4px;
    }
  }
  .account-center-detail {
    p {
      margin-bottom: 8px;
      padding-left: 26px;
      position: relative;
    }
    i {
      position: absolute;
      height: 14px;
      width: 14px;
      left: 0;
      top: 4px;
      background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
    }
    .title {
      background-position: 0 0;
    }
    .group {
      background-position: 0 -22px;
    }
    .address {
      background-position: 0 -44px;
    }
  }
  .account-center-tags {
    .ant-tag {
      margin-bottom: 8px;
    }
  }
  .account-center-team {
    .members {
      a {
        display: block;
        margin: 12px 0;
        line-height: 24px;
        height: 24px;
        .member {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 24px;
          max-width: 100px;
          vertical-align: top;
          margin-left: 12px;
          transition: all 0.3s;
          display: inline-block;
        }
        &:hover {
          span {
            color: #1890ff;
          }
        }
      }
    }
  }
  .tagsTitle,
  .teamTitle {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 12px;
  }
}
</style>
<style lang="less" scoped>
.account-settings-info-main {
  width: 100%;
  display: flex;
  height: 100%;
  overflow: auto;
  &.mobile {
    display: block;
    .account-settings-info-left {
      border-right: unset;
      border-bottom: 1px solid #e8e8e8;
      width: 100%;
      height: 50px;
      overflow-x: auto;
      overflow-y: scroll;
    }
    .account-settings-info-right {
      padding: 20px 40px;
    }
  }
  .account-settings-info-left {
    border-right: 1px solid #e8e8e8;
    width: 224px;
  }
  .account-settings-info-right {
    flex: 1 1;
    padding: 8px 40px;
    .account-settings-info-title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      margin-bottom: 12px;
    }
    .account-settings-info-view {
      padding-top: 12px;
    }
  }
}
</style>
<template>
  <div class="page-header-index-wide">
    <!-- <a-spin :delay="500" :spinning="isLoadding"> -->
      <a-tabs type="card">
        <a-tab-pane tab="基本设置" key="1">
          <base-setting :baseInfo="baseInfo" :id="id" ></base-setting>
        </a-tab-pane>
        <a-tab-pane tab="人脸信息" key="2">
          <face-info :platformId="baseInfo.CardNo"></face-info>
        </a-tab-pane>
        <a-tab-pane tab="出入记录" key="3">
          <inout-list-page :faceId="baseInfo.CardNo"></inout-list-page>
        </a-tab-pane>
        <a-tab-pane tab="多角色设置" key="4">
          {{id}}
          <role-setting :userId="id"></role-setting>
        </a-tab-pane>
      </a-tabs>
    <!-- </a-spin> -->
  </div>
</template>

<script>
import BaseSetting from "./BaseSetting";
import RoleSetting from "./RoleSetting";
import FaceInfo from "./FaceInfo";
import InoutListPage from "@/views/machine/inoutPage/InoutListPage";
import { getEmployee } from "@/api/staff";
export default {
  components: {
    RoleSetting,
    BaseSetting,
    FaceInfo,
    InoutListPage
  },
  props: {
    id: String
  },
  data() {
    return {
      baseInfo: {
        Name: "",
        Sex: "",
        account: "",
        password: "",
        CardNo: "",
        Nation: "",
        Birth: "",
        Address: "",
        accountProperties: "",
        maritalStatus: "",
        education: "",
        phoneNumber: "",
        EOD: "",
        TermDate: "",
        employeePictrue: ""
      },
      isLoadding: false
    };
  },
  created() {},
  methods: {
    handleGetEmployeeInfo() {
      // this.isLoadding = true;
      getEmployee(this.id).then(res => {
        // this.isLoadding = false;
        this.baseInfo.Name = res.data.authorization.name;
        this.baseInfo.Sex = res.data.sex;
        this.baseInfo.account = res.data.account;
        this.baseInfo.CardNo = res.data.authorization.identify_card;
        this.baseInfo.Nation = res.data.staffInformation.nation;
        this.baseInfo.Birth = res.data.authorization.birth;
        this.baseInfo.Address = res.data.staffInformation.address;
        this.baseInfo.accountProperties =
          res.data.staffInformation.household_register_type;
        this.baseInfo.maritalStatus = res.data.staffInformation.marital_status;
        this.baseInfo.education = res.data.staffInformation.education;
        this.baseInfo.phoneNumber = res.data.staffInformation.contact;
        this.baseInfo.EOD = res.data.staffInformation.enter_office_date;
        this.baseInfo.TermDate = res.data.staffInformation.arrival_date;
        this.baseInfo.employeePictrueres =
          res.data.staffInformation.identify_card_url;
      });
    },

  },
  watch: {
    // $route(val) {},
    id: {
      handler: function(val) {
        if(val!=''){
          this.handleGetEmployeeInfo();
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>
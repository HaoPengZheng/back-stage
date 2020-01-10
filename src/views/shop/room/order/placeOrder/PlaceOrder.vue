<template>
  <div class="place-order-warp">
    <user-search></user-search>
     <a-row>
      <a-col :sm="24" :md="24" :lg="24" :xl="13">
        <good-select></good-select>
      </a-col>
      <a-col :sm="24" :md="24" :lg="24" :xl="11">
   
         <order-detail></order-detail>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import UserSearch from "./components/UserSearch";
import UserInfo from "./components/UserInfo";
import GoodSelect from "./components/GoodSelect";
import OrderDetail from "./components/OrderDetail";
import CustomerInfo from "./components/CustomerInfo";
import BusOrder from "./components/BusOrder";
import DatePrice from "./components/DatePrice";
export default {
  components: {
    UserSearch,
    UserInfo,
    GoodSelect,
    OrderDetail,
    CustomerInfo,
    BusOrder,
    DatePrice
  },
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this),
      info: {
        name: "刘光光",
        vipLevel: "白银会员",
        points: "2000分",
        phone: "15919289952",
        oldCardNumber: "8602585",
        birthday: "2019/01/06",
        tagInfo: "喜欢吃辣，蔡少盐",
        email: "",
        address: "广东省珠海市斗门区斗门镇珠海XXXX"
      },
      visible: false
    };
  },
  methods: {
    handleSubmit() {},
    onChange() {},
   
  }
};
</script>

<style lang="less" scoped>
.place-order-warp {
  background: #fff;
  padding: 10px 20px 20px;
  .action {
    display: flex;
    justify-content: center;
  }
}
</style>

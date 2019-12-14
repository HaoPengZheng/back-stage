<template>
  <div class="place-order-warp">
    <user-search></user-search>
    <!-- <user-info :info="info"></user-info> -->
    <a-row>
      <a-col :sm="24" :md="24" :lg="24" :xl="13">
        <good-select></good-select>
      </a-col>
      <a-col :sm="24" :md="24" :lg="24" :xl="11">
        <a-button type="primary" @click="selectDate">选择日期</a-button>
         <order-detail></order-detail>
        <a-drawer
          title="商品日期选择"
          width="800"
          placement="right"
          :closable="true"
          @close="onClose"
          :visible="visible"
        >
          <date-price></date-price>
          <div
            :style="{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          padding: '10px 16px',
          textAlign: 'right',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px',
        }"
          >
            <a-button style="marginRight: 8px" @click="onClose">取消</a-button>
            <a-button @click="onClose" type="primary">确认</a-button>
          </div>
        </a-drawer>
      </a-col>
    </a-row>
    <!-- <customer-info></customer-info> -->
    <!-- <bus-order></bus-order> -->
    <div>
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="额外大餐庙会人数" :label-col="{ span: 9 }" :wrapper-col="{ span: 6 }">
          <a-input v-decorator="['name']" />
        </a-form-item>
        <a-form-item>
          <div class="action">
            <a-button type="primary" style="background:green;border:0;margin-right:8px">待订订单</a-button>
            <a-button type="primary" style="background:red;border:0;margin-right:8px">保留订单</a-button>
            <a-button type="primary">手机下单</a-button>
          </div>
        </a-form-item>
      </a-form>
    </div>
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
    selectDate() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    }
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

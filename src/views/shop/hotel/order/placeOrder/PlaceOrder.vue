<template>
  <div class="place-order-warp">
    <user-search></user-search>
     <a-row>
      <a-col :sm="24" :md="24" :lg="24" :xl="13">
        <good-select></good-select>

         <a-select v-model="goodType" @change="handleGoodTypeChange" style="width: 200px">
        
            <a-select-option
              v-for="type in goodTypeOptions"
              :key="`type-${type.id}`"
              :value="type.id"
            >{{type.name}}</a-select-option>
          </a-select>
          <a-select
            v-decorator="[
            'storeType',
            {
              rules: [{ required: true, message: 'Username is required!' }],
            }]"
            style="width: 200px"
          >
            <a-select-option
              v-for="subType in subGoodTypeOptions"
              :key="subType.id"
            >{{subType.name}}</a-select-option>
          </a-select>
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
import { getGoodTypeList } from "@/api/good";
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
      visible: false,
      goodTypeOptions:[],
      subGoodTypeOptions:[],
      goodType:''
    };
  },
  created(){
    this.initData()
  },
  methods: {
    handleSubmit() {},
    onChange() {},
    initData(){
      this.initGoodType()
    },
    initGoodType(){
      getGoodTypeList().then(res => {
        this.goodTypeOptions = res.data.data;
        console.log(res)
        this.goodType = this.goodTypeOptions[0].id;

        if (
          this.goodTypeOptions[0].hasOwnProperty("children") &&
          this.goodTypeOptions[0].children.length > 0
        ) {
          this.subGoodTypeOptions = this.goodTypeOptions[0].children;
          this.form.setFieldsValue({
            storeType: this.goodTypeOptions[0].children[0].id
          });
        } else {
          this.subGoodTypeOptions = [];
          this.form.setFieldsValue({
            storeType: ""
          });
        }
      });
    },
    //商品类目联动
    handleGoodTypeChange(value) {
      this.goodTypeOptions.forEach(ele => {
        if (value == ele.id) {
          this.subGoodTypeOptions = ele.children;
          if (ele.hasOwnProperty("children") && ele.children.length > 0) {
            this.form.setFieldsValue({
              storeType: ele.children[0].id
            });
          } else {
            this.form.setFieldsValue({
              storeType: ""
            });
          }
        }
      });
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

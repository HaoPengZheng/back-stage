<template>
  <div>
    <radio-btn :items="goodTypeOptions" v-model="roomType"></radio-btn>
    <radio-btn :items="subGoodTypeOptions" v-model="activeGood"></radio-btn>
    <div>
      <a-radio-group
        :defaultValue="goodTypeOptions[0].id"
        buttonStyle="solid"
        @change="handleGoodTypeChange"
        v-model="roomType"
      >
        <a-radio-button
          :value="goodType.id"
          v-for="goodType in goodTypeOptions"
          :key="goodType.id"
        >{{goodType.name}}</a-radio-button>
      </a-radio-group>
    </div>
    <div>
      <a-radio-group
        :defaultValue="subGoodTypeOptions[0].id"
        buttonStyle="solid"
        v-model="activeGood"
      >
        <a-radio-button
          :value="subGoodType.id"
          v-for="subGoodType in subGoodTypeOptions"
          :key="subGoodType.id"
        >{{subGoodType.name}}</a-radio-button>
      </a-radio-group>
    </div>
  </div>
</template>

<script>
import { RadioBtn } from "@/components";
import { getGoodTypeList } from "@/api/good";
export default {
  components: {
    RadioBtn
  },
  data() {
    return {
      roomType: "",
      activeGood: "",
      goodTypeOptions: [],
      goodType: ""
    };
  },
  created() {
    this.initData();
  },
  watch: {
    roomType: {
      immediate: true,
      handler: function(val) {
        console.log(val);
        this.handleGoodTypeChange(val);
      }
    }
  },
  methods: {
    initData() {
      this.initGoodType();
    },
    initGoodType() {
      getGoodTypeList().then(res => {
        this.goodTypeOptions = res.data.data;
        console.log(res);
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
      console.log(value);
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
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 16px; /*滚动条宽度*/
  height: 8px; /*滚动条高度*/
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 8px; /*滚动条的圆角*/
  background-color: #ddd; /*滚动条的背景颜色*/
}
</style>

<template>
  <div class="add-lottery">
    <steps :steps="steps" :active="activeStep"></steps>
    <div class="form-list">
      <div class="left">
        <img src="https://img.yzcdn.cn/wscump/lottery/lucky-draw-preview2.png" />
      </div>
      <div class="right">
        <form-create
          v-show="activeStep == 0"
        ></form-create>
        <form-lottery-item
          v-show="activeStep == 1"
        ></form-lottery-item>
        <publish-lottery v-show="activeStep == 2"></publish-lottery>
      </div>
    </div>

  </div>
</template>

<script>
import Steps from "@/components/Steps";
import FormCreate from "./components/FormCreate";
import FormLotteryItem from "./components/FormLotteryItem";
import PublishLottery from "./components/PublishLottery";
import {mixinAddLotteryState} from './mixin'
export default {
  name: "AddLottery",
  components: { FormLotteryItem, FormCreate, Steps,PublishLottery },
  mixins: [mixinAddLotteryState],
  data() {
    return {
      steps: [
        { title: "1. 创建活动" },
        { title: "2. 奖项设置" },
        { title: "3. 完成" }
      ]
    };
  },
};
</script>

<style scoped lang="less">
.add-lottery {
  padding: 16px;
  background: #fff;
}
.steps {
  margin-bottom: 16px;
}
.form-list {
  display: flex;
  justify-content: center;
  padding: 20px;
  .left {
    flex: 4;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    img {
      width: 300px;
      height: auto;
      vertical-align: top;
    }
  }
  .right {
    flex: 7;
    margin-left: 50px;
  }
}
.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  /deep/ .ant-btn + .ant-btn {
    margin-left: 50px;
  }
}
</style> 
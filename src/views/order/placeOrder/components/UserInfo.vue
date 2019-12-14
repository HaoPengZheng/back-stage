<template>
  <div class="user-info-warp">
    <a-popover placement="bottomLeft">
      <template slot="content">
        
        <p><a-icon type="euro" />{{info.points}}</p>
        <p><a-icon type="crown" />{{info.vipLevel}}</p>
        <p><a-icon type="phone" />{{info.phone}}</p>
        <p><a-icon type="environment" />{{info.address}}</p>
      </template>
      <template slot="title">
        <span>用户个人资料</span>
      </template>
      <a-button type="link">{{info.name}}({{info.phone}},{{info.vipLevel}})</a-button>
    </a-popover>
  </div>
</template>

<script>
export default {
  props: {
    // info: Object
  },
  data(){
    return{
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
      }
    }
  }
};
</script>

<style lang="less" scoped>
.user-info-warp {
  .info-item {
    font-size: 16px;
    width: 100%;
    border-bottom: 1px solid #ddd;
    display: block;
    padding: 8px 0;
  }
}
</style>

<template>
  <div class="user-info-warp">
   
    <a-popover placement="bottomLeft"  trigger="click">
      <template slot="content">
        <user-profile :userInfo="data"></user-profile>
        <!-- <p><a-icon type="euro" />{{info.points}}</p>
        <p><a-icon type="crown" />{{info.vipLevel}}</p>
        <p><a-icon type="phone" />{{info.phone}}</p>
        <p><a-icon type="environment" />{{info.address}}</p> -->
      </template>
      <template slot="title">
        <span>用户个人资料</span>
      </template>
      <a-button type="link">{{data.realName}}({{data.phone}})</a-button>
    </a-popover>
  </div>
</template>

<script>
import {UserProfile} from '@/components'
export default {
   components:{
    UserProfile
  },
  props: {
    data: Object
  },
  computed:{

  },
  data(){
    return{
       
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

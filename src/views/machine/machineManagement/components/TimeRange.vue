<template>
  <div>
    <a-tag color="#f50" v-show="data.state == 0">未同步</a-tag>
    <a-tag color="#87d068" v-show="data.state == 1">成功</a-tag>
    {{data.sjdName}}:{{data.sjb}}-{{data.sje}}
    <a-tag color="#f50" v-show="data.xq1 == 1">周一</a-tag>
    <a-tag color="#f50" v-show="data.xq2 == 1">周二</a-tag>
    <a-tag color="#f50" v-show="data.xq3 == 1">周三</a-tag>
    <a-tag color="#f50" v-show="data.xq4 == 1">周四</a-tag>
    <a-tag color="#f50" v-show="data.xq5 == 1">周五</a-tag>
    <a-tag color="#f50" v-show="data.xq6 == 1">周六</a-tag>
    <a-tag color="#f50" v-show="data.xq7 == 1">周日</a-tag>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  }
};
</script>

<style>
</style>
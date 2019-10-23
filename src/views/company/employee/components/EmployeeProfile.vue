<template>
  <div class="page-header-index-wide">
    <a-tabs type="card">
      <a-tab-pane tab="基本设置" key="1"><base-setting></base-setting></a-tab-pane>
      <a-tab-pane tab="考勤记录" key="2">Content of Tab Pane 2</a-tab-pane>
      <a-tab-pane tab="" key="3">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import BaseSetting from './BaseSetting'
export default {
  components: {
    BaseSetting
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
  watch: {
    $route(val) {}
  }
};
</script>

<style lang="less" scoped>
</style>
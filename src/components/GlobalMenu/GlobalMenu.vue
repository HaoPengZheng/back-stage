<template>
  <a-menu
    theme="dark"
    mode="inline"
    :openKeys.sync="openKeys"
    v-model="currentPath"
    @click="changeMenu"
  >
    <template v-for="menuItem in addRouters[0].children">
      <a-sub-menu :key="menuItem.path">
        <span slot="title">
          <a-icon :type="menuItem.meta.icon" v-if="menuItem.meta.icon!==undefined&&menuItem.meta.icon!=''" />
          <span>{{menuItem.meta.title}}</span>
        </span>
        <a-menu-item :key="item.path" v-for="item in menuItem.children">
          <a-icon :type="item.meta.icon" v-if="item.meta.icon!==undefined&&item.meta.icon!=''" />
          <span>{{item.meta.title}}</span>
        </a-menu-item>
      </a-sub-menu>
    </template>
  </a-menu>
</template>

<script>
import { mapState } from "vuex";
import { mixinDevice } from "@/utils/mixin";
export default {
  data() {
    return {
      openKeys: [
        this.$router.currentRoute.matched[
          this.$router.currentRoute.matched.length - 2
        ].path
      ],
      currentPath: [this.$router.currentRoute.path]
    };
  },
  mixins: [mixinDevice],
  created() {},
  computed: {
    ...mapState({
      addRouters: state => state.permissinon.addRouters
    })
  },
  methods: {
    changeMenu(e) {
      this.$router.push(e.key).catch(err=>err);
    }
  },
  watch: {
    $route: function(newVal) {
      this.currentPath = [];
      this.currentPath.push(newVal.path);
      // if (!this.isMobile()) {
      //   this.openKeys = [];
      //   this.openKeys.push(newVal.matched[newVal.matched.length - 2].path);
      // }
    }
  }
};
</script>

<style>
</style>

<template>
  <a-menu
    theme="dark"
    mode="inline"
    :openKeys.sync="openKeys"
    v-model="currentPath"
    @click="changeMenu"
  >
    <template v-for="menuItem in addRouters[0].children">
      <a-sub-menu :key="menuItem.name">
        <span slot="title">
          <a-icon :type="menuItem.meta.icon" v-if="menuItem.meta.icon!==undefined&&menuItem.meta.icon!=''" />
          <span>{{menuItem.meta.title}}</span>
        </span>
        <a-menu-item :key="item.name" v-for="item in menuItem.children">
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
        ].name
      ],
      currentPath: [this.$router.currentRoute.name]
    };
  },
  mixins: [mixinDevice],
  created() {},
  computed: {
    ...mapState({
      addRouters: state => state.permissinon.shopRouters
    })
  },
  methods: {
    changeMenu(e) {
      this.$router.push({name:e.key,params:this.$router.params}).catch(err=>err);
    }
  },
  watch: {
    $route: function(newVal) {
      this.currentPath = [];
      console.log(this.currentPath)
      this.currentPath.push(newVal.name);
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

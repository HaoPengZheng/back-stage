<template>
  <a-layout class="layout" id="layout">
    <a-spin :spinning="isPageLoadding" tip="数据加载中,请稍后..." :delay="200">
      <a-layout id="components-layout-demo-custom-trigger" style="min-height:100vh">
        <a-drawer
          v-if="isMobile()"
          :wrapClassName="`drawer-sider`"
          placement="left"
          :closable="true"
          @close="onClose"
          width="240"
          :visible="!collapsed"
        >
          <a-layout-sider
            :trigger="null"
            collapsible
            width="240"
            v-model="collapsed"
            style="min-height: 100vh"
          >
            <global-logo />

            <global-menu />
          </a-layout-sider>
        </a-drawer>
        <a-layout-sider
          v-if="!isMobile()"
          :trigger="null"
          collapsible
          width="240"
          v-model="collapsed"
          :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
        >
          >
          <global-logo />

          <global-menu />
        </a-layout-sider>
        <a-layout :style="styleObject">
          <global-header :collapsed="collapsed" @toggle="toggle"></global-header>
          <multi-tab></multi-tab>
          <div class="layout-content" id="layout-content">
            <router-view></router-view>
          </div>

          <a-layout-footer>
            <global-footer />
          </a-layout-footer>
        </a-layout>
      </a-layout>
    </a-spin>
  </a-layout>
</template>
<script>
import {
  GlobalHeader,
  GlobalFooter,
  GlobalMenu,
  GlobalLogo,
  MultiTab
} from "@/components";
import { mapState, mapActions } from "vuex";
import { mixinDevice } from "@/utils/mixin";
export default {
  components: {
    GlobalHeader,
    GlobalFooter,
    GlobalMenu,
    GlobalLogo,
    MultiTab
  },
  mixins: [mixinDevice],
  data() {
    return {
      collapsed: false,
      target: () => {
        return document.getElementById("layout");
      }
    };
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      isPageLoadding: state => state.app.isPageLoadding
    }),
    styleObject() {
      if (this.collapsed) {
        if(this.device == 'mobile'){
          return {
            marginLeft : '0px'
          }
        }
        return {
          marginLeft: "80px"
        };
      } else {
        return {
          marginLeft: "240px"
        };
      }
    }
  },
  created() {},
  methods: {
    ...mapActions(["setSidebar"]),
    toggle() {
      this.setSidebar(!this.collapsed);
    },
    onClose() {
      this.setSidebar(true);
    }
  },
  watch: {
    sidebar(val) {
      this.collapsed = val;
    }
  }
};
</script>
<style scoped lang="less">
@import "../styles/themeMenu.less";
.layout {
  height: 100%;
  .layout-content {
    padding: 10px 20px;
  }
}
</style>
<style lang="less">
.ant-drawer.drawer-sider {
  .sider {
    box-shadow: none;
  }
  .ant-drawer-content-wrapper {
    width: 240px;
  }
  .ant-drawer-wrapper-body {
    padding: 0;
    background: #272727;
  }

  &.dark {
    .ant-drawer-content {
      background-color: rgb(0, 21, 41);
    }
  }
  &.light {
    box-shadow: none;
    .ant-drawer-content {
      background-color: #fff;
    }
  }

  .ant-drawer-body {
    padding: 0;
  }
}
.ant-layout-sider-children {
  overflow: auto;
}
</style>


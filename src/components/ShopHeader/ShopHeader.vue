<template>
  <a-layout-header style="background: #fff; padding: 0;border-bottom:2px solid #eee">
    <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggle" />
    <a-tag color="#87d068" style="margin-left:8px;" @click="jumpToCompanyChoose">回到公司</a-tag>
    <!-- <a-tag style="margin-left:8px;">店内</a-tag> -->
    <a-select
      showSearch
      placeholder="选择店"
      optionFilterProp="children"
      style="width: 200px"
      @change="handleChange"
      :filterOption="filterOption"
      size="small"
      :defaultValue="activeShop"
    >
      <a-select-option
        v-for="institution in institutions"
        :key="institution.id"
        :value="institution.id"
      >{{institution.name}}</a-select-option>
    </a-select>
    <div class="user-menu">
      <user-menu></user-menu>
    </div>
  </a-layout-header>
</template>

<script>
import UserMenu from "@/components/UserMenu/UserMenu";
import { mapState } from "vuex";
export default {
  name: "GlobalHeader",
  components: {
    UserMenu
  },
  props: {
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      visible: true,
      oldScrollTop: 0
    };
  },
  computed: {
    ...mapState({
      institutions: state => state.shop.institutions,
      shopId: state => state.app.shopId,
    }),
    activeShop(){
      let activeShop= null
      if(activeShop == null || activeShop == undefined){
        if(this.$ls.get('shop')){
          activeShop = this.$ls.get('shop').id
        }
      }
      return activeShop
    }
  },
  created(){
      this.$store.dispatch("getInstitutionsList");
  },
  methods: {
    toggle() {
      this.$emit("toggle");
    },
    jumpToCompanyChoose() {
      this.$router.push("/dashboard/shop");
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    handleChange(shopId) {
      let activeShop= null
      this.institutions.forEach((ele,index)=>{
        if(ele.id == shopId){
          activeShop = ele
        }
      })
      this.$ls.set("shop", activeShop);
      this.$store
        .dispatch("ResetRouter")
        .then(res => {
          this.$store.dispatch("setShop", activeShop);
        })
        .then(res => {
          this.$router.push("/shop");
        });
    }
  },
  beforeDestroy() {
    document.body.removeEventListener("scroll", this.handleScroll, true);
  }
};
</script>

<style lang="less">
.header-animat {
  position: relative;
  z-index: 999;
}
.showHeader-enter-active {
  transition: all 0.25s ease;
}
.showHeader-leave-active {
  transition: all 0.5s ease;
}
.showHeader-enter,
.showHeader-leave-to {
  opacity: 0;
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.user-menu {
  float: right;
}
</style>

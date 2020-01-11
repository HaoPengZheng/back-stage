<template>
  <div>
    <a-button type="primary" @click="showDrawer">后台创建用户</a-button>
    <a-drawer
      title="后台创建新用户"
      :width="720"
      @close="onClose"
      :visible="visible"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    >
      <add-user-form ref="addUserForm" @finish="onClose"></add-user-form>
      <div
        :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }"
      >
        <a-button :style="{marginRight: '8px'}" @click="onClose">取消</a-button>
        <a-button @click="handleSubmit" type="primary">提交</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import AddUserForm from "../Form/AddUserForm";
export default {
  components: {
    AddUserForm
  },
  data() {
    return {
      form: this.$form.createForm(this),
      visible: false
    };
  },
  methods: {
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    handleSubmit(){
        this.$refs.addUserForm.handleSubmit()
    },
  }
};
</script>

<style>
</style>
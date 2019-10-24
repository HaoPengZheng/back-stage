<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <div style="margin-left:10px">
          <a-form layout="vertical">
            <div>
              <div class="card-warp">
                <a-row type="flex" justify="start">
                  <a-col :span="24">
                    <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" :label="`姓名`">
                      <a-input placeholder="请填写用户真实姓名" v-model="Name" />
                    </a-form-item>
                    <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" label="性别">
                      <a-radio-group v-model="Sex">
                        <a-radio :value="0">未知</a-radio>
                        <a-radio :value="1">男</a-radio>
                        <a-radio :value="2">女</a-radio>
                      </a-radio-group>
                    </a-form-item>
                    <a-form-item
                      :label-col="{ span: 3 }"
                      :wrapper-col="{ span: 16 }"
                      :label="`身份证号码`"
                    >
                      <a-input placeholder="请填写身份证号码" v-model="CardNo" />
                    </a-form-item>
                    <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" :label="`民族`">
                      <a-input placeholder="请填写用户民族" v-model="Nation" />
                    </a-form-item>
                    <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" :label="`出生`">
                      <!-- <a-input placeholder="请填写用户真实姓名" v-model="Born" /> -->
                      <a-date-picker v-model="Born"></a-date-picker>
                    </a-form-item>
                    <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" :label="`地址`">
                      <a-input placeholder="请填写用户地址" v-model="Address" />
                    </a-form-item>
                    <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" label="户口性质">
                      <a-radio-group v-model="accountProperties">
                        <a-radio :value="0">城镇户口</a-radio>
                        <a-radio :value="1">农村户口</a-radio>
                      </a-radio-group>
                    </a-form-item>
                    <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" label="婚姻状况">
                      <a-radio-group v-model="maritalStatus">
                        <a-radio :value="0">未知</a-radio>
                        <a-radio :value="1">已婚</a-radio>
                        <a-radio :value="2">未婚</a-radio>
                      </a-radio-group>
                    </a-form-item>
                    <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" label="学历">
                      <a-radio-group v-model="education">
                        <a-radio :value="0">小学</a-radio>
                        <a-radio :value="1">初中</a-radio>
                        <a-radio :value="2">中专</a-radio>
                        <a-radio :value="3">高中</a-radio>
                        <a-radio :value="4">大专</a-radio>
                        <a-radio :value="5">本科</a-radio>
                        <a-radio :value="6">硕士</a-radio>
                        <a-radio :value="7">博士</a-radio>
                      </a-radio-group>
                    </a-form-item>
                    <a-form-item
                      :label-col="{ span: 3 }"
                      :wrapper-col="{ span: 16 }"
                      :label="`联系方式`"
                    >
                      <a-input v-model="phoneNumber" />
                    </a-form-item>
                    <a-form-item
                      :label-col="{ span: 3 }"
                      :wrapper-col="{ span: 16 }"
                      label="账号"
                      :required="false"
                      v-decorator="[
                `account`,
                {
                  rules: [],
                }
              ]"
                    >
                      <a-input placeholder="员工登录的账号" v-model="account" />
                    </a-form-item>
                    <a-form-item
                      :label-col="{ span: 3 }"
                      :wrapper-col="{ span: 16 }"
                      label="密码"
                      :required="false"
                      v-decorator="[
                `password`,
                {
                  rules: [],
                }
              ]"
                    >
                      <a-input placeholder="员工登录的密码" v-model="password" />
                    </a-form-item>
                    <a-form-item
                      :label-col="{ span: 3 }"
                      :wrapper-col="{ span: 16 }"
                      label="到职日期"
                      :required="false"
                    >
                      <a-date-picker v-model="EOD"></a-date-picker>
                    </a-form-item>
                    <a-form-item
                      :label-col="{ span: 3 }"
                      :wrapper-col="{ span: 16 }"
                      label="离职日期"
                      :required="false"
                    >
                      <a-date-picker v-model="TermDate"></a-date-picker>
                    </a-form-item>
                  </a-col>
                </a-row>
                <div class="account-settings-info-view">
                  <a-row type="flex" justify="start">
                    <a-col :md="12"></a-col>
                  </a-row>
                </div>
              </div>
              <div class="card-warp">
                <a-form-item>
                  <a-button type="primary" html-type="submit">提交</a-button>
                  <a-button style="margin-left: 8px">保存</a-button>
                </a-form-item>
              </div>
            </div>
          </a-form>
        </div>
      </a-col>
      <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="$refs.modal.edit(1)">
          <a-icon type="cloud-upload-o" class="upload-icon" />
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <img :src="option.img" />
        </div>
      </a-col>
    </a-row>

    <avatar-modal ref="modal" @ok="setavatar" />
  </div>
</template>

<script>
import AvatarModal from "./AvatarModal";
export default {
  components: {
    AvatarModal
  },
  data() {
    return {
      // cropper
      preview: {},
      option: {
        img:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        info: true,
        size: 1,
        outputType: "jpeg",
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      },

       recv: "",
      Name: "",
      Sex: "",
      Nation: "",
      Born: this.$moment(),
      Address: "",
      CardNo: "",
      Police: "",
      phoneNumber: "",
      accountProperties: 0,
      education: 0,
      maritalStatus: 0,
      account: "",
      password: "",
      EOD: this.$moment(),
      TermDate:this.$moment(),
      machineSelect: [],

    };
  },
  methods: {
    setavatar(url) {
      this.option.img = url;
    }
  }
};
</script>

<style lang="less" scoped>
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}
.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;
    &:hover {
      opacity: 1;
    }
    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }
  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
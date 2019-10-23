<template>
  <a-spin :spinning="loadding">
    <div class="content-warp">
      <h2>此页面功能需要控件才能正常使用</h2>
      <object type="application/cert-reader" id="CertCtl" width="0" height="0">找不到控件</object>
      <div class="idCardReader-control">
        <a-button type="primary" style="margin-right:8px" @click="connect">连接设备</a-button>
        <!-- <a-button type="primary" style="margin-right:8px" @click="getVersion()">版本</a-button>
        <a-button type="primary" style="margin-right:8px" @click="getStatus()">状态</a-button>-->
        <a-button
          type="primary"
          style="margin-right:8px;background:#f50;border-color:#f50"
          @click="readCert"
        >读卡</a-button>
        <!-- <a-button type="primary" style="margin-right:8px" @click="readACardId()">读A卡</a-button>
        <a-button type="primary" style="margin-right:8px" @click="readBCardId()">读B卡</a-button>-->
        <a-button type="danger" style="margin-right:8px" @click="disconnect()">断开连接</a-button>读卡信息:
        <a-tag color="#f50" v-if="resultFlag">{{errorMsg}}</a-tag>
        <a-tag color="#87d068" v-else>{{errorMsg}}</a-tag>
      </div>
      <a-form layout="vertical">
        <div>
          <div class="card-warp">
            <a-divider orientation="left">主要信息</a-divider>
            <a-row type="flex" justify="start">
              <a-col :span="14">
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
                <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" :label="`身份证号码`">
                  <a-input placeholder="请填写用户真实姓名" v-model="CardNo" />
                </a-form-item>
                <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" :label="`民族`">
                  <a-input placeholder="请填写用户真实姓名" v-model="Nation" />
                </a-form-item>
                <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" :label="`出生`">
                  <a-input placeholder="请填写用户真实姓名" v-model="Born" />
                </a-form-item>
                <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" :label="`地址`">
                  <a-input placeholder="请填写用户真实姓名" v-model="Address" />
                </a-form-item>
                <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" label="户口性质">
                  <a-radio-group v-model="Sex">
                    <a-radio :value="0">城镇户口</a-radio>
                    <a-radio :value="1">农村户口</a-radio>
                  </a-radio-group>
                </a-form-item>
                <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" label="婚姻状况">
                  <a-radio-group v-model="Sex">
                    <a-radio :value="0">未知</a-radio>
                    <a-radio :value="1">已婚</a-radio>
                    <a-radio :value="2">未婚</a-radio>
                  </a-radio-group>
                </a-form-item>
                <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" label="学历">
                  <a-radio-group v-model="Sex">
                    <a-radio :value="0">初中</a-radio>
                    <a-radio :value="1">高中</a-radio>
                    <a-radio :value="2">大专</a-radio>
                    <a-radio :value="3">本科</a-radio>
                    <a-radio :value="4">硕士</a-radio>
                    <a-radio :value="5">博士</a-radio>
                  </a-radio-group>
                </a-form-item>
                <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" :label="`联系方式`">
                  <a-input
                    v-decorator="[
                `phone_number`,
                {
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                }
              ]"
                    placeholder="placeholder"
                  />
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
                  <a-input placeholder="exp@admin.com" />
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
                  <a-input placeholder />
                </a-form-item>
                <a-form-item
                  :label-col="{ span: 3 }"
                  :wrapper-col="{ span: 16 }"
                  label="到职日期"
                  :required="false"
                >
                  <a-date-picker></a-date-picker>
                </a-form-item>
              </a-col>
              <a-col :span="10">
                <div class="column-center">
                  <a-avatar :src="Base64JpgDisplay" shape="square" :size="160" icon="user" />
                  <div class="margin-top-10">
                    <a-upload
                      name="file"
                      :multiple="false"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      :beforeUpload="beforeUpload"
                      @change="handleChange"
                    >
                      <a-button>
                        <a-icon type="upload" />重新上传
                      </a-button>
                    </a-upload>
                  </div>
                </div>
                <!-- <img :src="Base64JpgDisplay" /> -->
                <!-- <a-form-item :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" :label="`错误信息：`">
                  <a-tag color="#f50" v-if="resultFlag">{{errorMsg}}</a-tag>
                  <a-tag color="#87d068" v-else>{{errorMsg}}</a-tag>
                </a-form-item>
                <a-form-item
                  :label-col="{ span: 4 }"
                  :wrapper-col="{ span: 16 }"
                  :label="`status：`"
                >{{status}}</a-form-item>-->
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
      <!-- <table border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <a-input type="button" name="透传" value="透传" @click="extTransData()" />
        </td>
        <td align="right">发送数据：</td>
        <td>
          <a-input type="text" name="send"  />
        </td>
        <td align="right">接收数据：</td>
        <td>
          <a-input type="text" name="recv"  />
        </td>
      </tr>
      </table>-->

      <!-- <table border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <a-input type="button" name="开始读卡" value="开始读卡" @click="startReadCard()" />
        </td>
        <td>
          <a-input type="button" name="停止读卡" value="停止读卡" @click="stopReadCard()" />
        </td>
      </tr>
      </table>-->
    </div>
  </a-spin>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  data() {
    return {
      loadding: false,
      recv: "",
      Name: "",
      Sex: "",
      Nation: "",
      Born: "",
      Address: "",
      CardNo: "",
      Police: "",
      ActivityLFrom: "",
      ActivityLTo: "",

      resultFlag: "",
      errorMsg: "",
      status: "",
      ret: "",

      Base64JpgDisplay: "",
      Base64JpgFile: ""
    };
  },
  methods: {
    calltest(result) {
      this.clearForm();
      this.loadding = true;
      // document.all["ret"].innerHTML = result;

      var ret = JStrToObj(result);
      if (ret.resultFlag == -1) {
        this.DisplayInfo(ret);
      } else {
        this.fillForm(ret);
      }
    },

    a() {
      var d = document.createElement("CertCtl");
      if (d != null) {
        alert(d);
      } else {
        alert("未加载");
      }
    },

    startReadCard() {
      CertCtl.ReadCardCallBack = this.calltest;
      CertCtl.startReadCard();
      return;
    },

    stopReadCard() {
      CertCtl.stopReadCard();
      this.clearForm();
      return;
    },

    connect() {
      this.clearForm();
      var ret = CertCtl.connect();
      this.ret = ret;
      ret = this.JStrToObj(ret);
      this.DisplayInfo(ret);
      return;
    },

    getVersion() {
      this.clearForm();
      var ret = CertCtl.getVersion();
      this.ret = ret;
      ret = JStrToObj(ret);
      this.DisplayInfo(ret);
      return;
    },

    getStatus() {
      this.clearForm();
      var ret = CertCtl.getStatus();
      this.ret = ret;
      ret = JStrToObj(ret);
      this.DisplayInfo(ret);
      return;
    },

    readCert() {
      this.clearForm();
      this.loadding = true;
      setTimeout(() => {
        this.loadding = false;
      }, 1500);
      CertCtl.ReadCardCallBack = this.calltest;

      var ret = CertCtl.readCert();
      this.ret = ret;
      ret = this.JStrToObj(ret);
      if (ret.resultFlag == -1) {
        this.DisplayInfo(ret);
      } else {
        this.fillForm(ret);
      }
    },

    disconnect() {
      this.clearForm();
      var ret = CertCtl.disconnect();
      this.ret = ret;
      ret = JStrToObj(ret);
      this.DisplayInfo(ret);
      return;
    },
    ReadIDCard() {
      var ret = JStrToObj(CertCtl.connect());

      if (ret.resultFlag == -1) {
        this.clearForm();
        this.DisplayInfo(ret);
        return;
      }

      ret = JStrToObj(CertCtl.readCert());
      if (ret.resultFlag == -1) {
        this.clearForm();
        this.DisplayInfo(ret);
      } else {
        fillForm(ret);
      }

      ret = JStrToObj(CertCtl.disconnect());
      if (ret.resultFlag == -1) {
        this.DisplayInfo(ret);
        return;
      }
    },

    readACardId() {
      this.clearForm();
      var ret = CertCtl.readACardId();
      // document.all["recv"].value = ret;
      return;
    },

    readBCardId() {
      this.clearForm();
      var ret = CertCtl.readBCardId();
      // document.all["recv"].value = ret;
      return;
    },

    extTransData() {
      this.clearForm();
      var ret = CertCtl.extTransData(document.all["send"].value);
      // document.all["recv"].value = ret;
      return;
    },

    JStrToObj(str) {
      return eval("(" + str + ")");
    },

    DisplayInfo(ret) {
      // if (ret.resultFlag == 0) {
      //   document.all["errorMsg"].style.color = "Green";
      // } else {
      //   document.all["errorMsg"].style.color = "Red";
      // }

      // document.all["resultFlag"].innerHTML = ret.resultFlag;
      this.resultFlag = ret.resultFlag;
      // document.all["errorMsg"].innerHTML = ret.errorMsg;
      this.errorMsg = ret.errorMsg;

      if (ret.status != null) this.status = ret.status;
      else this.status = "";
    },

    fillForm(ret) {
      this.DisplayInfo(ret);
      var pName = ret.resultContent.partyName;
      var pSex = ret.resultContent.gender;
      var pNation = ret.resultContent.nation;
      var pBorn = ret.resultContent.bornDay;
      var pAddress = ret.resultContent.certAddress;
      var pCardNo = ret.resultContent.certNumber;
      var pPolice = ret.resultContent.certOrg;
      var pActivityLFrom = ret.resultContent.effDate;
      var pActivityLTo = ret.resultContent.expDate;

      this.Name = pName;
      this.Sex = pSex;
      this.Nation = pNation;
      this.Born = pBorn;
      this.Address = pAddress;
      this.CardNo = pCardNo;
      this.Police = pPolice;
      this.ActivityLFrom = pActivityLFrom;
      this.ActivityLTo = pActivityLTo;

      this.resultFlag = ret.resultFlag;
      this.errorMsg = ret.errorMsg;

      if (ret.status != null) this.status = ret.status;
      else this.status = "";
      this.Base64JpgDisplay =
        "data:image/jpg;base64," + ret.resultContent.identityPic;
      // document.all["Base64JpgDisplay"].src =
      //   "data:image/jpg;base64," + ret.resultContent.identityPic;
      CertCtl.Base64Data2File(
        ret.resultContent.identityPic,
        "c:\\CertReader\\zp.jpg"
      );
      // document.all["Base64JpgFile"].src =
      //   "file:///C:/CertReader/zp.jpg?a=" + pCardNo;
    },

    clearForm() {
      this.recv = "";
      this.Name = "";
      this.Sex = "";
      this.Nation = "";
      this.Born = "";
      this.Address = "";
      this.CardNo = "";
      this.Police = "";
      this.ActivityLFrom = "";
      this.ActivityLTo = "";

      this.resultFlag = "";
      this.errorMsg = "";
      this.status = "";
      this.ret = "";

      this.Base64JpgDisplay = "";
      this.Base64JpgFile = "";
    },

    handleChange(info) {
      console.log(info)
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.Base64JpgDisplay = imageUrl;
          this.loading = false;
        });
      }
    },

    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isImage = file.type.indexOf('image')>-1
      if (!isImage) {
        this.$message.error("You can only upload image file!");
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error("Image must smaller than 10MB!");
      }
      return isImage && isLt10M;
    }
  }
};
</script>
<style lang="less" scoped>
.idCardReader-control {
  margin-bottom: 10px;
}
</style>


<template>
  <a-spin :spinning="loadding">
    <div>
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
        <span>此页面功能需要控件才能正常使用,请使用360浏览器</span>
      </div>
      <a-form layout="vertical" :form="form" @submit="handleMechineSubmit">
        <div>
          <div class="card-warp">
            <a-divider orientation="left">主要信息</a-divider>
            <a-row type="flex" justify="start">
              <a-col :span="14">
                <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" :label="`姓名`">
                  <a-input
                    placeholder="请填写用户真实姓名"
                    v-decorator="['Name', { rules: [{ required: true, message: '真实姓名是必须要填的!' }] }]"
                  />
                </a-form-item>
                <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" label="性别">
                  <a-radio-group
                    v-decorator="['Sex', { rules: [{ required: true, message: '性别是必须要填的!'}]}]"
                  >
                    <a-radio :value="0">未知</a-radio>
                    <a-radio :value="1">男</a-radio>
                    <a-radio :value="2">女</a-radio>
                  </a-radio-group>
                </a-form-item>
                <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" :label="`身份证号码`">
                  <a-input
                    placeholder="请填写身份证号码"
                    v-decorator="['CardNo', { rules: [{ required: true, message: '身份证号码是必须要填的!'}]}]"
                  />
                </a-form-item>
                <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" :label="`民族`">
                  <a-input
                    placeholder="请填写用户民族"
                    v-decorator="['Nation', { rules: [{ required: true, message: '民族是必须要填的!'}]}]"
                  />
                </a-form-item>
                <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" :label="`出生`">
                  <!-- <a-input placeholder="请填写用户真实姓名" v-model="Born" /> -->
                  <a-date-picker
                    v-decorator="['Born', { rules: [{ required: true, message: '出生日期是必须要填的!'}]}]"
                  ></a-date-picker>
                </a-form-item>
                <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" :label="`地址`">
                  <a-input
                    placeholder="请填写用户地址"
                    v-decorator="['Address', { rules: [{ required: true, message: '地址是必须要填的!'}]}]"
                  />
                </a-form-item>
                <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" label="职位">
                  <a-cascader
                    :options="roleOptions"
                    placeholder="Please select"
                    v-decorator="['role', { rules: [{ required: true, message: '职位是必须要填的!'}]}]"
                  />
                </a-form-item>
                <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" label="账号">
                  <a-input
                    placeholder="员工登录的账号"
                    v-decorator="['account', { rules: [{ required: true, message: '账号是必须要填的(将作为员工查数据使用)!'}]}]"
                  />
                </a-form-item>
                <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" label="密码">
                  <a-input
                    placeholder="员工登录的密码"
                    v-decorator="['password', { rules: [{ required: true, message: '密码是必须要填的!'}]}]"
                  />
                </a-form-item>
                <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" label="户口性质">
                  <a-radio-group
                    v-decorator="['accountProperties', { rules: [{ required: false}]}]"
                  >
                    <a-radio :value="0">城镇户口</a-radio>
                    <a-radio :value="1">农村户口</a-radio>
                  </a-radio-group>
                </a-form-item>
                <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" label="婚姻状况">
                  <a-radio-group v-decorator="['maritalStatus', { rules: [{ required: false}]}]">
                    <a-radio :value="0">未知</a-radio>
                    <a-radio :value="1">已婚</a-radio>
                    <a-radio :value="2">未婚</a-radio>
                  </a-radio-group>
                </a-form-item>
                <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" label="学历">
                  <a-radio-group v-decorator="['education', { rules: [{ required: false}]}]">
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
                <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" :label="`联系方式`">
                  <a-input v-decorator="['phoneNumber', { rules: [{ required: false}]}]" />
                </a-form-item>

                <a-form-item
                  :label-col="{ span: 3 }"
                  :wrapper-col="{ span: 16 }"
                  label="到职日期"
                  :required="false"
                >
                  <a-date-picker v-decorator="['EOD', { rules: [{ required:false}]}]"></a-date-picker>
                </a-form-item>
                <a-form-item
                  :label-col="{ span: 3 }"
                  :wrapper-col="{ span: 16 }"
                  label="离职日期"
                  :required="false"
                >
                  <a-date-picker v-decorator="['TermDate', { rules: [{ required:false}]}]"></a-date-picker>
                </a-form-item>
              </a-col>
              <a-col :span="10">
                <div class="column-center">
                  <a-avatar :src="Base64JpgDisplay" shape="square" :size="160" icon="user" />
                  <div class="margin-top-10">
                    <a-upload
                      name="file"
                      :multiple="false"
                      :beforeUpload="beforeUpload"
                      @change="handleChange"
                      :data="uploadAddData"
                      :headers="uploadHeader"
                      :action="uploadUrl"
                      :remove="handleImageRemove"
                    >
                      <a-button>
                        <a-icon type="upload" />重新上传
                      </a-button>
                    </a-upload>
                  </div>
                  <a-form-item
                    :label-col="{ span: 3 }"
                    :wrapper-col="{ span: 16 }"
                    label="下放机器："
                    style="width:100%"
                  >
                    <a-checkbox-group v-model="machineSelect">
                      <a-checkbox
                        :value="machine.id"
                        :key="machine.id"
                        v-for="machine in machineData"
                      >{{machine.name}}</a-checkbox>
                    </a-checkbox-group>
                  </a-form-item>
                </div>
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
              <a-button type="primary" html-type="submit" @click="handleMechineSubmit">新增员工</a-button>
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
import { addMachine, getMachineList, appAddPerson } from "@/api/machine";
import { createEmployee } from "@/api/staff";
import { getInstitutions } from "@/api/institutions";
import { deleteAttach, addAttach } from "@/api/attach";
export default {
  data() {
    return {
      uploadUrl: "http://192.168.101.115:8089/api/attach",

      form: this.$form.createForm(this, { name: "addEmployee" }),
      loadding: false,
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
      TermDate: this.$moment(),
      machineSelect: [],

      ActivityLFrom: "",
      ActivityLTo: "",

      resultFlag: "",
      errorMsg: "",
      status: "",
      ret: "",

      Base64JpgDisplay: "",
      Base64JpgFile: "",
      employeePictrue:'',
      machineData: [],

      role: [],
      roleOptions: []
    };
  },
  created() {
    this.initData();
  },
  computed: {
    uploadAddData() {
      return {
        module: "employee"
      };
    },
    uploadHeader() {
      return {
        company: this.$ls.get("company").id
      };
    }
  },
  methods: {
    initData() {
      let params = {
        company: this.$ls.get("company").id
      };
      getMachineList(params).then(res => {
        this.machineData = res.data.data;
        this.machineSelect = this.machineData.map(ele => ele.id);
      });
      getInstitutions().then(res => {
        this.roleOptions = this.generateOption(res.data.data);
      });
    },
    generateOption(data) {
      if (!data instanceof Array || data.length == 0) {
        return [];
      }
      return data.map(institution => {
        return {
          value: "institution-" + institution.id,
          label: institution.name,
          slots: {
            icon: "institution"
          },
          children: this.generateOption(institution.children.data).concat(
            this.generateRole(institution.roles)
          )
        };
      });
    },
    generateRole(roles) {
      return roles.map(role => {
        return {
          value: "role-" + role.id,
          label: role.title,
          slots: {
            icon: "zhiwei"
          }
        };
      });
    },
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

      this.form.setFieldsValue({
        Name: pName,
        Sex: pSex,
        Nation: pNation,
        Born: this.$moment(
          pBorn.substr(0, 4) +
            "-" +
            pBorn.substr(4, 2) +
            "-" +
            pBorn.substr(6, 2)
        ),
        Address: pAddress,
        CardNo: pCardNo,
        Police: pPolice
      });
      this.Name = pName;
      this.Sex = pSex;
      this.Nation = pNation;
      this.Born = this.$moment(
        pBorn.substr(0, 4) + "-" + pBorn.substr(4, 2) + "-" + pBorn.substr(6, 2)
      );
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
      // this.dataURLtoFile()
      CertCtl.Base64Data2File(
        ret.resultContent.identityPic,
        "c:\\CertReader\\zp.jpg"
      );
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
      console.log(info);
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.Base64JpgDisplay = imageUrl;
          console.log(imageUrl);
          this.loading = false;
        });
      }
    },

    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isImage = file.type.indexOf("image") > -1;
      if (!isImage) {
        this.$message.error("You can only upload image file!");
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error("Image must smaller than 10MB!");
      }
      return isImage && isLt10M;
    },
    handleMechineSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.loadding = true;

          let role = values.role[values.role.length - 1].split("-")[1];
          let employee = {
            name: values.Name,
            sex: values.Sex,
            account: values.account,
            password: values.password,
            role,
            identity_card: values.CardNo,
            nation: values.Nation,
            birth: values.Born && values.Born.format("L").replace(/\//g, "-"),
            address: values.Address,
            household_register_type: values.accountProperties,
            marital_status: values.maritalStatus,
            education: values.education,
            contact: values.phoneNumber,
            enter_office_date:
              values.EOD && values.EOD.format("L").replace(/\//g, "-"),
            arrival_date:
              values.TermDate && values.TermDate.format("L").replace(/\//g, "-")
          };
          createEmployee(employee).then(res => {
            this.$message.success("添加成功！");
            let machine = this.machineSelect.map(id => {
              let obj = {};
              this.machineData.forEach(machine => {
                if (machine.id == id) {
                  obj.mac = machine.mac;
                  obj.effectTime = values.TermDate.valueOf();
                  obj.timeLimit =
                    "000000000000000000000000000000000000000000000000";
                }
              });
              return obj;
            });
            let mechineData = {
              machine,
              dept: [],
              face: {
                img: this.Base64JpgDisplay.substr(22),
                faceName: this.Name,
                wgCardNo: "",
                flag: 0,
                platformId: this.CardNo,
                company: this.$ls.get("company").id
              }
            };
            appAddPerson(mechineData).then(res => {
              console.log(res);
            });
          });
        }
      });
    },
    handleImageRemove(file) {
      let attachId;
      if (file.hasOwnProperty("response")) {
        attachId = file.response.data.attach_id;
      } else if (file.hasOwnProperty("attach_id")) {
        attachId = file.attach_id;
      }
      deleteAttach(attachId).then(res => {
        this.$message.success("删除成功！");
      });
    },
    dataURLtoFile(dataurl, filename) {//将base64转换为文件
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }
  }
};
</script>
<style lang="less" scoped>
.idCardReader-control {
  margin-bottom: 10px;
}
</style>


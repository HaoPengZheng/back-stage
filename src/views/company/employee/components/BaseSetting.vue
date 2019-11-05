<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <div style="margin-left:10px">
          <a-form layout="vertical" :form="form" @submit="handleSubmit">
            <div>
              <div class="card-warp">
                <a-divider orientation="left">主要信息</a-divider>
                <a-row type="flex" justify="start">
                  <a-col :span="24">
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
                    <a-form-item
                      :label-col="{ span: 3 }"
                      :wrapper-col="{ span: 16 }"
                      :label="`身份证号码`"
                    >
                      <a-input
                        placeholder="请填写身份证号码"
                        :disabled="true"
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
                      <!-- <a-input placeholder="请填写用户真实姓名" v-model="Birth" /> -->
                      <a-date-picker
                        v-decorator="['Birth', { rules: [{ required: true, message: '出生日期是必须要填的!'}]}]"
                      ></a-date-picker>
                    </a-form-item>
                    <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" :label="`地址`">
                      <a-input
                        placeholder="请填写用户地址"
                        v-decorator="['Address', { rules: [{ required: true, message: '地址是必须要填的!'}]}]"
                      />
                    </a-form-item>
                    <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" label="账号">
                      <a-input
                        :disabled="true"
                        placeholder="员工登录的账号"
                        v-decorator="['account', { rules: [{ required: true, message: '账号是必须要填的(将作为员工查数据使用)!'}]}]"
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
                      <a-radio-group
                        v-decorator="['maritalStatus', { rules: [{ required: false}]}]"
                      >
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
                    <a-form-item
                      :label-col="{ span: 3 }"
                      :wrapper-col="{ span: 16 }"
                      :label="`联系方式`"
                    >
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
                </a-row>
                <div class="account-settings-info-view">
                  <a-row type="flex" justify="start">
                    <a-col :md="12"></a-col>
                  </a-row>
                </div>
              </div>
              <div class="card-warp">
                <a-form-item>
                  <a-button type="primary" html-type="submit">保存</a-button>
                   <a-popconfirm title="注意，这不是离职操作，确认彻底删除此条信息吗？" okText="确定" cancelText="取消"  @confirm="confirmDeleteEmployee">
                   <a-button type="danger" style="margin-left:8px" >删除</a-button>
                   </a-popconfirm>
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
import { deleteEmployee,updateEmployee } from "@/api/staff";
export default {
  components: {
    AvatarModal
  },
  props: {
    baseInfo: Object,
    id: String || Number
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

      form: this.$form.createForm(this, { name: "addEmployee" }),

      recv: "",
      Name: "",
      Sex: "",
      Nation: "",
      Birth: this.$moment(),
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
      machineSelect: []
    };
  },
  methods: {
    confirmDeleteEmployee(){
      deleteEmployee(this.id).then(res=>{
        console.log(this.$message.success('删除成功'))
        this.$emit('refresh')
      })
    },
    setavatar(url) {
      this.option.img = url;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let updateData = {
            realname: values.Name,
            sex: values.Sex,
            account: values.account,
            identify_card: values.CardNo,
            nation: values.Nation,
            birth: values.Birth && values.Birth.format("L").replace(/\//g, "-"),
            address: values.Address,
            household_register_type: values.accountProperties,
            marital_status: values.maritalStatus,
            education: values.education,
            contact: values.phoneNumber,
            enter_office_date:
              values.EOD && values.EOD.format("L").replace(/\//g, "-"),
            arrival_date:
              values.TermDate &&
              values.TermDate.format("L").replace(/\//g, "-"),
            identify_card_url: this.option.img
          };
          updateEmployee(updateData, this.id).then(res => {
            this.$message.success("修改成功");
          });
        }
      });
    }
  },
  watch: {
    baseInfo: {
      deep: true,
      handler: function(val) {
        console.log(val.Sex == "男");
        let Sex = 0;
        if (val.Sex == "男") {
          Sex = 1;
        } else if (val.Sex == "女") {
          Sex = 2;
        } else {
          Sex = 0;
        }
        console.log(val.Sex);
        this.form.setFieldsValue({
          Name: val.Name,
          Sex: Sex,
          account: val.account,
          CardNo: val.CardNo,
          Nation: val.Nation,
          Birth: this.$moment(val.Birth),
          Address: val.Address,
          accountProperties: val.accountProperties,
          maritalStatus: val.maritalStatus,
          education: val.education,
          phoneNumber: val.phoneNumber,
          EOD: this.$moment(val.EOD),
          TermDate: this.$moment(val.TermDate),
          employeePictrueres: val.employeePictrueres
        });
        this.$set(this.option, "img", val.employeePictrueres);
        // this.option = val.employeePictrueres
      }
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
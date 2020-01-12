<template>
  <a-form :form="form" layout="vertical" @submit="handleSubmit">
    <div>
      <div class="card-warp">
        <a-divider>主要信息</a-divider>
        <a-row>
          <a-col>
            <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" :label="`用户类型：`">
              <a-tag color="#f50">用户</a-tag>
            </a-form-item>
            <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" :label="`真实姓名`">
              <a-input
                v-decorator="[
                `realname`,
                {
                  rules: [{
                    required: true,
                    message: '真实姓名是必填的!',
                  }],
                }
              ]"
                placeholder="请填写用户真实姓名"
              />
            </a-form-item>

            <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" :label="`联系方式`">
              <a-input-group compact>
                <a-select v-decorator="[`area_code`,{initialValue:'86'}]">
                  <a-select-option value="86">+86</a-select-option>
                </a-select>
                <a-input
                  style=" width: 300px;backgroundColor: #fff"
                  v-decorator="[`phone_number`,]"
                  placeholder="请输入联系方式"
                />
              </a-input-group>
            </a-form-item>
          </a-col>
        </a-row>
      </div>
      <div class="card-warp">
        <a-divider>身份信息</a-divider>
        <div>
          <a-form-item label="用户组：" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
            <a-radio-group v-decorator="[`role`,]">
              <a-radio
                :value="role.id"
                v-for="role in roleListOptions"
                :key="role.id"
              >{{role.title}}</a-radio>
            </a-radio-group>
          </a-form-item>
        </div>
      </div>
      <div class="card-warp">
        <a-divider>基本账户信息</a-divider>
        <div class="account-settings-info-view">
          <a-row >
            <a-col :md="24">
              <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" label="用户名">
                <a-input placeholder="给自己起个名字" v-decorator="[`name`,]" />
              </a-form-item>
              <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" label="性别">
                <a-radio-group v-decorator="[`sex`,]"  >
                  <a-radio :value="1">男</a-radio>
                  <a-radio :value="2">女</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item
                :label-col="{ span: 3 }"
                :wrapper-col="{ span: 16 }"
                label="电子邮箱"
                :required="false"
              >
                <a-input
                  placeholder
                  v-decorator="[
                `email`,
                {
                  rules: [],
                }
              ]"
                />
              </a-form-item>
              <a-form-item
                :label-col="{ span: 3 }"
                :wrapper-col="{ span: 16 }"
                label="生日"
                :required="false"
              >
                <a-date-picker
                  v-decorator="[
                `birth`,
                {
                  rules: [],
                }
              ]"
                ></a-date-picker>
              </a-form-item>
              <!-- <a-form-item
                :label-col="{ span: 3 }"
                :wrapper-col="{ span: 16 }"
                label="地址"
                :required="false"
              >
                <a-textarea rows="3" placeholder="You are not alone." />
              </a-form-item>-->
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </a-form>
</template>

<script>
import { addUser } from "@/api/user";
import { getClientRoles } from "@/api/member";
export default {
  data() {
    return {
      loading: false,
      expand: false,
      form: this.$form.createForm(this),
      userType: "",
      checkAll: false,
      roleListOptions: []
    };
  },
  computed: {
    param() {
      return {
        type: "client",
        include: "rule",
        page: 1,
        per_page: 100
      };
    }
  },
  created() {
    this.initData();
  },
  methods: {
    //初始化数据
    initData() {
      this.initRoles();
    },
    //初始化角色列表
    initRoles() {
      getClientRoles(this.param).then(res => {
        this.roleListOptions = res.data.data;
      });
    },
    onRoleChange(selectValue) {
      console.log(selectValue);
    },
    handleClick() {
      this.loading = !this.loading;
    },
    handleReset() {
      this.form.resetFields();
    },
    toggle() {
      this.expand = !this.expand;
    },
    handleSubmit(e) {
      if (e) {
        e.preventDefault();
      }
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          let userModel = {
            area_code: values.area_code,
            phone_number: values.phone_number,
            realname: values.realname,
            name: values.name,
            role:values.role,
            sex: values.sex,
            email: values.email
          };
          addUser(userModel).then(res => {
              console.log(userModel)
              this.$message.success('添加成功')
              this.$emit('finish')
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.card-warp {
  margin: 10px 0;
  padding: 0 30px;
}
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
  box-shadow: 0 0 3px #ccc;
  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.3rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: opacity 0.3s;
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


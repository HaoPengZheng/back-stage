<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="24">
        <div style="margin-left:10px">
          <a-form layout="vertical">
            <div>
              <a-row type="flex" justify="start">
                <a-col :span="24">
                  <h3>{{renderTitle}}（id:{{id}}{{type}}）</h3>
                  <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }" :label="`岗位名称`">
                    <a-input placeholder="岗位名称" v-model="Name" />
                  </a-form-item>
                  <a-form-item>
                    <a-button type="primary" @click="handleCreateStaff">提交</a-button>
                    <a-button type="danger" @click="handleDeleteStaff" style="margin-left:8px">删除</a-button>
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </a-form>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { createStaff,updateStaff,deleteStaff } from "@/api/staff";
export default {
  components: {},
  data() {
    return {
      Name: ""
    };
  },
  props: {
    type: String,
    id: String,
    title: String
  },
  computed: {
    renderTitle() {
      if (this.type == "role") {
        return "修改岗位名";
      } else {
        return `新增岗位(${this.title}部门)`;
      }
    }
  },
  watch: {
    title(val) {
      if (this.type == "role") {
        this.Name = val;
      }else{
        this.Name = ''
      }
    }
  },
  methods: {
    handleCreateStaff() {
      let data = {
        title:this.Name,
        institution_id:parseInt(this.id),
        type:'staff'
      }
     
      if(this.type == 'role'){
        updateStaff({title:this.Name},this.id).then(res=>{
          
           this.$emit('refresh')
        })
      }else{
         createStaff(data).then(res=>{
          
          this.$emit('refresh')
        })
      }
    },
    handleDeleteStaff(){
      deleteStaff(this.id).then(res=>{
        this.$message.success('删除成功')
        this.$emit('refresh')
      })
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
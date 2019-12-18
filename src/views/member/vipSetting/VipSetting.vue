<template>
  <div class="card-list" ref="content">
    <a-list rowKey="id" :grid="{gutter: 24, lg: 2, md: 2, sm: 1, xs: 1}"   :pagination="pagination"  :dataSource="dataSource">
      <a-list-item slot="renderItem" slot-scope="item">
        <template v-if="!item || item.id === undefined">
          <a-button class="new-btn" type="dashed" @click="handleShowAddMemberDrawer">
            <a-icon type="plus" />新增会员等级
          </a-button>
        </template>
        <template v-else>
          <a-card :hoverable="true">
            <div slot="title" style="text-align:center">{{item.title}}</div>
            <a href="#" slot="extra">设置</a>
            <div>
              <div>
                <a-icon type="rocket" style="color: #333;margin-right: 10px;font-size:16px" />
                <span style="margin-right: 10px;color: #333;font-size:16px">升级条件</span>
                <span style="font-size: 12px;color: #999;">满足以下条件并且消费者主动授权加入会员后将成为{{item.title}}</span>
                <a-divider dashed style="margin:5px" />交易额：{{item.rule&&item.rule.threshold}}
              </div>
              <div style="margin-top:15px;">
                <a-icon type="gift" style="color: #333;margin-right: 10px;font-size:16px" />
                <span style="margin-right: 10px;color: #333;font-size:16px">会员权益</span>
                <span style="font-size: 12px;color: #999;">普通会员(VIP1)可享受的店铺权益</span>
                <a-divider dashed style="margin:5px" />折扣：{{item.rule?parseFloat(item.rule.discount)*100+'%'+`(${parseFloat(item.rule.discount)*10}折)`:''}}
              </div>
            </div>
          </a-card>
        </template>
      </a-list-item>
    </a-list>
    <a-drawer
      width="640"
      title="添加会员等级"
      placement="right"
      :closable="false"
      @close="addMemberDrawerVisible = false"
      :visible="addMemberDrawerVisible"
    >
      <a-form :form="addRoleForm">
        <a-form-item label="会员等级名：" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['title', { rules: [{ required: true, message: '请输入会员等级名' }] }]"
          />
        </a-form-item>
        <a-form-item label="等级交易额：" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['threshold', { rules: [{ required: true, message: '请输入等级交易额！' }] }]"
          /> 
        </a-form-item>
        <a-form-item label="折扣：" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['discount', { rules: [{ required: true, message: '请输入折扣！' }] }]"
          />
        </a-form-item>
      </a-form>
      <div
        :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          textAlign: 'right',
        }"
      >
        <a-button :style="{marginRight: '8px'}" @click="addMemberDrawerVisible = false">取消</a-button>
        <a-button @click="handleAddMember" type="primary">提交</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import {getClientRoles, createRoles } from "@/api/member";

export default {
  name: "CardList",
  data() {
    return {
      addMemberDrawerVisible: false,
      addRoleForm: this.$form.createForm(this, { name: "addRoleForm" }),
      vipRolesList:[],
       pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
        showTotal: total => {
          return `总共${total}条记录`;
        },
      },
    };
  },
  created(){
    this.initData()
  },
  computed:{
    dataSource(){
      let dataSource = [{}].concat(this.vipRolesList)
      return dataSource
    },
    param() {
      return {
        type:'client',
        include:'rule',
        page: this.pagination.current,
        per_page: this.pagination.pageSize,
      };
    }
  },
  methods: {
    initData(){
      this.doGetClientRoles()
    },
    doGetClientRoles(){
      getClientRoles(this.param).then(res=>{
        this.$set(this.pagination, "current", this.param.page);
        this.$set(this.pagination, "pageSize", this.param.per_page);
        this.$set(this.pagination, "total", res.data.meta.pagination.total);
        if(res.data.data instanceof Array){
           this.vipRolesList = res.data.data
        }else{
          this.vipRolesList = []
        }
       
      })
    },
    handleShowAddMemberDrawer() {
      this.addMemberDrawerVisible = true;
    },
    handleAddMember(e) {
      e.preventDefault();
      this.addRoleForm.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          let data = {
            title: values.title,
            institution_id: "",
            type: "client",
            threshold: values.threshold,
            discount:values.discount
          };
          createRoles(data).then(res => {
            this.$message.success('添加成功')
            this.initData()
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/components/index.less";
.card-list {
  /deep/ .ant-card-body:hover {
    .ant-card-meta-title > a {
      color: #fff;
    }
  }
  /deep/ .ant-card-meta-title {
    margin-bottom: 12px;
    & > a {
      display: inline-block;
      max-width: 100%;
      color: #fff;
    }
  }
  /deep/ .meta-content {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 64px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    margin-bottom: 1em;
  }
}
.card-avatar {
  width: 48px;
  height: 48px;
  border-radius: 48px;
}
.ant-card-actions {
  background: #f7f9fa;
  li {
    float: left;
    text-align: center;
    margin: 12px 0;
    color: #fff;
    width: 50%;
    &:not(:last-child) {
      border-right: 1px solid #e8e8e8;
    }
    a {
      color: #fff;
      line-height: 22px;
      display: inline-block;
      width: 100%;
      &:hover {
        color: @primary-color;
      }
    }
  }
}
.new-btn {
  background-color: #fff;
  border-radius: 2px;
  width: 100%;
  height: 230px;
}
</style>
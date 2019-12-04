<template>
  <div class="card-list" ref="content">
    <a-list rowKey="id" :grid="{gutter: 24, lg: 2, md: 2, sm: 1, xs: 1}" :dataSource="dataSource">
      <a-list-item slot="renderItem" slot-scope="item">
        <template v-if="!item || item.id === undefined">
          <a-button class="new-btn" type="dashed" @click="handleShowAddMemberDrawer">
            <a-icon type="plus" />新增会员等级
          </a-button>
        </template>
        <template v-else>
          <a-card :hoverable="true">
            <div slot="title" style="text-align:center">普通会员(VIP1)</div>
            <a href="#" slot="extra">设置</a>
            <div>
              <div>
                <a-icon type="rocket" style="color: #333;margin-right: 10px;font-size:16px" />
                <span style="margin-right: 10px;color: #333;font-size:16px">升级条件</span>
                <span style="font-size: 12px;color: #999;">满足以下条件并且消费者主动授权加入会员后将成为普通会员(VIP1)</span>
                <a-divider dashed style="margin:5px" />交易额：
                <a-input-number style="width:100px" size="small"></a-input-number>
              </div>
              <div style="margin-top:15px;">
                <a-icon type="gift" style="color: #333;margin-right: 10px;font-size:16px" />
                <span style="margin-right: 10px;color: #333;font-size:16px">会员权益</span>
                <span style="font-size: 12px;color: #999;">普通会员(VIP1)可享受的店铺权益</span>
                <a-divider dashed style="margin:5px" />折扣：
                <a-input-number style="width:100px" size="small"></a-input-number>
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
       <a-form>
        <a-form-item label="会员等级名："  :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-input
              v-decorator="['lotteryItemName', { rules: [{ required: true, message: '请输入奖项名！' }] }]"
            />
        </a-form-item>
         <a-form-item label="等级交易额："  :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-input
              v-decorator="['lotteryItemName', { rules: [{ required: true, message: '请输入奖项名！' }] }]"
            />
        </a-form-item>
         <a-form-item label="折扣："  :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-input
              v-decorator="['lotteryItemName', { rules: [{ required: true, message: '请输入奖项名！' }] }]"
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
        <a-button :style="{marginRight: '8px'}" @click="addMemberDrawerVisible = false">Cancel</a-button>
        <a-button @click="handleAddMember" type="primary">Submit</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
const dataSource = [];
dataSource.push({});
for (let i = 0; i < 11; i++) {
  dataSource.push({
    id: i,
    title: "Alipay",
    avatar:
      "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
    content:
      "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。"
  });
}
export default {
  name: "CardList",
  data() {
    return {
      description:
        "段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态， 提供跨越设计与开发的体验解决方案。",
      linkList: [
        { icon: "rocket", href: "#", title: "快速开始" },
        { icon: "info-circle-o", href: "#", title: "产品简介" },
        { icon: "file-text", href: "#", title: "产品文档" }
      ],
      extraImage:
        "https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png",
      addMemberDrawerVisible: false,
      dataSource
    };
  },
  methods: {
    handleShowAddMemberDrawer() {
      this.addMemberDrawerVisible = true;
    },
    handleAddMember(){

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
      color:#fff;
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
  height: 188px;
}
</style>
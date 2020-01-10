<template>
  <div>
    <under-line lineColor="red">
      <div slot="left">订单详情</div>
      <div slot="right">总价:￥2800</div>
    </under-line>
    <!-- <order-detail-item></order-detail-item>
    <order-detail-item></order-detail-item>-->
    <a-table :columns="columns" :dataSource="data">
      <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
      <span slot="customTitle">
        <a-icon type="smile-o" />商品名
      </span>
      <span slot="tags" slot-scope="tags">￥：19.00</span>
      <span slot="action" slot-scope="text, record">
        <a href="javascript:;">删除</a>
        <a-divider type="vertical" />
        <a href="javascript:;" class="ant-dropdown-link">
          More actions
          <a-icon type="down" />
        </a>
      </span>
    </a-table>
     <a-button type="primary" @click="selectDate">选择日期</a-button>
    <a-drawer
      title="商品日期选择"
      width="800"
      placement="right"
      :closable="true"
      @close="onClose"
      :visible="visible"
    >
      <date-price></date-price>
      <div
        :style="{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          padding: '10px 16px',
          textAlign: 'right',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px',
        }"
      >
        <a-button style="marginRight: 8px" @click="onClose">取消</a-button>
        <a-button @click="onClose" type="primary">确认</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { UnderLine } from "@/components";
import DatePrice from "./DatePrice";
import OrderDetailItem from "./OrderDetailItem";
const columns = [
  {
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" }
  },
  {
    title: "数量",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "使用日期",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "单价",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" }
  },
  {
    title: "小计",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" }
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

const data = [
  {
    key: "1",
    name: "大餐庙会二人入格套票",
    age: 32,
    address: "2019-04-28",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "2019-04-28",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "2019-04-28",
    tags: ["cool", "teacher"]
  }
];
export default {
  components: {
    UnderLine,
    OrderDetailItem,
    DatePrice
  },
  data() {
    return { data, columns, visible: false };
  },
  methods: {
    selectDate() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    }
  }
};
</script>

<style>
</style>

<template>
  <div>
    <under-line lineColor="red">
      <div slot="left">订单详情</div>
      <div slot="right">总价:￥2800</div>
    </under-line>
    <!-- <order-detail-item></order-detail-item>
    <order-detail-item></order-detail-item> -->
    <a-table :columns="columns" :dataSource="data" rowKey="id">
      <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
      <span slot="customTitle">
        <a-icon type="smile-o" />商品名
      </span>   
      <span slot="tags" slot-scope="tags">
        ￥：19.00
      </span>
      <span slot="action" slot-scope="text, record">
           
        <a href="javascript:;">删除</a>
        <a-divider type="vertical" />
        <a href="javascript:;" class="ant-dropdown-link">
          More actions
          <a-icon type="down" />
        </a>
      </span>
    </a-table>
  </div>
</template>

<script>
import { UnderLine } from "@/components";
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
    OrderDetailItem
  },
  data() {
    return { data, columns };
  }
};
</script>

<style>
</style>

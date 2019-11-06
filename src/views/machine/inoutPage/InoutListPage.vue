<template>
  <div class="content-warp">
    <div>
      <a-input style="width:200px;margin-right:8px" v-model="platformId" placeholder="身份证信息"></a-input>

      <a-date-picker
        :disabledDate="disabledStartDate"
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        v-model="startValue"
        placeholder="开始时间"
        @openChange="handleStartOpenChange"
      />-
      <a-date-picker
        :disabledDate="disabledEndDate"
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="结束时间"
        v-model="endValue"
        :open="endOpen"
        @openChange="handleEndOpenChange"
      />
      <a-button type="primary" style="margin-left:8px;" @click="handlerSearch">查询</a-button>
    </div>
    <div>
      <a-table
        :columns="columns"
        :dataSource="tableData"
        :pagination="pagination"
        @showSizeChange="onShowSizeChange"
        rowKey="inOutId"
      >
        <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
        <span slot="customTitle">
          <a-icon type="smile-o" />Name
        </span>
        <span slot="time" slot-scope="time">
          {{$moment(new Date(time*1000)).format('YYYY-MM-DD HH:mm:ss')}}
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
import { inoutFaceList, machinesLogList } from "@/api/machine";
import moment from "moment";
const columns = [
  {
    dataIndex: "faceid",
    key: "faceid",
    title: "脸ID"
  },
  {
    dataIndex: "facename",
    key: "facename",
    title: "姓名"
  },
  {
    dataIndex: "inOutId",
    key: "inOutId",
    title: "出入Id"
  },
  {
    dataIndex: "mac",
    key: "mac",
    title: "MAC"
  },
  // {
  //   dataIndex: "path",
  //   key: "path",
  //   title: "path"
  // },
  // {
  //   dataIndex: "rand",
  //   key: "rand",
  //   title: "rand"
  // },
  {
    dataIndex:'macName',
    key:'macName',
    title:'设备名称'
  },
  {
    dataIndex: "time",
    key: "time",
    title:"时间",
    scopedSlots: { customRender: 'time' },
  }
];
export default {
  components: {},
  created() {
    this.initData();
  },
  props: {
    faceId: String
  },
  data() {
    return {
      startValue: null,
      endValue: this.$moment(new Date()),
      endOpen: false,
      page: 1,
      limit: 10,
      sort: "desc",
      platformId: "440582199704036138",
      tableData: [],
      pagination: {
        showSizeChanger: true,
        showQuickJumper: true,
        total: 0,
        page: 1,
        onShowSizeChange: (page, pageSize) => {
          this.$set(this.pagination, "page", page);
          this.$set(this.pagination, "pageSize", pageSize);
        },
        onChange: (page, pageSize) => {
          this.$set(this.pagination, "page", page);
          this.$set(this.pagination, "pageSize", pageSize);
        }
      },
      columns
    };
  },
  watch: {
    faceId: {
      immediate: true,
      handler: function(val) {
        this.platformId = val;
      }
    },
    startValue(val) {
      console.log("startValue", val);
    },
    endValue(val) {
      console.log("endValue", val);
    },
    pagination: {
      deep: true,
      handler: function(val) {
        this.handlerSearch();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
    });
  },
  methods: {
    initData() {},
    handlerSearch() {
      let params = {
        page: this.pagination.page,
        limit: this.pagination.pageSize,
        sort: this.sort,
        startTime: this.startValue.format("YYYY-MM-DD HH:mm:ss"),
        endTime: this.endValue.format("YYYY-MM-DD HH:mm:ss"),
        platformId: this.platformId
      };
      machinesLogList(params).then(res => {
        console.log(res.data);

        if (res.data.status == 405) {
          // this.pagination.total = res.data.data.total
          this.$message.error(res.data.msg);
        } else {
          this.tableData = res.data.data.list;
          this.$set(this.pagination, "total", res.data.data.total);
        }
      });
    },
    // Only show error after a field is touched.
    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
    },
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("userName") && getFieldError("userName");
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("password") && getFieldError("password");
    },
    handleSubmit(e) {},
    onShowSizeChange(current, pageSize) {
      this.pagination.pageSize = pageSize;
    }
  }
};
</script>

<style>
</style>
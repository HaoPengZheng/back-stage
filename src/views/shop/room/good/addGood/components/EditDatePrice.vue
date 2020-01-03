<template>
  <div class="price-setting-warp">
    <div>
      <a-checkbox-group @change="onRoleChange">
        <a-checkbox :value="role" v-for="role in roleListOptions" :key="role.id">{{role.title}}</a-checkbox>
      </a-checkbox-group>
    </div>
    <div :style="{ display: 'inline-block', border: '1px solid #d9d9d9', borderRadius: '4px' }">
      <a-calendar @panelChange="onPanelChange" v-model="selectData" :validRange="validRange">
        <div
          class="weekStyle"
          :class="getWeekStyle(value)"
          slot="dateFullCellRender"
          slot-scope="value"
        >
          <a-tag color="#f50">2019大假期</a-tag>
          <div style="float:right">{{value.format('YYYY-MM-DD')}}</div>
          <div>
            <a-input
              addonBefore="价格："
              style="margin:3px 0"
              size="small"
              :disabled="isDisable(value)"
            ></a-input>
            <a-input
              addonBefore="库存："
              style="margin:2px 0"
              size="small"
              :disabled="isDisable(value)"
            ></a-input>
            <template v-for="role in rolesList">
              <a-input
                :key="role.id"
                :addonBefore="`${role.title}：`"
                style="margin:2px 0"
                size="small"
                :disabled="isDisable(value)"
                :ref="`input-${value.format('l')}-${role.id}`"
                @blur="handlePriceChange(value,role,`input-${value.format('l')}-${role.id}`)"
              ></a-input>
            </template>
          </div>
        </div>
        <template slot="monthCellRender" slot-scope="value">
          <div v-if="getMonthData(value)" class="notes-month">
            <section>{{getMonthData(value)}}</section>
            <span>Backlog number</span>
          </div>
        </template>
      </a-calendar>
    </div>
    <div class="btn-control">
      <a-button type="primary" @click="volumeVisible= !volumeVisible" style>批量设置</a-button>
      <a-modal
        title="批量设置价格"
        :visible="volumeVisible"
        @ok="handleOk"
        :confirmLoading="confirmLoading"
        @cancel="handleCancel"
      >
        <div>
          <div class="volume-item">
            <span class="volume-label">时间段：</span>
            <a-range-picker @change="onDateRangeChange"></a-range-picker>
          </div>
          <div class="volume-item">
            <span class="volume-label">规则选择：</span>
          </div>
          <div>
            <a-checkbox-group @change="onVolumeRoleChange">
              <a-checkbox
                :value="role"
                v-for="role in roleListOptions"
                :key="role.id"
              >{{role.title}}</a-checkbox>
            </a-checkbox-group>
          </div>
          <div class="volume-item">
            <span class="volume-label">价格：</span>
            <a-input style="width:200px;" v-model="batchPrice"></a-input>
          </div>
          <div class="volume-item">
            <span class="volume-label">库存：</span>
            <a-input style="width:200px;"></a-input>
          </div>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { EditableCell } from "@/components";
import { getClientRoles } from "@/api/member";
import { mixinAddGoodState } from "../mixin";
import { addGoodPrice } from "@/api/addGood";
export default {
  components: {
    EditableCell
  },
  mixins: [mixinAddGoodState],
  data() {
    return {
      goodName: "大餐庙会2人入格套票",
      goodSubName:
        "（2人入格+温泉2位+早餐2位+大餐庙会2位+单车券+烟花券+游艺券）",
      rackRate: 1750,
      putAwayTime: "2018-04-12 00:00:00",
      soldOutTime: "2020-04-30 00:00:00",
      startTime: "2019-08-15 00:00:00",
      endTime: "2020-04-30 00:00:00",
      previewDateOption: [],
      dateType: "2019大假期价",
      date: "2019-08-27",
      dataSource: [
        {
          key: "0",
          name: "普通用户",
          age: "1900",
          address: "1900"
        },
        {
          key: "1",
          name: "特殊价格旅行社",
          age: "1900",
          address: "1900"
        }
      ],
      count: 2,
      columns: [
        {
          title: "会员级别",
          dataIndex: "name",
          width: "30%",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "价格",
          dataIndex: "age"
        },
        {
          title: "积分",
          dataIndex: "address"
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ],
      dataSource2: [
        {
          key: "0",
          name: "普通用户",
          age: "1900",
          address: "1900"
        },
        {
          key: "1",
          name: "特殊价格旅行社",
          age: "1900",
          address: "1900"
        }
      ],
      columns2: [
        {
          title: "会员级别",
          dataIndex: "name"
        },
        {
          title: "平日",
          dataIndex: "age",
          scopedSlots: { customRender: "editPrice" }
        },
        {
          title: "假期",
          dataIndex: "address",
          scopedSlots: { customRender: "editPrice" }
        }
      ],
      validRange: [this.$moment(), this.$moment("2020-10-1")],
      selectData: this.$moment(),
      volumeVisible: false,
      roleListOptions: [],
      batchDateRange: [],
      batchDateRoleSelect: [],
      batchPrice: 0,
      confirmLoading: false
    };
  },
  created() {
    this.handleDateOption(this.startTime, this.endTime);
    this.initData();
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
  methods: {
    initData() {
      this.initRoles();
    },
    initRoles() {
      getClientRoles(this.param).then(res => {
        this.roleListOptions = res.data.data;
      });
    },
    handleCancel() {
      this.volumeVisible = false;
    },
    handleOk() {
      console.log(this.batchDateRange);
      if (this.batchDateRange.length > 0) {
        let data = {};
        let startDate = this.batchDateRange[0];
        let endDate = this.batchDateRange[1];
        while (!startDate.isSame(endDate)) {
          startDate = startDate.add(1, "days");
          let str = startDate
            .format("l")
            .split("/")
            .join("-");
          data[str] = {};
          for (let i = 0; i < this.batchDateRoleSelect.length; i++) {
            data[str][this.batchDateRoleSelect[i].id] = {
              price: this.batchPrice,
              level: 5,
              is_member: 1,
              date_rule_id: 66
            };
          }
        }
        console.log(data);
        addGoodPrice(data, this.goodId).then(res => {
          console.log(res);
        });
        this.volumeVisible = false;
      }
    },
    onDateRangeChange(date, dateString) {
      this.batchDateRange = date;
    },
    handlePriceChange(value, role, str) {
      console.log(str);
      console.log(this.$refs[str]);
      console.log(this.$refs[str][0].stateValue);
      let inputValue = this.$refs[str][0].stateValue;
      let _this = this;
      this.$confirm({
        title: `确认修改${role.title}在日期${value.format(
          "l"
        )}为价格${inputValue}元吗?`,
        content: h => (
          <div style="color:red;">
            {role.title}({value.format("l")}):{inputValue}
          </div>
        ),
        onOk() {
          console.log("OK");
          _this.handleChangeGoodOneDayPrice(
            value.format("l"),
            role.id,
            inputValue
          );
        },
        onCancel() {
          console.log("Cancel");
        },
        class: "test"
      });
    },
    //处理修改一天价格的接口
    //商品id，日期，角色id，价格，is_member.date_rule_id，
    handleChangeGoodOneDayPrice(date, roleId, price) {
      let data = {};
      data[date] = {};
      data[date][roleId] = {
        price: price,
        level: 5,
        is_member: 1,
        date_rule_id: 66
      };
      addGoodPrice(data, 1411).then(res => {
        console.log(res);
      });
    },
    //根据开始时间和结束时间生成日历选择器
    handleDateOption(start_date, end_date) {
      let start = new Date(start_date);
      let end = new Date(end_date);
      this.previewDateOption = [];
      for (let year = start.getFullYear(); year <= end.getFullYear(); year++) {
        for (
          let month = year == start.getFullYear() ? start.getMonth() + 1 : 1;
          (year == end.getFullYear() && month <= end.getMonth() + 1) ||
          (year != end.getFullYear() && month <= 12);
          month++
        ) {
          this.previewDateOption.push(
            this.$moment(new Date(`${year}-${month}-01`))
          );
        }
      }
    },
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.dataSource = dataSource;
      }
    },
    onDelete(key) {
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(item => item.key !== key);
    },
    handleAdd() {
      const { count, dataSource } = this;
      const newData = {
        key: count,
        name: `Edward King ${count}`,
        age: 32,
        address: `London, Park Lane no. ${count}`
      };
      this.dataSource = [...dataSource, newData];
      this.count = count + 1;
    },
    //处理时间范围选择
    handleDateRangeChange(date, dateString) {
      // 1. 选择时间应该控制在开始~结束时间内
      // 2. 处理日历的选择范围及样式
      this.handleDateOption(dateString[0], dateString[1]);
    },
    disabledDate(currentDate) {
      //选择时间应该控制在开始~结束时间内
      return currentDate < this.$moment(this.startTime);
    },
    onSelect(value) {
      this.date = value.format("l");
    },
    onPanelChange(value) {
      // this.value = value
    },

    onVolumeRoleChange(checkedValue) {
      console.log(checkedValue);
      this.batchDateRoleSelect = checkedValue;
    },

    getListData(value) {
      let listData;
      switch (value.date()) {
        case 8:
          listData = [
            { type: "warning", content: "This is warning event." },
            { type: "success", content: "This is usual event." }
          ];
          break;
        case 10:
          listData = [
            { type: "warning", content: "This is warning event." },
            { type: "success", content: "This is usual event." },
            { type: "error", content: "This is error event." }
          ];
          break;
        case 15:
          listData = [
            { type: "warning", content: "This is warning event" },
            {
              type: "success",
              content: "This is very long usual event。。...."
            },
            { type: "error", content: "This is error event 1." },
            { type: "error", content: "This is error event 2." },
            { type: "error", content: "This is error event 3." },
            { type: "error", content: "This is error event 4." }
          ];
          break;
        default:
      }
      return listData || [];
    },

    getMonthData(value) {
      if (value.month() === 8) {
        return 1394;
      }
    },
    getDay(value) {
      return value.date();
    },
    getWeekStyle(value) {
      let day = value.day();
      let month = value.month();
      let currentMonth = this.selectData.month();

      let currentClass = {};
      if (value < this.$moment()) {
        currentClass.disable = true;
      }
      if (day == 6 || day == 0) {
        currentClass.weekend = true;
      }
      return currentClass;
    },
    isDisable(value) {
      return value < this.$moment();
    },
    onRoleChange(val) {
      this.$store.commit("SET_ROLES_LIST", val);
    },
    handleAddPrice() {
      let data = {
        "2019-09-10": {
          "6": {
            price: 888,
            level: 5,
            is_member: 1,
            date_rule_id: 66
          }
        }
      };
      addGoodPrice(data, 1411).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.weekStyle {
  padding: 10px 5px 10px 5px;
  margin: 0 2px;
  border-top: 2px solid #e8e8e8;
  transition: background 0.3s;
  cursor: pointer;
}
.weekStyle:hover {
  background: #d8e6df;
}
.weekend {
  border-top: 2px solid red;
}
.disable {
  background: #e8e8e8;
  cursor: not-allowed;
  filter: grayscale(100%);
  filter: gray;
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
}
.price-setting-warp {
  position: relative;
}
.volume {
  position: absolute;
  bottom: 32px;
  height: 230px;
  width: 100%;
  border: 2px solid #e8e8e8;
  background: #e8e8e8;
  padding: 20px;
  .volume-item {
    margin: 5px 0;
    display: flex;
    .volume-label {
      width: 100px;
      display: block;
      font-size: 18px;
      font-weight: 600;
    }
  }
}
.btn-control {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
<style>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>
<style lang="less" scoped>
.date-select-warp {
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
}
.time-select {
  margin-bottom: 20px;
}
</style>
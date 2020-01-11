<template>
  <div class="price-setting-warp">
    <div>
      <a-checkbox-group @change="onRoleChange" :value="roleViewSelect">
        <a-checkbox :value="role" v-for="role in roleListOptions" :key="role.id">{{role.title}}</a-checkbox>
      </a-checkbox-group>
      <a-button
        type="primary"
        size="small"
        @click="volumeVisible= !volumeVisible"
        style="margin:5px"
      >批量设置</a-button>
    </div>
    <a-spin :spinning="spinning" :tip="`日历加载中，请稍等...`">
      <div
        class="spin-content"
        :style="{ display: 'inline-block', border: '1px solid #d9d9d9', borderRadius: '4px' }"
      >
        <a-calendar
          @panelChange="onPanelChange"
          v-model="selectData"
          :validRange="validRange"
          v-if="hackRest"
        >
          <div
            v-if="showDatePanelDetail(value)"
            class="weekStyle"
            :class="getWeekStyle(value)"
            slot="dateFullCellRender"
            slot-scope="value"
          >
            <a-tag color="#f50">2019大假期</a-tag>
            <div style="float:right">{{value.format('YYYY-MM-DD')}}</div>
            <div>
              <!-- <a-input
              addonBefore="价格："
              style="margin:3px 0"
              size="small"
              :disabled="isDisable(value)"
              ></a-input>-->
              <!-- <a-input
              addonBefore="库存："
              style="margin:2px 0"
              size="small"
              :disabled="isDisable(value)"
              ></a-input>-->
              <template v-for="role in rolesList">
                <a-input
                  :key="role.id"
                  :addonBefore="`${role.title}：`"
                  style="margin:2px 0"
                  size="small"
                  :disabled="isDisable(value)"
                  :ref="`input-${value.format('YYYY-MM-DD')}-${role.id}`"
                  :defaultValue="getPriceByDate(value,role)"
                  @pressEnter="handlePriceChange(value,role,`input-${value.format('YYYY-MM-DD')}-${role.id}`,getPriceByDate(value,role))"
                  @blur="handlePriceChange(value,role,`input-${value.format('YYYY-MM-DD')}-${role.id}`,getPriceByDate(value,role))"
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
    </a-spin>
    <div class="btn-control">
      <a-button type="primary" @click="volumeVisible= !volumeVisible" style>批量设置</a-button>
      <a-modal
        title="批量设置价格"
        :visible="volumeVisible"
        @ok="handleOk"
        :confirmLoading="confirmLoading"
        @cancel="handleCancel"
      >
        <div class="volume">
          <div class="volume-item">
            <span class="volume-label">时间段：</span>
          </div>
          <div class="volume-item">
            <a-range-picker @change="onDateRangeChange"></a-range-picker>
          </div>

          <div class="volume-item">
            <span class="volume-label">规则选择：</span>
          </div>
          <div class="volume-item">
            <a-checkbox-group @change="onVolumeDaterulesChange">
              <a-checkbox
                :value="daterules"
                v-for="daterules in daterulesData"
                :key="daterules.id"
              ><daterule-tag :daterule="daterules"></daterule-tag></a-checkbox>
            </a-checkbox-group>
          </div>
          <div class="volume-item">
            <span class="volume-label">用户角色：</span>
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
            <template v-for="role in batchDateRoleSelect">
              <div :key="role.id" style="margin:5px 0">
                <a-input
                  style="width:200px;"
                  :addonBefore="`${role.title}：`"
                  :ref="`volume-input-${role.id}`"
                ></a-input>
              </div>
            </template>
          </div>
          <!-- <div class="volume-item">
            <span class="volume-label">库存：</span>
            <a-input style="width:200px;"></a-input>
          </div>-->
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { EditableCell,DateruleTag } from "@/components";
import { getClientRoles } from "@/api/member";
import { mixinAddGoodState } from "../mixin";
import { addGoodPrice, getGoodPrice, getDaterules } from "@/api/addGood";

export default {
  components: {
    EditableCell,
    DateruleTag
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
      confirmLoading: false,
      priceCache: {},
      roleViewSelect: [],
      hackRest: true,
      spinning: false,
      isInHandleOnePrice: false,
      daterulesData: []
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
    },
    getPriceByDate() {
      return function(date, role) {
        let dateString = date.format("YYYY-MM-DD");
        if (this.priceCache.hasOwnProperty(dateString)) {
          if (this.priceCache[dateString].hasOwnProperty(role.id)) {
            if (this.priceCache[dateString][role.id].hasOwnProperty("price")) {
              return this.priceCache[dateString][role.id].price;
            }
            return this.priceCache[dateString][role.id];
          }
        }
        return "";
      };
    }
  },
  watch: {
    priceCache: {
      deep: true,
      immediate: true,
      handler: function(val) {
        this.resetDatePriceInput(val);
      }
    },
    roleViewSelect: {
      deep: true,
      immediate: true,
      handler: function(val) {
        if (val instanceof Array) {
          if (val.length == 0) {
            this.hackRest = false;
          } else {
            this.initPrice();
          }
        }
      }
    },
    hackRest: {
      deep: true,

      handler: function(val) {
        if (val) {
          this.spinning = false;
        } else {
          this.spinning = true;
        }
      }
    }
  },
  methods: {
    initData() {
      this.initRoles();
      this.initPrice();
      this.initDaterulesData();
    },
    initPrice() {
      this.hackRest = false;
      if (!this.goodId) {
        return;
      }
      getGoodPrice({}, this.goodId).then(res => {
        this.priceCache = res.data.price;
        this.resetDatePriceInput();
        this.$nextTick(() => {
          this.hackRest = true;
        });
      });
    },
    initRoles() {
      getClientRoles(this.param).then(res => {
        this.roleListOptions = res.data.data;
      });
    },
    initDaterulesData() {
      getDaterules().then(res => {
        this.daterulesData = res.data.data;
        console.log(this.daterulesData);
      });
    },
    handleCancel() {
      this.volumeVisible = false;
      console.log(this.priceCache);
      this.resetDatePriceInput(this.priceCache);
    },
    handleOk() {
      console.log(this.batchDateRange);
      if (this.batchDateRange.length > 0) {
        let data = {};
        let startDate = this.batchDateRange[0];
        let backupStartDate = this.$moment(startDate.format("YYYY-MM-DD"));
        let endDate = this.batchDateRange[1];

        while (!backupStartDate.isAfter(endDate)) {
          let str = backupStartDate.format("YYYY-MM-DD");
          data[str] = {};
          for (let i = 0; i < this.batchDateRoleSelect.length; i++) {
            var rolePrice = this.$refs[
              `volume-input-${this.batchDateRoleSelect[i].id}`
            ][0].$refs.input.value;
            console.log(
              this.$refs[`volume-input-${this.batchDateRoleSelect[i].id}`][0]
            );
            console.log(rolePrice);
            data[str][this.batchDateRoleSelect[i].id] = {
              price: rolePrice,
              level: 5,
              is_member: 1,
              date_rule_id: 66
            };
          }
          backupStartDate = backupStartDate.add(1, "days");
        }
        this.confirmLoading = true;
        addGoodPrice(data, this.goodId)
          .then(res => {
            this.initPrice();
            setTimeout(() => {
              this.volumeVisible = false;
              this.confirmLoading = false;
              this.$message.success("修改成功");
            }, 1000);
          })
          .catch("修改失败");
      }
    },
    resetDatePriceInput(data) {
      for (let dateKey in data) {
        for (let roleKey in data[dateKey]) {
          let vnode = this.$refs[
            `input-${this.$moment(new Date(dateKey)).format(
              "YYYY-MM-DD"
            )}-${roleKey}`
          ];
          var price = "";
          if (data[dateKey][roleKey].hasOwnProperty("price")) {
            price = data[dateKey][roleKey].price;
          } else {
            price = data[dateKey][roleKey];
          }

          if (vnode instanceof Array) {
            if (vnode.length > 0) {
              vnode[0].$refs.input.value = price;
            }
          } else {
            if (vnode) {
              vnode.$refs.input.value = price;
            }
          }
        }
      }
    },
    onDateRangeChange(date, dateString) {
      this.batchDateRange = date;
    },
    handlePriceChange(value, role, str, defaultValue) {
      console.log(this.isInHandleOnePrice);
      if (this.isInHandleOnePrice) {
        return;
      }

      let inputValue = this.$refs[str][0].stateValue;

      inputValue = parseInt(inputValue);
      defaultValue = parseInt(defaultValue);

      if (isNaN(inputValue)) {
        inputValue = 0;
      }
      if (inputValue == defaultValue) {
        return;
      }
      this.isInHandleOnePrice = true;
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
          _this.isInHandleOnePrice = false;
          _this.handleChangeGoodOneDayPrice(
            value.format("YYYY-MM-DD"),
            role.id,
            inputValue
          );
        },
        onCancel() {
          this.isInHandleOnePrice = false;
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
      addGoodPrice(data, this.goodId)
        .then(res => {
          let obj = {};
          obj[date] = {};
          obj[date][roleId] = price;
          Object.assign(this.priceCache, obj);
          this.$message.success("修改成功");
        })
        .catch(err => {
          this.$message.error("修改失败");
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
      this.hackRest = false;
      this.$nextTick(() => {
        this.hackRest = true;
        this.$nextTick(() => {
          this.resetDatePriceInput(this.priceCache);
        });
      });
    },

    onVolumeRoleChange(checkedValue) {
      this.batchDateRoleSelect = checkedValue.sort((a, b) => {
        return a.id - b.id;
      });
    },
    onVolumeDaterulesChange(checkedValue) {},

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
      let roleSelect = [];
      if (val instanceof Array) {
        roleSelect = val.sort((a, b) => a.id - b.id);
      }
      this.$store.commit("SET_ROLES_LIST", roleSelect);
      this.roleViewSelect = roleSelect;
      this.initPrice();
    },
    showDatePanelDetail(value) {
      return true;
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
  width: 100%;
  .volume-item {
    margin: 10px 0;
    .volume-label {
      width: 80px;
      display: block;
      font-size: 16px;
      font-weight: 800;
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
<style scoped>
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #fff;
  width: 100%;
  min-height: 500px;
}
</style>


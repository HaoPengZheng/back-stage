<template>
  <div class="content-warp">
    <div style="margin-bottom:10px">
      <a-button type="primary" @click="showDrawer">新增设备</a-button>
      <a-drawer
        title="新增设备"
        placement="right"
        :closable="false"
        @close="onClose"
        :visible="newMachineDrawerVisible"
        width="50vw"
      >
        <a-form layout="vertical" hideRequiredMark>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="设备类别">
                <a-select
                  style="width: 100%"
                  v-model="typeId"
                  labelInValue
                  :defaultActiveFirstOption="true"
                >
                  <a-select-option value="cy-face">畅盈人脸机</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="设备名称">
                <a-input v-model="machineName" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item label="所属部门">
                <a-select style="width: 100%" v-model="shopId">
                  <a-select-option key="no" value>无上级</a-select-option>
                  <a-select-option
                    :key="institution.id"
                    :value="institution.id"
                    v-for="institution in institutions"
                  >{{institution.name}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="MAC物理地址">
                <a-input v-model="macAddress" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="描述">
                <a-input v-model="desc" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
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
          <a-button type="primary" @click="handleAddInstitution">提交</a-button>
        </div>
      </a-drawer>
    </div>
    <a-table :columns="columns" :dataSource="data" bordered rowKey="id">
      <span slot="status" slot-scope="text">
        <a-badge :status="text|statusTypeFilter" :text="text|statusFilter" />
        <!-- <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" /> -->
      </span>
      <span slot="shop" slot-scope="text">
        {{getInstitutionNameById(text)}}
        <!-- <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" /> -->
      </span>
      <span slot="operation" slot-scope="text,record">
        <a-button type="primary" @click="handleAddTimeClick(record)">添加时间段</a-button>
        <a-popconfirm
          title="删除后所有时间段都会被删除，确认删除嘛?"
          @confirm="handleDeleteTimeClick(record)"
          @cancel="cancel"
          okText="确定"
          cancelText="取消"
        >
        <a-button type="danger" style="margin-left:8px">删除时间段</a-button>
        </a-popconfirm>

        <a-button type="primary" @click="changeIsRequestOpenDoor(record.id,true)" style="margin-left:8px;">回调开</a-button>
        <a-button type="primary" @click="changeIsRequestOpenDoor(record.id,false)" style="margin-left:8px;">回调关</a-button>
        <a-button type="primary" @click="showMachineRecord(record.id,false)" style="margin-left:8px;">查看设备记录</a-button>
        
        <!-- <a-button type="danger" style="margin-left:8px" @click="handleSearchFace">查看设备人脸</a-button> -->
      </span>
      <p slot="expandedRowRender" slot-scope="text" style="margin: 0">
        <a-timeline>
          <a-timeline-item :key="`range-${range.id}`" v-for="range in text.timeRange">
            <time-range :data="range"></time-range>
          </a-timeline-item>
        </a-timeline>
      </p>
    </a-table>
    <a-modal title="添加时间段" v-model="addTimeVisible" @ok="handleOk" @cancel="handleCancel">
      <p style="margin:15px 0">
        <b>时间段名称：</b>
        <a-input v-model="timeQuantumName"></a-input>
        <br />
      </p>
      <p style="margin:15px 0">
        <b>日期选择：</b>
        <a-checkbox-group :options="dayOptions" v-model="dayCheckedList" />
        <br />
      </p>
      <p style="margin:15px 0">
        <b>时间段：</b>
        <a-time-picker format="HH:mm" v-model="sjb" />-
        <a-time-picker format="HH:mm" v-model="sje" />
      </p>
    </a-modal>
    <a-drawer
        title="设备记录"
        placement="right"
        :closable="false"
        @close="onMachineLogClose"
        :visible="machineLogDrawerVisible"
        width="50vw"
      >
      <a-table  :columns="machineLogColumns" :dataSource="machineLogData" :pagination="machineLogPagination" rowKey="id">
         <span
            slot="time"
            slot-scope="time"
          >{{$moment(new Date(time.time)).format('YYYY-MM-DD HH:mm:ss')}}</span>
      </a-table>
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
      <a-button style="marginRight: 8px" @click="onMachineLogClose">关闭</a-button>
       </div>
    </a-drawer>
  </div>
</template>

<script>
const columns = [
  {
    key: "id",
    title: "设备Id",
    dataIndex: "id"
  },
  {
    key: "name",
    title: "设备名",
    dataIndex: "name"
  },
  {
    key: "mac",
    title: "MAC",
    dataIndex: "mac"
  },
  {
    key: "shop",
    title: "所属部门",
    dataIndex: "shop",
    scopedSlots: { customRender: "shop" }
  },
  {
    key: "isOnline",
    title: "状态",
    dataIndex: "isOnline",
    scopedSlots: { customRender: "status" }
  },
  {
    title: "operation",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];

const statusMap = {
  0: {
    status: "default",
    text: "离线"
  },
  1: {
    status: "success",
    text: "正常运行"
  },
  2: {
    status: "success",
    text: "已上线"
  },
  null: {
    status: "default",
    text: "离线"
  }
};

const machineLogColumns = [
   {
    key: "faceid",
    title: "面部ID",
    dataIndex: "faceid"
  },
  {
    key: "facename",
    title: "姓名",
    dataIndex: "facename"
  },
  {
    key: "id",
    title: "id",
    dataIndex: "id"
  },
  {
    key: "mac",
    title: "mac",
    dataIndex: "mac"
  },
  {
    key: "macName",
    title: "macName",
    dataIndex: "macName"
  },
   {
    key: "time",
    title: "time",
   scopedSlots: { customRender: "time" }
  },
]

import {
  getInstitutions,
  getInstitutionType,
  addInsitutions
} from "@/api/institutions";
import {
  addMachine,
  getMachineList,
  getMachineOnline,
  addTimeQuantum,
  deleteTimeQuantum,
  setIsRequestOpenDoor,
  getFaceById,   
} from "@/api/machine";
import TimeRange from "./components/TimeRange";
import { inoutFaceList, machinesLogList } from "@/api/machine";
export default {
  components: {
    TimeRange
  },
  data() {
    return {
      data: [],
      columns,
      newMachineDrawerVisible: false,
      institutions: [],
      typeId: "",
      shopId: "",
      statusMap,
      machineName: "",
      macAddress: "",
      desc: "",
      company: this.$ls.get("company").id,
      addTimeVisible: false,
      dayOptions: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      dayCheckedList: [],
      timeQuantumName: "",
      sjb: null,
      sje: null,
      machineLogDrawerVisible:false,
      machineLogColumns,
      machineLogData:[],
      machineLogPagination: {
        current: 1,
        pageSize: 12,
        total: 0,
        showTotal: total => {
          return `总共${total}条记录`;
        },
        onChange:(page,pageSize)=>{
          this.machineLogPagination.current = page
          this.getMachineLogData()
        }
      },
    };
  },
  created() {
    this.dayCheckedList = this.dayOptions;
    this.initData();
   
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text;
    },
    statusTypeFilter(type) {
      return statusMap[type].status;
    }
  },
  watch: {
    $route: function(newVal) {
      this.initData();
    }
  },
  methods: {
    initData() {
      getInstitutions().then(res => {
        this.institutions = res.data.data;
      });
      let params = {
        company: this.$ls.get("company").id,
        disableLoadding:false
      };
      getMachineList(params).then(res => {
        this.data = res.data.data;
        this.keepQueryOnline(params)
      });
    },
    showDrawer() {
      this.newMachineDrawerVisible = true;
    },
    onClose() {
      this.newMachineDrawerVisible = false;
    },
    //处理提交按钮
    handleAddInstitution() {
      let data = new FormData();
      data.append("mac", this.macAddress);
      data.append("name", this.machineName);
      data.append("company", this.company);
      data.append("description", this.desc);
      data.append("shop", this.shopId);
      addMachine(data).then(res => {
        if (res.status == 200) {
          this.$message.success("创建成功");
          this.newMachineDrawerVisible = false;
          this.initData();
        } else {
          this.$message.error("创建失败");
        }
      });
    },
    getInstitutionNameById(text) {
      if (!text) {
        return "";
      }
      var found = this.institutions.find(function(element) {
        return (element.id = text);
      });
      if (found) {
        return found.name;
      }
    },
    keepQueryOnline() {
      window.setInterval(() => {
        setTimeout(this.queryOnline(), 0);
      }, 10000);
    },
    queryOnline() {
      let params = {
        company: this.$ls.get("company").id
      };
      getMachineList(params).then(res => {
        this.data = res.data.data;
      });
    },
    handleAddTimeClick(record) {
      this.addTimeVisible = true;
      this.selectMachine = record;
    },
    handleDeleteTimeClick(record) {
      deleteTimeQuantum(record.mac)
        .then(res => {
          this.$message.success("删除成功");
          this.initData();
        })
        .catch(err => {

          this.$message.warn("删除失败");
        });
    },

    handleCancel() {
      this.addTimeVisible = false;
    },
    getNoRepeatId(machine) {
      let idList = machine.timeRange.map(ele => ele.sjdBh);
      let flag = 1;
      let id;
      while (flag && flag <= 48) {
        if (!idList.includes(flag)) {
          id = flag;
          flag = 0;
        } else {
          flag++;
        }
      }
      return id;
    },
    handleOk() {
      let data = new FormData();
      data.append("mac", this.selectMachine.mac);
      data.append("sjdName", this.timeQuantumName);
      data.append("sjdBh", this.getNoRepeatId(this.selectMachine));
      if (this.sjb) {
        data.append("sjb", this.sjb.format("HH:mm"));
      }
      if (this.sje) {
        data.append("sje", this.sje.format("HH:mm"));
      }
      data.append("xq1", 1);
      data.append("xq2", 1);
      data.append("xq3", 1);
      data.append("xq4", 1);
      data.append("xq5", 1);
      data.append("xq6", 1);
      data.append("xq7", 1);
      addTimeQuantum(data).then(res => {
        this.initData();
        this.$message.success("添加成功");
        this.addTimeVisible = false;
      });
    },
    cancel(e) {
      this.$message.error("Click on No");
    },
    handleSearchFace() {
      let id = "440582199704036138";
      getFaceById(id).then(res => {});
    },
    changeIsRequestOpenDoor(id,isRequestOpenDoor){
      setIsRequestOpenDoor(id,isRequestOpenDoor).then(res=>{
        this.$message.success('请求成功');
      })
    },
    onMachineLogClose(){
      this.machineLogDrawerVisible = false
    },
    getMachineLogData(){
       let params={
        page: this.machineLogPagination.current,
        limit: this.machineLogPagination.pageSize,
        sort:'desc',
        startTime: "1997-04-03 12:05:22",
        endTime: this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        mac:"6E:57:5E:53:6F:DE"
      }
      machinesLogList(params).then(res=>{
        this.machineLogData = res.data.data.list
        this.machineLogPagination.total = res.data.data.total
      })
    },
    showMachineRecord(){
      // this.data
      this.machineLogDrawerVisible = true
      this.getMachineLogData()
    }
  }
};
</script>

<style>
</style>

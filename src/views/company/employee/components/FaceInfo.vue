<template>
  <div>
    <a-empty v-show="isEmpty" />
    <div v-show="!isEmpty">
      <div>平台号：{{platformId}}</div>
      <img :src="facePath" />
      <a-button type="primary">重新下发人脸</a-button>
      <a-table :columns="columns" :dataSource="face_machine" rowKey="mac">
        <span
          slot="effectbTime"
          slot-scope="effectbTime"
        >{{$moment(new Date(effectbTime*1000)).format('YYYY-MM-DD HH:mm:ss')}}</span>
        <span
          slot="effectTime"
          slot-scope="effectTime"
        >{{$moment(new Date(effectTime*1000)).format('YYYY-MM-DD HH:mm:ss')}}</span>
        <span
          slot="syncTime"
          slot-scope="syncTime"
        >{{$moment(new Date(syncTime*1000)).format('YYYY-MM-DD HH:mm:ss')}}</span>
        <p slot="expandedRowRender" slot-scope="text,record" style="margin: 0">
          <a-timeline>
            <template v-for="range in text.timeRange">
              <a-timeline-item
                :key="`range-${range.id}`"
                v-if="isInTimeRange(text.timeLimit,range.sjdBh)"
              >
                {{range.sjdBh}}
                <time-range :data="range"></time-range>
              </a-timeline-item>
            </template>
          </a-timeline>
        </p>
        <span slot="operation" slot-scope="text">
            <a-button type="danger" @click="handleDeleteFace(text.machineId,text.faceID)">删除人脸信息</a-button>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
import { getFaceById, getMachineList,deleteFace} from "@/api/machine";
import TimeRange from "@/views/machine/machineManagement/components/TimeRange";
export default {
  components: {
    TimeRange
  },
  props: {
    faceId: String
  },
  data() {
    return {
      facePath: "",
      faceName: "",
      platformId: "",
      faceInfo: "",
      isEmpty: true,
      face_machine: [],
      machineData: [],
      columns: [
        {
          dataIndex: "faceID",
          key: "faceID",
          title: "faceID"
        },
        {
          dataIndex: "mac",
          key: "mac",
          title: "MAC"
        },
        {
          dataIndex: "macName",
          key: "macName",
          title: "设备名称"
        },
        {
          dataIndex: "effectbTime",
          key: "effectbTime",
          title: "开始时间",
          scopedSlots: { customRender: "effectbTime" }
        },
        {
          dataIndex: "effectTime",
          key: "effectTime",
          title: "结束时间",
          scopedSlots: { customRender: "effectTime" }
        },

        {
          dataIndex: "syncTime",
          key: "syncTime",
          title: "同步时间",
          scopedSlots: { customRender: "syncTime" }
        },
        {
          title: "操作",
          scopedSlots: { customRender: "operation" }
        }
      ]
    };
  },
  created() {
    this.initData();
  },
  watch: {
    faceId: {
      deep: true,
      immediate: true,
      handler: function(val) {
        this.handleSearchFace();
      }
    }
  },
  methods: {
    initData() {
      let params = {
        company: this.$ls.get("company").id
      };
      getMachineList(params).then(res => {
        this.machineData = res.data.data;
        // this.keepQueryOnline(params)
      });
    },
    doSearchFace() {
      getFaceById(this.faceId).then(res => {
        console.log(res);
        this.faceInfo = res.data;
        if (res.data.data) {
          this.isEmpty = false;
          this.facePath = res.data.data.face.path;
          this.platformId = res.data.data.face.platformId;
          this.face_machine = res.data.data.face_machine.map(machine => {
            machine.macName = this.getKeyByMac("name", machine.mac);
            machine.timeRange = this.getKeyByMac("timeRange", machine.mac);
            machine.machineId = this.getKeyByMac("id", machine.mac);
            return machine;
          });
        } else {
          this.isEmpty = true;
        }
      });
    },
    handleSearchFace() {
      if (this.machineData.length == 0) {
        let params = {
          company: this.$ls.get("company").id
        };
        getMachineList(params)
          .then(res => {
            this.machineData = res.data.data;
            // this.keepQueryOnline(params)
          })
          .then(() => {
            this.doSearchFace();
          });
      } else {
        this.doSearchFace();
      }
    },
    getKeyByMac(key, mac) {
      let value;
      this.machineData.forEach(machine => {
        if (machine.mac == mac) {
          if (machine.hasOwnProperty(key)) {
            value = machine[key];
          }
        }
      });
      console.log(value);
      return value;
    },
    isInTimeRange(timeLimit, id) {
      return timeLimit[id - 1] == 1;
    },
    handleDeleteFace(machineId,faceId){
        deleteFace(machineId,faceId).then(res=>{
            this.$message.success('删除成功')
        })
    }
  }
};
</script>

<style>
</style>
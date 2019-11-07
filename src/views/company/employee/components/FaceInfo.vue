<template>
  <div>
    <a-empty v-show="isEmpty" />
    <a-spin :spinning="loading">
    <div v-show="!isEmpty">
      <a-alert message="如果有修改人脸需要重新下发才生效" banner />
      <div>平台号：{{platformId}}</div>
      <div>{{faceName}}</div>
      <div class="ant-upload-preview" @click="$refs.modal.edit(1)">
        <a-icon type="cloud-upload-o" class="upload-icon" />
        <div class="mask">
          <a-icon type="plus" />
        </div>
        <img :src="option.img" style="max-height:180px" />
      </div>
      
      <a-button type="primary" @click="pushMachineVisible = true">重新下发人脸</a-button>
    
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
        <p slot="expandedRowRender" slot-scope="text" style="margin: 0">
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
    <avatar-modal ref="modal" @ok="setavatar" />
    <a-modal title="修改人脸信息" v-model="pushMachineVisible" @ok="handlePushFaceToMachine">
      <div>开始时间：<a-date-picker v-model="EOD"></a-date-picker></div>
      <div>结束时间：<a-date-picker v-model="TermDate"></a-date-picker></div>
      <a-tree
        checkable
        @expand="onExpand"
        :expandedKeys="expandedKeys"
        :autoExpandParent="autoExpandParent"
        v-model="checkedKeys"
        @select="onSelect"
        :selectedKeys="selectedKeys"
        :treeData="treeData"
      />
    </a-modal>
    </a-spin>
  </div>
</template>

<script>
import AvatarModal from "./AvatarModal";
import {
  getFaceById,
  getMachineList,
  deleteFace,
  updateFace,
  pushFashToMachine
} from "@/api/machine";
import TimeRange from "@/views/machine/machineManagement/components/TimeRange";
export default {
  components: {
    TimeRange,
    AvatarModal
  },
  props: {
    platformId: String
  },
  data() {
    return {
      facePath: "",
      faceName: "",
      faceId:"",
      faceInfo: "",
      company: "",
      isEmpty: true,
      face_machine: [],
      machineData: [],
      confirmLoading: false,
      loading:false,
      visible: false,
      preview: {},
      option: {
        img:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        info: true,
        size: 1,
        outputType: "jpeg",
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      },
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
      ],
      pushMachineVisible: false,
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      machineSelect: [],
      treeData: [],
      EOD:null,
      TermDate:null
    };
  },
  created() {
    this.initData();
  },
  watch: {
    platformId: {
      deep: true,
      immediate: true,
      handler: function(val) {
        this.handleSearchFace();
      }
    }
  },
  methods: {
    onExpand(expandedKeys) {
      console.log("onExpand", expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    handlePushFaceToMachine() {
      let machine = [];
      let machineMap = new Map();
      this.checkedKeys.forEach(obj => {
        let keyValue = obj.split("-");
        if (keyValue[0] == "machine") {
          // machineMap.set(keyValue[1], []);
        } else {
          if (machineMap.get(keyValue[0])) {
            machineMap.get(keyValue[0]).push(keyValue[1]);
          } else {
            machineMap.set(keyValue[0], []);
            machineMap.get(keyValue[0]).push(keyValue[1]);
          }
        }
      });
      for (let key of machineMap.entries()) {
        this.machineData.forEach(machineEle => {
          let obj = {};
          if (machineEle.id == key[0]) {
            obj.macId = key[0];
            obj.mac = machineEle.mac;
            obj.effectbTime = Math.floor(this.EOD.valueOf() / 1000);
            obj.effectTime = Math.floor(this.TermDate.valueOf() / 1000);
            obj.timeLimit = this.getTimeLimitById(machineMap.get(key[0]));
            machine.push(obj);
          }
        });
      }
      pushFashToMachine(this.faceId,machine).then(res=>{
        
        this.pushMachineVisible = false
      })
    },
    initData() {
      let params = {
        company: this.$ls.get("company").id
      };
      this.loading = true
      getMachineList(params).then(res => {
        this.loading = false
        this.machineData = res.data.data;
        this.machineSelect = this.machineData.map(ele => ele.id);
        this.treeData = this.machineData.map(machine => {
          return {
            title: machine.name,
            key: `machine-${machine.id}`,
            children: machine.timeRange.map(time => {
              let disabled = time.state != 1;
              let title = disabled ? `${time.sjdName}(未同步)` : time.sjdName;
              return {
                title,
                key: `${machine.id}-${time.sjdBh}`,
                disabled
              };
            })
          };
        });
      });
    },
    doSearchFace() {
      getFaceById(this.platformId).then(res => {
        ;
        this.faceInfo = res.data;
        if (res.data.data) {
          this.isEmpty = false;
          this.facePath = res.data.data.face.path;
          this.option.img = this.facePath;
          // this.platformId = res.data.data.face.platformId;
          this.faceName = res.data.data.face.faceName;
          this.faceId = res.data.data.face.id
          this.company = res.data.data.face.company;
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
    setavatar(blob) {
      let _this = this;
      var a = new FileReader();
      a.readAsDataURL(blob); //读取文件保存在result中
      a.onload = function(e) {
        var getRes = e.target.result; //读取的结果在result中
        console.log(getRes);
        _this.option.img = getRes;
        let face = {
          faceName: _this.faceName,
          // faceName: "郑浩鹏",
          img: getRes.substr(getRes.indexOf(",") + 1),
          wgCardNo:'',
          flag: 0,
          company: _this.company
        };
        // let updateData = new FormData()
        // updateData.append('face',face)
        let updateData = {
          face
        };
        updateFace(_this.platformId, updateData).then(res => {
          ;
          _this.$message.success("修改成功");
          _this.visible = false
          
        });
      };
      console.log(url);
    },
    onSelect(selectedKeys, info) {
      console.log("onSelect", info);
      this.selectedKeys = selectedKeys;
    },
    getTimeLimitById(idList) {
      let timeLimit = "000000000000000000000000000000000000000000000000";
      if (!idList) {
        return timeLimit;
      }
      let timeLimitList = timeLimit.split("");
      idList.forEach(id => {
        timeLimitList[id - 1] = 1;
      });
      return timeLimitList.join("");
    },
    handleDeleteFace(machineId,faceID){
      deleteFace(machineId,faceID).then(res=>{
        
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
  max-height: 180px;
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
    max-height: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
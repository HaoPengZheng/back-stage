<template>
  <a-row>
    <a-col :span="6">
       <div>
          <a-input-search style="margin-bottom: 8px" v-model="searchValue" placeholder="Search" @change="onChange" />
          <a-tree
            @expand="onExpand"
            @select="onSelect"
            showIcon
            :expandedKeys="expandedKeys"
            :autoExpandParent="autoExpandParent"
            :treeData="treeData"
            v-model="checkedKey"
          >
            <a-icon slot="smile" type="smile-o" />
            <my-icon slot="institution" type="icondepart" />
            <my-icon slot="zhiwei" type="iconzhiwei" />
            <my-icon slot="renyuan" type="iconrenyuan" />
            <template slot="title" slot-scope="{title}">
              <span v-if="title.indexOf(searchValue) > -1">
                {{title.substr(0, title.indexOf(searchValue))}}
                <span
                  style="color: #f50"
                >{{searchValue}}</span>
                {{title.substr(title.indexOf(searchValue) + searchValue.length)}}
              </span>
              <span v-else>{{title}}</span>
            </template>
          </a-tree>
        </div>
    </a-col>
    <a-col :span="18">
      <div class="employee-profile-warp">
        <employee-profile :id="activeUserId" @refresh="refresh"></employee-profile>
      </div>
    </a-col>
  </a-row>
</template>

<script>
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
import EmployeeProfile from "./EmployeeProfile";
import { getInstitutions } from "@/api/institutions";
import { getInstitutionsAuthorization } from "@/api/institutions";
export default {
  data() {
    return {
      expandedKeys: [],
      searchValue: "",
      autoExpandParent: true,
      checkedKey: [],
      institutionData: [],
      treeData: [],
      selectType: "",
      selectId: "",
      selectValue: "",
      dataList: [],
      activeUserId:''
    };
  },
  components: {
    EmployeeProfile
  },
  created() {
    this.init();
    getInstitutionsAuthorization().then(res=>{
      
    })
  },
  methods: {
    init() {
      this.initInstitution();
    },
    initInstitution() {
      getInstitutionsAuthorization().then(res => {
        this.institutionData = res.data.data;
        this.treeData = this.generateData(res.data.data);
        this.generateList(this.treeData);
      });
    },
    generateList(data) {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.key;
        this.dataList.push({ key, title: node.title });
        if (node.children) {
          this.generateList(node.children, node.key);
        }
      }
    },
    generateData(data) {
      if (!(data instanceof Array) || data.length == 0) {
        return [];
      }
      return data.map(institution => {
        let children = institution.children.data
        let roles = institution.positions.data
        return {
          key: "institution-" + institution.id,
          title: institution.name,
          slots: {
            icon: "institution",
            title:"title"
          },
          scopedSlots:{
            title:'title'
          },
          children: this.generateData(children).concat(
            this.generateRoleAndUser(roles)
          )
        };
      });
    },
    generateRole(roles) {
      return roles.map(role => {
        return {
          key: "role-" + role.id,
          title: role.title,
          slots: {
            icon: "zhiwei",
            title:"title"
          },
          scopedSlots:{
            title:'title'
          },
        };
      });
    },
    generateRoleAndUser(roles){
    
       return roles.map(role => {
        return {
          key: "role-" + role.id,
          title: role.title,
          slots: {
            icon: "zhiwei",
            title:"title"
          },
          scopedSlots:{
            title:'title'
          },
          children: this.generateUsers(role.staffs.data)
        };
      });
    },
    generateUsers(users){
      return users.map(user =>{
        let name 
        if(user.authorization){
          name = user.authorization.name
        }else{
          name = user.name+'（非实名）'
        }
        return {
          key: "user-" + user.id,
          title: name,
          slots: {
            icon: "renyuan",
            title:"title"
          },
          scopedSlots:{
            title:'title'
          },
        }
      })
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onChange(e) {
      const value = e.target.value;
      this.searchValue = value
      const expandedKeys = this.dataList
        .map(item => {
          if (item.title.indexOf(value) > -1) {
            return getParentKey(item.key, this.treeData);
          }
          return null;
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      });
    },
    findTitleByKey(key){
      let title
      this.dataList.forEach(ele=>{
        if(ele.key == key){
          title=ele.title
        }
      })
      return title
    },
    onSelect(value) {
      let map = value[0].split("-");
      this.selectValue = this.findTitleByKey(value[0]);
      this.selectType = map[0];
      this.selectId = map[1];
      if(this.selectType == 'user'){
        this.activeUserId = this.selectId
      }
    },
    refresh() {
      this.activeUserId = ''
      this.init();
    }
  }
};
</script>
<style scoped>
.employee-profile-warp{
  margin-left: 15px;
  border-left:2px solid #e8e8e8;
  padding-left: 15px;

}
</style>
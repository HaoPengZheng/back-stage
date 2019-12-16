<template>
  <div>
      {{userId}}
    <div class="add-role">
      <role-select style="margin-right:8px" @change="handleChange"></role-select>
      <a-button type="primary" @click="handleAddRole">新增角色</a-button>
    </div>
    <a-list itemLayout="horizontal" :dataSource="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta>
          <div slot="title">
            {{item.title}}
            <a-button type="link">删除此角色</a-button>
          </div>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
const data = [
  {
    title: "Ant Design Title 1"
  },
  {
    title: "Ant Design Title 2"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 4"
  }
];
import { RoleSelect } from "@/components";
import { patchEmployeeRole } from "@/api/staff";
export default {
  components: {
    RoleSelect
  },
  props: {
    baseInfo: Object,
    userId: String || Number
  },
  data() {
    return {
      data,
      roleOptions: [],
      roleValue: []
    };
  },
  methods: {
    handleChange(value) {
      this.roleValue = value;
      console.log(this.userId);
    },
    handleAddRole() {
      let roleId = "";
      console.log(this.roleValue);
      if (this.roleValue.length >= 2) {
        roleId = this.roleValue[1].split("-")[1];
        let params = {
          role_id: roleId
        };
        if (this.userId) {
          patchEmployeeRole(this.userId, params).then(res => {
            console.log(res);
          });
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.add-role {
  display: flex;
  justify-content: left;
}
</style>
<template>
  <div>
    <a-empty v-show="!isActive" />
    <div v-show="isActive">
      <div class="add-role">
        <role-select style="margin-right:8px" @change="handleChange"></role-select>
        <a-button type="primary" @click="handleAddRole">新增角色</a-button>
      </div>
      <a-list itemLayout="horizontal" :dataSource="roles">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta>
            <div slot="title">
              {{item.title}}
              <a-button type="link" @click="handleDeleteRole(item)">删除此角色</a-button>
            </div>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import { RoleSelect } from "@/components";
import { patchEmployeeRole, deleteEmployeeRole } from "@/api/staff";
export default {
  components: {
    RoleSelect
  },
  props: {
    baseInfo: Object,
    userId: String || Number,
    roles:Array
  },
  computed: {
    isActive() {
      return this.userId;
    }
  },
  data() {
    return {
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
              this.$message.success('修改成功');
            this.$emit('reloadInfo')
          });
        }
      }
    },
    handleDeleteRole(item) {
      let param = {
        role_id: item.id
      };
      deleteEmployeeRole(this.userId, param).then(res => {
        this.$message.success('删除成功');
        this.$emit('reloadInfo')
      });
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
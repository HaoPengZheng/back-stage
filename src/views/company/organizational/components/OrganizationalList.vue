<template>
  <div>
    <div style="margin-bottom:10px">
      <a-button type="primary" @click="showDrawer">新增机构</a-button>
      <a-drawer
        title="新增机构列表"
        placement="right"
        :closable="false"
        @close="onClose"
        :visible="newInstituteDrawerVisible"
      >
        <a-form layout="vertical" hideRequiredMark>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="机构类别">
                <a-select style="width: 100%" v-model="typeId">
                  <a-select-option
                    :key="type.id"
                    :value="type.id"
                    v-for="type in institutionTypeOption"
                  >{{type.title}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="机构名称">
                <a-input v-model="instituteName" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="上级机构">
                <a-select style="width: 100%" v-model="parentId">
                  <a-select-option key="no" value>无上级</a-select-option>
                  <a-select-option
                    :key="institution.id"
                    :value="institution.id"
                    v-for="institution in data"
                  >{{institution.name}}</a-select-option>
                </a-select>
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
    <a-table :columns="columns" :dataSource="data" bordered rowKey="id"></a-table>
    <!-- <organizational-table :data="data"></organizational-table> -->
  </div>
</template>

<script>
// import OrganizationalTable from "./OrganizationalTable";
import {
  getInstitutions,
  getInstitutionType,
  addInsitutions
} from "@/api/institutions";
import { mapState } from "vuex";
export default {
  components: {
    // OrganizationalTable
  },
  data() {
    return {
      data: [],
      columns: [
        {
          title: "id",
          dataIndex: "id"
        },
        {
          title: "name",
          dataIndex: "name"
        },
        {
          title: "operation",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ],
      newInstituteDrawerVisible: false,
      typeTitle: "",
      instituteName: "",
      institutionTypeOption: [],
      typeId: "",
      parentId: null
    };
  },
  computed: {
    ...mapState({
      institutions: state => state.shop.institutions
    })
  },
  created() {
    this.initData();
  },
  methods: {
    formatData(data) {
      data.forEach(item => {
        item.key = item.id;
        if (item.children && item.children.data && item.children.data.length) {
          this.formatData(item.children.data);
          item.children = item.children.data;
        } else {
          delete item.children;
        }
      });
      return data;
    },
    initData() {
      getInstitutions().then(res => {
        this.data = this.formatData(res.data.data);
      });
      getInstitutionType().then(res => {
        this.institutionTypeOption = res.data.data;
      });
    },
    showDrawer() {
      this.newInstituteDrawerVisible = true;
    },
    onClose() {
      this.newInstituteDrawerVisible = false;
    },
    //处理提交按钮
    handleAddInstitution() {
      let data = {
        type_id: this.typeId,
        name: this.instituteName,
        parent_id: this.parentId
      };
      addInsitutions(data).then(res => {
        if (res.status == 201) {
          this.$message.success("创建成功");
          this.newInstituteDrawerVisible = false;
          this.initData();
        } else {
          this.$message.error("创建失败");
        }
      });
    }
  }
};
</script>

<style>
</style>

<template>
  <div>
    <a-cascader
      :options="roleOptions"
      :showSearch="{filter}"
      @change="onRoleOptionChange"
      placeholder="没有职位的部门将选择不了"
    />
  </div>
</template>

<script>
import { getInstitutions } from "@/api/institutions";
export default {
  data() {
    return {
      roleOptions: []
    };
  },
  created() {
    this.initData();
  },
  methods: {
    filter(inputValue, path) {
      return path.some(
        option =>
          option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      );
    },
    initData() {
      getInstitutions().then(res => {
        this.roleOptions = this.generateOption(res.data.data);
      });
    },
    onRoleOptionChange(value, selectedOptions) {
      //  this.form.setFieldsValue({
      //    role:value
      //  })
      console.log(value, selectedOptions);
      console.log(this.form.getFieldValue("role"));
    },
    generateOption(data) {
      if (!data instanceof Array || data.length == 0) {
        return [];
      }
      return data.map(institution => {
        let isDisable = false;
        if (
          institution.positions.data.length == 0 &&
          institution.children.data.length == 0
        ) {
          isDisable = true;
        }
        return {
          value: "institution-" + institution.id,
          label: institution.name,
          disabled: isDisable,
          slots: {
            icon: "institution"
          },
          children: this.generateOption(institution.children.data).concat(
            this.generateRole(institution.positions.data)
          )
        };
      });
    },
    generateRole(roles) {
      return roles.map(role => {
        return {
          value: "role-" + role.id,
          label: role.title,
          slots: {
            icon: "zhiwei"
          }
        };
      });
    }
  }
};
</script>

<style>
</style>
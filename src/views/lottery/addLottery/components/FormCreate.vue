<template>
  <a-spin :spinning="spinning">
    <div class="form-create">
      <a-form :form="form" @submit="handleSubmit">
        <div class="form-block">
          <div class="title">基本信息</div>
          <a-divider :style="{'margin': '15px 0'}" />

          <div class="value">
            <a-form-item label="活动名称" v-bind="formItemLayout">
              <a-input v-decorator="['lotteryName', config.nameConfig]" />
            </a-form-item>
            <a-form-item label="活动类型" v-bind="formItemLayout">
              <a-radio-group v-decorator="['lotteryType', config.typeConfig]">
                <a-radio value="0">大转盘</a-radio>
                <a-radio value="1">砸金蛋</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="活动时间" v-bind="formItemLayout">
              <a-range-picker
                v-decorator="['time', config.timeRangeConfig]"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"
              />
            </a-form-item>
            <a-form-item label="背景图片" v-bind="formItemLayout">
              <div>
                <picture-select :limit="1" module="lottery" v-model="backgroundImageFile"></picture-select>
              </div>
            </a-form-item>
            <a-form-item label="用户" v-bind="formItemLayout">
              <a-radio-group v-decorator="['userType', config.timesTypeConfig]">
                <a-radio value="0">所有用户</a-radio>
                <a-radio value="1">后台设置</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="参与类型" v-bind="formItemLayout">
              <a-radio-group v-decorator="['timesType', config.timesTypeConfig]">
                <a-radio value="0">N天一次</a-radio>
                <a-radio value="1">一人N次</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="参与次数" v-bind="formItemLayout" v-if="formData.timesType">
              <div v-if="formData.timesType + '' == '0'">
                <a-input-number v-decorator="['times', config.timesConfig]" :min="1" />天一次
              </div>
              <div v-if="formData.timesType + '' == '1'">
                一人
                <a-input-number v-decorator="['times', config.timesConfig]" :min="1" />次
              </div>
            </a-form-item>
            <a-form-item label="是否重置库存" v-bind="formItemLayout">
              <a-switch v-decorator="['needReload', config.reloadConfig ]" />
            </a-form-item>
            <a-form-item label="多久后重置" v-bind="formItemLayout" v-if="formData.needReload">
              <a-input-number v-decorator="['intervalHours', config.hoursConfig]" :min="1" />小时
            </a-form-item>
            <a-form-item label="活动详情" v-bind="formItemLayout">
              <a-textarea placeholder="活动详情" :rows="4" v-decorator="['rule']" />
            </a-form-item>

            <a-form-item v-bind="formItemLayout">
              <div class="actions">
                <a-button type="primary" @click="handleSubmit">下一步</a-button>
              </div>
            </a-form-item>
          </div>
        </div>
      </a-form>
    </div>
  </a-spin>
</template>

<script>
import { createLottery, updateLotteryById } from "@/api/lottery";
import { PictureSelect } from "@/components";
import { mixinAddLotteryState } from "../mixin";
export default {
  mixins: [mixinAddLotteryState],
  components: {
    PictureSelect
  },
  name: "FormCreate",
  props: {
    check: Boolean
  },
  data() {
    const defaultData = {
      lotteryType: "0",
      timesType: "1",
      times: "1",
      needReload: false,
      intervalHours: "1",
      userType: "0"
    };
    return {
      backgroundImageFile: [],
      form: this.$form.createForm(this, {
        name: "form_create",
        onValuesChange: (props, values) => {
          this.watchFields(Object.keys(values)[0], Object.values(values)[0]);
        },
        mapPropsToFields: ()=>{
          if(!this.lottery){
            return 
          }
          this.backgroundImageFile = []
          return {
            lotteryName:this.$form.createFormField({
              value:this.lottery.lotteryName
            }),
            lotteryType:this.$form.createFormField({
              value:this.lottery.lotteryType
            })
          }
        }
      }),
      config: {
        nameConfig: { rules: [{ required: true, message: "请输入活动名称!" }] },
        typeConfig: {
          rules: [{ required: true, message: "请选择活动类型!" }],
          initialValue: defaultData.lotteryType
        },
        timeRangeConfig: {
          rules: [{ type: "array", required: true, message: "请选择时间!" }]
        },
        userTypeConfig: {
          rules: [{ required: true, message: "请选择用户类型!" }],
          initialValue: defaultData.userType
        },
        timesTypeConfig: {
          rules: [{ required: true, message: "请选择参与类型!" }],
          initialValue: defaultData.timesType
        },
        timesConfig: {
          rules: [{ required: true, message: "请输入参与次数!" }],
          initialValue: defaultData.times
        },
        reloadConfig: {
          rules: [{ required: true, message: "请选择是否重置!" }],
          initialValue: defaultData.needReload,
          valuePropName: "checked"
        },
        hoursConfig: {
          rules: [{ required: true, message: "请输入时间!" }],
          initialValue: defaultData.intervalHours
        }
      },
      formData: defaultData,

      previewImage: "",
      spinning: false,
      isShowPictureGallery: false
    };
  },
  methods: {
    watchFields(key, val) {
      this.formData[key] = val;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          values.startTime = values.time[0]
            .format("YYYY/MM/DD HH:mm:ss")
            .valueOf();
          values.endTime = values.time[1]
            .format("YYYY/MM/DD HH:mm:ss")
            .valueOf();
          values.backgroundImagePath =
            this.backgroundImageFile.length > 0
              ? this.backgroundImageFile[0]
              : "http://test.00800.com.cn/data/upload/lottery/game-bg2.jpg";
          values.needReload = +values.needReload;
          let form_data = "";
          for (let key in values) {
            let val = values[key];
            form_data += key + "=" + val + "&";
          }
          form_data = form_data.slice(0, -1);
          this.spinning = true;
          if (this.lottery) {
            alert("更新");
            updateLotteryById(this.lottery.id, form_data)
              .then(res => {
                if (res.data) {
                  this.$store.commit("Update_Lottery", res.data.data);
                  this.$store.commit("Add_Lottery_Go_Next");
                  this.$message.success(res.data.msg);
                } else {
                  this.$message.success("添加成功");
                }
              })
              .catch(e => {
                if (e.response && e.response.data) {
                  this.$message.error(e.response.data.msg);
                } else {
                  this.$message.error("添加失败");
                }
              })
              .finally(() => {
                this.spinning = false;
              });
          } else {
            createLottery(form_data)
              .then(res => {
                if (res.data) {
                  this.$store.commit("Update_Lottery", res.data.data);
                  this.$store.commit("Add_Lottery_Go_Next");
                  this.$message.success(res.data.msg);
                } else {
                  this.$message.success("添加成功");
                }
              })
              .catch(e => {
                if (e.response && e.response.data) {
                  this.$message.error(e.response.data.msg);
                } else {
                  this.$message.error("添加失败");
                }
              })
              .finally(() => {
                this.spinning = false;
              });
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form-block {
  .title {
    font-weight: bold;
  }
}
/deep/ .ant-upload-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  /deep/ .anticon {
    font-size: 32px;
    color: rgb(153, 153, 153);
  }
  /deep/ .ant-upload-text {
    margin-top: 8px;
    color: rgb(102, 102, 102);
  }
}
.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  /deep/ .ant-btn + .ant-btn {
    margin-left: 50px;
  }
}
</style>
<template>
  <a-spin :spinning="spinning">
    <div class="form-lottery-item">
      <div class="form-block">
        <div class="title">奖品设置</div>
        <a-divider :style="{'margin': '15px 0'}" />
        <div class="value">
          <a-button type="primary" @click="handleShowAddLotteryForm">添加奖项</a-button>
          <a-button type="danger" style="margin-left:8px;" @click="handleCleanLotteryItem">清空奖项</a-button>
          <a-table :columns="columns" :dataSource="lotteryItems" rowKey="lotteryItemName"></a-table>
        </div>
      </div>

      <div class="form-block">
        <div class="title" style="margin-top:8px">未中奖设置</div>
        <a-divider :style="{'margin': '15px 0'}" />

        <div class="value">
          <a-form :form="losingPriceForm">
            <a-form-item label="奖项名称：" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
              <a-input
                v-decorator="['prizeName', { rules: [{ required: true, message: '请输入未中奖名！' }] }]"
              />
            </a-form-item>
             <a-form-item label="小图标：" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
                 <picture-select :multiple="false" module="lottery" v-model="smallIconPath"></picture-select>
            </a-form-item>
             <a-form-item label="跳转链接：" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
              <a-input
                v-decorator="['jumpLink', { rules: [{ required: true, message: '请选择跳转链接！' }] }]"
              />
            </a-form-item>
             <a-form-item label="中奖提示：" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
                <picture-select :multiple="false" module="lottery" v-model="awardImagePath"></picture-select>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div class="actions">
        <a-button type="primary" :disabled="getAddLotteryCouldGoStep<1" @click="goLast" style="margin-right:8px;">上一步</a-button>
        <a-button type="primary" @click="handleAddLosingPrcieSubmit">下一步</a-button>
      </div>
    </div>
    <a-modal title="添加奖项" :visible="addLotteryItemVisible" @ok="handleOk" @cancel="handleCancel">
      <a-form :form="form">
        <a-form-item label="奖项名称：" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['lotteryItemName', { rules: [{ required: true, message: '请输入奖项名！' }] }]"
          />
        </a-form-item>
        <a-form-item label="奖项类型：" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-radio-group
            v-decorator="['prizeType', { rules: [{ required: true, message: '请选择奖项类型！' }] }]"
            buttonStyle="solid"
            @change="hanldeLotteryType"
          >
            <a-radio-button value="1">积分</a-radio-button>
            <a-radio-button value="0">优惠券</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          v-if="priceType == 1"
          label="积分："
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input-number
            v-decorator="['point', { rules: [{ required: true, message: '请输入积分数量！' }] }]"
            :min="1"
          />
        </a-form-item>
        <a-form-item
          v-if="priceType == 0"
          label="优惠券Id："
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            v-decorator="['couponId', { rules: [{ required: true, message: '请输入优惠券ID！' }] }]"
          />
        </a-form-item>
         <a-form-item label="库存：" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-input-number
            v-decorator="['repertory', { rules: [{ required: true, message: '请输入库存数量！' }] }]"
            :min="0"
          />
        </a-form-item>
        <a-form-item label="概率：" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-input-number
            v-decorator="['probability', { rules: [{ required: true, message: '请输入概率！' }] }]"
            :min="0"
            :max="1"
            :step="0.01"
          />
        </a-form-item>
        <a-form-item label="图标：" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
         <picture-select :multiple="false" module="lottery" v-model="lotteryItemSmallIconPath"></picture-select>
        </a-form-item>
        <a-form-item label="中奖提示：" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <picture-select :multiple="false" module="lottery" v-model="lotteryItemSmallIconPath"></picture-select>
        </a-form-item>
        <a-form-item label="跳转链接：" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
           <a-input
                v-decorator="['jumpLink', { rules: [{ required: true, message: '请输入未中奖名！' }] }]"
              />
        </a-form-item>
      </a-form>

      <template slot="footer">
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">提交</a-button>
      </template>
    </a-modal>
  </a-spin>
</template>

<script>
import {
  addLotteryItems,
  deleteLotteryItems,
  addLosingPrice
} from "@/api/lottery";
import { mixinAddLotteryState } from "../mixin";
import {PictureSelect} from '@/components'
export default {
  name: "FormLotteryItem",
  components:{
    PictureSelect
  },
  props: {
    check: Boolean
  },
  mixins: [mixinAddLotteryState],
  data() {
    return {
      spinning: false,
      addLotteryItemVisible: false,
      priceType: 0,
      smallIconPath:[],
      awardImagePath:[],
      lotteryItemSmallIconPath:[],
       lotteryItemAwardImagePath:[],
      form: this.$form.createForm(this, {
        name: "form_lottery_item"
      }),
      losingPriceForm: this.$form.createForm(this, {
        name: "form_losing_price"
      }),
      config: {
        nameConfig: { rules: [{ required: true, message: "请输入活动名称!" }] }
      },
      loading: false,
      columns: [
        {
          title: "奖项名",
          dataIndex: "lotteryItemName"
        },
        {
          title: "图标",
          dataIndex: "smallIconPath"
        },
        {
          title: "跳转链接",
          dataIndex: "jumpLink"
        },
        {
          title: "中奖照片",
          dataIndex: "awardImagePath"
        },
        {
          title: "奖品类型",
          dataIndex: "prizeType"
        },
        {
          title: "积分",
          dataIndex: "point"
        },
        {
          title: "优惠券",
          dataIndex: "couponId"
        },
        {
          title: "概率",
          dataIndex: "probability"
        },
        {
          title: "库存",
          dataIndex: "repertory"
        }
      ]
    };
  },
  computed: {
    lotteryItems() {
      if (this.lottery && this.lottery.lotteryItems) {
        return Object.values(this.lottery.lotteryItems);
      }
      return [];
    }
  },
  methods: {
    handleShowAddLotteryForm() {
      this.addLotteryItemVisible = true;
    },
    handleCancel() {
      this.addLotteryItemVisible = false;
    },
    handleOk() {
      this.handleSubmit();
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          let data = {
            lotteryItemName: values.lotteryItemName,
            smallIconPath: this.lotteryItemSmallIconPath.length>0? this.lotteryItemSmallIconPath[0]: "",
            jumpLink: values.jumpLink,
            prizeType: values.prizeType,
            couponId: values.couponId,
            point: values.point,
            awardImagePath:  this.lotteryItemAwardImagePath.length>0? this.lotteryItemAwardImagePath[0]: "",
            probability: values.probability,
            repertory: values.repertory
          };
          addLotteryItems(this.lottery.id, data).then(res => {
            this.$message.success(res.data.msg);
            this.$store.commit("Update_Lottery", res.data.data);
            this.addLotteryItemVisible = false;
            // this.$store.commit("Add_Lottery_Go_Next");
          });
        }
      });
    },
    handleAddLosingPrcieSubmit() {
      this.losingPriceForm.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          let data = {
            prizeName:values.prizeName,
            smallIconPath:this.smallIconPath.length>0? this.smallIconPath[0]: "",
            jumpLink:values.jumpLink,
            awardImagePath: this.awardImagePath.length>0? this.awardImagePath[0]: "",
          };
          addLosingPrice(this.lottery.id, data).then(res => {
            this.$message.success(res.data.msg);
            this.$store.commit("Update_Lottery", res.data.data);
            this.$store.commit("Add_Lottery_Go_Next");
          });
        }
      });
    },
    hanldeLotteryType(e) {
      this.priceType = e.target.value;
    },
    goLast() {
      this.$store.commit("Add_Lottery_Go_Last");
    },
    handleCleanLotteryItem() {
      deleteLotteryItems(this.lottery.id).then(res => {
        this.$message.success("清除成功！");
      });
    }
  },

};
</script>

<style scoped>
</style> 
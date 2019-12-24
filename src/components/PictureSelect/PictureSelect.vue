<template>
  <div>
    <picture-gallery
      :visible="isShowPictureGallery"
      :limit="limit"
      :module="module"
      @cancel="isShowPictureGallery=false"
      @ok="handlePicSelect"
    ></picture-gallery>
    <a-list :grid="{ gutter: 16, column: 4     }" :dataSource="value">
      <a-list-item slot="renderItem" slot-scope="item">
        <img :src="item" width="80" height="80">
      </a-list-item>
    </a-list>
    <a-button type="primary" @click="showPictureGallery" :disabled="disabled">选择图片(已选{{value.length}}张)</a-button>
  </div>
</template>

<script>
import { PictureGallery } from "@/components";
export default {
  components: {
    PictureGallery
  },
  props: {
    module: String,
    limit: Number,
    disabled:Boolean,
    value: Array
  },
  data() {
    return {
      isShowPictureGallery: false,
      valueTemp:[]
    };
  },
  created(){
    this.valueTemp = this.value
  },
  methods: {
    handlePicSelect(fileList) {
      this.valueTemp = fileList.map(file => {
        return file.path;
      });
      this.$emit('input',this.valueTemp)
      this.$emit('change',fileList)
    },
    showPictureGallery() {
      this.isShowPictureGallery = true;
    
    }
  }
};
</script>

<style>
</style>
<template>
  <div>
    <picture-gallery
      :visible="isShowPictureGallery"
      :multiple="multiple"
      :module="module"
      @cancel="isShowPictureGallery=false"
      @ok="handlePicSelect"
    ></picture-gallery>
    <a-list :grid="{ gutter: 16, column: 4 }" :dataSource="value">
      <a-list-item slot="renderItem" slot-scope="item">
        <img :src="item" width="80" height="80">
      </a-list-item>
    </a-list>
    <a-button type="primary" @click="showPictureGallery">选择图片(已选{{value.length}}张)</a-button>
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
    multiple:Boolean
  },
  data() {
    return {
      isShowPictureGallery: false,
      value: []
    };
  },
  methods: {
    handlePicSelect(fileList) {
      this.value = fileList.map(file => {
        return file.path;
      });
    },
    showPictureGallery() {
      this.isShowPictureGallery = true;
      this.$emit('value',this.value)
    }
  }
};
</script>

<style>
</style>
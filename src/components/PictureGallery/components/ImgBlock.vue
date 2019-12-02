<template>
    <div class="img-block">
        <template v-if="videoType.indexOf(path.substring(path.lastIndexOf('.') + 1)) != -1">
            <video :src="path" controls="controls" v-if="!isError" @error="handleError"></video>
            <div class="error-cover" v-if="isError">视频加载失败</div>
            <div class="video-cover"></div>
        </template>
        <template v-else>
            <img :src="path" v-if="!isError" @error="handleError">
            <div class="error-cover" v-if="isError">图片加载失败</div>
        </template>
    </div>
</template>

<script>
    export default {
        name: "ImgBlock",
        props: {
            path: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                videoType: ['mp4'],
                isError: false
            }
        },
        methods: {
            handleError() {
                this.isError = true
            }
        }
    }
</script>

<style scoped lang="less">
    .img-block {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;

        img, video {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 1;
            transform: translate(-50%, -50%);
            width: 100%;
            min-height: 100%;
            object-fit: cover;
        }

        .error-cover {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            padding: 5px;
            box-sizing: border-box;
            background: #f2f2f2;
            font-size: 12px;
        }
        .video-cover {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.3);
            z-index: 2;
            width: 100px;
            height: 100px;
            border-radius: 100%;
            background: rgba(255,255,255,0.8);

            &:after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                z-index: 3;
                transform: translate(-30%, -50%);
                display: block;
                border-left: 40px solid rgba(0,0,0,0.8);
                border-top: 25px solid rgba(0,0,0,0);
                border-right: 0px solid rgba(0,0,0,0);
                border-bottom: 25px solid rgba(0,0,0,0);
            }
        }
    }
</style>
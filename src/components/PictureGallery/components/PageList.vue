<template>
    <div class="page-list">
        <a-spin :spinning="loading">
            <div class="page-main">
                <div class="class-list">
                    <a-empty v-if="!classList.length" />
                    <div class="class-item"
                         :class="{active: (item.attach_module == activeClass)}"
                         v-for="(item, idx) in classList"
                         :key="idx"
                         @click="handleSelectedClass(item)">
                        {{item.module_name}}
                    </div>
                </div>
                <div class="img-list">
                    <div class="action-bar">
                        <div class="type-list">
                            <div class="type-item"
                                 :class="{active: item.id == activeType}"
                                 v-for="(item, idx) in typeList"
                                 :key="idx" @click="handleSelectedType(item)">
                                {{item.name}}
                            </div>
                        </div>
                        <div class="btn-list">
                            <a-button type="primary" v-if="showUpload" @click="handleClickUpload">上传图片</a-button>
                        </div>
                    </div>
                    <div class="img-item-list" :class="{empty: !imgList.length}">
                        <a-empty v-if="!imgList.length" />
                        <div class="img-item"
                             v-for="(item, idx) in imgList"
                             :key="idx"
                             :title="item.path.substring(item.path.lastIndexOf('/') + 1)"
                             @click="handleSelectedImg(item)">
                            <div class="img-item-main"
                                 :class="{active: selectImgIdList.indexOf(item.id) != -1}">
                                <img-block :path="item.path"></img-block>
                                <div class="bar" v-if="item.width && item.height">{{item.width}} * {{item.height}}</div>
                                <div class="index" v-if="selectImgIdList.indexOf(item.id) != -1">{{selectImgIdList.indexOf(item.id) + 1}}</div>
                            </div>
                            <div class="name">
                                {{item.path.substring(item.path.lastIndexOf('/') + 1).substring(0, 3) + '...' + item.path.substring(item.path.lastIndexOf('.') - 2)}}
                            </div>
                        </div>
                    </div>
                    <div class="page">
                        <a-pagination
                                v-model="page.current"
                                :page-size="page.pageSize"
                                :total="page.total"
                                :showTotal="total => `共 ${total} 条数据`"
                                @change="handleChangePage"/>
                    </div>
                </div>
            </div>
            <div class="page-footer">
                <a-button @click="handleCancel">取消</a-button>
                <a-button type="primary" @click="handleConfirm">
                    {{
                        selectImgListLimit == undefined
                        ? `已选 ${selectImgList.length} 个`
                        : `已选 ${selectImgList.length} / ${selectImgListLimit} 个`
                    }}
                </a-button>
            </div>
        </a-spin>
    </div>
</template>

<script>
    import { getAttach } from "@/api/attach"
    import ImgBlock from "./ImgBlock"
    export default {
        name: "PageList",
        components: {ImgBlock},
        props: {
            module: {
                type: String,
                default: 'all'
            },
            showTime: {
                type: String,
                default: ''
            },
            limit: {
                type: Number
            }
        },
        data() {
            return {
                loading: false,
                typeList: [
                    {id: 1, name: '图片', type: 'jpg.jpeg.png.webp.bmp'},
                    {id: 2, name: '视频', type: 'mp4.flv'}
                ],
                activeType: 1,
                classList: [],
                imgList: [],
                activeClass: this.module,
                selectImgList: [],
                selectImgListLimit: (this.limit == undefined ? this.limit : (+this.limit <= 0 ? 0 : +this.limit)),
                selectImgIdList: [],
                page: {
                    pageSize: 18,
                    current: 1,
                    total: 0
                },
                // showUpload: (this.module != 'all')
                showUpload: true
            }
        },
        watch: {
            // activeClass(activeClass) {
            //     this.showUpload = (activeClass != 'all')
            // },
            showTime() {
                this.getAttach()
            }
        },
        created() {
            this.getAttach()
        },
        methods: {
            getAttach() {
                this.activeClass || (this.activeClass = this.module)
                let data = {
                    module: this.activeClass,
                    page: this.page.current,
                    limit: this.page.pageSize,
                    type: this.typeList.filter(item => {
                        if(item.id == this.activeType) {
                            return item
                        }
                    })[0].type
                }
                this.imgList = []
                this.loading = true

                getAttach(data).then(res => {
                    let data = res.data.data
                    if(res.data && data && Object.keys(data).length) {
                        // if(this.module == 'all') {
                        this.classList = data.module
                        this.classList.unshift({attach_module: 'all', module_name: '全部'})
                        // } else {
                        //     this.classList = data.module.filter(class_item => {
                        //         return class_item.attach_module == this.module
                        //     })
                        // }

                        data.list.data.map(img_item => {
                            img_item.path = data.domain + img_item.path
                            return img_item
                        })
                        this.imgList = []
                        this.$nextTick(() => {
                            this.imgList = data.list.data
                        })

                        this.page.current = data.list.current_page
                        this.page.total = data.list.total
                    } else {
                        this.$message.error(res.data.message);
                    }
                }).catch(e => {
                    this.$message.error(e.message);
                }).finally(() => {
                    this.loading = false
                })
            },
            handleSelectedType(item) {
                this.activeType = item.id
                this.page.current = 1
                this.getAttach()
            },
            handleSelectedImg(item) {
                let hasItemIdx = null
                for(let i = 0; i < this.selectImgList.length; i++) {
                    if(this.selectImgList[i].id == item.id) {
                        hasItemIdx = i
                        break
                    }
                }
                if(hasItemIdx != null) {
                    this.selectImgList.splice(hasItemIdx, 1)
                    this.selectImgIdList.splice(hasItemIdx, 1)
                } else {
                    if(this.selectImgListLimit == undefined) {
                        this.selectImgList.push(item)
                        this.selectImgIdList.push(item.id)
                    } else {
                        this.selectImgList.push(item)
                        this.selectImgIdList.push(item.id)
                        if(+this.selectImgList.length > +this.selectImgListLimit) {
                            this.selectImgList.shift()
                            this.selectImgIdList.shift()
                        }
                    }
                    // if(this.multiple) {
                    //     this.selectImgList.push(item)
                    //     this.selectImgIdList.push(item.id)
                    // } else {
                    //     this.selectImgList = []
                    //     this.selectImgIdList = []
                    //
                    //     this.selectImgList.push(item)
                    //     this.selectImgIdList.push(item.id)
                    // }
                }
            },
            handleSelectedClass(item) {
                this.activeClass = item.attach_module
                this.page.current = 1
                this.activeType = this.typeList[0].id
                this.getAttach()
            },
            handleChangePage(page, pageSize) {
                this.page.current = page
                this.page.pageSize = pageSize
                this.getAttach()
            },
            handleConfirm() {
                this.$emit("ok", this.selectImgList.map(item => item))
            },
            handleCancel() {
                this.$emit("cancel")
            },
            handleClickUpload() {
                this.$emit("click:upload", this.$data)
            }
        }
    }
</script>

<style scoped lang="less">
    @import "~@/styles/global.less";
    .page-main {
        display: flex;
        align-items: stretch;
        height: 500px;

        .class-list {
            width: 200px;
            margin-right: 10px;
            border: 1px solid #f2f2f2;
            background: #f2f2f2;
            overflow: auto;

            .class-item {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 40px;
                background: #fff;
                cursor: pointer;

                & + .class-item {
                    border-top: 1px solid #f2f2f2;
                }
                &:hover {
                    background: #e6e6e6;
                }
                &.active {
                    background: @base-green;
                    color: #fff;
                }
            }
        }

        .img-list {
            flex: 1;
            display: flex;
            flex-direction: column;

            .action-bar {
                display: flex;
                align-items: center;
                height: fit-content;
                margin-bottom: 15px;

                .type-list {
                    flex: 1;
                    display: flex;
                    align-items: stretch;
                    height: fit-content;
                    white-space: nowrap;
                    overflow: auto;

                    .type-item {
                        position: relative;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        min-width: 80px;
                        height: 40px;
                        background: #fff;
                        cursor: pointer;

                        &:hover {
                            background: #e6e6e6;
                        }
                        &.active {
                            background: #fff;
                            color: @base-green;

                            &:after {
                                content: '';
                                position: absolute;
                                left: 0;
                                bottom: 0;
                                display: block;
                                width: 100%;
                                height: 3px;
                                background: @base-green;
                            }
                        }
                    }
                }

                .btn-list {
                    display: flex;
                    align-items: center;
                }
            }
            .img-item-list:not(.empty) {
                flex: 1;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
                grid-template-rows: 1fr 1fr 1fr;
                grid-row-gap: 0px;
                grid-column-gap: 5px;
                font-size: 0px;
                overflow: auto;

                .img-item {
                    display: inline-block;
                    /*margin: 5px 0 0 5px;*/
                    overflow: hidden;
                    cursor: pointer;

                    .img-item-main {
                        position: relative;
                        padding-top: 100%;
                        user-select: none;

                        /*img {*/
                        /*    position: absolute;*/
                        /*    top: 50%;*/
                        /*    left: 50%;*/
                        /*    transform: translate(-50%, -50%);*/
                        /*    z-index: 1;*/
                        /*    width: 100%;*/
                        /*    height: 100%;*/
                        /*    object-fit: cover;*/
                        /*}*/
                        .img-block {
                            position: absolute;
                            top: 0;
                            left: 0;
                        }

                        .bar {
                            position: absolute;
                            bottom: 0;
                            z-index: 2;
                            width: 100%;
                            padding: 5px;
                            box-sizing: border-box;
                            background: rgba(0,0,0,0.5);
                            color: #fff;
                            font-size: 12px;
                            text-align: center;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                        .index {
                            position: absolute;
                            top: 0;
                            right: 0;
                            z-index: 3;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            min-width: 25px;
                            height: 25px;
                            padding: 5px;
                            background: @base-green;
                            color: #fff;
                            font-size: 15px;
                        }

                        &.active:after {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            z-index: 3;
                            display: block;
                            width: 100%;
                            height: 100%;
                            border: 3px solid @base-green;
                        }
/*
                        &.active {
                            /deep/
                            & .action-bar {
                                display: none;
                            }
                            /deep/
                            &:hover {
                                & .action-bar {
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    width: 100%;
                                    height: 100%;
                                    z-index: 4;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    background: rgba(0,0,0,0.5);
                                    color: #fff;
                                    font-size: 25px;
                                }
                            }
                        }*/
                        /*
                        &.active:before {
                            content: '√';
                            position: absolute;
                            top: 0;
                            right: 0;
                            z-index: 3;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 25px;
                            height: 25px;
                            background: @base-green;
                            color: #fff;
                            font-size: 16px;
                        }*/
                    }
                    .name {
                        width: 100%;
                        padding: 5px;
                        box-sizing: border-box;
                        text-align: center;
                        font-size: 12px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                }
            }
            .img-item-list.empty {
                flex: 1;
            }
            .page {
                display: flex;
                justify-content: center;
                height: fit-content;
                margin-top: 15px;
            }
        }
    }
    .page-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 20px;
        /*padding-top: 24px;*/
        /*border-top: 1px solid #f2f2f2;*/

        .ant-btn {
            & + .ant-btn {
                margin-left: 25px;
            }
        }
    }
    .ant-empty {
        margin-top: 20px;
    }
</style>
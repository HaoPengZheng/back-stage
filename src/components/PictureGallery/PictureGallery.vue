<template>
    <div class="picture-gallery">
        <a-modal
                centered
                :title="title"
                :visible="modelVisible"
                :width="width"
                @cancel="() => modelVisible = false"
                :footer="null">

            <template v-if="modelVisible">
                <page-list
                        v-show="!showPageUpload"
                        :show-time="pageListShowTime"
                        :module="module"
                        :multiple="multiple"
                        @ok="handleConfirm"
                        @cancel="handleCancel"
                        @click:upload="handleClickUpload">
                </page-list>
                <page-upload
                        v-if="showPageUpload"
                        :module-list="moduleList"
                        :active-module="activeModule"
                        @ok="showPageUpload = false"
                        @cancel="showPageUpload = false">
                </page-upload>
            </template>
        </a-modal>
    </div>
</template>

<script>
    import PageList from "./components/PageList"
    import PageUpload from "./components/PageUpload"

    export default {
        name: "PictureGallery",
        components: {PageUpload, PageList},
        props: {
            title: {
                type: String,
                default: '图库'
            },
            width: {
                type: Number,
                default: 900
            },
            visible: {
                type: Boolean,
                default: false
            },
            module: {
                type: String,
                default: 'all'
            },
            multiple: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                showPageUpload: false,
                pageListShowTime: '',
                moduleList: [],
                activeModule: ''
            }
        },
        computed: {
            modelVisible: {
                get() {
                    return this.visible
                },
                set(visible) {
                    if(!visible) {
                        this.$emit("cancel")
                        this.$nextTick(() => {
                            Object.assign(this.$data, this.$options.data())
                        })
                    }
                }
            }
        },
        watch: {
            showPageUpload(isShow) {
                if(!isShow) {
                    this.pageListShowTime = +(new Date()) + ''
                }
            }
        },
        methods: {
            handleClickUpload(data) {
                this.showPageUpload = true
                let moduleList = Object.values(data.classList)
                moduleList.shift()
                this.moduleList = moduleList
                this.activeModule = data.activeClass
            },
            handleConfirm(attache_array) {
                this.modelVisible = false
                this.$emit("ok", attache_array)
                console.log(attache_array)
            },
            handleCancel() {
                this.modelVisible = false
            }
        }
    }
</script>

<style scoped lang="less">

</style>
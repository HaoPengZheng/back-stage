<template>
    <div class="page-upload">
        <a-spin :spinning="loading">
            <div class="page-main">
                <a-form :form="form">
                    <a-form-item label="选择模块" v-bind="formItemLayout">
                        <a-select
                                v-decorator="['module', optionConfig.module]"
                                placeholder="选择模块"
                                @change="handleSelectChange"
                        >
                            <a-select-option
                                    :value="item.attach_module"
                                    v-for="(item, idx) in moduleList"
                                    :key="idx"
                            >
                                {{item.module_name}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="上传图片" v-bind="formItemLayout">
                        <a-upload
                                :action="uploadUrl"
                                :data="uploadAddData"
                                :headers="uploadHeader"
                                listType="picture-card"
                                :fileList="fileList"
                                @preview="handlePreview"
                                @change="handleChange"
                                :remove="handleRemove"
                        >
                            <a-icon type="plus" />
                            <div class="ant-upload-text">直接上传</div>
                        </a-upload>
                    </a-form-item>
                </a-form>
            </div>
            <div class="page-footer">
                <a-button @click="handleCancel">返回</a-button>
<!--                <a-button type="primary" @click="handleConfirm">确定</a-button>-->
            </div>
        </a-spin>
        <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
            <img style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script>
    import {deleteAttach} from "@/api/attach"
    import { GOOD_BASE_URL } from '@/constant'
    export default {
        name: "PageUpload",
        props: {
            moduleList: {
                type: Array,
                default: () => []
            },
            activeModule: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                loading: false,
                form: this.$form.createForm(this, { name: 'pageUpload' }),
                formItemLayout: {
                    labelCol: {
                        sm: { span: 3 },
                    },
                    wrapperCol: {
                        sm: { span: 12 },
                    },
                },
                optionConfig: {
                    module: { rules: [{ required: true, message: '请选择模块！' }], initialValue: this.activeModule }
                },
                fileList: [],
                previewVisible: false,
                previewImage: '',
                selectedModule: this.activeModule,
                uploadUrl: `${GOOD_BASE_URL}/api/attach`,
                uploadHeader: {
                    company: this.$ls.get("company").id
                }
            }
        },
        methods: {
            uploadAddData() {
                return {
                    module: this.selectedModule
                }
            },
            handleSelectChange(value) {
                this.selectedModule = value
            },
            handlePreview(file) {
                this.previewImage = file.url || file.thumbUrl;
                this.previewVisible = true;
            },
            handleChange({ fileList }) {
                this.fileList = fileList;
            },
            async handleRemove(file) {
                let result = false
                if(file.response) {
                    let attach_id = file.response.data.attach_id
                    await deleteAttach(attach_id).then(res => {
                        if (res.data) {
                            if (res.data.status == 'true') {
                                this.$message.success(res.data.message)
                                result = true
                            } else {
                                this.$message.error(res.data.message)
                                result = false
                            }
                        } else {
                            this.$message.error("删除失败")
                            result = false
                        }
                    }).catch(() => {
                        this.$message.error("删除失败")
                        result = false
                    })
                } else {
                    result = true
                    this.$message.success("删除成功")
                }
                return result
            },
            handleConfirm() {
                this.$emit("ok")
            },
            handleCancel() {
                this.$emit("cancel")
            }
        }
    }
</script>

<style scoped lang="less">
    @import "~@/styles/global.less";
    .page-main {
        height: 500px;
    }
    .page-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 20px;

        .ant-btn {
            & + .ant-btn {
                margin-left: 25px;
            }
        }
    }
    .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
    }
    .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
    }
</style>
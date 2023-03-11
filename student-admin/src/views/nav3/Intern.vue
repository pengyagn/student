<template>
    <section>
        <el-row>
            <el-card class="box-card">
                <el-col :span="24">
                    <div class="text item">
                        <el-form ref="form" :model="form" label-width="80px" :rules="formRules">
                            <el-form-item prop="id" v-if="false" >
                                <el-input v-model="form.sid"></el-input>
                            </el-form-item>
                            <el-form-item label="学院" prop="collage">
                                <el-input v-model="form.collage"></el-input>
                            </el-form-item>
                            <el-form-item label="班级" prop="clazz">
                                <el-input v-model="form.clazz"></el-input>
                            </el-form-item>
                            <el-form-item label="学号" prop="sno">
                                <el-input v-model="form.sno"></el-input>
                            </el-form-item>
                            <el-form-item label="姓名" prop="username">
                                <el-input v-model="form.username"></el-input>
                            </el-form-item>
                            <el-form-item label="实习单位" prop="businessName">
                                <el-input v-model="form.businessName"></el-input>
                            </el-form-item>
                            <el-form-item label="实习部门" prop="businessType">
                                <el-input v-model="form.businessType"></el-input>
                            </el-form-item>
                            <el-form-item label="实习内容" prop="jobName">
                                <el-input v-model="form.jobName"></el-input>
                            </el-form-item>
                            <el-form-item label="个人总结" prop="sum">
                                <el-input type="textarea" v-model="form.sum"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="exportWord" >导出报告</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-card>
        </el-row>
    </section>
</template>

<script>

    import Docxtemplater from "docxtemplater";
    import PizZip from "pizzip";
    import PizZipUtils from "pizzip/utils/index.js";
    import { saveAs } from "file-saver";
    import {getSutdentList ,getSutdentInfo} from "../../api/api";
    export default {
        // name: "Intern"
        data() {
            return {
                form: {
                    sid: '',
                    sno: '',
                    username: '',
                    collage: '',
                    clazz: '',
                    businessName: '',
                    businessType: '',
                    jobName: '',
                    sum: '',
                },
                formRules:{
                    sum:[
                        { required: true, message: '请输入个人总结', trigger: 'blur' }
                    ],
                    uname: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    upassword: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    subject: [
                        { required: true, message: '请输入任教学科', trigger: 'blur' }
                    ],
                    sno: [
                        { required: true, message: '请输入学号', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    age: [
                        { required: true, message: '请输入年龄', trigger: 'blur' }
                    ],
                    clazz: [
                        { required: true, message: '请输入班级', trigger: 'blur' }
                    ],
                    gender: [
                        { required: true, message: '请输入性别', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入联系方式', trigger: 'blur' }
                    ],
                    collage: [
                        { required: true, message: '请输入学院', trigger: 'blur' }
                    ],
                    university: [
                        { required: true, message: '请输入大学', trigger: 'blur' }
                    ],
                    businessName: [
                        { required: true, message: '请输入公司名称', trigger: 'blur' }
                    ],
                    location: [
                        { required: true, message: '请输入地址', trigger: 'blur' }
                    ],
                    jobName: [
                        { required: true, message: '请输入职位名称', trigger: 'blur' }
                    ],
                    businessType: [
                        { required: true, message: '请输入公司类型', trigger: 'blur' }
                    ],
                    fuuniversity: [
                        { required: true, message: '请输入升学学院', trigger: 'blur' }
                    ],
                    education: [
                        { required: true, message: '请输入升学学历', trigger: 'blur' }
                    ],
                    major: [
                        { required: true, message: '请输入升学专业', trigger: 'blur' }
                    ],
                },
                sid: 0,
                editVisible: false,
                utype: '',
            }
        },

        methods:{
            getStuInfo(user){
                getSutdentInfo({sid: user.fkno}).then(res=>{
                    this.form.sid = res.data.sid
                    this.form.sno=res.data.sno
                    this.form.username= res.data.username
                    this.form.collage= res.data.collage
                    this.form.clazz= res.data.clazz
                    this.form.businessName= res.data.businessName
                    this.form.businessType= res.data.businessType
                    this.form.jobName= res.data.jobName
                    // this.form.sum: res.data.sid
                })
            },
            loadFile: function(url, callback) {
                PizZipUtils.getBinaryContent(url, callback);
            },
            // 点击导出word
            exportWord: function() {
                var _this = this
                // this.loadFile("https://docxtemplater.com/tag-example.docx", function(
                this.loadFile("../../../static/intern.docx", function(
                    error,
                    content
                ) {
                    if (error) {
                        throw error;
                    }
                    var zip = new PizZip(content);
                    var doc = new Docxtemplater(zip);
                    doc.setData({
                        // first_name: "John",
                        // last_name: "Doe",
                        // phone: "0652455478",
                        // description: "New Website",
                        sno: _this.form.sno,
                        username: _this.form.username,
                        clazz: _this.form.clazz,
                        businessName: _this.form.businessName,
                        businessType: _this.form.businessType,
                        jobName: _this.form.jobName,
                        collage: _this.form.collage,
                        sum: _this.form.sum,
                    });
                    try {
                        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                        doc.render();
                    } catch (error) {
                        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
                        function replaceErrors(key, value) {
                            if (value instanceof Error) {
                                return Object.getOwnPropertyNames(value).reduce(function(
                                    error,
                                    key
                                    ) {
                                        error[key] = value[key];
                                        return error;
                                    },
                                    {});
                            }
                            return value;
                        }
                        console.log(JSON.stringify({ error: error }, replaceErrors));

                        if (error.properties && error.properties.errors instanceof Array) {
                            const errorMessages = error.properties.errors
                                .map(function(error) {
                                    return error.properties.explanation;
                                })
                                .join("\n");
                            console.log("errorMessages", errorMessages);
                            // errorMessages is a humanly readable message looking like this :
                            // 'The tag beginning with "foobar" is unopened'
                        }
                        throw error;
                    }
                    var out = doc.getZip().generate({
                        type: "blob",
                        mimeType:
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    }); //Output the document using Data-URI
                    saveAs(out, _this.form.username + "实习报告.docx");
                });
            }
        },
        mounted() {
            var userJSON = JSON.parse(sessionStorage.getItem('user'))
            this.getStuInfo(userJSON)
        },


    }
</script>

<style scoped>
    .text {
        font-size: 18px;
    }
    .box-card {
        margin-top: 20px;
    }
    .item {
        padding: 20px 0;
    }
</style>
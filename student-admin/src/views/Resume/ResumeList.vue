<template>
    <section>

        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="简历名称" @input="getResumes"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getResumes">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增简历</el-button>
                </el-form-item>
            </el-form>
        </el-col>



        <template>
            <el-col :span="24" style="padding-bottom: 0px; padding-top: 10px">
                <el-card>
                    <el-table
                            :data="resumes"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                prop="id"
                                v-if="false"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="简历名称"
                        >
                            <template slot-scope="scope">
                                <a href="#" @click="handleEdit(scope.$index, scope.row)">{{scope.row.name}}</a>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="pubTime"
                                label="时间"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="pubPerson"
                                label="发布人"
                        >
                        </el-table-column>
                        <el-table-column label="操作" min-width="100">
                            <template scope="scope">
                                <!--					<el-button size="small" @click="handleEdit(scope.$index, scope.row)" v-show="false">编辑</el-button>-->
<!--                                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看简历</el-button>-->
<!--                                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                                <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <!--工具条-->
            <el-col :span="24" class="toolbar">
                <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size='pageSize' :total="total" style="float:right;">
                </el-pagination>
            </el-col>
        </template>

        <!--新增界面-->
        <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <!--			jid: 0,-->
            <!--			businessName: '',-->
            <!--			location: '',-->
            <!--			jobName: '',-->
            <!--			businessYear : '',-->
            <!--			education: '',-->
            <!--			businessType: '',-->
            <!--			money: '',-->
            <!--			pubTime: '',-->
            <!--			url: '',-->
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item prop="id" v-if="false">
                    <el-input v-model="addForm.id" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="sid" v-if="false">
                    <el-input v-model="addForm.sid" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="简历名称" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="技能" prop="skill">
                    <el-input v-model="addForm.skill" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="奖项" prop="reward">
                    <el-input v-model="addForm.reward" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="社会实践" prop="practice">
                    <el-input v-model="addForm.practice" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="自我评价" prop="evaluate">
                    <el-input v-model="addForm.evaluate" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--编辑界面-->
        <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item prop="id" v-if="false">
                    <el-input v-model="editForm.id" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="sid" v-if="false">
                    <el-input v-model="editForm.sid" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="姓名" prop="username">
                    <el-input v-model="editForm.username" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="editForm.age" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>

                <el-form-item label="联系方式" prop="phone">
                    <el-input v-model="editForm.phone" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>

                <el-form-item label="专业" prop="major">
                    <el-input v-model="editForm.major" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>

                <el-form-item label="学院" prop="collage">
                    <el-input v-model="editForm.collage" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="学校" prop="university">
                    <el-input v-model="editForm.university" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>

                <el-form-item label="技能" prop="skill">
                    <el-input v-model="editForm.skill" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="奖项" prop="reward">
                    <el-input v-model="editForm.reward" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="社会实践" prop="practice">
                    <el-input v-model="editForm.practice" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="自我评价" prop="evaluate">
                    <el-input v-model="editForm.evaluate" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">修改</el-button>
            </div>
        </el-dialog>


    </section>


</template>

<script>
    import {addAuth, addResume, editResume, getResumeList, removeResume} from '../../api/api'
    export default {
        // name: "NoticeList"
        data() {
            return {
                filters: {
                    name: '',
                },
                resumes: [],
                pageSize: 20,
                total: 0,
                addForm: {
                    practice: '',
                    id: '',
                    pubTime: '',
                    skill: '',
                    evaluate: '',
                    reward: '',
                    name: '',
                    sid: '',
                    pubPerson: '',
                    username: '',
                    gender: '',
                    phone: '',
                    collage: '',
                    university: '',
                },
                editForm: {
                    id: '',
                    pubTime: '',
                    skill: '',
                    evaluate: '',
                    reward: '',
                    name: '',
                    sid: '',
                    pubPerson: '',
                    username: '',
                    gender: '',
                    phone: '',
                    collage: '',
                    university: '',
                    practice: '',
                    email: '',
                    major:'',
                },
                editLoading: false,
                editFormVisible: false,
                editFormRules: {
                    skill:  [
                        { required: true, message: '请输入技能', trigger: 'blur' }
                    ],
                    reward:  [
                        { required: true, message: '请输入奖项', trigger: 'blur' }
                    ],
                    practice:  [
                        { required: true, message: '请输入社会实践', trigger: 'blur' }
                    ],
                    evaluate:  [
                        { required: true, message: '请输入自我评价', trigger: 'blur' }
                    ],


                },
                addLoading: false,
                addFormVisible: false,

                addFormRules: {
                    skill:  [
                        { required: true, message: '请输入技能', trigger: 'blur' }
                    ],
                    reward:  [
                        { required: true, message: '请输入奖项', trigger: 'blur' }
                    ],
                    practice:  [
                        { required: true, message: '请输入社会实践', trigger: 'blur' }
                    ],
                    evaluate:  [
                        { required: true, message: '请输入自我评价', trigger: 'blur' }
                    ],
                },
                utype: '',
                sid: 0,
            }
        },
        methods: {
           handleCurrentChange(val) {
               this.page = val;
               this.getResumes();
           },
           showResume() {
                alert('show')
           },
           getResumes() {
               let para = {
                   name: this.filters.name,
                   page: this.page,
                   pageSize: this.pageSize,
                   id: this.sid,
                   utype: this.utype
               }
               getResumeList(para).then(res=>{
                   console.log(res)
                   this.resumes = res.data.resumes
                   this.total = res.data.total
               })
           },
            //显示新增界面
            handleAdd: function () {
                // 查询用户是否存在简历
                if (this.total != 0) {
                    this.$message({
                        message: '您已存在一个简历',
                        type: 'warning'
                    });
                    return
                }

                this.addFormVisible = true;
                this.addForm = {
                    id: '',
                    pubTime: '',
                    skill: '',
                    evaluate: '',
                    reward: '',
                    name: '',
                    sid: '',
                    pubPerson: '',
                    username: '',
                    gender: '',
                    phone: '',
                    collage: '',
                    university: '',
                };
            },
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    // if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addLoading = true;
                        //NProgress.start();
                        // let para = Object.assign({}, this.addForm);
                        let pars = {
                            sid: this.sid,
                            name: this.addForm.name,
                            skill: this.addForm.skill,
                            evaluate: this.addForm.evaluate,
                            reward: this.addForm.reward,
                            practice: this.addForm.practice,
                        }
                        // console.log(pars)
                        addResume(pars).then((res) => {
                            this.addLoading = false;
                            //NProgress.done();
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.$refs['addForm'].resetFields();
                            this.addFormVisible = false;
                            this.getResumes();
                        });
                    });
                    // } else {
                    // 	console.log('error submit!')
                    // }
                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                            let para = {
                                id: this.editForm.id,
                                skill: this.editForm.skill,
                                evaluate: this.editForm.evaluate,
                                reward: this.editForm.reward,
                                practice: this.editForm.practice,
                                // pubTime: this.
                            }
                            editResume(para).then((res) => {
                                this.editLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.getResumes();
                            });
                        });
                    }
                });
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { id: row.id };
                    // console.log(para)
                    removeResume(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getResumes();
                    });
                }).catch(() => {

                });
            },
        },
        mounted() {
            var user = sessionStorage.getItem('user')
            var userJSON = JSON.parse(user)
            console.log(user)
            this.utype = userJSON.utype
            this.sid = userJSON.fkno
            this.getResumes()
        }
    }
</script>

<style scoped>
    el-card {
        padding-top: 20px;
    }
</style>
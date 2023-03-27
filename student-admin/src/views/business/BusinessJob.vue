<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.businessName" @input="getJobs" placeholder="公司名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.jobName" @input="getJobs" placeholder="职位名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getJobs">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="jobs" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="index" width="60"> </el-table-column>
      <el-table-column prop="jid" hidden="hidden" v-if="false"> </el-table-column>
      <el-table-column prop="jobName" label="职位名称" width="300" sortable>
        <template slot-scope="scope">
          <a :href="scope.row.url">{{ scope.row.jobName }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="businessName" label="公司名称" width="300" sortable> </el-table-column>
      <el-table-column prop="location" label="工作地点" width="120" sortable> </el-table-column>
      <el-table-column prop="businessYear" label="工作经验" width="150" sortable> </el-table-column>
      <el-table-column prop="education" label="学历" min-width="120" sortable> </el-table-column>
      <!-- <el-table-column prop="businessType" label="所在行业" min-width="300" sortable> </el-table-column> -->
      <el-table-column prop="money" label="薪水" min-width="150" sortable> </el-table-column>
      <el-table-column prop="pubTime" label="发布日期" min-width="120" sortable> </el-table-column>
      <el-table-column label="操作" width="150" fixed="right" v-if="this.utype == '0' || this.utype == '3' ? true : false">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)" type="primary">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next, jumper" :total="total" style="text-align: center; margin-top: 15px"> </el-pagination>

      <!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length === 0">批量删除</el-button> -->
      <!-- <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float: right"> </el-pagination> -->
      <!-- <el-pagination background layout="prev, pager, next" :total="total" style="text-align: center; margin-top: 15px" :page-size="pageSize" @current-change="handleCurrentChange"> </el-pagination> -->
    </el-col>

    <!--编辑界面-->
    <!--		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item prop="jid" hidden="hidden">
          <el-input v-model="editForm.jid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="businessName">
          <el-input v-model="editForm.businessName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工作地点" prop="location">
          <el-input v-model="editForm.location" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位名称" prop="jobName">
          <el-input v-model="editForm.jobName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工作年限" prop="businessYear">
          <el-input v-model="editForm.businessYear" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <el-input v-model="editForm.education" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司类型" prop="businessType">
          <el-input v-model="editForm.businessType" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="薪水" prop="money">
          <el-input v-model="editForm.money" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位链接" prop="url" v-if="false">
          <el-input v-model="editForm.url" readonly="readonly" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="发布日期" prop="pubTime">
          <el-input v-model="editForm.pubTime" readonly="readonly" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="公司名称" prop="businessName" v-if="false">
          <el-input v-model="addForm.businessName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工作地点" prop="location" v-if="false">
          <el-input v-model="addForm.location" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位名称" prop="jobName">
          <el-input v-model="addForm.jobName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工作年限" prop="businessYear">
          <el-input v-model="addForm.businessYear" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <el-input v-model="addForm.education" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司类型" prop="businessType" v-if="false">
          <el-input v-model="addForm.businessType" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="薪水" prop="money">
          <el-input v-model="addForm.money" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位链接" prop="url" v-if="false">
          <el-input v-model="addForm.url" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import util from '../../common/js/util'
//import NProgress from 'nprogress'
import { getJobListPage, removeJob, batchRemoveUser, editJob, addJob, getBusinessInfo } from '../../api/api'

export default {
  data() {
    return {
      addFormBusinessName: '',
      addFormLocation: '',
      filters: {
        jid: 0,
        businessName: '',
        location: '',
        jobName: '',
        businessYear: '',
        education: '',
        businessType: '',
        money: '',
        pubTime: '',
        url: ''
      },
      bid: '',
      utype: '',
      pageSize: 20,
      jobs: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], //列表选中列

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        businessName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        location: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        jobName: [{ required: true, message: '请输入职位', trigger: 'blur' }],
        businessYear: [{ required: true, message: '请输入工作年限', trigger: 'blur' }],
        education: [{ required: true, message: '请输入教育北京', trigger: 'blur' }],
        businessType: [{ required: true, message: '请输入公司类型', trigger: 'blur' }],
        money: [{ required: true, message: '请输入工资', trigger: 'blur' }],
        pubTime: [{ required: true, message: '请输入发布时间', trigger: 'blur' }],
        url: [{ required: true, message: '请输入详细链接', trigger: 'blur' }]
      },
      //编辑界面数据
      editForm: {
        jid: 0,
        businessName: '',
        location: '',
        jobName: '',
        businessYear: '',
        education: '',
        businessType: '',
        money: '',
        pubTime: '',
        url: ''
      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        businessName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        location: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        jobName: [{ required: true, message: '请输入职位', trigger: 'blur' }],
        businessYear: [{ required: true, message: '请输入工作年限', trigger: 'blur' }],
        education: [{ required: true, message: '请输入教育北京', trigger: 'blur' }],
        businessType: [{ required: true, message: '请输入公司类型', trigger: 'blur' }],
        money: [{ required: true, message: '请输入工资', trigger: 'blur' }],
        pubTime: [{ required: true, message: '请输入发布时间', trigger: 'blur' }],
        url: [{ required: true, message: '请输入详细链接', trigger: 'blur' }]
      },
      //新增界面数据
      addForm: {
        jid: 0,
        businessName: '',
        location: '',
        jobName: '',
        businessYear: '',
        education: '',
        businessType: '',
        money: '',
        pubTime: '',
        url: ''
      }
      // businessInfo: {},
    }
  },
  methods: {
    handleSizeChange(size) {
      this.pageSize = size
      this.page = 1
      this.getJobs()
    },
    //性别显示转换
    formatSex: function (row, column) {
      return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知'
    },
    handleCurrentChange(val) {
      this.page = val
      this.getJobs()
    },
    handleAttach(index, row) {
      console.log(index, row)
    },
    //获取用户列表
    getJobs() {
      let para = {
        bid: this.bid,
        utype: this.utype,
        page: this.page,
        pageSize: this.pageSize,
        businessName: this.filters.businessName,
        location: this.filters.location,
        jobName: this.filters.jobName,
        businessYear: this.filters.businessYear,
        education: this.filters.education,
        businessType: this.filters.businessType,
        money: this.filters.money,
        pubTime: this.filters.pubTime
      }
      this.listLoading = true
      //NProgress.start();
      getJobListPage(para).then((res) => {
        console.log(res)
        this.total = res.data.total
        this.jobs = res.data.jobs
        this.listLoading = false
        //NProgress.done();
      })
    },
    //删除
    handleDel: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.listLoading = true
          //NProgress.start();
          let para = { id: row.jid }
          // console.log(para)
          removeJob(para).then((res) => {
            this.listLoading = false
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getJobs()
          })
        })
        .catch(() => {})
    },
    //显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    //显示新增界面
    handleAdd: function () {
      // alert('add...')
      this.addFormVisible = true
      this.addForm = {
        jid: 0,
        businessName: '',
        location: '',
        jobName: '',
        businessYear: '',
        education: '',
        businessType: '',
        money: '',
        pubTime: '',
        url: ''
      }
    },
    //编辑
    editSubmit: function () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            //NProgress.start();
            let para = {
              jid: this.editForm.jid,
              businessName: this.editForm.businessName,
              location: this.editForm.location,
              jobName: this.editForm.jobName,
              businessYear: this.editForm.businessYear,
              education: this.editForm.education,
              businessType: this.editForm.businessType,
              money: this.editForm.money,
              pubTime: this.editForm.pubTime,
              url: this.editForm.url
            }
            editJob(para).then((res) => {
              this.editLoading = false
              //NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['editForm'].resetFields()
              this.editFormVisible = false
              this.getJobs()
            })
          })
        }
      })
    },
    //新增
    addSubmit: function () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            //NProgress.start();
            // let para = Object.assign({}, this.addForm);
            let pars = {
              utype: this.utype,
              bid: this.bid,
              businessName: this.addForm.businessName,
              location: this.addForm.location,
              jobName: this.addForm.jobName,
              businessYear: this.addForm.businessYear,
              education: this.addForm.education,
              businessType: this.addForm.businessType,
              money: this.addForm.money,
              pubTime: this.addForm.pubTime,
              url: this.addForm.url
            }
            addJob(pars).then((res) => {
              this.addLoading = false
              //NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['addForm'].resetFields()
              this.addFormVisible = false
              this.getJobs()
            })
          })
        }
      })
    },
    selsChange: function (sels) {
      this.sels = sels
    },
    //批量删除
    batchRemove: function () {
      var ids = this.sels.map((item) => item.id).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.listLoading = true
          //NProgress.start();
          let para = { ids: ids }
          batchRemoveUser(para).then((res) => {
            this.listLoading = false
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getJobs()
          })
        })
        .catch(() => {})
    },
    getBusinessInfo: function () {
      let par = {
        id: this.bid
      }
      getBusinessInfo(par).then((res) => {
        console.log(res.data.businessName)
        this.addForm = res.data
      })
    }
  },
  mounted() {
    // 通过权限进行设置
    var user = sessionStorage.getItem('user')
    var userJson = JSON.parse(user)
    this.utype = userJson.utype
    this.bid = userJson.fkno

    this.getBusinessInfo()

    this.getJobs()
  }
}
</script>

<style scoped></style>

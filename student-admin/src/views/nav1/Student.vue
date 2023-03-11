<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" @input="getStudent" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getStudent">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item prop="jid" hidden="hidden">
          <el-input v-model="editForm.jid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="eid" hidden="hidden">
          <el-input v-model="editForm.eid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="sid" hidden="hidden">
          <el-input v-model="editForm.sid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="sno">
          <el-input v-model="editForm.sno" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="editForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="editForm.age" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="clazz">
          <el-input v-model="editForm.clazz" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-input v-model="editForm.gender" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="editForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="collage">
          <el-select v-model="editForm.collage" auto-complete="off">
            <el-option v-for="item in this.colleges" :value="item" :key="item.id">{{ item }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学校" prop="university">
          <el-input v-model="editForm.university" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="就业公司" prop="businessName" v-if="editForm.jid != ''">
          <el-input v-model="editForm.businessName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" prop="location" v-if="editForm.jid != ''">
          <el-input v-model="editForm.location" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位名称" prop="jobName" v-if="editForm.jid != ''">
          <el-input v-model="editForm.jobName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司类型" prop="businessType" v-if="editForm.jid != ''">
          <el-input v-model="editForm.businessType" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="升学院校" prop="fuuniversity" v-if="editForm.eid != ''">
          <el-input v-model="editForm.fuuniversity" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="major" v-if="editForm.eid != ''">
          <el-input v-model="editForm.major" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="education" v-if="editForm.eid != ''">
          <el-input v-model="editForm.education" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--列表-->
    <template>
      <el-table v-loading="loading" :data="students" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="联系方式" prop="phone">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="性别" v-if="props.row.utype != '0'" prop="gender">
                <span>{{ props.row.gender }}</span>
              </el-form-item>
              <el-form-item label="年龄" v-if="props.row.utype != '0'" prop="age">
                <span>{{ props.row.age }}</span>
              </el-form-item>
              <el-form-item label="班级" v-if="props.row.utype != '0'" prop="clazz">
                <span>{{ props.row.clazz }}</span>
              </el-form-item>
              <el-form-item label="院系" prop="collage">
                <span>{{ props.row.collage }}</span>
              </el-form-item>
              <el-form-item label="学校" prop="university">
                <span>{{ props.row.university }}</span>
              </el-form-item>
              <el-form-item label="就业公司" v-if="props.row.jid != ''" prop="businessName">
                <span>{{ props.row.businessName }}</span>
              </el-form-item>
              <el-form-item label="公司地址" v-if="props.row.jid != ''" prop="businessName">
                <span>{{ props.row.location }}</span>
              </el-form-item>
              <el-form-item label="职位名称" v-if="props.row.jid != ''" prop="businessName">
                <span>{{ props.row.jobName }}</span>
              </el-form-item>
              <el-form-item label="公司类型" v-if="props.row.jid != ''" prop="businessName">
                <span>{{ props.row.businessType }}</span>
              </el-form-item>
              <el-form-item label="升学院校" v-if="props.row.eid != ''" prop="fuuniversity">
                <span>{{ props.row.fuuniversity }}</span>
              </el-form-item>
              <el-form-item label="专业" v-if="props.row.eid != ''" prop="fuuniversity">
                <span>{{ props.row.major }}</span>
              </el-form-item>
              <el-form-item label="学历" v-if="props.row.eid != ''" prop="fuuniversity">
                <span>{{ props.row.education }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="学号" prop="sno"> </el-table-column>
        <el-table-column label="姓名" prop="username"> </el-table-column>
        <el-table-column label="就业情况" prop="jid">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.jid != ''">已就业</el-tag>
            <el-tag type="danger" v-else>未就业</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="升学情况" prop="eid">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.eid != ''">已升学</el-tag>
            <el-tag type="danger" v-else>未升学</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150">
          <template scope="scope">
            <!--					<el-button size="small" @click="handleEdit(scope.$index, scope.row)" v-show="false">编辑</el-button>-->
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除学生信息</el-button>
            <el-button type="warning" size="small" @click="handleJobDel(scope.$index, scope.row)" v-if="scope.row.jid != ''">删除就业信息</el-button>
            <el-button type="warning" size="small" @click="handleEduDel(scope.$index, scope.row)" v-if="scope.row.eid != ''">删除升学信息</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float: right"> </el-pagination>
      </el-col>
    </template>
  </section>
</template>
<script>
import { editStudentInfo, getSutdentList, removeStu, removeJobInfo, removeEduInfo, getAllMajorAndCollege } from '../../api/api'
//import NProgress from 'nprogress'
export default {
  data() {
    return {
      filters: {
        name: ''
      },
      pageSize: 20,
      total: 0,
      page: 1,
      loading: false,
      students: [],
      subjects: [],
      colleges: [],
      fkno: '',
      utype: '',
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editForm: {
        sid: '',
        sno: '',
        username: '',
        age: '',
        clazz: '',
        gender: '',
        phone: '',
        collage: '',
        university: '',
        jid: 0,
        businessName: '',
        location: '',
        jobName: '',
        businessType: '',
        eid: 0,
        fuuniversity: '',
        education: '',
        major: ''
      },
      editFormRules: {
        sno: [{ required: true, message: '请输入学号', trigger: 'blur' }],
        username: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
        clazz: [{ required: true, message: '请输入班级', trigger: 'blur' }],
        gender: [{ required: true, message: '请输入性别', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
        collage: [{ required: true, message: '请输入学院', trigger: 'blur' }],
        university: [{ required: true, message: '请输入大学', trigger: 'blur' }],
        businessName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        location: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        jobName: [{ required: true, message: '请输入职位名称', trigger: 'blur' }],
        businessType: [{ required: true, message: '请输入公司类型', trigger: 'blur' }],
        fuuniversity: [{ required: true, message: '请输入升学学院', trigger: 'blur' }],
        education: [{ required: true, message: '请输入升学学历', trigger: 'blur' }],
        major: [{ required: true, message: '请输入升学专业', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getStudent()
    },
    //性别显示转换
    formatType: function (row, column) {
      return row.utype == 0 ? '管理员' : row.utype == 1 ? '学生' : '教师'
    },
    //获取用户列表
    getStudent: function () {
      let para = {
        name: this.filters.name,
        fkno: this.fkno,
        utype: this.utype,
        page: this.page,
        pageSize: this.pageSize
      }
      this.loading = true
      //NProgress.start();
      getSutdentList(para).then((res) => {
        console.log(res)
        if (res.data.code != 200) {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }

        this.students = res.data.students
        this.loading = false
        //NProgress.done();
      })
    },
    //显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    //编辑
    editSubmit: function () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            //NProgress.start();
            let para = {
              sid: this.editForm.sid,
              sno: this.editForm.sno,
              username: this.editForm.username,
              age: this.editForm.age,
              clazz: this.editForm.clazz,
              gender: this.editForm.gender,
              phone: this.editForm.phone,
              collage: this.editForm.collage,
              university: this.editForm.university,
              jid: this.editForm.jid,
              businessName: this.editForm.businessName,
              location: this.editForm.location,
              jobName: this.editForm.jobName,
              businessType: this.editForm.businessType,
              eid: this.editForm.eid,
              fuuniversity: this.editForm.fuuniversity,
              education: this.editForm.education,
              major: this.editForm.major
            }
            editStudentInfo(para).then((res) => {
              this.editLoading = false
              //NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['editForm'].resetFields()
              this.editFormVisible = false
              this.getStudent()
            })
          })
        }
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
          let para = { sid: row.sid, jid: row.jid }
          console.log(para)
          removeStu(para).then((res) => {
            this.listLoading = false
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getStudent()
          })
        })
        .catch(() => {})
    },
    handleJobDel: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.listLoading = true
          //NProgress.start();
          let para = { sid: row.sid, jid: row.jid, eid: row.eid }
          console.log(para)
          removeJobInfo(para).then((res) => {
            this.listLoading = false
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getStudent()
          })
        })
        .catch(() => {})
    },
    handleEduDel: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.listLoading = true
          //NProgress.start();
          let para = { sid: row.sid, eid: row.eid }
          console.log(para)
          removeEduInfo(para).then((res) => {
            this.listLoading = false
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getStudent()
          })
        })
        .catch(() => {})
    },
    findAllMajorAndCollege() {
      getAllMajorAndCollege().then((res) => {
        // console.log(res)
        this.subjects = res.data.subjects
        this.colleges = res.data.collegesList
      })
    }
  },
  mounted() {
    var user = sessionStorage.getItem('user')
    var userJSON = JSON.parse(user)
    this.fkno = userJSON.fkno
    this.utype = userJSON.utype
    // 查询专业 学院
    this.findAllMajorAndCollege()
    this.getStudent()
  }
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

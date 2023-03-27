<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.username" placeholder="账号" @input="getUser"></el-input>
        </el-form-item>
        <el-form-item>
          <!--					<el-input v-model="filters.utype" placeholder="角色"></el-input>-->
          <el-select v-model="filters.utype" placeholder="角色" @input="getUser">
            <el-option label="全部" value=""></el-option>
            <el-option label="管理员" value="0"></el-option>
            <el-option label="学生" value="1"></el-option>
            <el-option label="教师" value="2"></el-option>
            <el-option label="企业用户" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUser">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <template>
      <el-table v-loading="loading" :data="users" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="学号" v-if="props.row.utype == '1'">
                <span>{{ props.row.sno }}</span>
                <!--								<span>{{ props.row.utype }}</span>-->
              </el-form-item>
              <el-form-item label="工号" v-if="props.row.utype == '2'">
                <span>{{ props.row.tno }}</span>
              </el-form-item>
              <el-form-item label="姓名">
                <span>{{ props.row.username }}</span>
              </el-form-item>
              <el-form-item label="联系方式">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="性别" v-if="props.row.utype != '0' && props.row.utype != '3'">
                <span>{{ props.row.gender }}</span>
              </el-form-item>
              <el-form-item label="年龄" v-if="props.row.utype != '0' && props.row.utype != '3'">
                <span>{{ props.row.age }}</span>
              </el-form-item>
              <el-form-item label="班级" v-if="props.row.utype != '0' && props.row.utype != '3'">
                <span>{{ props.row.clazz }}</span>
              </el-form-item>
              <el-form-item label="学科" v-if="props.row.utype == '2' && props.row.utype != '3'">
                <span>{{ props.row.subject }}</span>
              </el-form-item>
              <el-form-item label="院系" v-if="props.row.utype != '3'">
                <span>{{ props.row.collage }}</span>
              </el-form-item>
              <el-form-item label="学校" v-if="props.row.utype != '3'">
                <span>{{ props.row.university }}</span>
              </el-form-item>

              <el-form-item label="所属部门" v-if="props.row.utype == '3'">
                <span>{{ props.row.dept }}</span>
              </el-form-item>
              <el-form-item label="公司名称" v-if="props.row.utype == '3'">
                <span>{{ props.row.businessName }}</span>
              </el-form-item>
              <el-form-item label="公司规模" v-if="props.row.utype == '3'">
                <span>{{ props.row.businessPerson }}</span>
              </el-form-item>
              <el-form-item label="公司类型" v-if="props.row.utype == '3'">
                <span>{{ props.row.businessType }}</span>
              </el-form-item>
              <el-form-item label="位置" v-if="props.row.utype == '3'">
                <span>{{ props.row.location }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="账号" prop="uname"> </el-table-column>
        <el-table-column label="密码" prop="upassword"> </el-table-column>
        <el-table-column label="角色" prop="utype" :formatter="formatType"> </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template scope="scope">
            <!--					<el-button size="small" @click="handleEdit(scope.$index, scope.row)" v-show="false">编辑</el-button>-->
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)" type="primary">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--工具条-->
      <el-col :span="24">
        <!-- <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float: right"> </el-pagination> -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next, jumper" :total="8" style="text-align: center; margin-top: 15px"> </el-pagination>

        <!-- <el-pagination background layout="prev, pager, next" :total="total" style="text-align: center; margin-top: 15px" :page-size="pageSize" @current-change="handleCurrentChange"> </el-pagination> -->
      </el-col>

      <!--编辑界面-->
      <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
          <el-form-item prop="sid" hidden="hidden">
            <el-input v-model="editForm.sid" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="tid" hidden="hidden">
            <el-input v-model="editForm.tid" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="aid" hidden="hidden">
            <el-input v-model="editForm.aid" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="bid" hidden="hidden">
            <el-input v-model="editForm.bid" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="uname">
            <el-input v-model="editForm.uname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="upassword">
            <el-input v-model="editForm.upassword" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="utype" hidden="hidden">
            <el-input v-model="editForm.utype" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="sno" v-if="editForm.utype == '1'">
            <el-input v-model="editForm.sno" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="工号" prop="tno" v-if="editForm.utype == '2'">
            <el-input v-model="editForm.tno" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="username">
            <el-input v-model="editForm.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age" v-if="editForm.utype != '0' && editForm.utype != '3'">
            <el-input v-model="editForm.age" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender" v-if="editForm.utype != '0' && editForm.utype != '3'">
            <el-input v-model="editForm.gender" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="clazz" v-if="editForm.utype != '0' && editForm.utype != '3'">
            <el-input v-model="editForm.clazz" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="editForm.phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="学科" prop="subject" v-if="editForm.utype == '2' && editForm.utype != '3'">
            <el-input v-model="editForm.subject" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="学院" prop="collage" v-if="editForm.utype != '3'">
            <!--						<el-input v-model="editForm.collage" auto-complete="off"></el-input>-->
            <el-select v-model="editForm.collage" auto-complete="off">
              <el-option v-for="item in this.colleges" :value="item" :key="item.id">{{ item }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学校" prop="university" v-if="editForm.utype != '3'">
            <el-input v-model="editForm.university" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="所属部门" prop="dept" v-if="editForm.utype == '3'">
            <el-input v-model="editForm.dept" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="公司名称" prop="businessName" v-if="editForm.utype == '3'">
            <el-input v-model="editForm.businessName" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="公司规模" prop="businessPerson" v-if="editForm.utype == '3'">
            <el-input v-model="editForm.businessPerson" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="公司类型" prop="businessType" v-if="editForm.utype == '3'">
            <el-input v-model="editForm.businessType" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="地址" prop="location" v-if="editForm.utype == '3'">
            <el-input v-model="editForm.location" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
      </el-dialog>

      <!--新增界面-->
      <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="管理员" name="admin">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
              <el-form-item label="账号" prop="uname">
                <el-input v-model="addForm.uname" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="upassword">
                <el-input v-model="addForm.upassword" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="类型" prop="utype" v-if="false">
                <el-input v-model="addForm.utype" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="年龄" prop="age" v-if="false">
                <el-input v-model="addForm.age" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="gender" v-if="false">
                <el-input v-model="addForm.gender" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="班级" prop="clazz" v-if="false">
                <el-input v-model="addForm.clazz" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="学科" prop="subject" v-if="false">
                <el-input v-model="addForm.subject" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="username">
                <el-input v-model="addForm.username" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" prop="phone">
                <el-input v-model="addForm.phone" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="学院" prop="collage">
                <el-select v-model="addForm.collage" auto-complete="off">
                  <el-option v-for="item in this.colleges" :value="item" :key="item.id">{{ item }}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学校" prop="university">
                <el-input v-model="addForm.university" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="学生" name="student">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
              <el-form-item label="账号" prop="uname">
                <el-input v-model="addForm.uname" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="upassword">
                <el-input v-model="addForm.upassword" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="类型" prop="utype" v-if="false">
                <el-input v-model="addForm.utype" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="学号" prop="sno">
                <el-input v-model="addForm.sno" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="username">
                <el-input v-model="addForm.username" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="年龄" prop="age">
                <el-input v-model="addForm.age" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="gender">
                <el-input v-model="addForm.gender" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="班级" prop="clazz">
                <el-input v-model="addForm.clazz" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" prop="phone">
                <el-input v-model="addForm.phone" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="addForm.email" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="专业" prop="major">
                <!--								<el-input v-model="addForm.major" auto-complete="off"></el-input>-->
                <el-select v-model="addForm.major" auto-complete="off">
                  <el-option v-for="item in this.subjects" :value="item" :key="item.id">{{ item }}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学院" prop="collage">
                <!--								<el-input v-model="addForm.collage" auto-complete="off"></el-input>-->
                <el-select v-model="addForm.collage" auto-complete="off">
                  <el-option v-for="item in this.colleges" :value="item" :key="item.id">{{ item }}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学校" prop="university">
                <el-input v-model="addForm.university" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="学科" prop="subject" v-if="false">
                <el-input v-model="addForm.subject" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="教师" name="teacher">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
              <el-form-item label="账号" prop="uname">
                <el-input v-model="addForm.uname" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="upassword">
                <el-input v-model="addForm.upassword" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="类型" prop="utype" v-if="false">
                <el-input v-model="addForm.utype" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="工号" prop="tno">
                <el-input v-model="addForm.tno" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="username">
                <el-input v-model="addForm.username" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="年龄" prop="age">
                <el-input v-model="addForm.age" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="gender">
                <el-input v-model="addForm.gender" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="班级" prop="clazz">
                <el-input v-model="addForm.clazz" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" prop="phone">
                <el-input v-model="addForm.phone" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="学科" prop="subject">
                <el-input v-model="addForm.subject" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="学院" prop="collage">
                <el-select v-model="addForm.collage" auto-complete="off">
                  <el-option v-for="item in this.colleges" :value="item" :key="item.id">{{ item }}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学校" prop="university">
                <el-input v-model="addForm.university" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>
    </template>
  </section>
</template>
<script>
import { addAuth, editAuth, getUserList, removeAuth, getAllMajorAndCollege } from '../../api/api'
//import NProgress from 'nprogress'
export default {
  data() {
    return {
      subjects: [],
      colleges: [],
      filters: {
        username: '',
        name: '',
        utype: ''
      },
      activeName: 'admin',
      pageSize: 10,
      total: 0,
      page: 1,
      loading: false,
      users: [],
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        uname: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        upassword: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        subject: [{ required: true, message: '请输入任教学科', trigger: 'blur' }],
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
      },
      //编辑界面数据
      editForm: {
        bid: '',
        uid: '',
        uname: '',
        upassword: '',
        utype: '',
        aid: '',
        sid: '',
        tid: '',
        sno: '',
        tno: '',
        username: '',
        age: '',
        clazz: '',
        gender: '',
        phone: '',
        subject: '',
        collage: '',
        university: '',
        businessName: '',
        businessType: '',
        businessPerson: '',
        location: '',
        dept: ''
      },
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        uname: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        upassword: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        subject: [{ required: true, message: '请输入任教学科', trigger: 'blur' }],
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
      },
      //新增界面数据
      addForm: {
        email: '',
        major: '',
        uid: '',
        uname: '',
        upassword: '',
        utype: '',
        aid: '',
        sid: '',
        tid: '',
        sno: '',
        tno: '',
        username: '',
        age: '',
        clazz: '',
        gender: '',
        phone: '',
        subject: '',
        collage: '',
        university: '',
        utype0: '0',
        utype1: '1',
        utype2: '2'
      }
    }
  },
  methods: {
    handleSizeChange(size) {
      this.pageSize = size
      this.page = 1
      this.getUser()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getUser()
    },
    //性别显示转换
    formatType: function (row, column) {
      return row.utype == 0 ? '管理员' : row.utype == 1 ? '学生' : row.utype == 2 ? '教师' : '公司管理员'
    },
    handleClick(tab, event) {
      this.addForm.utype = tab.index
    },
    //获取用户列表
    getUser: function () {
      let para = {
        name: this.filters.username,
        utype: this.filters.utype,
        page: this.page,
        pageSize: this.pageSize
      }
      this.loading = true
      getUserList(para).then((res) => {
        console.log(res)
        this.total = res.data.total
        this.users = res.data.users
        this.loading = false
      })
    },
    //显示新增界面
    handleAdd: function () {
      this.addFormVisible = true
      this.addForm = {
        email: '',
        major: '',
        uid: '',
        uname: '',
        upassword: '',
        utype: '0',
        aid: '',
        sid: '',
        tid: '',
        sno: '',
        tno: '',
        username: '',
        age: '',
        clazz: '',
        gender: '',
        phone: '',
        subject: '',
        collage: '',
        university: '',
        utype0: '0',
        utype1: '1',
        utype2: '2'
      }
    },
    addSubmit: function () {
      this.$refs.addForm.validate((valid) => {
        this.$confirm('确认提交吗？', '提示', {}).then(async () => {
          this.addLoading = true
          let pars = {
            uname: this.addForm.uname,
            upassword: this.addForm.upassword,
            utype: this.addForm.utype,
            sno: this.addForm.sno,
            tno: this.addForm.tno,
            username: this.addForm.username,
            age: this.addForm.age,
            clazz: this.addForm.clazz,
            gender: this.addForm.gender,
            phone: this.addForm.phone,
            subject: this.addForm.subject,
            collage: this.addForm.collage,
            university: this.addForm.university,
            email: this.addForm.email,
            major: this.addForm.major
          }
          const { data: res } = await addAuth(pars)
          this.addLoading = false
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.$refs['addForm'].resetFields()
          this.addFormVisible = false
          this.getUser()
        })
      })
    },
    //显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    //删除
    handleDel: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.listLoading = true
          let para = {
            id: row.uid,
            utype: row.utype
          }
          removeAuth(para).then((res) => {
            this.listLoading = false
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getUser()
          })
        })
        .catch(() => {})
    },
    //编辑
    editSubmit: function () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            let para = {
              utype: this.editForm.utype,
              uid: this.editForm.uid,
              uname: this.editForm.uname,
              upassword: this.editForm.upassword,
              aid: this.editForm.aid,
              sid: this.editForm.sid,
              tid: this.editForm.tid,
              sno: this.editForm.sno,
              tno: this.editForm.tno,
              username: this.editForm.username,
              age: this.editForm.age,
              clazz: this.editForm.clazz,
              gender: this.editForm.gender,
              phone: this.editForm.phone,
              subject: this.editForm.subject,
              collage: this.editForm.collage,
              university: this.editForm.university,
              dept: this.editForm.dept,
              businessName: this.editForm.businessName,
              businessType: this.editForm.businessType,
              businessPerson: this.editForm.businessPerson,
              location: this.editForm.location,
              bid: this.editForm.bid
            }
            editAuth(para).then((res) => {
              this.editLoading = false
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['editForm'].resetFields()
              this.editFormVisible = false
              this.getUser()
            })
          })
        }
      })
    },

    async findAllMajorAndCollege() {
      const { data: res } = await getAllMajorAndCollege()
      this.subjects = res.subjects
      this.colleges = res.collegesList
    }
  },
  created() {
    // 查询专业 学院
    this.findAllMajorAndCollege()
    this.getUser()
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

<template>
  <div>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="ruleForm2.auth" @change="radioChange">
          <el-radio label="0">管理员</el-radio>
          <el-radio label="1">学生</el-radio>
          <el-radio label="2">教师</el-radio>
          <el-radio label="3">企业用户</el-radio>
        </el-radio-group>
        <el-button type="primary" size="small" style="float: right" @click="onSubmit" v-if="showBusiness">注册企业用户</el-button>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="账号" prop="uname">
          <el-input v-model="addForm.uname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="upasswd">
          <el-input v-model="addForm.upasswd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工号" prop="bno">
          <el-input v-model="addForm.bno" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="addForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="dept">
          <el-input v-model="addForm.dept" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="businessName">
          <el-input v-model="addForm.businessName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司规模" prop="businessPerson">
          <el-input v-model="addForm.businessPerson" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司类型" prop="businessType">
          <el-input v-model="addForm.businessType" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工作地点" prop="location">
          <el-input v-model="addForm.location" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { requestLogin, addBusinessPerson } from '../api/api'
import axios from 'axios'
export default {
  data() {
    return {
      activeName: 'first',
      logining: false,
      showBusiness: false,
      ruleForm2: {
        account: 'admin',
        checkPass: '123456',
        auth: ''
      },
      rules2: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        checkPass: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      checked: true,
      addForm: {
        uname: '',
        upasswd: '',
        name: '',
        bno: '',
        phone: '',
        dept: '',
        businessName: '',
        businessPerson: '',
        businessType: '',
        location: ''
      },
      addFormVisible: false,
      addFormRules: {
        uname: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        upasswd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入员工姓名', trigger: 'blur' }],
        bno: [{ required: true, message: '请输入员工号', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],

        dept: [{ required: true, message: '请输入所属部门', trigger: 'blur' }],
        businessName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        businessPerson: [{ required: true, message: '请输入公司规模', trigger: 'blur' }],
        businessType: [{ required: true, message: '请输入公司类型', trigger: 'blur' }],
        location: [{ required: true, message: '请输入公司地址', trigger: 'blur' }]
      },
      addLoading: false,
      val: ''
    }
  },
  methods: {
    radioChange: function (val) {
      this.val = val
      if (val == '3') {
        this.showBusiness = true
      } else {
        this.showBusiness = false
      }
    },
    onSubmit() {
      //显示新增界面
      this.addFormVisible = true
      this.addForm = {
        name: '',
        bno: '',
        phone: '',
        dept: '',
        businessName: '',
        businessPerson: '',
        businessType: '',
        location: ''
      }
    },
    //新增
    addSubmit: function () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            this.registerBusinessPerson()
          })
        }
      })
    },
    async registerBusinessPerson() {
      let pars = {
        businessName: this.addForm.businessName,
        location: this.addForm.location,
        businessType: this.addForm.businessType,
        uname: this.addForm.uname,
        upasswd: this.addForm.upasswd,
        name: this.addForm.name,
        bno: this.addForm.bno,
        phone: this.addForm.phone,
        dept: this.addForm.dept,
        businessPerson: this.addForm.businessPerson
      }
      const { data: res } = await addBusinessPerson(pars)
      if (res.code == 200) {
        this.addLoading = false
        this.$message({ message: '提交成功', type: 'success' })
        this.$refs.addForm.resetFields()
        this.addFormVisible = false
      }
    },
    handleSubmit2(ev) {
      var _this = this
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.logining = true
          var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass }
          requestLogin(loginParams).then((data) => {
            this.logining = false
            let { code, user } = data.data
            console.log(user)
            if (code !== 200) {
              this.$message({
                message: '用户不存在',
                type: 'error'
              })
            } else {
              // 查询是否为该类型用户
              if (this.val == '0') {
                if (user.utype != '0') {
                  this.$message({
                    message: '非管理员登录',
                    type: 'warning'
                  })
                  return
                }
              }

              if (this.val == '1') {
                if (user.utype != '1') {
                  this.$message({
                    message: '非学生登录',
                    type: 'warning'
                  })
                  return
                }
              }

              if (this.val == '2') {
                if (user.utype != '2') {
                  this.$message({
                    message: '非教师登录',
                    type: 'warning'
                  })
                  return
                }
              }

              if (this.val == '3') {
                if (user.utype != '3') {
                  this.$message({
                    message: '非企业用户登录',
                    type: 'warning'
                  })
                  return
                }
              }
              sessionStorage.setItem('user', JSON.stringify(user))
              sessionStorage.setItem('utype', user.utype)
              this.$store.commit('setUtype', user.utype)
              var utype = user.utype
              localStorage.setItem('utype', user.utype)
              var len = this.$router.options.routes.length
              for (var i = 2; i < len - 1; i++) {
                this.$router.options.routes[i].hidden = false
              }
              if (utype == '1') {
                // 456 8
                this.$router.options.routes[4].hidden = true
                this.$router.options.routes[5].hidden = true
                this.$router.options.routes[6].hidden = true
                this.$router.options.routes[8].hidden = true
                // this.$router.options.routes[10].hidden = true
                this.$router.options.routes[11].hidden = true
                this.$router.options.routes[12].hidden = true
                this.$router.options.routes[13].hidden = true
                this.$router.options.routes[14].hidden = true
                this.$router.options.routes[15].hidden = true
                this.$router.options.routes[16].hidden = true
              }
              console.log(this.$router.options.routes)

              if (utype == '0') {
                // this.$router.options.routes[5].hidden = true
                this.$router.options.routes[9].hidden = true
                this.$router.options.routes[7].hidden = true
                this.$router.options.routes[10].hidden = true
                this.$router.options.routes[11].hidden = true
                this.$router.options.routes[12].hidden = true
                this.$router.options.routes[13].hidden = true
                // this.$router.options.routes[16].hidden = true
              }

              if (utype == '2') {
                this.$router.options.routes[4].hidden = true
                this.$router.options.routes[9].hidden = true
                this.$router.options.routes[7].hidden = true
                this.$router.options.routes[10].hidden = true
                this.$router.options.routes[11].hidden = true
                this.$router.options.routes[12].hidden = true
                this.$router.options.routes[13].hidden = true
                this.$router.options.routes[14].hidden = true
                this.$router.options.routes[15].hidden = true
              }

              if (utype == '3') {
                this.$router.options.routes[3].hidden = true
                this.$router.options.routes[4].hidden = true
                this.$router.options.routes[5].hidden = true
                this.$router.options.routes[6].hidden = true
                this.$router.options.routes[7].hidden = true
                this.$router.options.routes[8].hidden = true
                this.$router.options.routes[9].hidden = true
                this.$router.options.routes[10].hidden = true
                this.$router.options.routes[14].hidden = true
                this.$router.options.routes[15].hidden = true
                this.$router.options.routes[16].hidden = true
              }

              this.$router.push({ path: '/main' })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>

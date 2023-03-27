<template>
  <section>
    <el-row>
      <el-card class="box-card">
        <el-col :span="24">
          <div class="text item">
            <div v-if="this.userInfo.utype == '0'">
              <el-form :model="userInfo" :rules="userInfoRules" ref="userInfo" label-width="100px" class="demo-ruleForm">
                <el-form-item prop="utype" hidden="hidden">
                  <el-input v-model="userInfo.utype"></el-input>
                </el-form-item>
                <el-form-item prop="id" hidden="hidden">
                  <el-input v-model="userInfo.id"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" prop="username">
                  <el-input v-model="userInfo.username"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="phone">
                  <el-input v-model="userInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="院系" prop="collage">
                  <el-select v-model="userInfo.collage" auto-complete="off">
                    <el-option v-for="item in this.colleges" :value="item" :key="item.id">{{ item }}</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="学校" prop="university">
                  <el-input v-model="userInfo.university"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('userInfo')">修改信息</el-button>
                  <!--									<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                </el-form-item>
              </el-form>
            </div>

            <div v-show="this.userInfo.utype == '1'">
              <el-form :model="userInfo" :rules="userInfoRules" ref="userInfo" label-width="100px" class="demo-ruleForm">
                <el-form-item prop="utype" hidden="hidden">
                  <el-input v-model="userInfo.utype"></el-input>
                </el-form-item>
                <el-form-item prop="id" hidden="hidden">
                  <el-input v-model="userInfo.id"></el-input>
                </el-form-item>
                <el-form-item label="学号" prop="no">
                  <el-input v-model="userInfo.no"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" prop="username">
                  <el-input v-model="userInfo.username"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                  <el-input v-model="userInfo.gender"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                  <el-input v-model="userInfo.age"></el-input>
                </el-form-item>
                <el-form-item label="班级" prop="clazz">
                  <el-input v-model="userInfo.clazz"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="phone">
                  <el-input v-model="userInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="userInfo.email"></el-input>
                </el-form-item>
                <el-form-item label="专业" prop="major">
                  <el-select v-model="userInfo.major" auto-complete="off">
                    <el-option v-for="item in this.subjects" :value="item" :key="item.id">{{ item }}</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="院系" prop="collage">
                  <el-select v-model="userInfo.collage" auto-complete="off">
                    <el-option v-for="item in this.colleges" :value="item" :key="item.id">{{ item }}</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="学校" prop="university">
                  <el-input v-model="userInfo.university"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('userInfo')">修改信息</el-button>
                </el-form-item>
              </el-form>
            </div>

            <div v-show="this.userInfo.utype == '2'">
              <el-form :model="userInfo" :rules="userInfoRules" ref="userInfo" label-width="100px" class="demo-ruleForm">
                <el-form-item prop="utype" hidden="hidden">
                  <el-input v-model="userInfo.utype"></el-input>
                </el-form-item>
                <el-form-item prop="id" hidden="hidden">
                  <el-input v-model="userInfo.id"></el-input>
                </el-form-item>
                <el-form-item label="工号" prop="no">
                  <el-input v-model="userInfo.no"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" prop="username">
                  <el-input v-model="userInfo.username"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                  <el-input v-model="userInfo.gender"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                  <el-input v-model="userInfo.age"></el-input>
                </el-form-item>
                <el-form-item label="班级" prop="clazz">
                  <el-input v-model="userInfo.clazz"></el-input>
                </el-form-item>
                <el-form-item label="学科" prop="clazz">
                  <!--									<el-input v-model="userInfo.subject"></el-input>-->
                  <el-select v-model="userInfo.subject" auto-complete="off">
                    <el-option v-for="item in this.subjects" :value="item" :key="item.id">{{ item }}</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="联系方式" prop="phone">
                  <el-input v-model="userInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="院系" prop="collage">
                  <el-select v-model="userInfo.collage" auto-complete="off">
                    <el-option v-for="item in this.colleges" :value="item" :key="item.id">{{ item }}</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="学校" prop="university">
                  <el-input v-model="userInfo.university"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('userInfo')">修改信息</el-button>
                  <!--									<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                </el-form-item>
              </el-form>
            </div>

            <div v-show="this.userInfo.utype == '3'">
              <el-form :model="userInfo" :rules="userInfoRules" ref="userInfo" label-width="100px" class="demo-ruleForm">
                <el-form-item prop="utype" hidden="hidden">
                  <el-input v-model="userInfo.utype"></el-input>
                </el-form-item>
                <el-form-item prop="id" hidden="hidden">
                  <el-input v-model="userInfo.id"></el-input>
                </el-form-item>
                <el-form-item label="工号" prop="no">
                  <el-input v-model="userInfo.no" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" prop="username">
                  <el-input v-model="userInfo.username"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="phone">
                  <el-input v-model="userInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="dept">
                  <el-input v-model="userInfo.dept" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="公司名称" prop="businessName">
                  <el-input v-model="userInfo.businessName" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('userInfo')">修改信息</el-button>
                  <!--									<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-card>
    </el-row>
  </section>
</template>

<script>
import { getUser, editUser, getAllMajorAndCollege } from '../api/api'
export default {
  data() {
    return {
      subjects: [],
      colleges: [],
      userInfo: {
        major: '',
        email: '',
        utype: '',
        username: '',
        phone: '',
        collage: '',
        university: '',
        id: '',
        no: '',
        age: '',
        clazz: '',
        gender: '',
        subject: '',
        dept: '',
        businessName: ''
      },
      userInfoRules: {
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        major: [{ required: true, message: '请输入专业', trigger: 'blur' }],
        uname: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        upassword: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        subject: [{ required: true, message: '请输入任教学科', trigger: 'blur' }],
        no: [{ required: true, message: '请输入学号', trigger: 'blur' }],
        username: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
        clazz: [{ required: true, message: '请输入班级', trigger: 'blur' }],
        gender: [{ required: true, message: '请输入性别', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
        collage: [{ required: true, message: '请输入学院', trigger: 'blur' }],
        university: [{ required: true, message: '请输入大学', trigger: 'blur' }],
        // businessName: [
        // 	{ required: true, message: '请输入公司名称', trigger: 'blur' }
        // ],
        location: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        jobName: [{ required: true, message: '请输入职位名称', trigger: 'blur' }],
        businessType: [{ required: true, message: '请输入公司类型', trigger: 'blur' }],
        fuuniversity: [{ required: true, message: '请输入升学学院', trigger: 'blur' }],
        education: [{ required: true, message: '请输入升学学历', trigger: 'blur' }],
        major: [{ required: true, message: '请输入升学专业', trigger: 'blur' }]
        // dept: [
        // 	{ required: true, message: '请输入部门', trigger: 'blur' }
        // ],
      },

      adminShow: false
    }
  },
  methods: {
    submitForm(formName) {
      // alert('11')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            let pars = {
              id: this.userInfo.id,
              utype: this.userInfo.utype,
              username: this.userInfo.username,
              phone: this.userInfo.phone,
              collage: this.userInfo.collage,
              university: this.userInfo.university,
              no: this.userInfo.no,
              age: this.userInfo.age,
              clazz: this.userInfo.clazz,
              gender: this.userInfo.gender,
              subject: this.userInfo.subject,
              email: this.userInfo.email,
              major: this.userInfo.major
            }

            // console.log(pars)

            editUser(pars).then((res) => {
              this.$message({
                message: '提交成功',
                type: 'success'
              })

              var user = sessionStorage.getItem('user')
              var u = JSON.parse(user)
              var pars = {
                id: u.uid
              }
              this.getUserInfo(pars)
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    getUserInfo(pars) {
      getUser(pars).then((data) => {
        console.log(data)
        this.userInfo.utype = data.data.utype
        if (this.userInfo.utype == '0') {
          this.userInfo.id = data.data.id
          this.userInfo.username = data.data.username
          this.userInfo.phone = data.data.phone
          this.userInfo.collage = data.data.collage
          this.userInfo.university = data.data.university
        }

        if (this.userInfo.utype == '1') {
          ;(this.userInfo.id = data.data.sid),
            (this.userInfo.no = data.data.sno),
            (this.userInfo.username = data.data.name),
            (this.userInfo.age = data.data.age),
            (this.userInfo.clazz = data.data.clazz),
            (this.userInfo.gender = data.data.gender),
            (this.userInfo.phone = data.data.phone),
            (this.userInfo.collage = data.data.collage),
            (this.userInfo.university = data.data.university)
          this.userInfo.email = data.data.email
          this.userInfo.major = data.data.major
        }

        if (this.userInfo.utype == '2') {
          ;(this.userInfo.id = data.data.tid),
            (this.userInfo.no = data.data.tno),
            (this.userInfo.username = data.data.name),
            (this.userInfo.age = data.data.age),
            (this.userInfo.clazz = data.data.clazz),
            (this.userInfo.subject = data.data.subject),
            (this.userInfo.phone = data.data.phone),
            (this.userInfo.collage = data.data.collage),
            (this.userInfo.university = data.data.university),
            (this.userInfo.gender = data.data.gender),
            (this.userInfo.phone = data.data.phone)
        }

        if (this.userInfo.utype == '3') {
          ;(this.userInfo.utype = data.data.utype),
            (this.userInfo.id = data.data.id),
            (this.userInfo.no = data.data.no),
            (this.userInfo.username = data.data.name),
            (this.userInfo.phone = data.data.phone),
            (this.userInfo.dept = data.data.dept),
            (this.userInfo.bid = data.data.bid),
            (this.userInfo.businessName = data.data.businessName)
        }
      })
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
    var u = JSON.parse(user)
    var pars = {
      id: u.uid
    }
    // 查询专业 学院
    this.findAllMajorAndCollege()
    // console.log(pars)
    this.getUserInfo(pars)
  }
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

/*.box-card {*/
/*	width: 480px;*/
/*}*/
</style>

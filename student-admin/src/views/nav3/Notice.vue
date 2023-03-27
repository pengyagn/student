<template>
  <section>
    <el-row>
      <el-card class="box-card">
        <el-col :span="24">
          <div class="text item">
            <el-form ref="form" :model="form" label-width="80px" :rules="formRules">
              <el-form-item label="公告时间" required>
                <el-col :span="8">
                  <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="公告标题" prop="title">
                <el-col :span="8">
                  <el-input v-model="form.title"></el-input>
                </el-col>
              </el-form-item>
              <!-- <el-form-item label="公告内容" prop="desc">
                <el-col :span="8">
                  <el-input type="textarea" v-model="form.desc"></el-input>
                </el-col>
              </el-form-item> -->
              <el-form-item label="公告内容" prop="desc">
                <!-- 使用 v-model 进行双向的数据绑定 -->

                <quill-editor v-model="form.desc" style="height: 300px"></quill-editor>
              </el-form-item>
              <el-form-item style="margin-top: 80px">
                <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-card>
    </el-row>
  </section>
</template>

<script>
import { addNotice } from '../../api/api'
export default {
  data() {
    return {
      form: {
        date1: '',
        title: '',
        desc: ''
      },
      formRules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      tid: '',
      editForm: {},
      editFormVisible: false,
      editFormRules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let para = {
            date1: this.form.date1,
            title: this.form.title,
            desc: this.form.desc.replace(/<[^>]+>/g, ''),
            tid: this.tid
          }
          const { data: res } = await addNotice(para)
          if (res.code == 200) {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
          }
          this.$refs[formName].resetFields()
        } else {
          this.$message({
            message: '提交失败',
            type: 'warning'
          })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  created() {
    var user = sessionStorage.getItem('user')
    var userJSON = JSON.parse(user)
    this.tid = userJSON.fkno
  }
}
</script>

<style lang="scss" scoped>
.text {
  font-size: 18px;
}
.box-card {
  margin-top: 20px;
  height: 600px;
}
.item {
  padding: 20px 0;
}
/deep/ .ql-editor {
  min-height: 300px;
}
</style>

<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.collegeName" placeholder="学院名称" @input="getColleges"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.collegeAdmin" placeholder="院长" @input="getColleges"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getColleges">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增学院</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <template>
      <el-col :span="24" style="padding-bottom: 0px; padding-top: 10px">
        <el-card>
          <el-table :data="colleges" stripe style="width: 100%">
            <el-table-column prop="id" v-if="false"> </el-table-column>
            <el-table-column prop="collegeName" label="学院名称"> </el-table-column>
            <el-table-column prop="collegeAdmin" label="院长"> </el-table-column>
            <el-table-column label="操作" min-width="100">
              <template scope="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <!--工具条-->
      <el-col :span="24">
        <!-- <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float: right"> </el-pagination> -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next, jumper" :total="total" style="text-align: center; margin-top: 15px"> </el-pagination>
      </el-col>
    </template>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item prop="id" v-if="false">
          <el-input v-model="addForm.id" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="学院名称" prop="collegeName">
          <el-input v-model="addForm.collegeName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="学院院长" prop="collegeAdmin">
          <el-input v-model="addForm.collegeAdmin" auto-complete="off"></el-input>
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
        <el-form-item label="学院名称" prop="collegeName">
          <el-input v-model="editForm.collegeName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="学院院长" prop="collegeAdmin">
          <el-input v-model="editForm.collegeAdmin" auto-complete="off"></el-input>
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
import { addAuth, addCollege, editCollege, getCollegeList, removeCollege } from '../../api/api'
export default {
  // name: "NoticeList"
  data() {
    return {
      filters: {
        collegeName: '',
        collegeAdmin: ''
      },
      colleges: [],
      pageSize: 20,
      total: 0,
      addForm: {
        id: '',
        collegeName: '',
        collegeAdmin: ''
      },
      editForm: {
        id: '',
        collegeName: '',
        collegeAdmin: ''
      },
      editLoading: false,
      editFormVisible: false,
      editFormRules: {
        collegeName: [{ required: true, message: '请输入学院名称', trigger: 'blur' }],
        collegeAdmin: [{ required: true, message: '请输入学院负责人', trigger: 'blur' }]
      },
      addLoading: false,
      addFormVisible: false,

      addFormRules: {
        collegeName: [{ required: true, message: '请输入学院名称', trigger: 'blur' }],
        collegeAdmin: [{ required: true, message: '请输入学院负责人', trigger: 'blur' }]
      },
      utype: '',
      sid: 0
    }
  },
  methods: {
    handleSizeChange(size) {
      this.pageSize = size
      this.page = 1
      this.getColleges()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getColleges()
    },
    getColleges() {
      let para = {
        collegeName: this.filters.collegeName,
        collegeAdmin: this.filters.collegeAdmin,
        page: this.page,
        pageSize: this.pageSize
      }
      getCollegeList(para).then((res) => {
        console.log(res)
        this.colleges = res.data.colleges
        this.total = res.data.total
      })
    },
    //显示新增界面
    handleAdd: function () {
      // 查询用户是否存在简历

      this.addFormVisible = true
      this.addForm = {
        id: '',
        collegeName: '',
        collegeAdmin: ''
      }
    },
    addSubmit: function () {
      this.$refs.addForm.validate((valid) => {
        // if (valid) {
        this.$confirm('确认提交吗？', '提示', {}).then(() => {
          this.addLoading = true
          //NProgress.start();
          // let para = Object.assign({}, this.addForm);
          let pars = {
            collegeName: this.addForm.collegeName,
            collegeAdmin: this.addForm.collegeAdmin
          }
          // console.log(pars)
          addCollege(pars).then((res) => {
            this.addLoading = false
            //NProgress.done();
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.$refs['addForm'].resetFields()
            this.addFormVisible = false
            this.getColleges()
          })
        })
        // } else {
        // 	console.log('error submit!')
        // }
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
              id: this.editForm.id,
              collegeName: this.editForm.collegeName,
              collegeAdmin: this.editForm.collegeAdmin
            }
            editCollege(para).then((res) => {
              this.editLoading = false
              //NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['editForm'].resetFields()
              this.editFormVisible = false
              this.getColleges()
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
          let para = { id: row.id }
          // console.log(para)
          removeCollege(para).then((res) => {
            this.listLoading = false
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getColleges()
          })
        })
        .catch(() => {})
    }
  },
  mounted() {
    var user = sessionStorage.getItem('user')
    var userJSON = JSON.parse(user)
    console.log(user)
    this.utype = userJSON.utype
    this.sid = userJSON.fkno
    this.getColleges()
  }
}
</script>

<style scoped>
el-card {
  padding-top: 20px;
}
</style>

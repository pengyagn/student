<template>
  <section>
    <template>
      <el-col :span="24" style="padding-bottom: 0px; padding-top: 10px">
        <el-card>
          <el-table :data="notices" style="width: 100%">
            <el-table-column prop="nid" v-if="false"> </el-table-column>
            <el-table-column prop="title" label="标题"> </el-table-column>
            <el-table-column prop="desc" label="内容"> </el-table-column>
            <el-table-column prop="pubPerson" label="发布人"> </el-table-column>
            <el-table-column prop="pubTime" label="时间"> </el-table-column>
            <el-table-column label="操作" min-width="100" v-if="utype != '1'">
              <template scope="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)" type="primary">编辑</el-button>
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

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item prop="nid" v-if="false">
          <el-input v-model="editForm.nid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="tid" v-if="false">
          <el-input v-model="editForm.tid" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="公告标题" prop="title">
          <el-input v-model="editForm.title" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="公告内容" prop="desc">
          <el-input type="textarea" v-model="editForm.desc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { editNotice, getNoticeList, removeNotice } from '@/api/api.js'
export default {
  // name: "NoticeList"
  data() {
    return {
      notices: [],
      pageSize: 10,
      total: 0,
      editForm: {
        nid: 0,
        title: '',
        desc: '',
        pubTime: '',
        tid: 0
      },
      editFormVisible: false,
      editFormRules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      editLoading: false,
      utype: ''
    }
  },
  methods: {
    handleSizeChange(size) {
      this.pageSize = size
      this.page = 1
      this.getNotices()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getNotices()
    },
    async getNotices() {
      let para = {
        page: this.page,
        pageSize: this.pageSize
      }
      const { data: res } = await getNoticeList(para)
      this.notices = res.notices
      this.total = res.total
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
            let para = {
              tid: this.editForm.tid,
              nid: this.editForm.nid,
              title: this.editForm.title,
              desc: this.editForm.desc
            }
            editNotice(para).then((res) => {
              this.editLoading = false
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['editForm'].resetFields()
              this.editFormVisible = false
              this.getNotices()
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
          let para = { nid: row.nid }
          removeNotice(para).then((res) => {
            this.listLoading = false
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getNotices()
          })
        })
        .catch(() => {})
    }
  },
  mounted() {
    var user = sessionStorage.getItem('user')
    var userJSON = JSON.parse(user)
    this.utype = userJSON.utype
    this.getNotices()
  }
}
</script>

<style scoped>
el-card {
  padding-top: 20px;
}
</style>

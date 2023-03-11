<template>

	<section>
		<el-row>
			<el-card class="box-card">
				<el-col :span="24">
					<div class="text item">
						<el-form ref="form" :model="form" label-width="80px" :rules="formRules">
							<el-form-item prop="id" v-if="false">
								<el-input v-model="form.id"></el-input>
							</el-form-item>
							<el-form-item label="攻读学位" prop="education">
								<el-input v-model="form.education"></el-input>
							</el-form-item>
							<el-form-item label="专业" prop="major">
								<el-input v-model="form.major"></el-input>
							</el-form-item>
							<el-form-item label="学校" prop="university">
								<el-input v-model="form.university"></el-input>
							</el-form-item>

							<el-form-item>
								<el-button type="primary" @click="onEdit" v-if="this.editVisible">重新提交</el-button>
								<el-button type="primary" @click="onSubmit" v-else>登记</el-button>
							</el-form-item>
						</el-form>
					</div>
				</el-col>
			</el-card>
		</el-row>
	</section>


</template>

<script>
	import { mapGetters } from 'vuex'
	import { mapActions } from 'vuex'
	import {addEduInfo, editEduInfo, getOnesEdu, getOnesJob} from '../../api/api'
	export default {
		data() {
			return {
				form: {
					id: '',
					education:'',
					major:'',
					university:'',
				},
				formRules: {
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
				editVisible: false
			}
		},
		methods: {
			onSubmit() {

				this.$refs.form.validate((valid)=>{
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							let para = {
								sid: this.sid,
								education: this.form.education,
								major:this.form.major,
								university:this.form.university,
							}
							addEduInfo(para).then(res=>{
								if (res.data.code == 500) {
									this.$message({
										message: res.data.msg,
										type: 'error'
									});
								} else {
									this.$message({
										message: '登记成功',
										type: 'success'
									});
									this.$refs['form'].resetFields();
								}


							})
						})
					}
				})
			},

			onEdit() {
				this.$refs.form.validate((valid)=>{
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							let para = {
								id: this.form.id,
								education: this.form.education,
								major:this.form.major,
								university:this.form.university,
							}
							editEduInfo(para).then(res=>{
								if (res.data.code == 500) {
									this.$message({
										message: res.data.msg,
										type: 'error'
									});
								} else {
									this.$message({
										message: '提交成功',
										type: 'success'
									});
									this.$refs['form'].resetFields();
									getOnesEdu({sid: this.sid}).then(res=>{
										if(res.data.msg != 'error') {
											this.form.id = res.data.id
											this.form.education = res.data.education
											this.form.major = res.data.major
											this.form.university = res.data.university
											this.editVisible = true
										} else {

										}
									})
								}


							})
						})
					}
				})
			}



		},
		mounted() {
			var user = sessionStorage.getItem('user')
			var userJSON = JSON.parse(user)
			this.sid = userJSON.fkno
			// getOnesJob({sid: this.sid}).then(res=>{
			// 	// alert(res)
			// 	if(res.msg != 'error') {
			// 		this.form.id = res.data.id
			// 		this.form.businessName = res.data.businessName
			// 		this.form.location = res.data.location
			// 		this.form.jobName = res.data.jobName
			// 		this.form.businessType = res.data.businessType
			// 		this.editVisible = true
			// 	} else {
			//
			// 	}
			//
			// })
			getOnesEdu({sid: this.sid}).then(res=>{
				if(res.data.msg != 'error') {
					this.form.id = res.data.id
					this.form.education = res.data.education
					this.form.major = res.data.major
					this.form.university = res.data.university
					this.editVisible = true
				} else {

				}
			})
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
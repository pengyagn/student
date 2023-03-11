<template>
	<section>
		<el-row>
			<el-card class="box-card">
				<el-col :span="24">
					<div class="text item">

						<div>

							<el-form :model="BusinessInfo" :rules="BusinessInfoRules" ref="BusinessInfo" label-width="100px" class="demo-ruleForm">
								<el-form-item prop="utype" hidden="hidden">
									<el-input v-model="BusinessInfo.utype"></el-input>
								</el-form-item>
								<el-form-item prop="id" hidden="hidden">
									<el-input v-model="BusinessInfo.id"></el-input>
								</el-form-item>
								<el-form-item label="企业名称" prop="businessName">
									<el-input v-model="BusinessInfo.businessName"></el-input>
								</el-form-item>
								<el-form-item label="企业规模" prop="businessPerson">
									<el-input v-model="BusinessInfo.businessPerson"></el-input>
								</el-form-item>
								<el-form-item label="企业类型" prop="businessType">
									<el-input v-model="BusinessInfo.businessType"></el-input>
								</el-form-item>
								<el-form-item label="地址" prop="location">
									<el-input v-model="BusinessInfo.location"></el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="submitForm('BusinessInfo')">修改信息</el-button>
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
	import { getBusinessInfo,editBusiness } from '../../api/api'
	export default {
		data() {
			return {

				BusinessInfo: {
					id: '',
					businessName: '',
					businessType: '',
					businessPerson: '',
					location: ''
				},
				BusinessInfoRules: {
					businessName: [
						{ required: true, message: '请输入企业名称', trigger: 'blur' }
					],
					businessType: [
						{ required: true, message: '请输入企业类型', trigger: 'blur' }
					],
					businessPerson: [
						{ required: true, message: '请输入企业规模', trigger: 'blur' }
					],
					location: [
						{ required: true, message: '请输入地址', trigger: 'blur' }
					],

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
								id: this.BusinessInfo.id,
								businessName: this.BusinessInfo.businessName,
								businessType: this.BusinessInfo.businessType,
								businessPerson: this.BusinessInfo.businessPerson,
								location: this.BusinessInfo.location,
							}

							console.log(pars)

							editBusiness(pars).then(res=>{
								this.$message({
									message: '提交成功',
									type: 'success'
								});


								var user = sessionStorage.getItem('user')
								var u = JSON.parse(user)
								var pars = {
									id: u.fkno
								}
								this.getBusiness(pars)
							})

						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},

			getBusiness(pars) {
				getBusinessInfo(pars).then(data=>{
					console.log(data)
					// this.BusinessInfo.utype = data.data.utype
					this.BusinessInfo = data.data
				})
			}
		},
		mounted() {
			var user = sessionStorage.getItem('user')
			var u = JSON.parse(user)
			var pars = {
				id: u.fkno
			}
			// console.log(pars)
			this.getBusiness(pars)
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
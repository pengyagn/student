<template>
	<div id="app">
		<transition name="fade"
		            mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'app',
	components: {
	},
	created() {
		// alert(sessionStorage.getItem('user'))
		// console.log(this.$router.options)
		// alert(localStorage.getItem('utype'))

		var utype = localStorage.getItem('utype')
		// alert('app=>' + utype)
		if (utype == '1') {
			this.$router.options.routes[4].hidden = true
			this.$router.options.routes[5].hidden = true
			this.$router.options.routes[6].hidden = true
			this.$router.options.routes[8].hidden = true
			// this.$router.options.routes[10].hidden = true
			// this.$router.options.routes[10].hidden = true
			this.$router.options.routes[11].hidden = true
			this.$router.options.routes[12].hidden = true
			this.$router.options.routes[13].hidden = true
			this.$router.options.routes[14].hidden = true
			this.$router.options.routes[15].hidden = true
			this.$router.options.routes[16].hidden = true

		}

		if (utype == '0') {
			// this.$router.options.routes[5].hidden = true
			this.$router.options.routes[9].hidden = true
			this.$router.options.routes[7].hidden = true
			this.$router.options.routes[10].hidden = true
			this.$router.options.routes[11].hidden = true
			this.$router.options.routes[12].hidden = true
			this.$router.options.routes[13].hidden = true
			this.$router.options.routes[16].hidden = true

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


		// 加载时候执行一次
		// alert(sessionStorage.getItem('store').utype)
		// 在页面加载时读取sessionStorage里的状态信息
		// if (sessionStorage.getItem('store')) {
		// 	this.$store.replaceState(
		// 			Object.assign(
		// 					{},
		// 					this.$store.state,
		// 					sessionStorage.getItem('store')
		// 			)
		// 	)
		//
		// 	// alert(sessionStorage.getItem('utype'))
		// 	console.log(this.$router.options)
		// 	// if(this.$store.state.utype == '0') {
		// 	// 	// this.$router.options.routes[2].hidden = true
		// 	// }
		// 	//
		// 	if(this.$store.state.utype == '1') {
		// 		// 456 8
		// 		this.$router.options.routes[4].hidden = true
		// 		this.$router.options.routes[5].hidden = true
		// 		this.$router.options.routes[6].hidden = true
		// 		this.$router.options.routes[8].hidden = true
		// 	}
		//
		// }
		//
		// // 在页面刷新时将vuex里的信息保存到sessionStorage里
		// // beforeunload事件在页面刷新时先触发
		// window.addEventListener('beforeunload', () => {
		// 	sessionStorage.setItem('store', this.$store.state)
		// })


	}
}

</script>

<style lang="scss">
body {
	margin: 0px;
	padding: 0px;
	/*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
	// background: #1F2D3D;
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
}

#app {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
}

.el-submenu [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.el-menu-item [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.toolbar {
	background: #f2f2f2;
	padding: 10px;
	//border:1px solid #dfe6ec;
	margin: 10px 0px;
	.el-form-item {
		margin-bottom: 10px;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>
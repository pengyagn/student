<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed ? 'logo-collapse-width' : 'logo-width'">
        {{ collapsed ? '' : sysName }}
      </el-col>
      <!-- <el-col :span="10">
        <div class="tools">
        </div>
      </el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">
            <img :src="this.sysUserAvatar" />
            欢迎您 {{ sysUserName }}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="directToNotices" v-if="this.utype == '1'">我的消息 <el-badge class="mark" :value="notReadNum" v-if="notReadNum != 0 && allRead == false" /> </el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item>更换头像</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col> -->
      <el-menu class="el-menu-top" mode="horizontal" background-color="#23262E" text-color="#fff" active-text-color="#409EFF" style="float: right">
        <el-submenu index="1">
          <template slot="title">
            <!-- 头像 -->
            <img src="../assets/懒羊羊.png" alt="" class="avatar" />
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1"><i class="el-icon-s-operation"></i>基本资料</el-menu-item>
          <el-menu-item index="1-2"><i class="el-icon-camera"></i>更换头像</el-menu-item>
          <el-menu-item index="1-3"><i class="el-icon-key"></i>重置密码</el-menu-item>
          <el-menu-item @click.native="directToNotices" v-if="this.utype == '1'"><i class="el-icon-chat-dot-square"></i>我的消息 <el-badge class="mark" :value="notReadNum" v-if="notReadNum != 0 && allRead == false" /> </el-menu-item>
        </el-submenu>
        <el-menu-item index="2" @click.native="logout"><i class="el-icon-switch-button"></i>退出</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed ? 'menu-collapsed' : 'menu-expanded'">
        <div class="user-box">
          <!-- <img :src="user_pic" alt="" v-if="user_pic" /> -->
          <img src="../assets/懒羊羊.png" alt="" />
          <span>欢迎您 {{ sysUserName }}</span>
        </div>
        <!--导航菜单-->
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" active-text-color="#409EFF" @select="handleselect" unique-opened router v-show="!collapsed">
          <template v-for="(item, index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :index="index + ''" v-if="!item.leaf" class="sub">
              <template slot="title"><i :class="item.iconCls"></i>{{ item.name }}</template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden" class="childmenu">{{ child.name }}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf && item.children.length > 0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{ item.children[0].name }}</el-menu-item>
          </template>
        </el-menu>
        <!--导航菜单-折叠后-->
        <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
          <li v-for="(item, index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item" active-text-color="#409EFF">
            <template v-if="!item.leaf">
              <div class="el-submenu__title" style="padding-left: 20px" @mouseover="showMenu(index, true)" @mouseout="showMenu(index, false)"><i :class="item.iconCls"></i></div>
              <ul class="el-menu submenu" :class="'submenu-hook-' + index" @mouseover="showMenu(index, true)" @mouseout="showMenu(index, false)">
                <li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px" :class="$route.path == child.path ? 'is-active' : ''" @click="$router.push(child.path)">{{ child.name }}</li>
              </ul>
            </template>
            <template v-else>
              <li class="el-submenu">
                <div class="el-submenu__title el-menu-item" style="padding-left: 20px; height: 56px; line-height: 56px; padding: 0 20px" :class="$route.path == item.children[0].path ? 'is-active' : ''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
              </li>
            </template>
          </li>
        </ul>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{ $route.name }}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import { getStuNoticeState, makeAllNoticeReaded } from '../api/api'

export default {
  data() {
    return {
      sysName: '学生就业管理系统',
      collapsed: false,
      sysUserName: '',
      sysUserAvatar: '',
      notReadNum: 0,
      id: 0,
      utype: '',
      allRead: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    directToNotices() {
      // 将所有消息置为已读
      makeAllNoticeReaded({ id: this.id, utype: this.utype }).then((res) => {
        var user = JSON.parse(sessionStorage.getItem('user'))
        this.getStuReadNotice(user)
      })
      this.$router.push({ path: '/noticelist' })
    },
    onSubmit() {
      console.log('submit!')
    },
    handleselect: function (a, b) {},
    //退出登录
    logout: function () {
      var _this = this
      this.$confirm('确认退出吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          sessionStorage.clear()
          localStorage.clear()
          _this.$router.push('/login')
        })
        .catch(() => {})
    },
    //折叠导航栏
    collapse: function () {
      this.collapsed = !this.collapsed
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none'
    },
    getStuReadNotice(user) {
      var sid = user.fkno
      getStuNoticeState({ sid: sid }).then((res) => {
        console.log(res)

        if (res.data.notReadNum != 0) {
          this.$notify({
            title: '你收到一条新消息',
            message: '',
            position: 'bottom-right'
          })
          this.notReadNum = res.data.notReadNum
        } else {
          this.allRead = true
        }
      })
    }
  },
  mounted() {
    var user = sessionStorage.getItem('user')
    if (user) {
      user = JSON.parse(user)
      this.sysUserName = user.username || ''
      this.sysUserAvatar = 'https://tse3-mm.cn.bing.net/th/id/OIP-C.3VqW93pwfu6Xe87oYMC_7wAAAA?w=163&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' || ''
      this.id = user.fkno
      this.utype = user.utype
      if (user.utype == '1') {
        // 判断学生是否读取消息
        this.getStuReadNotice(user)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~scss_vars';
.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  background-color: #23262e;

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #23262e;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
}
.item {
  margin-top: 5px;
  margin-right: 5px;
}

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    // background: $color-primary;
    background: #23262e;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }
    .logo {
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }
      .txt {
        color: #fff;
      }
    }
    .logo-width {
      width: 230px;
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    aside {
      flex: 0 0 230px;
      width: 230px;
      .el-menu {
        height: 100%;
        background: #23262e;
        color: #fff;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }
    .content-container {
      flex: 1;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
  .el-menu-item {
    color: #fff;
  }
  .el-menu-item:hover {
    // color: aqua;
    background: rgb(28, 30, 37);
  }
  .el-menu-item.is-active {
    background-color: #23262e;
  }
  .childmenu {
    background: #23262e;
    color: #fff;
  }
  .sub {
    background: #23262e;
    color: #fff;
  }
  .el-submenu__title {
    color: #fff;
  }
  // .el-submenu_title:hover {
  //   background: #23262e;
  // }
}
</style>

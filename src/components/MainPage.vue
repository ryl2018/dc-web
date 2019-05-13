<template>
  <el-container style="height: 100%">
    <el-header style="text-align: right; font-size: 12px">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect"
        background-color="#409EFF"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">继续点餐</el-menu-item>
        <el-menu-item index="2">订单中心</el-menu-item>
        <el-menu-item index="3">结账</el-menu-item>
        <el-menu-item index="4">餐厅信息</el-menu-item>

        <el-dropdown @command="handleCommand">
          <i class="el-icon-setting" style="margin-right: 75px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="changeUser">切换账号</el-dropdown-item>
            <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span style="margin-left: -60px;margin-right: 40px">欢迎&nbsp：&nbsp{{phone}}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
      </el-menu>

    </el-header>
    <el-container>
      <el-aside v-if="dcShow" width="200px">
        <el-menu default-active="1">
          <el-menu-item index="0">
            <i class="el-icon-star-on"></i>
            <span slot="title">店家推荐</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>菜品</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">热菜</el-menu-item>
              <el-menu-item index="1-2">凉菜</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">主食</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-star-off"></i>
            <span slot="title">饮品</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <menu-page></menu-page>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import MenuPage from './MenuPage'

  export default {
    components: {
      MenuPage
    },
    data() {
      return {
        activeIndex: "1",
        dcShow: true,
        // phone
      };
    },
    computed: {
      phone: function () {
        return this.$store.getters.phone
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        if (key === "1") {
          this.dcShow = true;
        } else {
          this.dcShow = false;
        }
        console.log(key, keyPath);
      },
      handleCommand(command) {
        if (command === 'logout' || command === 'changeUser') {
          this.$store.dispatch('LogOut').then((resp) => {
            console.log(resp)
            if (resp.resCode === 200){
              this.$message.info(resp.message)
              this.$router.push({path: '/'})
            } else {//服务器登陆已经失效
              this.$store.dispatch('FedLogOut').then((resp) => {
                this.$message.info("登出成功")
                this.$router.push({path: '/'})
              })
            }
          }).catch(e=>{
            console.log(e)
          })
        } else if (command === 'changeUser') {

        }
      }
    },
  };
</script>
<style>
  .el-header {
    /*background-color: #409eff;*/
    /*color: #333;*/
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    /*background-color: #d3dce6;*/
    color: #333;
    text-align: center;
    height: 100%;
    /*display: block;*/
    /*position: absolute;*/
    /*left: 0;*/
    /*top: 70px;*/
    /*bottom: 0;*/
    /*overflow-y: scroll;*/
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    height: 100%;
    margin-right: 20px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  /*.el-container:nth-child(5) .el-aside,*/
  /*.el-container:nth-child(6) .el-aside {*/
  /*  line-height: 260px;*/
  /*}*/

  /*.el-container:nth-child(7) .el-aside {*/
  /*  line-height: 320px;*/
  /*}*/
</style>

<template>
  <div class="main-wrap">
    <el-container style="height:100%">
      <el-aside width="200px" class="left-nav">
        <div  class="left-nav-logo">
          <img src="../../assets/logo.png" height="50px" width="50px">
          <div style="margin-top: 10px">ZRQ商城后台管理</div>
        </div>

        <el-menu
          :default-active="this.$store.getters.getDefaultActive"
          text-color="#fff"
          background-color="#112134"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1" @click="gotohome">
            <i class="el-icon-location"></i>
            <span>首页</span>
          </el-menu-item>

          <el-submenu index="2"  :disabled="!user.role.menus['2']">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">商品</span>
            </template>

            <el-menu-item-group>
                <el-menu-item index="2-1" @click="gotoCategory" :disabled="!user.role.menus['2-1']"> <i class="el-icon-suitcase"></i>品类管理</el-menu-item>
                <el-menu-item index="2-2" @click="gotoProduct" :disabled="!user.role.menus['2-2']"><i class="el-icon-suitcase-1"></i>商品管理</el-menu-item>
            </el-menu-item-group>

          </el-submenu>

          <el-menu-item index="3" @click="gotoUser" :disabled="!user.role.menus['3']">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">用户管理</span>
            </template>
          </el-menu-item>

          <el-menu-item index="4" @click="gotorole" :disabled="!user.role.menus['4']" >
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">角色管理</span>
            </template>
          </el-menu-item>

          <el-submenu index="5" :disabled="!user.role.menus['5']">
            <template slot="title">
              <i class="el-icon-picture"></i>
              <span slot="title">图形图标</span>
            </template>

            <el-menu-item-group>
              <el-menu-item index="5-1" @click="gotoBar"> <i class="el-icon-suitcase"></i>柱状图</el-menu-item>
              <el-menu-item index="5-2" @click="gotoLine"><i class="el-icon-suitcase-1"></i>折线图</el-menu-item>
              <el-menu-item index="5-3" @click="gotoPie"><i class="el-icon-suitcase-1"></i>饼图</el-menu-item>
            </el-menu-item-group>

          </el-submenu>

        </el-menu>

      </el-aside>

      <el-container>
        <el-header class="header-nav" style="background-color: #fff;height: 80px" >
          <Header></Header>
        </el-header>

        <el-main class="main-nav" style="background-color: #EEF0F3;">

            <router-view style="background-color: #fff;height: 560px;width: 100%"/>

        </el-main>



        <el-footer class="footer-nav" >
          推荐使用谷歌浏览器，获取更好的体验效果
        </el-footer>
      </el-container>
    </el-container>
  </div>

</template>


<script>
  import Header from "../../components/header/header"
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        user:{},
        // defaultActive:"1",
        // arr:['首页','品类管理','商品管理','用户管理','角色管理','柱状图','折线图','饼图'],
      }
    },
    components:{
      Header
    },
    computed:{
      ...mapState(['defaultActive'])
    },
    created(){
      this.user=JSON.parse(localStorage.manager)
    },
    mounted(){

      if(this.$route.path==='/home'){
        this.sendTtile('首页')
        this.$store.commit('changeDefultActive','1')

        localStorage.defaultActive=1
        return
      }

      if(localStorage.defaultActive){
        this.$store.commit('changeDefultActive',JSON.parse(localStorage.defaultActive))
      }
    },

    methods:{
      //传递标题
      sendTtile(title){
        localStorage.currentTitle=title
        this.$store.commit('changeTitle',title)
      },

      //跳转到路由首页
      gotohome(){
          if(this.$route.path==='/home'){
            return
          }
          this.sendTtile('首页')

          this.$store.commit('changeDefultActive','1')

          localStorage.defaultActive=JSON.stringify(this.defaultActive)
          this.$router.push('/home')

      },
      //商品路由
      gotoCategory(){
        if(this.$route.path==='/category'){
          return
        }
        this.sendTtile('品类管理')
        this.$store.commit('changeDefultActive','2-1')

          localStorage.defaultActive=JSON.stringify(this.defaultActive)
          this.$router.push('/category')


      },
      gotoProduct(){
        if(this.$route.path==='/product'){
          return
        }
        this.sendTtile('商品管理')
        this.$store.commit('changeDefultActive','2-2')

          localStorage.defaultActive=JSON.stringify(this.defaultActive)
          this.$router.push('/product')


      },
      //用户管理理由
      gotoUser(){
        if(this.$route.path==='/user'){
          return
        }
        this.sendTtile('用户管理')

        this.$store.commit('changeDefultActive','3')

        localStorage.defaultActive=JSON.stringify(this.defaultActive)
        this.$router.push('/user')
      },
      //角色理由
      gotorole(){
        if(this.$route.path==='/role'){
          return
        }
        this.sendTtile('角色管理')
        this.$store.commit('changeDefultActive','4')

        localStorage.defaultActive=JSON.stringify(this.defaultActive)
        this.$router.push('/role')
      },

      //图表路由
      gotoBar(){
        if(this.$route.path==='/charts/bar'){
          return
        }
        this.sendTtile('柱状图')
        this.$store.commit('changeDefultActive','5-1')

        localStorage.defaultActive=JSON.stringify(this.defaultActive)
        this.$router.push('/charts/bar')
      },

      gotoLine(){
        if(this.$route.path==='/charts/line'){
          return
        }
        this.sendTtile('折线图')
        this.$store.commit('changeDefultActive','5-2')

        localStorage.defaultActive=JSON.stringify(this.defaultActive)
        this.$router.push('/charts/line')
      },

      gotoPie(){
        if(this.$route.path==='/charts/pie'){
          return
        }
        this.sendTtile('饼图')
        this.$store.commit('changeDefultActive','5-3')
        localStorage.defaultActive=JSON.stringify(this.defaultActive)
        this.$router.push('/charts/pie')
      },

    }
  }
</script>


<style>
.main-wrap{
  width: 100%;
  height: 100%;
}
  .left-nav{
   background-color: #112134;
    color: #fff;
  }
  .left-nav-logo{
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #001D3E
  }
.el-header{
  padding: 0;

}
  .main-nav{
  }
  .footer-nav{
    /*background-color: #BFC1C8;*/

    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #666;
    background-color: #EEF0F3
  }
</style>







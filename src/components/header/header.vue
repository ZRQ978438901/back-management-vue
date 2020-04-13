<template>
  <div class="header">
    <div class="header-top">
      <span style="margin-right: 10px">欢迎,{{manager.userName}}</span>
      <a href="javascript:" style="color:darkgreen; text-decoration:none;" @click="quitLogin">退出</a>
    </div>


    <div class="header-bottom">
      <div class="header-bottom-title" style="flex: 1;text-align: center;font-size: 24px">
       {{this.$store.getters.getCurrentTitle}}
      </div>
      <div style="flex: 3;text-align: right;padding-right: 20px;font-size: 12px">
        <span>{{nowDate?nowDate:0-0-0-0|dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
        <img :src="weather.dayPictureUrl"
             height="20px" width="25px"
             style="vertical-align: middle" alt="天气">
        <span>{{weather.weather}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from "vuex"
  import {mapState} from "vuex"
  export default {
    data(){
      return{
        manager:{},
        weather:{},
        nowDate:'',
        currentTitle:"",

        dateTimer:{},

        weatherTimer:{},

      }
    },
    computed:{
      ...mapState(['currentTtile'])
    },
    methods:{
      ...mapActions(['reqWeather']),


      //动态更新天气,每一分钟
       getWeather(){
        this.weatherTimer=setInterval(async ()=>{
          let result=await this.reqWeather("云浮")
          this.weather=result
        },30000)
      },

      //退出登陆
      quitLogin(){
        this.$confirm('是否退出当前登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });

          //退出登陆清楚数据,清除定时器
          localStorage.removeItem('manager')
          clearInterval(this.weatherTimer)
          clearInterval(this.dateTimer)


          setTimeout(()=>{
            this.$router.replace('/')
          },500)

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });

      },
    },

    async mounted(){
      //更新页面bug解决
      this.$store.commit('changeTitle',localStorage.currentTitle)

      //百度天气api接口不可用了
      // {
      //   let result= await this.reqWeather("广州")
      //     this.weather=result
      //   //原本动态更新天气的定时器
      //   this.getWeather()
      // }


    },

    created(){
      //获取登录对象
      if(JSON.parse(localStorage.manager)){
        this.manager=JSON.parse(localStorage.manager)
      }


      this.dateTimer=setInterval(()=>{
        this.nowDate=Date.now()
      },1000)
    }
  }
</script>

<style scoped>

  .header{
    height: 100%;
    width: 100%;
  }
  .header-top{
    height: 40px;
    border-bottom: 1px solid #1da57a;
    text-align: right;
    padding-right: 20px;
    line-height: 40px;
  }
  .header-bottom{
    height: 40px;
    display: flex;
    line-height: 40px;
  }

  .header-bottom-title{
    position: relative;
  }

  .header-bottom-title::after{
    position: absolute;
    right: 50%;
    transform: translateX(50%);
    top:100%;
    content: "";
    border-top:15px solid #828790;
    border-right:15px solid transparent;
    border-left:15px solid transparent;
    border-bottom: 15px solid transparent;
    z-index: 100;
  }
</style>

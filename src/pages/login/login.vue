<template>
  <div class="login-wrap">
    <div class="header-logo">
      <img src="../../assets/logo.png">
      <div>Vue-ZRQ : 商城后台管理系统</div>
    </div>

    <div class="login-content">
      <div class="login-text">用户登录</div>

      <div>
        <el-input
          type="text"
          placeholder="用户名"
          v-model="userName"
          show-word-limit
          prefix-icon="el-icon-user-solid"
          maxlength="12"
          clearable
          autofocus="true"
          size="medium  "
        />
        <div style="color: red;text-align: left;height: 20px;font-size: 12px;line-height: 20px"  >{{userNameError}}</div>
      </div>



      <div>
        <el-input
          placeholder="密码"
          v-model="password"
          type="password"
          clearable
          maxlength="12"
          size="medium  "
          prefix-icon="el-icon-lock"
        />
        <div style="color: red;text-align: left;height: 20px;font-size: 12px;line-height: 20px"  >{{passwordError}}</div>
      </div>


      <el-button style="width: 100%;background-color: #1CA579;margin-top: 2px"
                 round
                 :loading="isLoading"
                 size="medium "
                 icon="el-icon-caret-right"
                 @click="loginInto"
      >登录</el-button>
    </div>





  </div>
</template>

<script>
import {mapActions} from 'vuex'

  export default {
    data() {
      return {
        userName: "",
        password: "",
        isLoading:false,
        userNameError:'',
        passwordError:'',
      }
    },
    methods:{
      ...mapActions(['reqLogin']),
      //检查输入是否合法
      checkIsOk(){
        let ret=true
        if(!this.userName&&!this.password){
          this.passwordError=this.userNameError="不能为空"
        }
        else if(!this.userName){
          this.userNameError="不能为空"
          ret=false
        }else if(!this.password){
          this.passwordError="不能为空"
          ret=false
        }
        else if(this.userName.length<4){
          this.userNameError='用户名长度少于4'
          ret=false
        }else if(this.userName.password<4){
          this.userNameError='密码长度少于4'
          ret=false
        }
        setTimeout(()=>{
          this.userNameError=this.passwordError=""
        },1500)
        return ret
      },

      async loginInto(){
        if(!this.checkIsOk()){
          this.userName=this.password=""
          return
        }

        //发送登录请求
        let result= await this.reqLogin({userName:this.userName,password:this.password})
        console.log(result)
        if(result.code===1){
          this.$message({
            showClose: true,
            message: '账号或密码不正确',
            type: 'error'
          })

        }else if(result.code===0){
          this.$message({
            showClose: true,
            message: '登录成功',
            type: 'success'
          })
           localStorage.manager=JSON.stringify(result.data)

          setTimeout(()=>{
            this.$router.push('/home')
          },500)
        }


      }
    },

  }
</script>

<style scoped>
.login-wrap{
  width: 100%;
  height: 100%;
  background-color: #5886C1;
}


  .header-logo{
    display: flex;
    padding: 5px 10px;
    align-items: center;
    background-color: #385962;
  }
  .header-logo>img{
    height: 40px;
    width: 40px;
    margin-right: 10px;
  }
  .header-logo>div{
    color: #fff;
    font-size: 20px;
  }


  .login-content{
    background-color: #fff;
    width: 350px;
    height: 200px;
    margin: 100px auto;
    padding: 5px;
    border-radius: 5px;
    text-align: center;
  }
  .login-text{
    color: #000;
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: bold;
  }
</style>

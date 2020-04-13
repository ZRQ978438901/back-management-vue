const Router=require("koa-router")

let router=new Router()

//引入userSchema
const userModel=require("../database/schema/UserModel").UserModel




// 指定需要过滤的属性
const filter = {password: 0, __v: 0}
const md5 = require('blueimp-md5')


router.post("/login",async (ctx,next)=>{

  const {userName, password} = ctx.request.body

  console.log(userName,password)
    await userModel.findOne({userName,password:md5(password)},filter).then(
      user=>{

        if(user){
          // ctx.cookies.set('cookies','cookies',
          //   {
          //     domain: 'localhost',  // 写cookie所在的域名
          //     path: '/',       // 写cookie所在的路径
          //     maxAge: 10 * 60 * 1000, // cookie有效时长
          //   }
          // )

          ctx.body={code:0,message: "登录成功",data:user}
        }else {
          ctx.body={code:1,message:'用户名或密码错误'}
        }
      }
    )

})


//获取用户列表
router.get("/getUser",async (ctx,next)=>{

  await userModel.find().then(
    user=>{
      if(user){
        ctx.body={code:0,message: "登录成功",data:user}
      }else {
        ctx.body={code:1,message:'用户名或密码错误'}
      }
    }
  )
})

//删除用户
router.post("/delUser",async (ctx,next)=>{

  const {_id}=ctx.request.body
  await userModel.remove({_id}).then(
    user=>{
      if(user){
        ctx.body={code:0,message: "删除成功"}
      }else {
        ctx.body={code:1,message:'删除失败'}
      }
    }
  )
})
//添加
router.post("/addUser",async (ctx,next)=>{
  const {userName,password}=ctx.request.body
  let role= {
    "name": "无",
    "menus": {
      "2": false,
      "3": false,
      "4": false,
      "5": false,
      "2-1": false,
      "2-2": false
    }
  }
 await userModel.findOne({userName})
    .then(async user => {
      // 如果user有值(已存在)
      if (user) {
        // 返回提示错误的信息
       ctx.body={code: 1, data: '此用户已存在'}

      } else { // 没值(不存在)
        // 保存
        await userModel.create({userName, password: md5(password),role}).then(
          ()=>{
            ctx.body={code:0,data:"注册成功"}
          }
        )
      }
    })

})


//更新用户角色
router.post('/updateUserRole',async ctx=>{
  const {_id,role}=ctx.request.body

  await userModel.update({_id},{role}).then(
    ()=>{
      ctx.body={code:0,message:'修改成功'}
    }
  )


})



module.exports=router;

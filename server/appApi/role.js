const Router=require("koa-router")

let router=new Router()

//引入userSchema
const RoleModel=require("../database/schema/RoleModel").RoleModel

//查找
router.get('/getRoles',async ctx=>{
 await RoleModel.find().then(
   (res)=>{
     ctx.body={code:0,data:res}
   }
 )

})

//添加
router.post('/addRole',async ctx=>{
  let {name,        //角色名称
      auth_name,    //授权人
      menus,        //权限内容
     } =ctx.request.body
    // let auth_time=Date.now()

  await RoleModel.find({name}).then(async (role)=>{
    if(role.length>0){
      ctx.body={code:1,data:"该角色名称已存在"}
    }else {
      let newRole=new RoleModel({name,auth_name,menus})
      await newRole.save().then(
        (res)=>{
          ctx.body={code:0,data:res}
        }
      )
    }
  })



})

//删除
router.post('/delRole',async ctx=>{
  let {name}=ctx.request.body
  await RoleModel.remove({name}).then(
    ()=>{
      ctx.body={code:0,data:"删除成功"}
    }
  )

})

//修改
router.post('/mendRole',async ctx=>{

  let {name,newName,newMenus}=ctx.request.body


  await RoleModel.find({name:newName}).then(async (role)=>{
    if(role.length>1){
      ctx.body={code:0,data:"角色名称不能重复"}
    }else {
      await RoleModel.update({name},
        {name:newName,
          menus:newMenus
        })
        .then(
          ()=>{
            ctx.body={code:0,data:"修改成功"}
          }
        )
    }
  })



})


module.exports=router;

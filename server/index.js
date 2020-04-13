const Koa = require('koa')
const app = new Koa()


const koaBody = require('koa-body')
app.use(koaBody({ multipart: true }))
const cache = require('koa-static');
app.use(cache('appApi/'));//静态资源目录
app.use(cache('img'));//http://localhost:5000/hello.jpg 能查看到上传的图片



//引入路由
const Router=require("koa-router")

//引入数据库连接函数
const {connect}=require("./database/init")

//引入跨域中间件
const cors = require('koa2-cors')
app.use(cors())

//注册和引入中间件
const bodyParser = require('koa-bodyparser')
app.use(bodyParser());




//加载所有子路由
let router=new Router()
const user=require("./appApi/user")
const file=require('./appApi/fileDeal')
const role=require('./appApi/role')


router.use("/user",user.routes())
router.use("/goods",file.routes())
router.use("/role",role.routes())


//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

//连接数据库
;(async ()=>{
  await connect()
})()

app.use(async(ctx,next)=>{
  await next()
  if (ctx.body || !ctx.idempotent) return;
  ctx.body = {
    title: '404 not pic'
  }

})

app.listen(5000,()=>{
  console.log('[Server] starting at port 5000')
})

const Router=require("koa-router")

let router=new Router()


// let url="http://localhost:5000/"


let url="http://120.26.175.87:5000/"


/*
处理文件上传的路由
 */

const path = require('path')  // 原生path模块

const fs = require("fs");

// 新建文件夹
fs.readdir(__dirname+"/img/",function (err,files){
  if(err){

    fs.mkdir(__dirname+"/img/",function(err){
      if (err) {
        return console.error(err);
      }
      console.log("目录创建成功。");
    })
  }else{
    console.log("已经存在文件夹")
  }
})

let Path=path.join(__dirname,'img');

// 上传图片接口
router.post('/img/upload',async (ctx) => {

  let name = ctx.request.body.name;
  let imgBase64 = ctx.request.body.image;



  // 去掉图片base64码前面部分data:image/png;base64,
   let resultBase64=imgBase64.replace(/^data:image\/\w+;base64,/,"");

  let ImgPath=path.join(Path,name);

  let imgBuffer=new Buffer(resultBase64,'base64');

  fs.writeFile(ImgPath,imgBuffer,function(err){
    if(err){
      console.log(err)
    }else{
      console.log("写入图片成功！")
    }
  })

  ctx.body = {
    code: 0,
    text: '图片写入成功',
    path: url+'img/'+name
  }

})

//删除图片接口
router.post('/img/delImage', (ctx) => {
  let name = ctx.request.body.name;

  let delPath=path.join(Path,name)
  console.log(Path+name)
     fs.unlink(delPath,  (err) => {
      if (err) {
        console.log(err)
        ctx.body = {
          code: 0,
          msg: '删除文件失败'
        }
        return
      }
    })
  ctx.body = {
    code: 0,
    msg: '删除成功'
  }
})



module.exports=router;


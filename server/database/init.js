//引入 mongoose
const mongoose= require('mongoose')
const db='mongodb://localhost:27017/shoppingmanage'

//连接数据库
mongoose.connect(db)
let maxConnect=0

exports.connect=()=>{
  return new Promise((resolve,reject)=>{
    //监听连接
    mongoose.connection.on('disconnected',()=>{
      console.log('*********数据库断开连接*********')
      if(maxConnect>2){
        reject()
        throw new Error('连接超时，请重新连接')
      }else{
        maxConnect++
        mongoose.connect(db)
      }
    })

    mongoose.connection.once('open',()=>{
      console.log('*********数据库连接成功*********')
    })

    mongoose.connection.on('error',()=>{
      if(maxConnect>2){
        reject()
        throw new Error('连接超时，请重新连接')
      }else{
        maxConnect++
        mongoose.connect(db)
        console.log('*********数据库连接错误*********')
      }


    })
  })


}




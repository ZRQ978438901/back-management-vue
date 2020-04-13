import url from "../api/api.config"
import axios from "axios"
import jsonp from 'jsonp'

export default {
  //登录请求
   reqLogin(context,{userName,password}){
    return new Promise((resolve,reject)=>{
      axios({
        url:url.login,
        method:'post',
        data:{userName,password}
      }).then(res=>{
        if(res.data.code===0||res.data.code===1){
          resolve(res.data)
        }
      }).catch((error)=>{
        reject(error)
      })
    } )
  },
  //发送jsonp获取百度天气预报
    reqWeather(context,city){
     return new Promise((resolve,reject)=>{
       jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
         {
           timeout:60000,
         },(error,data)=>{

         if(!error){
           //返回成功数据
           resolve( data.results[0].weather_data[0])
         }else {
            reject(error)
         }

         })
     })
  },

  //发送请求获取商品大类（一级分类）
  reqGetCategory(context){
    return new Promise((resolve,reject)=>{
      axios({
        url:url.getCategoryList,
        method: 'get'
      })
        .then(res=>{

        resolve(res.data.message)
      })
        .catch(error=>{
        reject(error)
      })

    })
  },
  //请求添加一级分类
  reqAddCategory(context,{MALL_CATEGORY_NAME,ID}){
    return new Promise((resolve,reject)=>{
      axios({
        url:url.addCategory,
        method: 'post',
        data:{MALL_CATEGORY_NAME,ID}
      })
        .then(res=>{
          resolve(res.data.message)
        })
        .catch(error=>{
          reject(error)
        })
    })
  },
  //请求删除一级分类
  reqDelCategory(context,MALL_CATEGORY_NAME){
    return new Promise((resolve,reject)=>{
      axios({
        url:url.delCategory,
        method: 'post',
        data:{MALL_CATEGORY_NAME}
      })
        .then(res=>{
          resolve(res.data.message)
        })
        .catch(error=>{
          reject(error)
        })
    })
  },

  //请求添加二级
  reqAddCategorySub(context,{MALL_CATEGORY_ID,MALL_SUB_NAME,ID}){

    return new Promise((resolve,reject)=>{
      axios({
        url:url.addSubCategory,
        method: 'post',
        data:{MALL_CATEGORY_ID,MALL_SUB_NAME,ID}
      })
        .then(res=>{
          console.log(res)
          resolve(res.data.message)
        })
        .catch(error=>{
          reject(error)
        })
    })
  },

  //请求删除二级分类
  reqDelSubCategory(context,ID){
    return new Promise((resolve,reject)=>{
      axios({
        url:url.delSubCategory,
        method: 'post',
        data:{ID}
      })
        .then(res=>{
          resolve(res.data.message)
        })
        .catch(error=>{
          reject(error)
        })
    })
  },

  //发送请求获取二级分类
  reqGetSubCategory(context,categoryId){
    return new Promise((resolve,reject)=>{
      axios({
        url:url.getCategorySubList,
        method: 'post',
        data:{categoryId}
      })
        .then(res=>{
          resolve(res.data.message)
        })
        .catch(error=>{
          reject(error)
        })

    })
  },
  //发送请求获取商品
  reqGetGoods(context,page){
    return new Promise((resolve,reject)=>{
      axios({
        url:url.getGoods,
        method: 'post',
        data:{page}
      })
        .then(res=>{
          resolve(res.data)
        })
        .catch(error=>{
          reject(error)
        })

    })
  },

  //根据搜索内容获取商品
  reqSearchGoods(context,search){
    return new Promise((resolve,reject)=>{
      axios({
        url:url.getSearchGoods,
        method: 'post',
        data:{search}
      })
        .then(res=>{

          resolve(res.data.message)
        })
        .catch(error=>{
          reject(error)
        })

    })
  },


  //根据子分类ID获取商品
  reqGoodsFromID(context,categoryId){
    return new Promise((resolve,reject)=>{
      axios({
        url:url.getGoodsFromID,
        method: 'post',
        data:{categoryId}
      })
        .then(res=>{
          resolve(res.data)
        })
        .catch(error=>{
          reject(error)
        })

    })
  },

  //上传图片
  reqUpLoadImg(context,{image,name}){
    return new Promise((resolve,reject)=>{
      axios({
        url:url.uploadImg,
        method: 'post',
        data:{image,name},

      })
        .then(res=>{
          resolve(res.data.path)
        })
        .catch(error=>{
          reject(error)
        })

    })
  },
  //删除上次图片
  reqDelLoadImg(context,{name}){
    return new Promise((resolve,reject)=>{
      axios({
        url:url.delImg,
        method: 'post',
        data:{name},
      })
        .then(res=>{
          resolve(res)
        })
        .catch(error=>{
          reject(error)
        })

    })
  },

  //添加商品
  reqAddGoods(context,goods){
    return new Promise((resolve,reject)=>{
      axios({
        url:url.addGoods,
        method: 'post',
        data:goods,
      })
        .then(res=>{
          resolve(res.data)
        })
        .catch(error=>{
          reject(error)
        })

    })
  },

  //删除商品
  reqDelGoods(context,ID){
    return new Promise((resolve,reject)=>{
      axios({
        url:url.delGoods,
        method: 'post',
        data:{ID},
      })
        .then(res=>{
          resolve(res.data.message)
        })
        .catch(error=>{
          reject(error)
        })

    })
  },

  //获取商品详情
  reqGetGoodsInfo(context,goodsId){
    return new Promise((resolve,reject)=>{
      axios({
        url:url.getGoodsInfo,
        method: 'post',
        data:{goodsId},
      })
        .then(res=>{

          resolve(res.data.message)
        })
        .catch(error=>{
          reject(error)
        })

    })
  },
  //修改商品详情
  reqMendGoodsInfo(context,{NAME,PRESENT_PRICE,IMAGE1,ID}){
    return new Promise((resolve,reject)=>{
      axios({
        url:url.mendGoodsInfo,
        method: 'post',
        data:{NAME,PRESENT_PRICE,IMAGE1,ID},
      })
        .then(res=>{

          resolve(res.data.message)
        })
        .catch(error=>{
          reject(error)
        })

    })
  },

  //根据商品类别ID获取
  reqGoodsFromSubID(context,categoryId){
    return new Promise((resolve,reject)=>{
      axios({
        url:url.getGoodsFromSubID,
        method: 'post',
        data:{categoryId},
      })
        .then(res=>{
            console.log(res.data)
          resolve(res.data)
        })
        .catch(error=>{
          reject(error)
        })

    })
  },

  //获取角色列表
  reqGetRoleList(context){
    return new Promise((resolve,reject)=>{
      axios({
        url:url.getRoleList,
        method: 'get',
      })
        .then(res=>{
          resolve(res.data.data)
        })
        .catch(error=>{
          reject(error)
        })
    })
  },

  //添加角色
  reqAddRole(context,{name,auth_name,menus}){
    return new Promise((resolve,reject)=>{
      axios({
        url:url.addRole,
        method: 'post',
        data:{name,auth_name,menus}
      })
        .then(res=>{
          resolve(res.data)
        })
        .catch(error=>{
          reject(error)
        })
    })
  },

  //删除角色
  reqDelRole(context,{name}){
    return new Promise((resolve,reject)=>{
      axios({
        url:url.delRole,
        method: 'post',
        data:{name}
      })
        .then(res=>{
          resolve(res)
        })
        .catch(error=>{
          reject(error)
        })
    })
  },

  //修改角色
  reqMendRole(context,{name,newName,newMenus}){
    return new Promise((resolve,reject)=>{
      axios({
        url:url.mendRole,
        method: 'post',
        data:{name,newName,newMenus}
      })
        .then(res=>{
          resolve(res.data)
        })
        .catch(error=>{
          reject(error)
        })
    })
  },

  //添加用户
  reqAddUser(context,{userName,password}){

    return new Promise((resolve,reject)=>{
      axios({
        url:url.addUser,
        method: 'post',
        data:{userName,password}
      })
        .then(res=>{
          resolve(res.data)
        })
        .catch(error=>{
          reject(error)
        })
    })

  },
  //删除用户
  reqDelUser(context,{_id}){

    return new Promise((resolve,reject)=>{
      axios({
        url:url.delUser,
        method: 'post',
        data:{_id}
      })
        .then(res=>{
          console.log(res)
          resolve(res.data)
        })
        .catch(error=>{
          reject(error)
        })
    })

  },
  //获取用户列表
  reqGetUsers(context){
    return new Promise((resolve,reject)=>{
      axios({
        url:url.getUsers,
        method: 'get',
      })
        .then(res=>{
          resolve(res.data.data)
        })
        .catch(error=>{
          reject(error)
        })
    })
  },


  //更新用户
  reqUpdateUser(context,{_id,role}){

    return new Promise((resolve,reject)=>{
      axios({
        url:url.updateUser,
        method: 'post',
        data:{_id,role}
      })
        .then(res=>{
          console.log(res)
          resolve(res.data)
        })
        .catch(error=>{
          reject(error)
        })
    })

  },
}

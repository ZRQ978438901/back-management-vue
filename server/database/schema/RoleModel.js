/*
能操作roles集合数据的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose')

// 2.字义Schema(描述文档结构)
const roleSchema = new mongoose.Schema({
  name: {type: String, required: true}, // 角色名称
  auth_name: String, // 授权人
  auth_time: Number, // 授权时间
  create_time: {type: Number, default: Date.now}, // 创建时间
  menus: Array // 所有有权限操作的菜单path的数组
})


// 3. 定义Model(与集合对应, 可以操作集合)
const RoleModel = mongoose.model('roles', roleSchema)


// 初始化默认超级管理员用户权限
RoleModel.findOne({name: 'ZRQ管理者'}).then(user => {

  if(!user) {
    let role={name:"ZRQ管理者",
      menus:{
        '2':true, "2-1":true, '2-2':true, '3':true, '4':true, '5':true
      }}
    role.auth_name="赵瑞权"
    role.auth_time=Date.now()

    RoleModel.create(role)
      .then(user => {
        console.log('初始化最高权限: 角色名称: ZRQ管理者 ')
      })
  }
})

// 4. 向外暴露Model
module.exports.RoleModel = RoleModel

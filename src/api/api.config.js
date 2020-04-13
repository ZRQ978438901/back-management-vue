const BASEURL="/"
 const LOCALURL = "http://120.26.175.87:5000/"

 const SHOPPINGLOCALURL="http://120.26.175.87:3000/"
// const LOCALURL = "http://localhost:5000/"
//
//
// const SHOPPINGLOCALURL="http://localhost:3000/"




const URL={
  login:LOCALURL+"user/login",//用户登录
  getCategoryList:SHOPPINGLOCALURL+"categoryList/getCategoryList",//获取商品大类信息
  getCategorySubList:SHOPPINGLOCALURL+"categoryList/getCategorySubList",//获取商品小类信息
  getGoodsListByCategorySubID:SHOPPINGLOCALURL+"goods/getGoodsListByCategorySubID",//根据ID获取商品信息


  addCategory:SHOPPINGLOCALURL+"categoryList/firstCategoryAdd",//添加一级分类

  delCategory:SHOPPINGLOCALURL+"categoryList/firstCategoryDel",//删除一级分类

  addSubCategory:SHOPPINGLOCALURL+'categoryList/secondCategoryAdd',//添加二级分类

  delSubCategory:SHOPPINGLOCALURL+'categoryList/secondCategoryDel',//删除二级分类

  getGoods:SHOPPINGLOCALURL+'goods/getGoodsList',//根据页数查找商品

  getGoodsFromSubID:SHOPPINGLOCALURL+'goods/getGoodsListByCategorySubID',//根据商品类别查找商品

  getSearchGoods:SHOPPINGLOCALURL+'goods/getSearchGoodsList',//获取搜索商品

  getGoodsFromID:SHOPPINGLOCALURL+'goods/getGoodsListByCategorySubID',//根据商品ID获取商品

  testUpload:SHOPPINGLOCALURL+'user',

  uploadImg:LOCALURL+'goods/img/upload',//图片上传

  delImg:LOCALURL+'goods/img/delImage',//图片删除

  addGoods:SHOPPINGLOCALURL+'goods/addGoods',//添加商品

  delGoods:SHOPPINGLOCALURL+'goods/delGoodsOne',//删除商品

  getGoodsInfo:SHOPPINGLOCALURL+'goods/getDatailGoodsInfo',//获取商品详情

  mendGoodsInfo:SHOPPINGLOCALURL+'goods/mentGoodsInfo',//修改商品详情

  getRoleList:LOCALURL+'role/getRoles',//获取角色列表

  addRole:LOCALURL+'role/addRole',//添加角色

  delRole:LOCALURL+'role/delRole',//删除角色

  mendRole:LOCALURL+'role/mendRole',//修改角色


  getUsers:LOCALURL+'user/getUser',//获取用户列表
  addUser:LOCALURL+'user/addUser',//添加用户
  delUser:LOCALURL+'user/delUser',//删除用户
  updateUser:LOCALURL+'user/updateUserRole',//更新用户角色


}

module.exports=URL

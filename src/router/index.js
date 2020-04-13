import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/login/login'
import Main from '../pages/Main/main'
import Home from "../pages/home/home"
import Role from "../pages/role/role"
import User from "../pages/user/user"
import Bar from "../pages/charts/bar"
import Pie from "../pages/charts/pie"
import Line from "../pages/charts/line"
import Category from "../pages/categroy/category"

import Product from "../pages/product/product"
import ProductHome from '../pages/product/home/home'
import Detail from '../pages/product/detail/detail'
import AddUpdateGoods from '../pages/product/addAndUpdateGoods/addUpdategoods'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'Login', component: Login},

    {path: '/home', name: 'Main', component: Main,
      children:[
        {path: '/home',name: 'Home',component: Home},
        {path: '/role',name: 'Role',component: Role},
        {path: '/user',name: 'User',component: User},

        {path: '/category',name: 'Category',component: Category},


        {path: '/product',name: 'Product',component: Product,
          children:[
            {path:'/product',name:'ProductHome',component:ProductHome},
            {path:'/detail',name:'Detail',component:Detail},
            {path:'/addupdate',name:'AddUpdateGoods',component:AddUpdateGoods},
          ]
        },

        {path: '/charts/bar',name: 'Bar',component: Bar},
        {path: '/charts/pie',name: 'Pie',component: Pie},
        {path: '/charts/line',name: 'Line',component: Line},
      ]
    },
  ]
})

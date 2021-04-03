import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Contact from '../views/Contact.vue'
import Shop from '../views/Shop.vue'
import User from '../views/User.vue'
import Product from '../views/Product.vue'
import Login from '../views/Login.vue'
import AddAdmin from '../views/AddAdmin.vue'
import AddProduct from '../views/AddProduct.vue'
import AuthGuard from '../middleware/auth.js'
import Cart from '../views/Cart.vue'
import Signup from '../views/Signup.vue'
import UpdateUser from '../views/UpdateUser.vue'
import Cancel from '../views/Cancel.vue'
import Success from '../views/Success.vue'
import UsersCRUD from '../views/UsersCRUD.vue'
import WishList from '../views/WishList.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/wishList',
    name: 'WishList',
    component: WishList
  },
  {
    path: '/usersCRUD',
    name: 'UsersCRUD',
    component: UsersCRUD
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product
  },
  {
    path: '/',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter(to, from, next) {
      if (localStorage.getItem('token')) {
        next({
          name:"User"
        })
      }
      else {
        next();
      }
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    beforeEnter(to, from, next) {
      if (!localStorage.getItem('token')) {
        next({
          name:"Login"
        })
      }
      else {
        next();
      }
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/account',
    name: 'User',
    component: User,
    beforeEnter(to, from, next) {
      if (!localStorage.getItem('token')) {
        next({
          name:"Login"
        })
      }
      else {
        next();
      }
    }
  },
  {
    path: '/addAdmin',
    name: 'AddAdmin',
    component: AddAdmin
  },
  {
    path: '/success',
    name: 'Success',
    component: Success
  },
  {
    path: '/cancel',
    name: 'Cancel',
    component: Cancel
  },
  {
    path: '/updateUser',
    name: 'UpdateUser',
    component: UpdateUser
  },
  {
    path: '/addProduct',
    name: 'AddProduct',
    component: AddProduct
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

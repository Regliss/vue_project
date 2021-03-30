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


Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/contact',
  //   name: 'Contact',
  //   component: Contact
  // },
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
    component: Login
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
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

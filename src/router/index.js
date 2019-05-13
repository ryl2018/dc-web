import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import Login from '@/components/Login'
import store from '../store'
import {Message, MessageBox} from 'element-ui'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      // children: [  //这里就是二级路由的配置
      //   {
      //     path: '/MenuPage',
      //     name: 'MenuPage',
      //     component: MenuPage
      //   },
      // ]
    },
    {
      path: '/MainPage',
      name: 'MainPage',
      component: MainPage,
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.name === "Login") {
    next()
  } else {
    if(store.getters.token==="" || store.getters.token===undefined || store.getters.token===null){
      router.push({path: '/'})
      Message.info("请先登录")
    } else {
      next()
    }
  }
})
export default router

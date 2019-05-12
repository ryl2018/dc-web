import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
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

import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
      // children: [  //这里就是二级路由的配置
      //   {
      //     path: '/MenuPage',
      //     name: 'MenuPage',
      //     component: MenuPage
      //   },
      // ]
    }
  ]
})

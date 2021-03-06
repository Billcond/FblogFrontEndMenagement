import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ContentEdit from '../components/ContentEdit'
import ContentManagement from "../components/ContentManagement"
import ContentStatistic from "../components/ContentStatistic"
import HomeContent from "../components/HomeContent"
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/fblog/management'
  },
  {
    path: '/fblog/management',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'/fblog/management',
        name:'ContentEdit',
        component:ContentEdit
      },
      {
        path:'/fblog/management/edit',
        name:'ContentEdit',
        component:ContentEdit
      },
      {//管理界面
        path:'/fblog/management/management',
        name:'ContentManagement',
        component:ContentManagement,
      },{
        path:'/fblog/management/statistic',
        name:'ContentStatistic',
        component:ContentStatistic
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router

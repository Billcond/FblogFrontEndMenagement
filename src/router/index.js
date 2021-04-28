import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ContentEdit from '../components/ContentEdit'


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
        path:'/fblog/management/edit',
        name:'ContentEdit',
        component:ContentEdit
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router

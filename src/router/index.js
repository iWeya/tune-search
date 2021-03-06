import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Lookup from '../views/Lookup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    component: Search,
    path: '/search/:query/:offset?',
    name: 'search',
    props: true
  },
  {
    component: Lookup,
    path: '/lookup/:query/:entity',
    name: 'lookup',
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router

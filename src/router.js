import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Create from './views/Create.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main
    },
    {
      path: '/create',
      name: 'Create Snippet',
      component: Create
    }
  ]
})

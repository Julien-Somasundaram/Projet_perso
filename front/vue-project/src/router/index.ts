import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ZooView from '../views/ZooView.vue'
import AdminView from '../views/AdminView.vue'
import TestView from '../views/Test.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/User',
      name: 'UserView',
      component: UserView
    },
    {
      path: '/Login',
      name: 'LoginView',
      component: LoginView
    },
    {
      path: '/Register',
      name: 'RegisterView',
      component: RegisterView
    },
    {
      path: '/Zoo',
      name: 'ZooView',
      component: ZooView
    },
    {
      path: '/Admin',
      name: 'AdminView',
      component: AdminView
    },
    {
      path: '/Test',
      name: 'TestView',
      component: TestView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router

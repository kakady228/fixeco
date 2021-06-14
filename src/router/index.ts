import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/selection-map',
    name: 'Map',
    component: () => import('../components/SelectionMap.vue')
  },
  {
    path: '/selection-form',
    name: 'selection-form',
    component: () => import('../views/About.vue')
  },
  {
    path: '/registration',
    name: 'registration-form',
    component: () => import('../components/RegistrationForm.vue')
  },
  {
    path: '/login',
    name: 'login-form',
    component: () => import('../components/LoginForm.vue')
  },
  {
    path: '/reviews',
    name: 'reviews',
    component: () => import('../components/Reviews.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../components/Profile.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

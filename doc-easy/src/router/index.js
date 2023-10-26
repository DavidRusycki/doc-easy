// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/planos',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/planos',
        name: 'Planos',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Planos.vue'),
      },
    ],
  },
  {
    path: '/admin/:name',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/admin/:name',
        name: 'Admin',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Admin.vue'),
      },
    ],
  },
  {
    path: '/dev',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/dev',
        name: 'dev',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/DevComponent.vue'),
      },
    ],
  },
  {
    path: '/execution/download',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/execution/download',
        name: 'download',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Download.vue'),
      },
    ],
  },
  {
    path: '/execution/:name',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/execution/:name',
        name: 'execution',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/ExecutionArea.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

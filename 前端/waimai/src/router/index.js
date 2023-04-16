import { Toast } from 'vant'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/:catchAll(.*)',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('../views/mine'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/cart'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/order'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/store',
    name: 'store',
    component: () => import('../components/store/index.vue'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/createorder',
    name: 'createorder',
    component: () => import('../components/createorder/index.vue'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/address',
    name: 'address',
    component: () => import('../components/address/index.vue'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/addressedit',
    name: 'addressedit',
    component: () => import('../components/address/addressEdit.vue'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/userinfoedit',
    name: 'userinfoedit',
    component: () => import('../components/userinfoedit/index.vue'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/blank',
    name: 'blank',
    component: () => import('../components/common/Blank.vue'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/mainhome',
    component: () => import('../views/home/mainhome.vue'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views//register.vue')
  },
  {
    path: '/phonelogin',
    name: 'phonelogin',
    component: () => import('../views/phonelogin.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 全局前置守卫
router.beforeEach(function (to, from, next) {
  if (to.meta.isAuth) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
      Toast('请先登录！')
    }
  } else {
    next()
  }
})

export default router

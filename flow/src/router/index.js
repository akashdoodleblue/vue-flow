import { createWebHistory, createRouter } from "vue-router";
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ScreenDetails from '../views/ScreenDetails.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guest: true
    },
  },
  {
    path:"",
    redirect:"/home"
  },
  { 
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
        requiresAuth: true
    },
  },
  { 
    path: '/screen/:id',
    name: 'Screen',
    component: ScreenDetails,
    props: true,
    meta: {
        requiresAuth: true
    },
  },
  {
    path : '/:catchAll(.*)',
    name : 'NotFound',
    component : NotFound
  }

]




const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //console.log(localStorage.getItem('login'))
    if (localStorage.getItem('token') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('token') == null) {
      next()
    } else {
      next({ name: 'Home' })
    }
  } else {
    next()
  }
})

export default router;
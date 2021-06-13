import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/auth/Register.vue')
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/auth/Login.vue')
  },

  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../components/dashboard/Dashboard.vue')
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../components/dashboard/Dashboard.vue')
  },

    /**Users*/
  {
    path: '/users',
    name: 'Users',
    component: () => import('../components/users/Users.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../components/users/Profile.vue')
  },
  /**roles Route*/
  {
    path: '/roles',
    name: 'Roles',
    component: () => import('../components/roles/Roles.vue'),
  },

  /**roles Management*/
  {
    path: '/role-management',
    name: 'RolesManagement',
    component: () => import('../components/roleManagement/UserRoles.vue'),
  },

  /**Route not found exception*/
  {
    path: '/:catchAll(.*)*',
    name: "PageNotFound",
    component: () => import('../components/errors/PageNotFound.vue'),
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

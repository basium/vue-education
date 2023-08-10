import { createRouter, createWebHashHistory  } from 'vue-router';
import HomePage from '../views/homePage';

const routes = [
  /* Normal Route */
  {
    path: '/',
    name: 'homePage',
    component: HomePage
  },
  {
    path:'/veg',
    name:'vgePage',
    component:()=>import(/* webpackChunkName: "veg" */ '../views/vegPage.vue')
  },
  {
    path:'/error',
    name:'errorPage',
    component:()=>import(/* webpackChunkName: "errorPage" */ '../views/errorPage.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory (),
  routes
});

export default router

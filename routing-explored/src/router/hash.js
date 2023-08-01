import { createRouter, createWebHashHistory  } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import picsHelper from '../helpers/catpicsHelper.js';

const routes = [
  /* Normal Route */
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  /*Laxy Loading Routes */
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  /* Dynamic Roots with the route object populated*/
  {
    path: '/Employee/:name',
    name: 'Employee',
    component:()=>import(/* webpackChunkName: "employee" */ '../views/Employee.vue'),
    meta: { isAdmin : true}
  },
  /* Route object converted to component props */
  {
    path : '/Cat/:name',
    name : 'Cat',
    component: ()=> import(/* webpackChunkName: "cat" */ '../views/Cat.vue'),
    meta : { isNeutered: false },
    props : route=>( {
      name : route.params.name,
      inside: route.query && route.query.inside==='true'? true : false,
      neutered:route.meta.isNeutered
    } )
  },
  /* Redirection example. Catch an empty catPics route and show a random picture. */
  {
    path:'/CatPics',
    redirect:'/CatPics/random'
  },
  /* Route with route guards */
  {
    path : '/CatPics/:name',
    name : "CatPics",
    component: ()=>import(/* webpackChunkName: "catPics" */ '../views/CatPics.vue'),
    props: route=>({
      name : route.params.name,
      images: route.meta.images
    }),
    meta:{
      requiresResource : 'CatPics'
    },
    beforeEnter (to, from, next) {
      // ...
    }
  },
  {
    path:'/error',
    name:'error',
    component:()=>import(/* webpackChunkName: "catPics" */ '../views/error.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory (),
  routes
})
/* Global Navigation Guard - Runs on every route change */
router.beforeEach((to,from)=>{
  if( to && to.meta && to.meta.requiresResource )
  {
    switch( to.meta.requiresResource.toLowerCase() )
    {
      case 'catpics':
         let images = picsHelper.getImages();
         to.meta.images = images;
    }
  }
});
router.beforeResolve((to,from)=>
{
  //....
});
router.afterEach((to,from)=>{
  //....
});

export default router

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter,createWebHashHistory} from 'vue-router';

import Home from './components/Home.vue';
import About from './components/About.vue'
const routes = [
    {path:'/',component:Home},
    {path:'/About',component:About}
];

const router = createRouter({ routes : routes, history: createWebHashHistory() });
const app = createApp(App);
app.use(router);
app.mount('#app')


/* Show, how chunks are bundled vs dynamic imports and also show how images are re-used accross */
// {path:'/',component:()=>import('./components/Home.vue')},
// {path:'/About',component:()=>import('./components/About.vue')}
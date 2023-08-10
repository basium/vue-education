import { createApp } from 'vue';
import App from './App.vue';
import vegStore from './stores/vegStore.js';
import userStore from './stores/userStore.js';
import greetingsStore from './stores/greetingsStore';

import { createStore } from 'vuex';
import router from './router/hash.js'
let store = createStore({
    modules:
    {
        'vegStore': vegStore,
        'userStore': userStore,
        'greetingsStore': greetingsStore 
    }
} ),
app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app')

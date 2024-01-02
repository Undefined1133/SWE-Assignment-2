// main.js
import {createApp} from 'vue';
import App from './App.vue';
import store from "@/common/store";

createApp(App).use(store).mount('#app');

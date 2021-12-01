import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import $bus from './services/Event'
const base = axios.create({
    baseURL: "http://localhost:3000"
  });


const app =  createApp(App)
const rootComponent = app.use(router).mount('#app')
app.config.globalProperties.$http = base;
app.config.globalProperties.$bus = $bus;

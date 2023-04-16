import { createApp } from 'vue'
import App from './App.vue'
import './assets/base.css'
import 'amfe-flexible'
import router from './router'
import store from './store'
import 'vant/es/toast/style'
import './api/mock.js'

const app = createApp(App)
app.use(router).use(store)
app.mount('#app')

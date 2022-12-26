import '@/assets/styles/tailwind.css'
import '@/assets/styles/_global.scss'
import './registerServiceWorker'
import 'vue-toastification/dist/index.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import Toast from 'vue-toastification'

import FontAwesomeIcon from '@/plugins/VueFontAwesomeConfig'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia()).use(router).component('FaIcon', FontAwesomeIcon, Toast).mount('#app')
app.use(Toast)

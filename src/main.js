import '@/assets/styles/tailwind.css'
import '@/assets/styles/_global.scss'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import FontAwesomeIcon from '@/plugins/VueFontAwesomeConfig'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia()).use(router).component('FaIcon', FontAwesomeIcon).mount('#app')

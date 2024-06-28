import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice'
import { createPinia } from 'pinia'
import './style.css'

const appVue = createApp(App)
const pinia = createPinia()

appVue
.use(pinia)
.use(ToastService)
.use(PrimeVue, {
  theme: { preset: Aura },
})
.mount('#app')

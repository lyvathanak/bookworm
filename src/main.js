import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.css'

/* Import Font Awesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(store)
app.mount('#app')
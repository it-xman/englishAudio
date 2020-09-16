import Vue from 'vue'
import App from './App.vue'
import './plugins/element.ts'
import './plugins/avue.js'
import router from './router'
import axios from 'axios'
// import Eleform from 'vue-ele-form'
// Vue.use(Eleform)

Vue.config.productionTip = false

const http = axios.create({
    baseURL: 'http://localhost:3000'
})

Vue.prototype.$httpajax = http

Vue.prototype.$http = http

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

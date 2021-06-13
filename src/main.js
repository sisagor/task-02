import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import Axios from "axios";
import VueSession from 'vue-session';
//session configuration
var options = {
  persist: true,
}
Vue.use(VueSession, options)

//Flash message configuration
import FlashMessage from '@smartweb/vue-flash-message';
Vue.use(FlashMessage, {
  time: 5000,
  strategy: 'single'
});

//use bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

//Import jquery
import $ from 'jquery'
//config vue Axios;
Vue.use(VueAxios, Axios);
Vue.config.productionTip = false

/////////
import functions from "./functions/functions";
window.functions = functions;


import './../public/css/custom.css'

import flash from "./functions/flash";
window.flash = flash;

//Assign config to window object;
import config from "./config";
window.config = config;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

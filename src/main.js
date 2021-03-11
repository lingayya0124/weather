import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Vue from "vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from "./App.vue";
import router from "./router";

import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(BootstrapVue);

Vue.use(IconsPlugin);
Vue.use(VueAxios, axios);

// import axios from "axios";
// import VueAxios from "vue-axios";

Vue.config.productionTip = false;

new Vue({
  router,

  render: (h) => h(App),
}).$mount("#app");

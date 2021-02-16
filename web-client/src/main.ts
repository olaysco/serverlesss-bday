import Vue from "vue";
import App from "./App.vue";
import SvgIcon from "./components/SvgIcon.vue";
import router from "./routes";
import store from "./store";

Vue.component("svg-icon", SvgIcon);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/scss/styles.scss";

import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCode,
  faDotCircle,
  faSearch,
  faPlus,
  faChevronLeft,
  faTrash,
  faTimesCircle,
  faClone,
  faFilter
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
  faCode,
  faDotCircle,
  faSearch,
  faPlus,
  faChevronLeft,
  faTrash,
  faTimesCircle,
  faClone,
  faFilter
);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;
Vue.use(VueToast);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

import Vuex from "vuex";
import Vue from "vue";
import snippets from "./modules/snippets";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    snippets: snippets
  }
});

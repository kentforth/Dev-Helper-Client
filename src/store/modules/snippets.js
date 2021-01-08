const state = () => ({
  filteredSnippets: [],
  isSearching: false,
  isLoading: false
});
const mutations = {
  SET_FILTERED_SNIPPETS: (state, snippets) => {
    state.isSearching = true;
    state.filteredSnippets = snippets;
  },
  SET_SNIPPETS_UNFILTER: state => {
    state.isSearching = false;
  },
  SET_SPINNER_TRUE: state => {
    state.isLoading = true;
  },

  SET_SPINNER_FALSE: state => {
    state.isLoading = false;
  }
};

const actions = {
  FILTER_SNIPPETS({ commit }, snippets) {
    commit("SET_FILTERED_SNIPPETS", snippets);
  },
  UNFILTER_SNIPPETS({ commit }) {
    commit("SET_SNIPPETS_UNFILTER");
  },
  SHOW_SPINNER({ commit }) {
    commit("SET_SPINNER_TRUE");
  },
  HIDE_SPINNER({ commit }) {
    commit("SET_SPINNER_FALSE");
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};

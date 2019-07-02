import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchTerm: '',
    resultsStatus: false,
    resultsLoading: false,
    searchMade: false,
    results: [],
    snippetOpen: false,
    snippetOpened: '',
  },
  getters: {
    searchTerm: state => state.searchTerm,
    getSnippet: (state) => (key) => {
        return state.results[key];
    }
  },
  mutations: {
    updateSearchTerm(state, term) {
      
      // Update search term
      state.searchTerm = term;

      // Update searchMade
      if (!state.searchMade) {
        state.searchMade = true;
      }

    },
    updateResults(state, results) {

      if (results.length !== 0) {
        state.results = results;
        state.resultsStatus = true;
      } else {
        state.results = [];
        state.resultsStatus = false;
      }

      state.resultsLoading = false;

    },
    openSnippet(state, key) {
      if (!state.snippetOpen) {
        state.snippetOpen = true;
        state.snippetOpened = key; 
      }
    },
    closeSnippet(state) {
      if (state.snippetOpen) {
        state.snippetOpen = false;
        state.snippetOpened = '';
      }
    }
  },
  actions: {

  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
    // SearchBar
    searchTerm: '',

    // Results
    resultsStatus: false,
    resultsLoading: false,
    searchMade: false,
    results: [],

    // Result
    snippetOpen: false,
    snippetOpened: '',

    // Results Interaction
    snippetSelected: 0,

  },
  getters: {
    searchTerm: state => state.searchTerm,
    getSnippet: (state) => (key) => {
        return state.results[key];
    },
    getSelected: state => state.snippetSelected,
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
        state.snippetSelected = 0;
        state.resultsStatus = true;
      } else {
        state.results = [];
        state.resultsStatus = false;
      }

      state.resultsLoading = false;

    },
    openSnippet(state) {
      if (!state.snippetOpen) {
        state.snippetOpen = true;
        state.snippetOpened = state.snippetSelected; 
      }
    },
    closeSnippet(state) {
      if (state.snippetOpen) {
        state.snippetOpen = false;
        state.snippetOpened = '';
      }
    },
    selectSnippet(state, direction) {
      if (direction == "up" && state.snippetSelected != 0) {
        state.snippetSelected--;
      } else if (direction == "down" && state.results.length - 1 != state.snippetSelected) {
        state.snippetSelected++;
      }
    }
  },
  actions: {

  }
})

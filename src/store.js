import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
    // SearchBar
    searchTerm: '',
    displaySearch: true,

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

    loadedSnippet: []

  },
  getters: {
    searchTerm: state => state.searchTerm,
    getSnippet: (state) => (key) => {
        return state.results[key];
    },
    getSelected: state => state.snippetSelected,
    getLoaded: state => state.loadedSnippet
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
    openSnippet(state, key = null) {
      if (!state.snippetOpen) {
        state.snippetOpen = true;
        if (key == null) {
          state.snippetOpened = state.snippetSelected; 
        } else {
          state.snippetOpened = key;
          state.snippetSelected = key; 
        }
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
    },
    snippetLoaded(state, snippet) {
      state.loadedSnippet = snippet;
    }
  },
  actions: {

  }
})

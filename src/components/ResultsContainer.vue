<template>
    <section class="container">
        <ResultsList v-if="resultsStatus && !resultsLoading && results.length !== 0" />
        <ResultsSpinner v-else-if="resultsLoading" />
        <NoResults v-else-if="!resultsStatus && !resultsLoading && searchMade" />
        <span v-else-if="!searchMade">Search not made yet</span>
    </section>
</template>

<script>
import ResultsList from "./ResultsList";
import ResultsSpinner from "./ResultsSpinner";
import NoResults from "./NoResults";
import {mapState} from "vuex";
import axios from "axios";

export default {
    name: 'ResultsContainer',
    components: {
        'ResultsList': ResultsList,
        'ResultsSpinner': ResultsSpinner,
        'NoResults': NoResults
    },
    computed: mapState(['resultsStatus', 'resultsLoading', 'searchMade', 'results']),
    mounted() {
        this.$store.watch(
            (state, getters) => getters.searchTerm,
            (newTerm, oldTerm) => {

                // Trim the string 
                let term = newTerm.trim();

                // Make AJAX call
                this.searchSnippets(term);

            }
        )
    },
    methods: {
        searchSnippets(term) {

            // Setup URL
            let url = "http://127.0.0.1:8000/api/search";
            axios.post(url, {
                search: term
            })
            .then((res) => {
                this.$store.commit('updateResults', res.data);
            })
            .catch((err) => {
                if (err) {
                    this.$store.state.results = [];
                    this.$store.state.resultsStatus = false;
                }
            });

            // Results no longer loading
            this.$store.state.resultsLoading = false;

        }
    }
}
</script>

<style lang="scss" scoped>
    section.container {
        max-width: $container-width;
        padding: 1em;
        margin: 0 auto;
        width: 100%;
        height: calc(100vh - 340px);
        position: relative;
    }
    span {
        font-size: 2em;
        margin: 1em 0;
        text-align: center;
        display: block;
    }
</style>

<template>
    <section class="container" id="resultsContainer">
        <transition name="fade" mode="out-in">
            <ResultsList v-if="resultsStatus && !resultsLoading && results.length !== 0" />
            <ResultsSpinner v-else-if="resultsLoading"/>
            <NoResults v-else-if="!resultsStatus && !resultsLoading && searchMade" />
            <span v-else-if="!searchMade">Go ahead, search for some code.</span>
        </transition>
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

            // Results loading
            this.$store.state.resultsLoading = true;

            // Setup URL
            let url = "/api/search";
            axios.post(url, {
                search: term
            })
            .then((res) => {
                this.$store.commit('updateResults', res.data);
                // Results no longer loading
                this.$store.state.resultsLoading = false;
            })
            .catch((err) => {
                if (err) {
                    this.$store.state.results = [];
                    this.$store.state.resultsStatus = false;
                }
            });


        }
    }
}
</script>

<style lang="scss" scoped>
    section.container {
        max-width: $container-width;
        padding: 1em;
        margin: 0 auto;
        width: 95%;
        min-height: calc(100vh - 365px);
        position: relative;
    }
    span {
        font-size: 2em;
        margin: 1em 0;
        text-align: center;
        display: block;
    }
</style>

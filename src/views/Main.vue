<template>
    <main>
        <PageHead />
        <ResultsContainer v-on:keyup.esc="closeSnippet"/>
    </main>
</template>

<script>
import PageHead from "../components/PageHead";
import ResultsContainer from "../components/ResultsContainer";

export default {
    components: {
        'PageHead': PageHead,
        'ResultsContainer': ResultsContainer,
    },
    methods: {
        closeSnippet() {
            console.log("Escape pressed")
            this.$store.commit('closeSnippet');
        }
    }
}
</script>
<template>
    <main>
        <PageHead search="false" />
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
        
    }
}
</script>
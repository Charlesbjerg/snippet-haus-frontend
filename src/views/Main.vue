<template>
    <main>
        <PageHead />
        <ResultsContainer />
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
}
</script>
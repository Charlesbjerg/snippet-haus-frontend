<template>
    <div class="container snippet-results">
        <Result v-for="(result, key) in results" :key="key" :resultsKey="key"/>
    </div>
</template>

<script>
import Result from "./Result";

export default {
    name: 'ResultsList',
    components: {
        'Result': Result
    },
    computed: {
        results() {
            return this.$store.state.results;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

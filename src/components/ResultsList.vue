<template>
    <div class="container snippet-results">
        <transition-group name="display-snippets" tag="div">
            <Result v-for="(result, key) in results" :key="result.id" :resultsKey="key"/>
        </transition-group>
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
    },
}
</script>

<style lang="scss" scoped>
.display-snippets {
    transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
</style>

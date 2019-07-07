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
    mounted() {
        // this.$store.watch(
        //     (state, getters) => getters.searchTerm,
        //     (newTerm, oldTerm) => {

        //         // Trim the string 
        //         let term = newTerm.trim();

        //         // Make AJAX call
        //         this.searchSnippets(term);

        //     }
        // )
        document.addEventListener("keydown", this.navigateItems);
    },
    methods: {
        navigateItems() {
            // console.log(event);

            // if (this.$store.getters.getSelected() !== false && this.$store.state.resultsStatus) {
                
                // Need to listen to events for all controls
                // Should probably keep track of the currently selected item
                // Set to false/null if nothing is selected
    
                // Enter to open an item
                // Esc to close the open item

                // Up and down for the list
                if (event.key == "ArrowDown")  {
                    this.$store.commit('selectSnippet', 'down');
                    console.log("Selecting snippet above");
                } else if (event.key == "ArrowUp") {
                    this.$store.commit('selectSnippet', 'up');
                    console.log("Selecting snippet below");                
                } else if (event.key == " " && this.$store.state.snippetSelected !== false) {
                    this.$store.commit('openSnippet');
                    console.log("Open Snippet");
                } else if (event.key == "Escape" && this.$store.state.snippetOpen) {
                    console.log("Close snippet");
                    this.$store.commit('closeSnippet');
                }


            // }

        }
    }
}
</script>

<style lang="scss" scoped>
.display-snippets {
    transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
</style>

<template>
    <div class="search-bar">
        <input type="text" placeholder="Search" v-model="term" autofocus />
        <font-awesome-icon icon="search" />
    </div>
</template>
 <script>
import _ from 'lodash';

 export default {
     name: 'SearchBar',
     data() {
         return {
            term: ''
         }
     },
     watch: {
        term: _.debounce(function(newTerm, oldTerm) {
                
            let searchTerm = newTerm.trim();

            if (searchTerm == "") {
                this.$store.state.resultsStatus = false;
                this.$store.state.resultsLoading = false;
                this.$store.state.searchMade = false;
                this.$store.state.results = [];
            } else {
                let googleCheck = searchTerm.substring(0,2);
                if (googleCheck.toLowerCase() == "g:") {
                    // Search google
                    let googleTerm = searchTerm.slice(2);
                    let googleUrl = "https://google.co.uk/search?q=" + encodeURI(googleTerm); 
                    window.open(googleUrl, '_blank');
                } else {
                    this.$store.commit('updateSearchTerm', searchTerm);
                }
            }
        }, 1000),
    }
}
 </script>

 <style lang="scss">
    .search-bar {
        width: 100%;
        margin: 1em 0;
        position: relative;
        input {
            width: 100%;
            padding: 0.75em 2em 0.75em 0.75em;
            font-size: 1.25em;
            border: 4px solid $accent-dark;
            border-radius: $border-radius;
        }
        input::placeholder {
            color: rgba(0,0,0,0.2);
            transition: $default-transition; 
        }
        input:hover::placeholder,
        input:focus::placeholder {
            color: rgba(0,0,0,0.75);
        }
        svg {
            position: absolute;
            height: 100%;
            width: 1.5em !important;
            display: flex;
            justify-content: center;
            align-items: center;
            top: 0;
            right: 1em;
            color: $accent-dark;
        }  
    }
 </style>
 
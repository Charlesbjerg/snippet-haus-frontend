<template>
    <article class="snippet" :class="[this.openSnippetClass]" @click="this.openSnippet">
        <div class="snippet-icon">
            <i :class="[this.snippet.icon]"></i>
        </div>
        <span class="snippet-link">View</span>
        <div class="snippet-content">
            <h2>{{ this.snippet.title }}</h2>
            <span class="snippet-subtitle">{{ this.snippet.language }} {{ this.seperator }} {{ this.snippet.platform }}</span>
            <pre class="snippet-code" ref="codeDisplay">
                <code :class="[this.snippet.language]">{{ this.snippet.code }}</code>
            </pre>
            <p>{{ this.snippet.description }}</p>
            <a class="btn" :href="this.snippet.externalLink">View Source</a>
        </div>
    </article>
</template>

<script>
import { mapGetters } from "vuex";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark-reasonable.css";

export default {
    name: "Result",
    props: {
        resultsKey: Number
    },
    computed: {
        snippet() {
            return this.$store.getters.getSnippet(this.resultsKey);
        },
        seperator() {
            
            let seperatorString = "";

            if (this.snippet.language && this.snippet.platform) {
                seperatorString = " - "
            }

            return seperatorString;

        },
        openSnippetClass() {
            
            let className = "";
            
            if (this.$store.state.snippetOpen) {
                
                // If a snippet has been opened
                if (this.resultsKey === this.$store.state.snippetOpened) {
                    // Open the selected snippet
                    className = "active";
                } else {
                    // Hide all the others
                    className = "not-active";
                }

            } else {
                className = "";
            }

            return className;
        }
    },
    methods: {
        openSnippet() {
            // Check if snippet currently open
            if (!this.$store.state.snippetOpen) {
                
                // Update state for selected Snippet 
                this.$store.commit('openSnippet', this.resultsKey);

                // Run highlight JS on code
                this.highlightCode();

            } else {
                console.log("Snippet already open, how tf did you manage to select another snippet");
            }
        },
        highlightCode() {
            let codeDisplay = this.$refs.codeDisplay;
            hljs.highlightBlock(codeDisplay);
        }
    }
}
</script>

<style lang="scss" scoped>
    h2 {
        font-weight: 400;
    }
    
    .snippet {
        width: 668px;
        background-color: #fff;
        border-radius: $border-radius;
        min-height: 150px;
        padding-left: 165px;
        margin-bottom: 2em;
        position: relative;
        cursor: pointer;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        overflow: hidden;
        .snippet-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 150px;
            background-color: $accent;
            border-top-left-radius: $border-radius;
            border-bottom-left-radius: $border-radius;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;
            color: $accent-dark;
            transition: $default-transition;
            i {
                font-size: 64px;
            }
        }
        .snippet-link {
            position: absolute;
            z-index: 9;
            bottom: -30px;
            left: 120px;
            width: 150px;
            height: 30px;
            background-color: $accent-dark;
            color: $accent;
            font-size: 1.25em;
            transform: rotate(-90deg);
            transform-origin: top left;
            display: flex;
            align-items: center;
            justify-content: center; 
            transition: $default-transition;

        }
        .snippet-content {
            height: 150px;
            max-width: calc(100% - 35px);
            padding: 1em 0;
            transition: $default-transition;
            h2 {
                margin: 0 0 0.25em 0;
                font-size: 2em;
            }
            .snippet-subtitle {
                font-size: 1.25em;
                font-style: italic;
                margin: 0;
            }
            pre {
                margin-top: 4.5em;
            }
        }
    }


    .snippet.selected,
    .snippet:hover {
        .snippet-icon {
            color: #fff;
        }
        .snippet-link {
            color: #fff;
            transform: translateX(30px) rotate(-90deg);
        }
        .snippet-content {
            transform: translate(30px);
        }
    }

    /* Animated opening of snippet */
    $snippet-timing: cubic-bezier(0.075, 0.82, 0.165, 1);
    
    /* 
        css-prop transition-time transition-delay,
    */

    .snippet {
        transition:
            opacity 0.5s $snippet-timing,
            position 0.01s 0.5s $snippet-timing,
            min-height 1.3s 1.3s $snippet-timing,
            width 1.3s 1.3s $snippet-timing,
            transform 1.3s 1.3s $snippet-timing
        ;
        .snippet-link {
            transition: transform 0.5s 0.5s $snippet-timing;
        }
    }

    /* Element changes */
    .snippet.active {
        position: absolute;
        min-height: 500px;
        width: 868px;
        transform: translateX(-100px);
        .snippet-icon i {
            // position: absolute;
            // top: 32px;
            // left: calc(50% - 28px);
        }
        .snippet-link {
            /* Might need to be -30px */
            transform: translate(0) rotate(-90deg);
        }
    }

    .snippet.not-active {
        opacity: 0;
    }
</style>

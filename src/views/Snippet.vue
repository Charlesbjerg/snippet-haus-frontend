<template>
    <article class="snippet" 
             :keyup="this.copySnippet">
        <div class="snippet-icon">
            <i :class="[this.snippet.icon]"></i>
        </div>
        <span class="snippet-link">View</span>
        <div class="snippet-content">
            <h2>{{ this.snippet.title }}</h2>
            <span class="snippet-subtitle">{{ this.snippet.language }} {{ this.seperator }} {{ this.snippet.platform }}</span>
            <textarea ref="codeDisplay">{{ this.snippet.code }}</textarea>
            <p>{{ this.snippet.description }}</p>
            <a class="btn" :href="this.snippet.externalLink">View Source</a>
        </div>
    </article>
</template>

<script>
import { mapGetters } from "vuex";

import CodeMirror from "codemirror";
import 'codemirror/lib/codemirror.css'
import "codemirror/theme/material.css";


export default {
    name: "Result",
    props: {
        resultsKey: Number
    },
    computed: {
        snippet() {
            return this.$store.getters.getLoaded;
        },
        seperator() {
            
            let seperatorString = "";

            if (this.snippet.language && this.snippet.platform) {
                seperatorString = " - "
            }

            return seperatorString;

        },
    },
    beforeRouteUpdate(to, from, text) {
        console.log("Fetching snippet");
        let url = "http://127.0.0.1:8001/api/" + $route.params.id;

        axios.get('url')
        .then((res) => {
                this.$store.commit('snippetLoaded', res);
        })
        .catch((err) => {
            if (err) {
                this.$store.state.loadedSnippet = [];
                console.log("No snippet found, need to throw 404");
            }
        });
        next();
    },
    mounted() {
            console.log("Mounted");
            window.addEventListener('keydown', this.copySnippet);
    },
    methods: {
        highlightCode() {
            let codeDisplay = this.$refs.codeDisplay;
            let codeMirror = CodeMirror.fromTextArea(codeDisplay, {
                theme: 'material',
                readOnly: true,
                mode: 'PHP',
                lineNumbers: true
            });
    
            codeDisplay.classList.add("active");

        },
        copySnippet(e) {
            console.log("Keypress");
            console.log(this.$store.state.getSelected);
            if (e.which == 67 && e.which == 17 && this.resultsKey == this.$store.state.getSelected) {
                this.$refs.codeDisplay.select();
                Document.execCommand('copy');
            }
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
            // max-width: calc(100% - 35px);
            max-width: 100%;
            padding: 1em 15px 1em 0px;
            transition: $default-transition;
            h2 {
                margin: 0 0 0.25em 0;
                font-size: 2em;
            }
            .snippet-subtitle {
                font-size: 1.25em;
                font-style: italic;
                margin: 0;
                margin-bottom: 1em;
                display: inline-block;
            }
            pre, textarea {
                margin-top: 4.5em;
                opacity: 0;
                transition: $default-transition;
                display: block;
                width: 100%;
            }
            p {
                font-family: 'Ropa Sans', Arial;
            }
            a.btn {
                padding: 0.75em 1em;
                background-color: #fff;
                color: #000;
                display: inline-block;
                margin: 0.5em 0;
                border: 2px solid $accent;
                border-radius: $border-radius;
                text-decoration: none;
                transition: $default-transition;
                &:hover {
                    background-color: $accent;
                    color: #fff;
                }
            }
        }
    }
</style>

<template>
    <router-link :to="this.snippetUrl">
        <article class="snippet">
            <div class="snippet-icon">
                <i :class="[this.snippet.icon]"></i>
            </div>
            <span class="snippet-link">View</span>
            <div class="snippet-content">
                <h2>{{ this.snippet.title }}</h2>
                <span class="snippet-subtitle">{{ this.snippet.language }} {{ this.seperator }} {{ this.snippet.platform }}</span>
            </div>
        </article>
    </router-link>
</template>

<script>
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
        snippetUrl() {
            return "/snippet/" + this.snippet.id;
        }
    },
}
</script>

<style lang="scss" scoped>
    h2 {
        font-weight: 400;
    }
    .snippet {
        width: 100%;
        background-color: #fff;
        border-radius: $border-radius;
        min-height: 150px;
        padding-left: 165px;
        margin: 0 0 2em 0;
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
        }
    }

    /* Snippet transitions */
    $snippet-timing: cubic-bezier(0.075, 0.82, 0.165, 1);
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

    @media screen and (max-width: 500px) {

        .snippet { 
            flex-direction: column;
            position: unset;
            padding: 0;
            .snippet-icon {
                position: unset;
                width: 100%;
                border-bottom-left-radius: 0;
                padding: 1em;
            }
            .snippet-link {
                display: none;
            }
            .snippet-content {
                position: unset;
                text-align: center;
                padding: 1em;
                height: unset;
            }
            &:hover {
                .snippet-content {
                    transform: none;
                }
            }
        }

    }

</style>

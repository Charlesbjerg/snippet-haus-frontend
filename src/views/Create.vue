<template>
    <main>
        <!-- <PageHead /> -->
        <div class="container">
            <section class="create-snippet">
                <div class="create-head">
                    <h2>Create new Snippet</h2>
                </div>
                <div class="create-form">
                    <form method="POST" @submit="this.saveSnippet">
                        <div class="form-item">
                            <label>Title *</label>
                            <input type="text" ref="title" placeholder="Setup a custom taxonomy" />
                        </div>
                        <div class="form-item">
                            <label>Icon</label>
                            <input type="text" ref="icon" placeholder="fab fa-wordpress" />
                        </div>
                        <div class="form-item">
                            <label>Language</label>
                            <input type="text" ref="language" placeholder="PHP" />
                        </div>
                        <div class="form-item">
                            <label>Platform</label>
                            <input type="text" ref="platform" placeholder="WordPress" />
                        </div>
                        <div class="form-item">
                            <label>Description *</label>
                            <textarea ref="description"></textarea>
                        </div>
                        <div class="form-item">
                            <label>External Link</label>
                            <input type="text" ref="externalLink" placeholder="reference.wordpress.com" />
                        </div>
                        <div class="form-item">
                            <label>Source</label>
                            <input type="text" ref="source" placeholder="wordpress.com" />
                        </div>
                        <div class="form-item">
                            <label>Code *</label>
                            <textarea class="code-area" ref="codearea"></textarea>
                        </div>
                        <button class="btn" type="submit">Create</button>
                    </form>
                </div>
            </section>
        </div>
    </main>
</template>

<script>
import PageHead from "../components/PageHead";
import axios from "axios";
import CodeMirror from "codemirror";
import 'codemirror/lib/codemirror.css'
import "codemirror/theme/material.css";

export default {
    components: {
        'PageHead': PageHead
    },
    data() {
        return {}
    },
    mounted() {
        let codearea = this.$refs.codearea;
        let codeMirror = CodeMirror.fromTextArea(codearea, {
            theme: 'material',
            value: 'Code goes here',
            mode: 'PHP',
            lineNumbers: true
        });
        console.log("Code mirror created");
    },
    methods: {
        saveSnippet(e) {
            e.preventDefault();
            axios.post('/api/snippet', {
                title: this.$refs.title.value,
                icon: this.$refs.icon.value,
                language: this.$refs.language.value,
                platform: this.$refs.platform.value,
                description: this.$refs.description.value,
                externalLink: this.$refs.externalLink.value,
                source: this.$refs.source.value,
                code: this.$refs.codearea.value,
            })
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
        }
    },
}
</script>

<style lang="scss" scoped>
.container {
    max-width: $container-width;
    padding: 1em;
    margin: 0 auto;
    width: 100%;
    min-height: calc(100vh - 340px);
    position: relative;
}

.create-snippet {
    background-color: #fff;
    border-radius: $border-radius;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    margin-bottom: 2em;
    .create-head {
        background-color: $accent;
        padding: 1em;
        border-top-right-radius: $border-radius;
        border-top-left-radius: $border-radius;
        h2 {
            margin: 0;
            color: #fff;
            font-weight: 500;
            font-size: 2em;
        }
    }       
    .create-form {
        padding: 1em;
        .form-item {
            width: 100%;
            margin-bottom: 1em;
            label {
                display: block;
                margin-bottom: 5px;
            }
            input, textarea {
                width: 100%;
                border-radius: $border-radius;
                background-color: #fff;
                border: 1px solid #bcbcbc;
                padding: 0.5em 1em;
            }
            textarea {
                min-height: 75px;
            }
            .code-area {
                background-color: rgb(49, 49, 49);
                min-height: 250px;
                border: 1px solid #000;
            }
        }
    }
}
</style>

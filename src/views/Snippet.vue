<template>
  <main>
    <section class="snippet" :keyup="this.copySnippet">
      <div class="snippet-icon">
        <i :class="[this.snippet.icon]"></i>
      </div>
      <span class="snippet-link">View</span>
      <div class="snippet-content">
        <h2>{{ this.snippet.title }}</h2>
        <span class="snippet-subtitle">{{ this.snippet.language }} {{ this.seperator }} {{ this.snippet.platform }}</span>
        <div ref="codeDisplay" class="code-display active"></div>
        <p>{{ this.snippet.description }}</p>
        <span v-if="this.snippet.source" class="source">Source: {{ this.snippet.source }}</span>
        <a class="btn" :href="this.snippet.externalLink">View Source</a>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import axios from "axios";

export default {
  name: "Result",
  props: {
    resultsKey: Number
  },
  data() {
    return {
      ctrlDown: Boolean
    };
  },
  computed: {
    snippet() {
      return this.$store.getters.getLoaded;
    },
    seperator() {
      let seperatorString = "";

      if (this.snippet.language && this.snippet.platform) {
        seperatorString = " - ";
      }

      return seperatorString;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // Hide the search bar
      vm.$store.state.displaySearch = false;

      // TODO: Find a way to change the route base in a config file
      let url = "/api/" + to.params.id;

      axios
        .get(url)
        .then(res => {
          console.log("Commiting to store");
          console.log(res);
          vm.$store.commit("snippetLoaded", res.data);
        })
        .catch(err => {
          if (err) {
            console.log("No snippet found, need to throw 404");
            console.log(err);
            vm.$store.state.loadedSnippet = [];
          }
        });
    });
  },
  beforeRouteLeave(to, from, next) {
    // Display the search bar before leave
    this.$store.state.displaySearch = true;
    next();
  },
  mounted() {
    // Listen for copy event
    window.addEventListener("keydown", this.copySnippet);
    window.addEventListener("keyup", this.altNotDown);

    // Listen for change to vuex when snippet is loaded
    this.$store.subscribe((mutation, state) => {
      if (mutation.type == "snippetLoaded" && state.snippetLoaded != []) {
        this.highlightCode();
      }
    });

  },
  methods: {
    highlightCode() {
      let codeDisplay = this.$refs.codeDisplay;

      let codeMirror = CodeMirror(codeDisplay, {
        theme: "material",
        value: this.snippet.code,
        readOnly: true,
        mode: "php",
        lineNumbers: true
      });

    },
    copySnippet(e) {

      // Check if control is being pressed
      if (e.keyCode == 17 || e.keyCode == 91) {
        this.ctrlDown = true;
      }

      // If 'c' has now been pressed while control is down - copy
      if (this.ctrlDown && e.keyCode == 67) {
        this.$copyText(this.snippet.code);
      }
    },
    altNotDown(e) {
      // Check if control is no longer being pressed
      if (e.keyCode == 17 || e.keyCode == 91) {
        this.ctrlDown = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: center;
}
.snippet {
  width: $container-width;
  background-color: #fff;
  border-radius: $border-radius;
  min-height: 150px;
  padding-left: 165px;
  margin: 1em;
  position: relative;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  overflow: hidden;
  h2 {
    font-weight: 400;
  }
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
    .hidden {
        display: none;
    }
    p {
      font-family: "Ropa Sans", Arial;
    }
    .source {
      display: inline-block;
      font-style: italic;
      width: 100%;
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

/* CodeMirror scroll override */
.CodeMirror-scroll {
  overflow: auto !important;
}

@media screen and (max-width: 500px) {

    .snippet { 
        flex-direction: column;
        position: unset;
        padding: 0;
        .snippet-icon {
            height: auto;
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
            .code-display { 
              text-align: left;
            }
        }
        &:hover {
            .snippet-content {
                transform: none;
            }
        }
    }

}

</style>

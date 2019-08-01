<template>
    <div id="app">
        <PageHead search="false" />
        <transition name="router-animate" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutDown">
          <router-view/>
        </transition>
    </div>
</template>

<script>
import PageHead from "./components/PageHead";

export default {
    components: {
        'PageHead': PageHead,
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
}
}
</script>


<style lang="scss">
// @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";

#app {
  font-family: 'Ropa Sans', Arial, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #FDF4F1;
}

#app * {
  box-sizing: border-box;
}
</style>

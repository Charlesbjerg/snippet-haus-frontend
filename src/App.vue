<template>
    <div id="app">
        <PageHead search="false" />
        <transition name="fade" mode="out-in">
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

a {
  color: #000;
  text-decoration: none;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

</style>

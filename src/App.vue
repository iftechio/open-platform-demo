<template>
  <div id="app">
    <home />
  </div>
</template>

<script>
import Home from '@/views/Home.vue'

export default {
  components: {
    Home,
  },
}
</script>

<style lang="stylus">
#app
  width 100vw
  height 150px
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
  background-color #ffffff
html, body, div
  box-sizing border-box
  margin 0px
</style>

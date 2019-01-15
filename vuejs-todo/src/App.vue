<template>
  <div id="app">
    <modals-container />

    <TheDefaultLayout />
  </div>
</template>

<script>
import TheDefaultLayout from './layouts/TheDefaultLayout.vue'

export default {
  name: 'app',
  components: {
    TheDefaultLayout,
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

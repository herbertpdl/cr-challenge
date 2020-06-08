<template>
  <div id="app">
    <shop />
  </div>
</template>

<script>
import Shop from '@/pages/Shop'

export default {
  name: 'App',
  components: {
    Shop,
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

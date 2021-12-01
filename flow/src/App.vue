<template>
  <Navbar v-if="!['login'].includes($route.name)"/>
  <router-view/>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components: { Navbar },
  name: 'App'
 
}
</script>

<style>
html,body { 
	height: 100%; 
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>

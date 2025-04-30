<template>
  <div id="app">
    <NavBar />
    <router-view />
    <AppFooter />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import AppFooter from './components/FooterPage.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    AppFooter
  }
}
</script>

<style>

</style>

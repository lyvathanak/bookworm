<template>
  <NavBar />
  <RouterView />
  <FooterPage />
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import FooterPage from './components/FooterPage.vue';
</script>
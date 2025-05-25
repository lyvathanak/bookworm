<template>
  <!-- <NavBar />
  <RouterView />
  <FooterPage /> -->

  <NavBar v-if="!hideLayout" />
  <RouterView />
  <FooterPage v-if="!hideLayout" />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router' 

import NavBar from './components/NavBar.vue';
import FooterPage from './components/FooterPage.vue';

const route = useRoute()

const hideLayout = computed(() => route.path.startsWith('/auth'))
</script>
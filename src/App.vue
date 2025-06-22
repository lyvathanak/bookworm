<template>
  <NavBar v-if="!isAuthRoute" />
  <main>
    <RouterView />
  </main>
  <FooterPage v-if="!isAuthRoute" />
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import NavBar from './components/layout/NavBar.vue';
import FooterPage from './components/layout/FooterPage.vue';

const route = useRoute();
const isAuthRoute = computed(() => route.path.startsWith('/auth'));
</script>
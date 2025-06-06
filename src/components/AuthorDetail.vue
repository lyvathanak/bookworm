<template>
  <div class="main-content" v-if="author">
    <header class="author-profile-header">
        <img :src="author.image" :alt="author.name" class="author-avatar-large">
        <h1>{{ author.name }}</h1>
        <div class="header-nav">
            <button class="nav-btn active">Home</button>
            <button class="nav-btn">Books</button>
        </div>
    </header>

    <div class="author-bio-card">
        <img :src="author.image" :alt="author.name" class="author-avatar-main">
        <div class="bio-content">
            <h2>{{ author.name }}</h2>
            <p>{{ author.description }}</p>
            <div class="social-links">
                <a :href="author.socials.twitter" target="_blank"><font-awesome-icon :icon="['fab', 'twitter']" /></a>
                <a :href="author.socials.facebook" target="_blank"><font-awesome-icon :icon="['fab', 'facebook']" /></a>
            </div>
        </div>
    </div>

    <div class="books-section">
        <h2>Books by {{ author.name }}</h2>
        <div class="book-grid">
            <div class="book-card" v-for="book in authorBooks" :key="book.id">
                <div class="book-image-placeholder"></div>
                <h3>{{ book.title }}</h3>
                <p>${{ book.price }}</p>
                <div class="star-rating">
                    <font-awesome-icon v-for="n in 5" :key="n" :icon="n <= book.rating ? 'star' : ['far', 'star']" />
                </div>
            </div>
        </div>
    </div>
  </div>
  <div v-else class="main-content"><p>Loading author details...</p></div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
library.add(faTwitter, faFacebook);

export default {
  name: 'AuthorDetail',
  setup() {
    const store = useStore();
    const route = useRoute();
    const authorId = parseInt(route.params.id);

    const author = computed(() => store.state.authors.find(a => a.id === authorId));
    const authorBooks = computed(() => {
        if (!author.value) return [];
        return store.state.books.filter(b => b.authorId === authorId);
    });

    return { author, authorBooks };
  }
};
</script>

<style scoped>
.author-profile-header { text-align: center; padding: 2rem; background: #fdfdfd; border-radius: 10px; margin-bottom: 2rem; }
.author-avatar-large { width: 100px; height: 100px; border-radius: 50%; margin-bottom: 1rem; object-fit: cover; }
.header-nav { margin-top: 1rem; }
.nav-btn { background: none; border: none; padding: 0.5rem 1rem; cursor: pointer; color: #777; }
.nav-btn.active { font-weight: bold; color: #0d1b2a; border-bottom: 2px solid #415a77; }
.author-bio-card { display: flex; gap: 2rem; align-items: center; background: #fdfdfd; padding: 2rem; border-radius: 10px; margin-bottom: 2rem; }
.author-avatar-main { width: 150px; height: 150px; border-radius: 50%; object-fit: cover; }
.bio-content p { margin: 1rem 0; line-height: 1.6; }
.social-links a { font-size: 1.5rem; margin-right: 1rem; color: #415a77; }
.books-section h2 { margin-bottom: 1rem; }
.book-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1.5rem; }
.book-card { text-align: center; }
.book-image-placeholder { width: 100%; height: 200px; background-color: #e0e0e0; border-radius: 4px; margin-bottom: 0.5rem; }
.star-rating { color: #fec82d; }
</style>
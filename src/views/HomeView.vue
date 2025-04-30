<template>
    <div class="home">
      <section class="hero-section">
        <div class="hero-content">
          <h1>Discover Your Next Favorite Book</h1>
          <p>Browse thousands of books from all genres and find your perfect read.</p>
          <button class="cta-button">Browse Books</button>
        </div>
      </section>
  
      <section class="featured-books">
        <div class="container">
          <h2 class="section-title">Featured Books</h2>
          <div class="book-grid">
            <!-- Use your existing book images -->
            <div class="book-card" v-for="n in 4" :key="n">
              <div class="book-cover">
                <img :src="require(`@/assets/book${n}.png`)" :alt="`Featured Book ${n}`" />
              </div>
              <div class="book-info">
                <h3 class="book-title">Book Title {{n}}</h3>
                <p class="book-author">Author Name</p>
                <div class="book-price">$19.99</div>
                <button class="add-to-cart">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  // No imports needed here as NavBar and FooterPage are already in App.vue
  </script>
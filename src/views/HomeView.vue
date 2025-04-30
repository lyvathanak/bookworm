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
          <div class="book-card" v-for="n in 4" :key="n">
            <div class="book-cover">
              <img :src="`../assets/book${n}.png`" :alt="`Featured Book ${n}`" />
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
// No need to import NavBar or FooterPage here since they're in App.vue
</script>

<style scoped>
.home {
  min-height: calc(100vh - 160px); /* Adjust based on navbar and footer heights */
}

.hero-section {
  background-color: #f0f2f5;
  padding: 80px 20px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-content h1 {
  font-size: 2.5rem;
  color: #0a1f44;
  margin-bottom: 20px;
}

.hero-content p {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 30px;
}

.cta-button {
  padding: 12px 30px;
  background-color: #e6d430;
  color: #0a1f44;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #d6c420;
}

.featured-books {
  padding: 60px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  color: #0a1f44;
  margin-bottom: 40px;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}

.book-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.book-cover {
  height: 300px;
  overflow: hidden;
}

.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-info {
  padding: 15px;
}

.book-title {
  font-size: 1.1rem;
  margin: 0 0 5px;
  color: #0a1f44;
}

.book-author {
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 10px;
}

.book-price {
  font-weight: bold;
  color: #0a1f44;
  margin-bottom: 10px;
}

.add-to-cart {
  width: 100%;
  padding: 8px;
  background-color: #0a1f44;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart:hover {
  background-color: #162f5a;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .hero-content p {
    font-size: 1rem;
  }
  
  .book-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 60px 15px;
  }
  
  .hero-content h1 {
    font-size: 1.8rem;
  }
  
  .featured-books {
    padding: 40px 15px;
  }
  
  .section-title {
    font-size: 1.6rem;
  }
  
  .book-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
}
</style>
<template>
    <div class="landing-page">
      <!-- Logo Section -->
      <div class="logo-section">
        <div class="logo-container" @click="navigateToHome()">
          <img src="../assets/logo.png" alt="BookWorm Logo" class="logo-image" />
          <div class="brand-text">
            <h1 class="brand-name" @click="navigateToHome()">BOOK <span class="brand-highlight">WORM</span></h1>
            <p class="brand-tagline" @click="navigateToHome()">ONLINE BOOKSTORE</p>
          </div>
        </div>
      </div>
      
      <!-- Hero Banner Section - Added click navigation -->
      <div class="hero-banner" @click="navigateToHome()">
        <img src="../assets/cover1.png" alt="Kingdom Book Cover" class="banner-image" />
        <div class="banner-overlay">
          <div class="banner-content">
            <div class="kingdom-text">KINGDOM</div>
            <div class="trailer-text">BOOK TRAILER</div>
          </div>
        </div>
      </div>
      
      <!-- Featured Books Section - Updated click handlers -->
      <div class="featured-books">
        <!-- First Featured Book -->
        <div class="book-item" @click="navigateToHome()">
          <img src="../assets/cover1.png" alt="Kingdom Book" class="banner-image" />
          <div class="banner-overlay">
            <div class="banner-content">
              <div class="kingdom-text">KINGDOM</div>
              <div class="trailer-text">BESTSELLER</div>
            </div>
          </div>
        </div>
        
        <!-- Second Featured Book -->
        <div class="book-item" @click="navigateToHome()">
          <img src="../assets/cover1.png" alt="Kingdom Book" class="banner-image" />
          <div class="banner-overlay">
            <div class="banner-content">
              <div class="kingdom-text">KINGDOM</div>
              <div class="trailer-text">NEW RELEASE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  // Updated function to navigate to home
  const navigateToHome = () => {
    console.log('Navigating to home page')
    router.push({ name: 'home' })
  }
  </script>
  
  <style scoped>
  .landing-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  /* Logo Section Styles */
  .logo-section {
    display: flex;
    justify-content: center;
    padding: 20px 0;
    margin: 0 auto;
    cursor: pointer;
  }
  
  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .logo-image {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
    object-fit: contain;
  }
  
  .brand-text {
    text-align: center;
  }
  
  .brand-name {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
    color: #333;
  }
  
  .brand-highlight {
    color: #e6d430;
  }
  
  .brand-tagline {
    font-size: 12px;
    margin: 0;
    color: #666;
  }
  
  /* Hero Banner Styles */
  .hero-banner {
    position: relative;
    width: 100%;
    height: 300px;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid #e0e0e0;
  }
  
  .banner-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .banner-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  }
  
  .banner-content {
    color: white;
    text-align: center;
  }
  
  .kingdom-text {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .trailer-text {
    font-size: 18px;
    letter-spacing: 2px;
  }
  
  /* Featured Books Styles */
  .featured-books {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 15px;
  }
  
  .book-item {
    flex: 1;
    position: relative;
    cursor: pointer;
    border-radius: 4px;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    height: 300px; /* Match hero banner height */
    border: 1px solid #e0e0e0;
  }
  
  .book-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  /* Apply the same style from banner-image to all images */
  .book-item img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Same as banner-image */
  }
  
  /* Make all overlay text consistent */
  .book-item .banner-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  }
  
  .book-item .banner-content {
    color: white;
    text-align: center;
  }
  
  .book-item .kingdom-text {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .book-item .trailer-text {
    font-size: 18px;
    letter-spacing: 2px;
  }
  
  /* Responsive Styles */
  @media (max-width: 768px) {
    .featured-books {
      flex-direction: column;
    }
    
    .book-item {
      margin-bottom: 15px;
      height: 400px; /* Still taller on mobile, but slightly reduced */
    }
    
    .hero-banner {
      height: 200px;
    }
  }
  </style>
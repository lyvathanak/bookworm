<template>
    <div class="book-description-page">
      <div class="breadcrumb">
        <a href="/" class="breadcrumb-link home">Home</a>
        <span class="breadcrumb-separator">/</span>
        <a href="/books" class="breadcrumb-link">Books</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">{{ book.title }}</span>
      </div>
      
      <div class="book-main-content">
        <div class="book-info">
          <!-- Rating -->
          <div class="book-rating">
            <div class="stars">
              <span class="star" v-for="i in 5" :key="i">☆</span>
            </div>
            <span class="reviews-count">{{ book.reviewsCount }} Reviews</span>
          </div>
          
          <!-- Title -->
          <h1 class="book-title">{{ book.title }}</h1>
          
          <!-- Description - Scrollable -->
          <div class="book-description-container">
            <div class="book-description">
              <p v-for="(paragraph, index) in book.description" :key="index">{{ paragraph }}</p>
            </div>
          </div>
          
          <!-- Price and Actions -->
          <div class="book-price">{{ book.price }}</div>
          
          <div class="book-actions">
            <div class="quantity-selector">
              <button class="quantity-btn decrease">-</button>
              <input type="text" class="quantity-input" value="1" readonly />
              <button class="quantity-btn increase">+</button>
            </div>
            
            <button class="add-to-cart-btn">
              <span class="cart-icon">🛒</span>
              ADD TO CART
            </button>
            
            <button class="wishlist-btn">
              <span class="heart-icon">♡</span>
            </button>
          </div>
        </div>
        
        <!-- Book Cover -->
        <div class="book-cover">
          <img :src="book.coverImage" :alt="book.title" class="book-cover-image" />
        </div>
      </div>
      
      <div class="book-navigation">
        <RouterLink 
          :to="{ name: 'book-description', params: { id: book.id > 1 ? book.id - 1 : books.length }}" 
          class="book-nav-button prev"
        >
          &larr; Previous Book
        </RouterLink>
        
        <RouterLink 
          :to="{ name: 'book-description', params: { id: book.id < books.length ? book.id + 1 : 1 }}" 
          class="book-nav-button next"
        >
          Next Book &rarr;
        </RouterLink>
      </div>
      
      <!-- Book Details -->
      <div class="book-details-section">
        <h2 class="section-title">Details</h2>
        <div class="details-table">
          <div class="details-row">
            <div class="details-label">Book Title</div>
            <div class="details-value">{{ book.title }}</div>
          </div>
          <div class="details-row">
            <div class="details-label">Author</div>
            <div class="details-value">{{ book.author }}</div>
          </div>
          <div class="details-row">
            <div class="details-label">ISBN</div>
            <div class="details-value">{{ book.isbn }} (ISBN13: {{ book.isbn13 }})</div>
          </div>
          <div class="details-row">
            <div class="details-label">Edition Language</div>
            <div class="details-value">{{ book.language }}</div>
          </div>
          <div class="details-row">
            <div class="details-label">Book Format</div>
            <div class="details-value">{{ book.format }}</div>
          </div>
          <div class="details-row">
            <div class="details-label">Date Published</div>
            <div class="details-value">{{ book.published }}</div>
          </div>
          <div class="details-row">
            <div class="details-label">Publisher</div>
            <div class="details-value">{{ book.publisher }}</div>
          </div>
        </div>
      </div>
      
      <!-- Customer Reviews -->
      <div class="customer-reviews-section">
        <h2 class="section-title">Customer Reviews</h2>
        <div class="reviews-summary">
          <div class="average-rating">
            <div class="rating-number">{{ book.rating }}</div>
            <div class="rating-text">out of 5</div>
          </div>
          <div class="rating-bars">
            <div class="rating-bar-row">
              <span class="rating-label">5</span>
              <div class="rating-bar-container">
                <div class="rating-bar" style="width: 65%;"></div>
              </div>
              <span class="rating-percentage">65%</span>
            </div>
            <div class="rating-bar-row">
              <span class="rating-label">4</span>
              <div class="rating-bar-container">
                <div class="rating-bar" style="width: 17%;"></div>
              </div>
              <span class="rating-percentage">17%</span>
            </div>
            <div class="rating-bar-row">
              <span class="rating-label">3</span>
              <div class="rating-bar-container">
                <div class="rating-bar" style="width: 10%;"></div>
              </div>
              <span class="rating-percentage">10%</span>
            </div>
            <div class="rating-bar-row">
              <span class="rating-label">2</span>
              <div class="rating-bar-container">
                <div class="rating-bar" style="width: 5%;"></div>
              </div>
              <span class="rating-percentage">5%</span>
            </div>
            <div class="rating-bar-row">
              <span class="rating-label">1</span>
              <div class="rating-bar-container">
                <div class="rating-bar" style="width: 3%;"></div>
              </div>
              <span class="rating-percentage">3%</span>
            </div>
          </div>
        </div>
        <div class="review-quote">
          "Resilience, happiness and freedom come from knowing what to care about—and most importantly what not to care about. This is a masterful, philosophical and practical book that will give readers the wisdom to be able to do just that."
        </div>
      </div>
      
      <!-- Related Books -->
      <div class="related-books-section">
        <h2 class="section-title">Related books</h2>
        <div class="related-books-grid">
          <!-- Related Book 1 -->
          <div class="related-book">
            <div class="related-book-cover">
              <div class="book-cover-placeholder"></div>
            </div>
            <div class="related-book-info">
              <div class="related-book-rating">4.5</div>
              <h3 class="related-book-title">Young Mungo</h3>
              <p class="related-book-author">Douglas Stuart</p>
              <p class="related-book-price">$16.99</p>
            </div>
          </div>
          
          <!-- Related Book 2 -->
          <div class="related-book">
            <div class="related-book-cover">
              <div class="book-cover-placeholder"></div>
            </div>
            <div class="related-book-info">
              <div class="related-book-rating">4.7</div>
              <h3 class="related-book-title">A Flicker In The Dark</h3>
              <p class="related-book-author">Stacy Willingham</p>
              <p class="related-book-price">$20.9</p>
            </div>
          </div>
          
          <!-- Related Book 3 -->
          <div class="related-book">
            <div class="related-book-cover">
              <div class="book-cover-placeholder"></div>
            </div>
            <div class="related-book-info">
              <div class="related-book-rating">4.3</div>
              <h3 class="related-book-title">Reminders of Him</h3>
              <p class="related-book-author">Colleen Hoover</p>
              <p class="related-book-price">$19.9</p>
            </div>
          </div>
          
          <!-- Related Book 4 -->
          <div class="related-book">
            <div class="related-book-cover">
              <div class="book-cover-placeholder"></div>
            </div>
            <div class="related-book-info">
              <div class="related-book-rating">3.9</div>
              <h3 class="related-book-title">The Christmas Killer</h3>
              <p class="related-book-author">Alex Pine</p>
              <p class="related-book-price">$15.99</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Best Selling - Horizontally Scrollable -->
      <div class="best-selling-section">
        <h2 class="section-title">Best selling</h2>
        <div class="best-selling-container">
          <div class="best-selling-books">
            <!-- Best Selling Book 1 -->
            <div class="best-selling-book">
              <div class="best-selling-book-cover">
                <div class="book-cover-placeholder"></div>
              </div>
              <div class="book-category">Self-help</div>
              <div class="book-rating">4.3</div>
              <h3 class="best-selling-book-title">The Subtle Art of Not Giving a F*ck</h3>
              <p class="best-selling-book-author">Mark Manson</p>
              <p class="best-selling-book-price">$11.63</p>
            </div>
            
            <!-- Best Selling Book 2 -->
            <div class="best-selling-book">
              <div class="best-selling-book-cover">
                <div class="book-cover-placeholder"></div>
              </div>
              <div class="book-category">Biography</div>
              <div class="book-rating">4.8</div>
              <h3 class="best-selling-book-title">Such a Fun Age</h3>
              <p class="best-selling-book-author">Kiley Reid</p>
              <p class="best-selling-book-price">$14.99</p>
            </div>
            
            <!-- Best Selling Book 3 -->
            <div class="best-selling-book">
              <div class="best-selling-book-cover">
                <div class="book-cover-placeholder"></div>
              </div>
              <div class="book-category">Fiction</div>
              <div class="book-rating">4.5</div>
              <h3 class="best-selling-book-title">The Silent Patient</h3>
              <p class="best-selling-book-author">Alex Michaelides</p>
              <p class="best-selling-book-price">$12.99</p>
            </div>
            
            <!-- Add more books as needed -->
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import book6Image from '@/assets/book6.png'
import book7Image from '@/assets/book7.png'
// Sample books data - in a real app, this might come from an API
const books = [
  {
    id: 1,
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    rating: 4.0,
    reviewsCount: 127,
    price: "$11.63",
    isbn: "1213413816458",
    isbn13: "12134138164",
    language: "English",
    format: "Paperback, 450 Pages",
    published: "August 10th 2020",
    publisher: "Wepress Inc.",
    category: "Self-help",
    description: [
      "In this generation-defining self-help guide, a superstar blogger cuts through the crap to show us how to stop trying to be \"positive\" all the time so that we can truly become better, happier people.",
      "For decades, we've been told that positive thinking is the key to a happy, rich life. \"F**k positivity,\" Mark Manson says. \"Let's be honest, shit is f**ked and we have to live with it.\" In his wildly popular Internet blog, Manson doesn't sugarcoat or equivocate. He tells it like it is—a dose of raw, refreshing, honest truth that is sorely lacking today.",
      "The Subtle Art of Not Giving a F**k is his antidote to the coddling, let's-all-feel-good mindset that has infected modern society and spoiled a generation, rewarding them with gold medals just for showing up."
    ],
    coverImage: book6Image
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.7,
    reviewsCount: 159,
    price: "$14.99",
    isbn: "9781847941831",
    isbn13: "1847941834",
    language: "English",
    format: "Hardcover, 320 Pages",
    published: "October 16th 2018",
    publisher: "Random House",
    category: "Self-help",
    description: [
      "No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
      "If you're having trouble changing your habits, the problem isn't you. The problem is your system. Bad habits repeat themselves again and again not because you don't want to change, but because you have the wrong system for change. You do not rise to the level of your goals. You fall to the level of your systems. Here, you'll get a proven system that can take you to new heights."
    ],
    coverImage: book7Image
  }
]

// Get the current route
const route = useRoute()

// Get the book based on route ID
const currentBookId = computed(() => Number(route.params.id) || 1)
const book = computed(() => books.find(b => b.id === currentBookId.value) || books[0])
  </script>
  
  <style scoped>
  .book-description-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  /* Breadcrumb Styles */
  .breadcrumb {
    margin-bottom: 20px;
    font-size: 14px;
  }
  
  .breadcrumb-link {
    text-decoration: none;
  }
  
  .home {
    color: #e6d430;
  }
  
  .breadcrumb-separator {
    margin: 0 5px;
    color: #666;
  }
  
  .breadcrumb-current {
    color: #666;
  }
  
  /* Main Book Content Styles */
  .book-main-content {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    margin-bottom: 40px;
  }
  
  .book-info {
    flex: 1;
    min-width: 300px;
  }
  
  .book-rating {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .stars {
    display: flex;
    margin-right: 10px;
  }
  
  .star {
    font-size: 20px;
    color: #ccc;
  }
  
  .reviews-count {
    color: #666;
    font-size: 14px;
  }
  
  .book-title {
    font-size: 24px;
    margin-bottom: 15px;
    color: #333;
  }
  
  /* Scrollable Description */
  .book-description-container {
    height: 200px;
    overflow-y: auto;
    margin-bottom: 20px;
    border: 1px solid #eee;
    padding: 10px;
    border-radius: 4px;
  }
  
  .book-description {
    font-size: 14px;
    line-height: 1.6;
    color: #555;
  }
  
  .book-description p {
    margin-bottom: 10px;
  }
  
  .book-price {
    font-size: 24px;
    font-weight: bold;
    color: #e6d430;
    margin-bottom: 20px;
  }
  
  .book-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .quantity-selector {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .quantity-btn {
    background: #f5f5f5;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
  }
  
  .quantity-input {
    width: 40px;
    text-align: center;
    border: none;
    padding: 8px 0;
  }
  
  .add-to-cart-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #333;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .cart-icon {
    margin-right: 8px;
  }
  
  .wishlist-btn {
    background: #f5f5f5;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  .heart-icon {
    font-size: 20px;
    color: #666;
  }
  
  .book-cover {
    flex: 0 0 300px;
  }
  
  .book-cover-image {
    width: 100%;
    height: 450px;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  
  .book-cover-placeholder {
    width: 100%;
    height: 450px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: italic;
    color: #999;
  }
  
  /* Book Details Styles */
  .book-details-section {
    margin-bottom: 40px;
  }
  
  .section-title {
    font-size: 20px;
    margin-bottom: 15px;
    color: #333;
  }
  
  .details-table {
    border: 1px solid #eee;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .details-row {
    display: flex;
  }
  
  .details-label {
    flex: 0 0 150px;
    background-color: #0a1f44;
    color: white;
    padding: 10px 15px;
    font-weight: bold;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .details-value {
    flex: 1;
    padding: 10px 15px;
    border-bottom: 1px solid #eee;
  }
  
  .details-row:last-child .details-label,
  .details-row:last-child .details-value {
    border-bottom: none;
  }
  
  /* Customer Reviews Styles */
  .customer-reviews-section {
    margin-bottom: 40px;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 4px;
  }
  
  .reviews-summary {
    display: flex;
    margin-bottom: 20px;
  }
  
  .average-rating {
    flex: 0 0 100px;
    text-align: center;
    padding-right: 20px;
    border-right: 1px solid #ddd;
  }
  
  .rating-number {
    font-size: 36px;
    font-weight: bold;
    color: #333;
  }
  
  .rating-text {
    font-size: 14px;
    color: #666;
  }
  
  .rating-bars {
    flex: 1;
    padding-left: 20px;
  }
  
  .rating-bar-row {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
  
  .rating-label {
    flex: 0 0 20px;
    text-align: center;
  }
  
  .rating-bar-container {
    flex: 1;
    height: 15px;
    background-color: #eee;
    margin: 0 10px;
    border-radius: 10px;
    overflow: hidden;
  }
  
  .rating-bar {
    height: 100%;
    background-color: #e6d430;
  }
  
  .rating-percentage {
    flex: 0 0 40px;
    font-size: 12px;
    color: #666;
  }
  
  .review-quote {
    font-style: italic;
    color: #666;
    padding: 15px;
    border-left: 3px solid #e6d430;
    background-color: white;
    border-radius: 0 4px 4px 0;
  }
  
  /* Related Books Styles */
  .related-books-section {
    margin-bottom: 40px;
  }
  
  .related-books-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  
  .related-book {
    display: flex;
    flex-direction: column;
  }
  
  .related-book-cover {
    margin-bottom: 10px;
  }
  
  .related-book-rating {
    display: inline-block;
    background-color: #e6d430;
    color: #333;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .related-book-title {
    font-size: 16px;
    margin: 0 0 5px 0;
    font-weight: 600;
  }
  
  .related-book-author {
    font-size: 14px;
    color: #666;
    margin: 0 0 5px 0;
  }
  
  .related-book-price {
    font-weight: bold;
    color: #333;
    margin: 0;
  }
  
  /* Best Selling Styles - Horizontally Scrollable */
  .best-selling-section {
    margin-bottom: 40px;
  }
  
  .best-selling-container {
    overflow-x: auto;
    padding-bottom: 10px; /* Space for scrollbar */
  }
  
  .best-selling-books {
    display: flex;
    gap: 20px;
    min-width: min-content;
  }
  
  .best-selling-book {
    flex: 0 0 220px;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 4px;
  }
  
  .best-selling-book-cover {
    margin-bottom: 10px;
  }
  
  .book-category {
    display: inline-block;
    background-color: #333;
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    margin-bottom: 5px;
  }
  
  .book-rating {
    display: inline-block;
    background-color: #e6d430;
    color: #333;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    margin-left: 5px;
  }
  
  .best-selling-book-title {
    font-size: 16px;
    margin: 5px 0;
    font-weight: 600;
  }
  
  .best-selling-book-author {
    font-size: 14px;
    color: #666;
    margin: 0 0 5px 0;
  }
  
  .best-selling-book-price {
    font-weight: bold;
    color: #333;
    margin: 0;
  }
  
  /* Navigation Styles */
  .book-navigation {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  
  .book-nav-button {
    padding: 8px 16px;
    background-color: #0a1f44;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .book-nav-button:hover {
    background-color: #162f5a;
  }
  
  /* Responsive Styles */
  @media (max-width: 1024px) {
    .related-books-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  @media (max-width: 768px) {
    .book-main-content {
      flex-direction: column-reverse;
    }
    
    .book-cover {
      margin-bottom: 20px;
    }
    
    .related-books-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 480px) {
    .related-books-grid {
      grid-template-columns: 1fr;
    }
    
    .reviews-summary {
      flex-direction: column;
    }
    
    .average-rating {
      border-right: none;
      border-bottom: 1px solid #ddd;
      padding-right: 0;
      padding-bottom: 15px;
      margin-bottom: 15px;
    }
    
    .rating-bars {
      padding-left: 0;
    }
  }
  </style>
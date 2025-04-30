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
              <span 
                v-for="i in 5" 
                :key="i" 
                :class="getStarClass(i, book.rating)"
              ></span>
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
              <button class="quantity-btn decrease" @click="decreaseQuantity">-</button>
              <input type="text" class="quantity-input" :value="quantity" readonly />
              <button class="quantity-btn increase" @click="increaseQuantity">+</button>
            </div>
            
            <button class="add-to-cart-btn" @click="addToCart">
              <span class="cart-icon">🛒</span>
              ADD TO CART
            </button>
            
            <button 
              class="wishlist-btn" 
              :class="{ active: inWishlist }" 
              @click="toggleWishlist"
            >
              <span class="heart-icon">♡</span>
            </button>
          </div>
          
          <div v-if="showAddedToCart" class="added-to-cart-feedback">
            Added to cart!
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
          <div class="related-book" v-for="relatedBook in relatedBooks" :key="relatedBook.id">
            <div class="related-book-cover">
              <img :src="relatedBook.coverImage" :alt="relatedBook.title" class="related-book-image" />
            </div>
            <div class="related-book-info">
              <div class="related-book-rating">{{ relatedBook.rating }}</div>
              <h3 class="related-book-title">{{ relatedBook.title }}</h3>
              <p class="related-book-author">{{ relatedBook.author }}</p>
              <p class="related-book-price">{{ relatedBook.price }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Best Selling - Horizontally Scrollable -->
      <div class="best-selling-section">
        <h2 class="section-title">Best selling</h2>
        <div class="best-selling-container">
          <div class="best-selling-books">
            <div class="best-selling-book" v-for="bestSellingBook in bestSellingBooks" :key="bestSellingBook.id">
              <div class="best-selling-book-cover">
                <img :src="bestSellingBook.coverImage" :alt="bestSellingBook.title" class="book-cover-image" />
              </div>
              <div class="book-category">{{ bestSellingBook.category }}</div>
              <div class="book-rating">{{ bestSellingBook.rating }}</div>
              <h3 class="best-selling-book-title">{{ bestSellingBook.title }}</h3>
              <p class="best-selling-book-author">{{ bestSellingBook.author }}</p>
              <p class="best-selling-book-price">{{ bestSellingBook.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import book1Image from '@/assets/book1.png'
import book2Image from '@/assets/book2.png'
import book3Image from '@/assets/book3.png'
import book4Image from '@/assets/book4.png'
import book5Image from '@/assets/book5.png'
import book6Image from '@/assets/book6.png'
import book7Image from '@/assets/book7.png'
import book8Image from '@/assets/book8.png'

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
  },
  {
    id: 3,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    rating: 4.5,
    reviewsCount: 205,
    price: "$12.99",
    isbn: "9781250301697",
    isbn13: "1250301696",
    language: "English",
    format: "Hardcover, 336 Pages",
    published: "February 5th 2019",
    publisher: "Celadon Books",
    category: "Thriller",
    description: [
      "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London's most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.",
      "Alicia's refusal to talk, or give any kind of explanation, turns a domestic tragedy into something far grander, a mystery that captures the public imagination and casts Alicia into notoriety. The price of her art skyrockets, and she, the silent patient, is hidden away from the tabloids and spotlight at the Grove, a secure forensic unit in North London.",
      "Theo Faber is a criminal psychotherapist who has waited a long time for the opportunity to work with Alicia. His determination to get her to talk and unravel the mystery of why she shot her husband takes him down a twisting path into his own motivations—a search for the truth that threatens to consume him..."
    ],
    coverImage: book1Image
  },
  {
    id: 4,
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    rating: 4.8,
    reviewsCount: 187,
    price: "$15.49",
    isbn: "9780735219090",
    isbn13: "0735219095",
    language: "English",
    format: "Hardcover, 384 Pages",
    published: "August 14th 2018",
    publisher: "G.P. Putnam's Sons",
    category: "Fiction",
    description: [
      "For years, rumors of the 'Marsh Girl' have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl. But Kya is not what they say.",
      "Sensitive and intelligent, she has survived for years alone in the marsh that she calls home, finding friends in the gulls and lessons in the sand. Then the time comes when she yearns to be touched and loved. When two young men from town become intrigued by her wild beauty, Kya opens herself to a new life—until the unthinkable happens.",
      "Perfect for fans of Barbara Kingsolver and Karen Russell, Where the Crawdads Sing is at once an exquisite ode to the natural world, a heartbreaking coming-of-age story, and a surprising tale of possible murder. Owens reminds us that we are forever shaped by the children we once were, and that we are all subject to the beautiful and violent secrets that nature keeps."
    ],
    coverImage: book2Image
  },
  {
    id: 5,
    title: "Educated",
    author: "Tara Westover",
    rating: 4.6,
    reviewsCount: 143,
    price: "$13.99",
    isbn: "9780399590504",
    isbn13: "0399590501",
    language: "English",
    format: "Hardcover, 352 Pages",
    published: "February 20th 2018",
    publisher: "Random House",
    category: "Memoir",
    description: [
      "Born to survivalists in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom. Her family was so isolated from mainstream society that there was no one to ensure the children received an education, and no one to intervene when one of Tara's older brothers became violent.",
      "When another brother got himself into college, Tara decided to try a new kind of life. Her quest for knowledge transformed her, taking her over oceans and across continents, to Harvard and to Cambridge University. Only then would she wonder if she'd traveled too far, if there was still a way home.",
      "Beautiful and propulsive, Educated is a remarkable memoir of self-invention, a tale of fierce family loyalty and of the grief that comes with severing the closest of ties."
    ],
    coverImage: book3Image
  },
  {
    id: 6,
    title: "Becoming",
    author: "Michelle Obama",
    rating: 4.9,
    reviewsCount: 231,
    price: "$18.99",
    isbn: "9781524763138",
    isbn13: "1524763136",
    language: "English",
    format: "Hardcover, 448 Pages",
    published: "November 13th 2018",
    publisher: "Crown Publishing",
    category: "Autobiography",
    description: [
      "In a life filled with meaning and accomplishment, Michelle Obama has emerged as one of the most iconic and compelling women of our era. As First Lady of the United States of America—the first African American to serve in that role—she helped create the most welcoming and inclusive White House in history.",
      "With unerring honesty and lively wit, she describes her triumphs and her disappointments, both public and private, telling her full story as she has lived it—in her own words and on her own terms.",
      "Warm, wise, and revelatory, Becoming is the deeply personal reckoning of a woman of soul and substance who has steadily defied expectations—and whose story inspires us to do the same."
    ],
    coverImage: book4Image
  },
  {
    id: 7,
    title: "The Midnight Library",
    author: "Matt Haig",
    rating: 4.3,
    reviewsCount: 167,
    price: "$16.75",
    isbn: "9780525559474",
    isbn13: "0525559477",
    language: "English",
    format: "Hardcover, 304 Pages",
    published: "September 29th 2020",
    publisher: "Viking",
    category: "Fiction",
    description: [
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?",
      "Somewhere out beyond the edge of the universe there is a library that contains an infinite number of books, each one the story of another reality. One tells the story of your life as it is, along with another book for the other life you could have lived if you had made a different choice at any point in your life.",
      "While we all wonder how our lives might have been, what if you had the chance to go to the library and see for yourself? Would any of these other lives truly be better?"
    ],
    coverImage: book5Image
  },
  {
    id: 8,
    title: "Project Hail Mary",
    author: "Andy Weir",
    rating: 4.7,
    reviewsCount: 182,
    price: "$17.99",
    isbn: "9780593135204",
    isbn13: "0593135202",
    language: "English",
    format: "Hardcover, 496 Pages",
    published: "May 4th 2021",
    publisher: "Ballantine Books",
    category: "Science Fiction",
    description: [
      "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it.",
      "All he knows is that he's been asleep for a very, very long time. And he's just been awakened to find himself millions of miles from home, with nothing but two corpses for company.",
      "His crewmates dead, his memories fuzzily returning, Ryland realizes that an impossible task now confronts him. Hurtling through space on this tiny ship, it's up to him to puzzle out an impossible scientific mystery—and conquer an extinction-level threat to our species."
    ],
    coverImage: book8Image
  }
]

// Additional data for related books and bestsellers
const relatedBooks = [
  {
    id: 101,
    title: "Young Mungo",
    author: "Douglas Stuart",
    rating: 4.5,
    price: "$16.99",
    coverImage: book3Image
  },
  {
    id: 102,
    title: "A Flicker In The Dark",
    author: "Stacy Willingham",
    rating: 4.7,
    price: "$20.90",
    coverImage: book4Image
  },
  {
    id: 103,
    title: "Reminders of Him",
    author: "Colleen Hoover",
    rating: 4.3,
    price: "$19.90",
    coverImage: book5Image
  },
  {
    id: 104,
    title: "The Christmas Killer",
    author: "Alex Pine",
    rating: 3.9,
    price: "$15.99",
    coverImage: book2Image
  },
  {
    id: 105,
    title: "The Last Thing He Told Me",
    author: "Laura Dave",
    rating: 4.2,
    price: "$13.99",
    coverImage: book1Image
  },
  {
    id: 106,
    title: "The Ink Black Heart",
    author: "Robert Galbraith",
    rating: 4.6,
    price: "$22.99",
    coverImage: book8Image
  }
]

const bestSellingBooks = [
  {
    id: 201,
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    rating: 4.3,
    price: "$11.63",
    category: "Self-help",
    coverImage: book6Image
  },
  {
    id: 202,
    title: "Such a Fun Age",
    author: "Kiley Reid",
    rating: 4.8,
    price: "$14.99",
    category: "Biography",
    coverImage: book2Image
  },
  {
    id: 203,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    rating: 4.5,
    price: "$12.99",
    category: "Fiction",
    coverImage: book1Image
  },
  {
    id: 204,
    title: "Becoming",
    author: "Michelle Obama",
    rating: 4.9,
    price: "$18.99",
    category: "Autobiography",
    coverImage: book4Image
  },
  {
    id: 205,
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.7,
    price: "$14.99",
    category: "Self-help",
    coverImage: book7Image
  },
  {
    id: 206,
    title: "Project Hail Mary",
    author: "Andy Weir",
    rating: 4.7,
    price: "$17.99",
    category: "Science Fiction",
    coverImage: book8Image
  },
  {
    id: 207,
    title: "The Midnight Library",
    author: "Matt Haig",
    rating: 4.3,
    price: "$16.75",
    category: "Fiction",
    coverImage: book5Image
  },
  {
    id: 208,
    title: "Educated",
    author: "Tara Westover",
    rating: 4.6,
    price: "$13.99",
    category: "Memoir",
    coverImage: book3Image
  }
]

const route = useRoute()

const currentBookId = computed(() => Number(route.params.id) || 1)
const book = computed(() => books.find(b => b.id === currentBookId.value) || books[0])

// New reactive variables
const quantity = ref(1)
const inWishlist = ref(false)
const cartItems = ref([])
const showAddedToCart = ref(false)

// Star rating function
const getStarClass = (position, rating) => {
  if (rating >= position) {
    return 'fas fa-star filled'
  } else if (rating >= position - 0.5) {
    return 'fas fa-star-half-alt filled'
  } else {
    return 'far fa-star'
  }
}

// Quantity functions
const increaseQuantity = () => {
  if (quantity.value < 10) quantity.value++
}

const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--
}

// Cart functions
const addToCart = () => {
  // Check if item is already in cart
  const existingItem = cartItems.value.find(item => item.id === book.value.id)
  
  if (existingItem) {
    existingItem.quantity += quantity.value
  } else {
    cartItems.value.push({
      id: book.value.id,
      title: book.value.title,
      price: book.value.price,
      coverImage: book.value.coverImage,
      quantity: quantity.value
    })
  }
  
  // Save to localStorage (optional)
  localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
  
  // Show feedback
  showAddedToCart.value = true
  setTimeout(() => {
    showAddedToCart.value = false
  }, 2000)
}

// Wishlist functions
const toggleWishlist = () => {
  inWishlist.value = !inWishlist.value
  
  // Get existing wishlist from localStorage
  let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
  
  if (inWishlist.value) {
    // Add to wishlist if not already there
    if (!wishlist.some(item => item.id === book.value.id)) {
      wishlist.push({
        id: book.value.id,
        title: book.value.title,
        price: book.value.price,
        coverImage: book.value.coverImage
      })
    }
  } else {
    // Remove from wishlist
    wishlist = wishlist.filter(item => item.id !== book.value.id)
  }
  
  // Save to localStorage
  localStorage.setItem('wishlist', JSON.stringify(wishlist))
}

// Check if book is in wishlist on page load
const checkWishlistStatus = () => {
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
  inWishlist.value = wishlist.some(item => item.id === book.value.id)
}

// Load cart items from localStorage on page load
const loadCartItems = () => {
  cartItems.value = JSON.parse(localStorage.getItem('cartItems') || '[]')
}

// Run initialization functions
checkWishlistStatus()
loadCartItems()
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
  
  .wishlist-btn.active {
    background-color: #e6d430;
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
  
  /* Related Books Styles - Updated for horizontal scrolling */
  .related-books-section {
    margin-bottom: 40px;
  }
  
  .related-books-grid {
    display: flex;
    overflow-x: auto;
    gap: 20px;
    padding-bottom: 10px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
  }
  
  .related-book {
    flex: 0 0 220px; /* Fixed width, no shrinking */
    display: flex;
    flex-direction: column;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .related-book:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
  
  .related-book-image {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    margin-bottom: 10px;
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
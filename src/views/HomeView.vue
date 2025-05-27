<template>
  <div class="home-view">
    <!-- Book Grid -->
    <div class="book-grid">
      <!-- Display books from the array using v-for -->
      <div class="book-item" v-for="book in displayedBooks" :key="book.id">
        <div class="book-cover" @click="goToBookDetail(book.id)">
          <img :src="book.coverImage" :alt="book.title" class="book-cover-img" />
        </div>
        <h3 class="book-title">{{ book.title }}</h3>
        <router-link
          :to="{ name: 'author-profile', params: { authorName: formatAuthorName(book.author) } }"
          class="book-author-link"
        >
          <p class="book-author">{{ book.author }}</p>
        </router-link>
        <div class="book-rating" v-if="book.rating">
          <span
            v-for="i in 5"
            :key="i"
            :class="['star', getStarClass(i, book.rating)]"
            >★</span
          >
        </div>
        <div class="book-price-cart">
          <span class="book-price">{{ book.price }}</span>
          <button class="add-to-cart-btn" @click="addToCart(book)">
            Add to cart
          </button>
        </div>
      </div>
    </div>

    <!-- More Button - show only if there are more books to display -->
    <div class="more-container" v-if="hasMoreBooks">
      <button class="more-btn" @click="loadMore">More</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import book1Image from '@/assets/book1.png';
import book2Image from '@/assets/book2.png';
import book3Image from '@/assets/book3.png';
import book4Image from '@/assets/book4.png';
import book5Image from '@/assets/book5.png';
import book6Image from '@/assets/book6.png';
import book7Image from '@/assets/book7.png';
import book8Image from '@/assets/book8.png';

const router = useRouter();

// Define the complete list of books
const allBooks = ref([
  {
    id: 1,
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    price: '$11.63',
    rating: 4.0,
    coverImage: book6Image,
  },
  {
    id: 2,
    title: 'Atomic Habits',
    author: 'James Clear',
    price: '$14.99',
    rating: 4.7,
    coverImage: book7Image,
  },
  {
    id: 3,
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    price: '$12.99',
    rating: 4.5,
    coverImage: book1Image,
  },
  {
    id: 4,
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    price: '$15.49',
    rating: 4.8,
    coverImage: book2Image,
  },
  {
    id: 5,
    title: 'Educated',
    author: 'Tara Westover',
    price: '$13.99',
    rating: 4.6,
    coverImage: book3Image,
  },
  {
    id: 6,
    title: 'Becoming',
    author: 'Michelle Obama',
    price: '$18.99',
    rating: 4.9,
    coverImage: book4Image,
  },
  {
    id: 7,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    price: '$16.75',
    rating: 4.3,
    coverImage: book5Image,
  },
  {
    id: 8,
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    price: '$17.99',
    rating: 4.7,
    coverImage: book8Image,
  },
  {
    id: 9,
    title: 'Treasure Island',
    author: 'Robert L. Stevenson',
    price: '$9.99',
    rating: 4.4,
    coverImage: book2Image,
  },
  {
    id: 10,
    title: 'They Both Die at the End',
    author: 'Adam Silvera',
    price: '$13.99',
    rating: 4.5,
    coverImage: book5Image,
  },
  {
    id: 11,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: '$10.99',
    rating: 4.9,
    coverImage: book3Image,
  },
  {
    id: 12,
    title: '1984',
    author: 'George Orwell',
    price: '$11.49',
    rating: 4.8,
    coverImage: book8Image,
  },
]);

// Initialize to display only the first 8 books
const displayCount = ref(8);

// Computed property for books to display
const displayedBooks = computed(() => {
  return allBooks.value.slice(0, displayCount.value);
});

// Computed property to check if there are more books to display
const hasMoreBooks = computed(() => {
  return displayCount.value < allBooks.value.length;
});

// Add to cart function - Append to localStorage without navigating
const addToCart = (book) => {
  try {
    // Prepare cart item
    const cartItem = {
      id: book.id,
      title: book.title,
      author: book.author,
      price: parseFloat(book.price.replace('$', '')),
      coverImage: book.coverImage,
      quantity: 1,
    };

    // Get existing cart items from localStorage or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if the book is already in the cart
    const existingItemIndex = cartItems.findIndex(item => item.id === book.id);
    if (existingItemIndex !== -1) {
      // If item exists, increment quantity
      cartItems[existingItemIndex].quantity += 1;
    } else {
      // If item doesn't exist, append the new item
      cartItems.push(cartItem);
    }

    // Save updated cart back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Show confirmation
    alert(`"${book.title}" added to cart!`);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    alert('Failed to add item to cart. Please try again.');
  }
};

// Function to handle book click - navigate to book detail page
const goToBookDetail = (bookId) => {
  router.push({ name: 'book-description', params: { id: bookId } });
};

// Load more functionality - increase the number of displayed books
const loadMore = () => {
  displayCount.value += 4; // Load 4 more books
  if (displayCount.value > allBooks.value.length) {
    displayCount.value = allBooks.value.length; // Don't exceed the array length
  }
};

// Helper function to determine star class based on rating
const getStarClass = (position, rating) => {
  if (rating >= position) {
    return 'filled';
  } else if (rating >= position - 0.5) {
    return 'half-filled';
  } else {
    return '';
  }
};

// Helper function to format author name for the route
const formatAuthorName = (author) => {
  return author.toLowerCase().replace(/\s+/g, '-');
};
</script>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Book Grid Styles */
.book-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.book-item {
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.book-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.book-cover {
  width: 100%;
  height: 300px;
  margin-bottom: 15px;
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.book-cover-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.book-cover:hover .book-cover-img {
  transform: scale(1.05);
}

.book-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #333;
}

.book-author-link {
  text-decoration: none;
}

.book-author {
  font-size: 14px;
  color: #666;
  margin: 0 0 10px 0;
}

.book-author:hover {
  color: #333;
  text-decoration: underline;
}

.book-rating {
  margin-bottom: 10px;
}

.star {
  color: #ccc;
  font-size: 18px;
}

.star.filled {
  color: #e6d430;
}

.star.half-filled {
  position: relative;
  color: #ccc;
}

.star.half-filled::before {
  content: '★';
  position: absolute;
  color: #e6d430;
  width: 50%;
  overflow: hidden;
}

.book-price-cart {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.book-price {
  font-weight: bold;
  color: #333;
}

.add-to-cart-btn {
  background-color: #e6d430;
  color: #333;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s;
}

.add-to-cart-btn:hover {
  background-color: #d6c420;
}

/* More Button Styles */
.more-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.more-btn {
  background-color: #e6d430;
  color: #333;
  border: none;
  padding: 10px 30px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.more-btn:hover {
  background-color: #d6c420;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .book-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .book-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .book-grid {
    grid-template-columns: 1fr;
  }
}
</style>
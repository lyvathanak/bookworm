<template>
  <div class="wishlist-container">
    <h1 class="wishlist-title">My Wishlist</h1>
    <div class="wishlist-list" v-if="wishlist.length">
      <div class="wishlist-item" v-for="item in wishlist" :key="item.id">
        <span class="item-title">{{ item.title }}</span>
        <span class="item-author">{{ item.author }}</span>
        <span class="item-price">${{ item.price }}</span>
        <button class="remove-button" @click="removeItem(item.id)">Remove</button>
      </div>
    </div>
    <p v-else class="no-items">Your wishlist is empty.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'


const wishlist = ref([
  { id: 1, title: 'Treasure Island', author: 'Robert Louis Stevenson', price: 17.99 },
  { id: 2, title: 'The Midnight Library', author: 'Matt Haig', price: 16.75 }
])

const removeItem = (id) => {
  wishlist.value = wishlist.value.filter(item => item.id !== id)
}
</script>

<style scoped>
.wishlist-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.wishlist-title {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.wishlist-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.wishlist-item {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr;
  padding: 15px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  align-items: center;
}

.item-title, .item-author, .item-price {
  padding: 5px;
}

.remove-button {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-button:hover {
  background-color: #e74c3c;
}

.no-items {
  text-align: center;
  color: #666;
  font-style: italic;
}

@media (max-width: 768px) {
  .wishlist-title {
    font-size: 20px;
  }

  .wishlist-item {
    grid-template-columns: 1fr;
    text-align: left;
  }

  .item-title, .item-author, .item-price, .remove-button {
    margin-bottom: 5px;
  }
}
</style>
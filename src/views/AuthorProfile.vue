<template>
  <div class="author-profile">
    <!-- Header Navigation -->
    <div class="profile-header">
      <div class="profile-info">
        <img :src="authorImage" alt="Author Image" class="profile-image" />
        <div class="profile-details">
          <h2>{{ authorName }}</h2>
          <button class="follow-btn">+ Follow</button>
        </div>
      </div>
      <nav class="nav-links">
        <router-link to="/author/james-clear" class="nav-link">Home</router-link>
        <router-link to="/author/james-clear/books" class="nav-link active">Books</router-link>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="profile-content">
      <h1>{{ authorName }}</h1>
      <div class="bio-section">
        <img :src="authorBioImage" alt="Author Bio Image" class="bio-image" />
        <p class="bio-text">
          James Clear is a writer and speaker focused on habits, decision making, and continuous improvement. He is the author of the bestselling book <em>Atomic Habits</em>, which has sold over 20 million copies worldwide and has been translated into more than 60 languages. Clear is a regular speaker at Fortune 500 companies, and his work has been featured in Time magazine, the New York Times, the Wall Street Journal, and on CBS This Morning. His popular "3-2-1" email newsletter is sent out each week to more than 3 million subscribers.
        </p>
      </div>
      <div class="social-links">
        <a href="https://twitter.com/jamesclear" target="_blank" class="social-icon">
          <img src="https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?ga=GA1.1.1371575494.1717549226&semt=ais_hybrid&w=740" alt="Twitter" />
        </a>
        <a href="https://facebook.com/jamesclear" target="_blank" class="social-icon">
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png" alt="Facebook" />
        </a>
        <a href="mailto:jamesclear@example.com" target="_blank" class="social-icon">
          <img src="https://img.freepik.com/premium-vector/gmail-icon_1273375-1247.jpg?ga=GA1.1.1371575494.1717549226&semt=ais_hybrid&w=740" alt="Email" />
        </a>
      </div>
    </div>

    <!-- Placeholder for Books Section -->
    <div class="books-section">
      <h2>Books</h2>
      <!-- Add BookGrid component or similar here -->
      <p>Book items will be displayed here. (To be implemented)</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Author data
const authorName = ref('James Clear');
const authorImage = ref('https://www.jordanharbinger.com/wp-content/uploads/2018/10/108-james-clear-showart.jpg'); // Replace with actual image URL
const authorBioImage = ref('https://www.jordanharbinger.com/wp-content/uploads/2018/10/108-james-clear-showart.jpg'); // Replace with actual bio image URL
</script>

<style scoped>
.author-profile {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.profile-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-details h2 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.follow-btn {
  padding: 5px 15px;
  background: #e0e0e0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.follow-btn:hover {
  background: #d0d0d0;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-size: 16px;
  padding-bottom: 5px;
  border-bottom: 2px solid transparent;
}

.nav-link.active {
  border-bottom: 2px solid #333;
}

.profile-content {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
}

.profile-content h1 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
}

.bio-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.bio-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.bio-text {
  max-width: 600px;
  text-align: left;
  color: #666;
  font-size: 16px;
  line-height: 1.5;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-icon img {
  width: 24px;
  height: 24px;
}

.books-section {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.books-section h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    gap: 10px;
  }

  .nav-links {
    justify-content: center;
  }

  .bio-section {
    flex-direction: column;
    text-align: center;
  }
}
</style>
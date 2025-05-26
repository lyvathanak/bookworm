<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- Logo and Info -->
        <div class="footer-logo-section">
          <div class="footer-logo">
            <img src="../assets/blueLogo.png" alt="Bookworm Logo" class="footer-logo-image" />
            <div class="logo-text">
              <h2>BOOK <span class="highlight">WORM</span></h2>
              <p>ONLINE BOOKSTORE</p>
            </div>
          </div>
          <p class="copyright">©Copyright 2025 BookWorm. All Rights reserved</p>
        </div>
        
        <!-- Contact Us -->
        <div class="footer-section">
          <h3 class="footer-heading">Contact Us</h3>
          <ul class="footer-list">
            <li class="footer-item">
              <i class="fas fa-phone-alt icon-footer"></i>
              <span>012 333 999</span>
            </li>
            <li class="footer-item">
              <i class="fas fa-envelope icon-footer"></i>
              <span>bookworm@gmail.com</span>
            </li>
            <li class="footer-item">
              <i class="fas fa-map-marker-alt icon-footer"></i>
              <span>Russian Conf Norodom Boulevard, Phnom Penh 120404</span>
            </li>
            <li class="footer-item">
              <i class="fas fa-clock icon-footer"></i>
              <span>Mon to Sun: 8AM to 10PM</span>
            </li>
          </ul>
        </div>
        
        <!-- Navigate -->
        <div class="footer-section">
          <h3 class="footer-heading">Navigate</h3>
          <ul class="footer-list">
            <li><router-link to="/home" class="footer-link">Home</router-link></li>
            <li><router-link to="/home" class="footer-link">All Books</router-link></li>
            <li><router-link to="/profile" class="footer-link">Profile</router-link></li>
          </ul>
        </div>
        
        <!-- Subscribe -->
        <div class="footer-section">
          <h3 class="footer-heading">Subscribe</h3>
          <form @submit.prevent="handleSubscribe" class="subscribe-form">
            <input 
              type="email" 
              v-model="email" 
              placeholder="Email" 
              class="subscribe-input" 
              required
              :disabled="isLoading"
            />
            <button 
              type="submit" 
              class="subscribe-button"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Subscribing...' : 'Subscribe' }}
            </button>
          </form>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          
          <div class="social-section">
            <h3 class="footer-heading">Follow Us</h3>
            <div class="social-icons">
              <a href="#" class="social-icon">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-telegram-plane"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

// Simple email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const handleSubscribe = async () => {
  errorMessage.value = ''
  if (!email.value) {
    errorMessage.value = 'Please enter an email address.'
    return
  }
  if (!emailRegex.test(email.value)) {
    errorMessage.value = 'Please enter a valid email address.'
    return
  }
  isLoading.value = true
  try {
    console.log('Subscribing email:', email.value)
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert(`Thank you for subscribing with ${email.value}!`)
    email.value = ''
  } catch (error) {
    errorMessage.value = 'Failed to subscribe. Please try again later.'
    console.error('Subscription error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.footer {
  background-color: #0a1f44;
  color: white;
  padding: 40px 0 20px;
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 30px;
}

.footer-logo-section {
  flex: 1;
  min-width: 250px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.footer-logo {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.footer-logo-image {
  width: 80px;
  height: auto;
  margin-right: 10px;
}

.logo-text h2 {
  font-size: 24px;
  margin: 0;
  font-weight: bold;
}

.logo-text p {
  font-size: 12px;
  margin: 0;
}

.highlight {
  color: #e6d430;
}

.copyright {
  font-size: 12px;
  color: #aaa;
}

.footer-section {
  flex: 1;
  min-width: 200px;
  margin-bottom: 20px;
}

.footer-heading {
  font-size: 18px;
  margin-bottom: 15px;
  font-weight: 600;
}

.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

.icon-footer {
  width: 16px;
  color: white;
  margin-right: 10px;
  margin-top: 3px;
}

.footer-link {
  color: white;
  text-decoration: none;
  display: block;
  margin-bottom: 10px;
  transition: color 0.3s;
}

.footer-link:hover {
  color: #e6d430;
}

.subscribe-form {
  margin-bottom: 20px;
}

.subscribe-input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 14px;
}

.subscribe-button {
  width: 100%;
  padding: 10px;
  background-color: #e6d430;
  color: #0a1f44;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.subscribe-button:hover {
  background-color: #d6c420;
}

.social-section {
  margin-top: 20px;
}

.social-icons {
  display: flex;
}

.social-icon {
  margin-right: 15px;
  text-decoration: none;
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.social-icon:hover {
  background-color: #e6d430;
}

.social-icon i {
  font-size: 16px;
  color: #0a1f44;
}

.footer-links {
  text-align: right;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 12px;
}

.policy-link {
  color: #aaa;
  text-decoration: none;
  transition: color 0.3s;
}

.policy-link:hover {
  color: white;
}

.separator {
  margin: 0 10px;
  color: #aaa;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
  }
  
  .footer-section {
    margin-bottom: 30px;
  }
  
  .footer-links {
    text-align: center;
  }
}
</style>
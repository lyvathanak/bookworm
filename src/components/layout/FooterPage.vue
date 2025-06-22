<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo-section">
           <div class="footer-logo">
             <img src="@/assets/blueLogo.png" alt="Bookworm Logo" class="footer-logo-image" />
             <div class="logo-text">
               <h2>BOOK <span class="highlight">WORM</span></h2>
             </div>
           </div>
           <p class="copyright">©2025 BookWorm. All Rights reserved</p>
         </div>
        <div class="footer-section">
          <h3 class="footer-heading">Navigate</h3>
          <ul class="footer-list">
            <li><router-link to="/" class="footer-link">Home</router-link></li>
            <li><router-link to="/#about" class="footer-link">About Us</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3 class="footer-heading">Contact Us</h3>
          <ul class="footer-list">
            <li class="footer-item">bookworm@email.com</li>
            <li class="footer-item">Phnom Penh, Cambodia</li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
/* Copied styles from original 'footerpage' */
.footer { background-color: #0a1f44; color: white; padding: 40px 0 20px; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
.footer-content { display: flex; flex-wrap: wrap; justify-content: space-between; }
.footer-logo-section, .footer-section { flex: 1; min-width: 200px; margin-bottom: 20px; }
.footer-logo { display: flex; align-items: center; margin-bottom: 20px; }
.footer-logo-image { width: 60px; margin-right: 10px; }
.logo-text h2 { font-size: 24px; margin: 0; font-weight: bold; }
.highlight { color: #e6d430; }
.copyright { font-size: 12px; color: #aaa; }
.footer-heading { font-size: 18px; margin-bottom: 15px; }
.footer-list { list-style: none; padding: 0; margin: 0; }
.footer-item, .footer-link { color: white; text-decoration: none; display: block; margin-bottom: 10px; }
.footer-link:hover { color: #e6d430; }
</style>
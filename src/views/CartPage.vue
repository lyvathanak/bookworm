<template>
    <div class="cart-page">
      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <span>Home</span> / <span>Cart</span>
      </div>
  
      <!-- Main Cart Section -->
      <div class="cart-container">
        <h1>Your cart</h1>
  
        <!-- Cart Items Table -->
        <div class="cart-table">
          <div class="cart-header">
            <div class="header-item">Item</div>
            <div class="header-quantity">Quantity</div>
            <div class="header-price">Price</div>
            <div class="header-total">Total Price</div>
          </div>
  
          <div class="cart-item">
            <div class="item-details">
              <div class="item-image">
                <img src="https://via.placeholder.com/80x120/e9e9e9/969696?text=Book+Cover" alt="Book Cover">
              </div>
              <div class="item-info">
                <div class="item-isbn">ISBN 51251123151</div>
                <div class="item-title">The Subtle Art of Not Giving a F*ck</div>
                <div class="item-author">Mark Manson</div>
              </div>
            </div>
            <div class="item-quantity">
              <input type="number" min="1" value="1" class="quantity-input">
            </div>
            <div class="item-price">$11,63</div>
            <div class="item-total">$11,63</div>
          </div>
  
          <div class="divider"></div>
        </div>
  
        <!-- Shopping Summary -->
        <div class="shopping-summary">
          <h2>Shopping Summary</h2>
          <p class="summary-note">Check your shopping summary before checkout</p>
  
          <div class="summary-row">
            <span>Subtotal</span>
            <span>$11,63</span>
          </div>
          <div class="summary-row">
            <span>Tax</span>
            <span>$2,35</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span>$13,98</span>
          </div>
  
          <div class="action-buttons">
            <button class="checkout-btn">Checkout</button>
            <button class="continue-btn">Continue Shopping</button>
          </div>
        </div>
      </div>
  
     
    </div>
  </template>
  
  <script>
  export default {
    name: 'CartPage',
    // You can add component logic here
  }
  </script>
  
  <style scoped>
  .cart-page {
    font-family: Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    color: #333333;
    background-color: #ffffff;
  }
  
  .breadcrumb {
    margin-bottom: 20px;
    color: #666666;
    font-size: 14px;
  }
  
  .breadcrumb span {
    cursor: pointer;
  }
  
  .breadcrumb span:hover {
    text-decoration: underline;
    color: #4CAF50;
  }
  
  .cart-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  h1 {
    color: #333333;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  h2 {
    color: #333333;
    font-size: 20px;
    margin-bottom: 15px;
  }
  
  h3 {
    color: #ffffff;
    font-size: 18px;
    margin-bottom: 15px;
  }
  
  .cart-table {
    display: flex;
    flex-direction: column;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    background-color: #001F3F;
  }
  
  .cart-header {
    display: flex;
    background-color: #001F3F;
    padding: 15px;
    font-weight: bold;
    color: #ffffff;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .cart-header > div {
    flex: 1;
  }
  
  .header-item {
    flex: 3 !important;
  }
  
  .cart-item {
    display: flex;
    padding: 15px;
    align-items: center;
    background-color: #ffffff;
  }
  
  .item-details {
    flex: 3;
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .item-image img {
    width: 80px;
    height: 120px;
    object-fit: cover;
    background-color: #e9e9e9;
  }
  
  .item-info {
    display: flex;
    flex-direction: column;
  }
  
  .item-isbn {
    color: #666666;
    font-size: 12px;
  }
  
  .item-title {
    font-weight: bold;
    margin: 5px 0;
    color: #333333;
    font-size: 16px;
  }
  
  .item-author {
    color: #666666;
    font-size: 14px;
  }
  
  .item-quantity, .item-price, .item-total {
    flex: 1;
    text-align: center;
    color: #333333;
  }
  
  .quantity-input {
    width: 50px;
    padding: 8px;
    text-align: center;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
  }
  
  .divider {
    height: 1px;
    background-color: #e0e0e0;
    margin: 0 15px;
  }
  
  .shopping-summary {
    align-self: flex-end;
    width: 300px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    background-color: #ffffff;
  }
  
  .summary-note {
    color: #666666;
    font-style: italic;
    margin-bottom: 20px;
    font-size: 14px;
  }
  
  .summary-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #e0e0e0;
    color: #333333;
  }
  
  .summary-row.total {
    font-weight: bold;
    font-size: 18px;
    border-bottom: none;
    color: #333333;
  }
  
  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
  }
  
  .checkout-btn, .continue-btn {
    padding: 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .checkout-btn {
    background-color: #FFD700;
    color:#001F3F;
  }
  
  .checkout-btn:hover {
    background-color: #e9e9e9;
  }
  
  .continue-btn {
    background-color: #f5f5f5;
    color: #333333;
    border: 1px solid #e0e0e0;
  }
  
  .continue-btn:hover {
    background-color: #e9e9e9;
  }
   
  .subscribe-form {
    display: flex;
    margin-bottom: 15px;
  }
  
  .subscribe-form input {
    flex: 1;
    padding: 8px;
    border: 1px solid #e0e0e0;
    border-radius: 4px 0 0 4px;
    font-size: 14px;
  }
  
  .subscribe-form button {
    padding: 8px 15px;
    background-color:#FFD700;
    color:  #001F3F;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    font-size: 14px;
  }
  
  .social-links {
    margin-top: 10px;
    color: #ffffff;
  }
  
  .social-icons {
    display: flex;
    gap: 10px;
    margin-top: 5px;
  }
  
  .social-icons img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #e9e9e9;
  }
 
  
  @media (max-width: 768px) {
    .cart-item {
      flex-wrap: wrap;
    }
    
    .item-details {
      flex-basis: 100%;
      margin-bottom: 15px;
    }
    
    .shopping-summary {
      width: 100%;
    }
    
     
  }
  </style>
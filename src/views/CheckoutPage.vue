<template>
    <div class="checkout-container">
      <h1>Check out</h1>
      
      <div class="account-section">
        <p>Do you have an account?</p>
        <div class="radio-group">
          <label>
            <input type="radio" name="account" value="yes" v-model="hasAccount"> Yes
          </label>
          <label>
            <input type="radio" name="account" value="no" v-model="hasAccount"> No
          </label>
        </div>
      </div>
  
      <div class="login-form" v-if="hasAccount === 'yes'">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password">
        </div>
        <div class="form-options">
          <label>
            <input type="checkbox" v-model="rememberMe"> Remember me
          </label>
          <a href="#" class="forgot-password">Forgot password?</a>
        </div>
        <button class="sign-in-btn">Sign in</button>
      </div>
  
      <div class="delivery-section">
        <h2>Choose your delivery option</h2>
        <div class="delivery-options">
          <label>
            <input type="radio" name="delivery" value="address" v-model="deliveryOption"> Delivery address
          </label>
          <label>
            <input type="radio" name="delivery" value="pickup" v-model="deliveryOption"> Shell-pick up
          </label>
        </div>
  
        <div class="address-form" v-if="deliveryOption === 'address'">
          <div class="form-group">
            <label>*Location</label>
            <select v-model="selectedLocation">
              <option disabled value="">Select address</option>
              <option value="phnom_penh">Phnom Penh, Cambodia</option>
              <!-- Add more locations as needed -->
            </select>
          </div>
          <div class="form-group">
            <label>*Detail</label>
            <textarea v-model="addressDetail" placeholder="Street 123, Infront of ABC building..."></textarea>
          </div>
        </div>
      </div>
  
      <div class="payment-section">
        <h2>Choose your Payment method</h2>
        <div class="payment-options">
          <label>
            <input type="radio" name="payment" value="aba" v-model="paymentMethod"> ABA
          </label>
          <label>
            <input type="radio" name="payment" value="acleda" v-model="paymentMethod"> ACLEDA
          </label>
          <label>
            <input type="radio" name="payment" value="paypal" v-model="paymentMethod"> PayPal
          </label>
          <label>
            <input type="radio" name="payment" value="cod" v-model="paymentMethod"> Cash on Deliver
          </label>
        </div>
      </div>
  
      <div class="summary-section">
        <h2>Check out summary</h2>
        <div class="summary-details">
          <div class="summary-row">
            <span>Subtotal</span>
            <span>$11.63</span>
          </div>
          <div class="summary-row">
            <span>Tax</span>
            <span>$2.35</span>
          </div>
          <div class="summary-row">
            <span>Delivery</span>
            <span>$2.5</span>
          </div>
          <div class="summary-row">
            <span>Payment:</span>
            <span>{{ paymentMethodDisplay }}</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span>$15.98</span>
          </div>
        </div>
        <p class="summary-note">Check your check out summary before process to payment</p>
        <button class="checkout-btn">Process to checkout</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        hasAccount: 'no',
        email: '',
        password: '',
        rememberMe: false,
        deliveryOption: 'address',
        selectedLocation: '',
        addressDetail: '',
        paymentMethod: 'cod'
      }
    },
    computed: {
      paymentMethodDisplay() {
        const methods = {
          'aba': 'ABA',
          'acleda': 'ACLEDA',
          'paypal': 'PayPal',
          'cod': 'Cash on Deliver'
        }
        return methods[this.paymentMethod]
      }
    }
  }
  </script>
  
  <style scoped>
  .checkout-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  h1, h2 {
    color: #333;
    margin-bottom: 20px;
  }
  
  .account-section, .delivery-section, .payment-section, .summary-section {
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 5px;
  }
  
  .radio-group, .payment-options {
    display: flex;
    gap: 20px;
    margin-bottom: 15px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form-group input[type="email"],
  .form-group input[type="password"],
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .form-group textarea {
    height: 80px;
  }
  
  .form-options {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  
  .forgot-password {
    color: #0066cc;
    text-decoration: none;
  }
  
  .sign-in-btn, .checkout-btn {
    width: 100%;
    padding: 12px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .sign-in-btn:hover, .checkout-btn:hover {
    background-color: #45a049;
  }
  
  .summary-details {
    margin-bottom: 15px;
  }
  
  .summary-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
  }
  
  .summary-row.total {
    font-weight: bold;
    font-size: 18px;
    border-bottom: none;
  }
  
  .summary-note {
    color: #666;
    font-style: italic;
    margin-bottom: 15px;
  }

  .summary-section{
    align-self: flex-end;
    width: 300px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    background-color: #ffffff;
  }
  
  input[type="radio"], input[type="checkbox"] {
    margin-right: 8px;
  }
  </style>
<template>
  <div class="address-container">
    <h1 class="address-title">My Address</h1>
    <form @submit.prevent="saveAddress" class="address-form">
      <div class="form-group">
        <label class="form-label">Recipient</label>
        <input v-model="recipient" type="text" class="form-input" placeholder="Enter recipient name" required />
      </div>
      <div class="form-group">
        <label class="form-label">Phone Number</label>
        <input v-model="phone" type="tel" class="form-input" placeholder="Enter phone number" required />
      </div>
      <div class="form-group">
        <label class="form-label">Location</label>
        <input v-model="location" type="text" class="form-input" placeholder="Enter location" required />
      </div>
      <div class="form-group">
        <label class="form-label">Detail</label>
        <textarea v-model="detail" class="form-textarea" placeholder="Enter address details" required></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">
          <input type="checkbox" v-model="isDefault" /> Set as default
        </label>
      </div>
      <button type="submit" class="save-button" :disabled="isLoading">
        {{ isLoading ? 'Saving...' : 'Save Address' }}
      </button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>

import { ref } from 'vue'


const recipient = ref(localStorage.getItem('addressRecipient') || 'Tooru Kirishima')
const phone = ref(localStorage.getItem('addressPhone') || '012345678')
const location = ref(localStorage.getItem('addressLocation') || 'Phnom Penh, Cambodia')
const detail = ref(localStorage.getItem('addressDetail') || 'Street 123, infront of ABC building')
const isDefault = ref(localStorage.getItem('addressIsDefault') === 'true')
const isLoading = ref(false)
const errorMessage = ref('')

const saveAddress = async () => {
  errorMessage.value = ''
  isLoading.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    localStorage.setItem('addressRecipient', recipient.value)
    localStorage.setItem('addressPhone', phone.value)
    localStorage.setItem('addressLocation', location.value)
    localStorage.setItem('addressDetail', detail.value)
    localStorage.setItem('addressIsDefault', isDefault.value)
    alert('Address saved successfully!')
  } catch (error) {
    errorMessage.value = 'Failed to save address. Please try again.'
    console.error('Save error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.address-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.address-title {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.address-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-weight: 600;
  color: #555;
  margin-bottom: 5px;
}

.form-input, .form-textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-textarea {
  height: 100px;
  resize: vertical;
}

.save-button {
  background-color: #e6d430;
  color: #0a1f44;
  border: none;
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-button:hover {
  background-color: #d6c420;
}

.save-button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.error-message {
  color: #ff6b6b;
  font-size: 12px;
  margin-top: 5px;
}

@media (max-width: 768px) {
  .address-title {
    font-size: 20px;
  }

  .address-form {
    padding: 15px;
  }
}
</style>
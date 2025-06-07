<template>
  <div class="my-address">
    <h2>Shipping Address</h2>
    <form @submit.prevent="updateAddress" class="address-form">
      <div class="form-group">
        <label><span class="required">*</span>Recipient</label>
        <input 
          type="text" 
          v-model="addressData.recipient" 
          class="form-input"
          required
        />
      </div>
      
      <div class="form-group">
        <label><span class="required">*</span>Phone Number</label>
        <input 
          type="tel" 
          v-model="addressData.phoneNumber" 
          class="form-input"
          required
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label><span class="required">*</span>Location</label>
          <div class="location-input">
            <button type="button" class="location-button">
              <i class="fas fa-map-marker-alt"></i>
              Select address
            </button>
          </div>
        </div>
        <div class="form-group">
          <input 
            type="text" 
            v-model="addressData.city" 
            placeholder="City, Country"
            class="form-input"
          />
        </div>
      </div>

      <div class="form-group">
        <label><span class="required">*</span>Detail</label>
        <textarea 
          v-model="addressData.detail" 
          placeholder="Street address, building, apartment..."
          class="form-textarea"
          rows="3"
          required
        ></textarea>
      </div>

      <div class="form-actions">
        <button type="button" class="cancel-button">Cancel</button>
        <button type="submit" class="default-button">Set as default</button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'MyAddress',
  props: {
    user: Object
  },
  emits: ['update-address'],
  setup(props, { emit }) {
    const addressData = reactive({
      recipient: '',
      phoneNumber: '',
      city: '',
      detail: ''
    })

    const updateAddress = () => {
      emit('update-address', addressData)
      alert('Address updated successfully!')
    }

    return {
      addressData,
      updateAddress
    }
  }
}
</script>

<style scoped>
h2 {
  font-size: 24px;
  color: #666;
  margin-bottom: 25px;
}

.address-form {
  max-width: 800px;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.required {
  color: #dc3545;
  margin-right: 3px;
}

.form-input, .form-textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: #0a1f44;
}

.location-input {
  display: flex;
  gap: 10px;
}

.location-button {
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
}

.default-button {
  background-color: #0a1f44;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.default-button:hover {
  background-color: #083a6b;
}

.cancel-button {
  background-color: #dc3545;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 15px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
}
</style>
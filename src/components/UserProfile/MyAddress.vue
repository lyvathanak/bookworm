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
        <div class="form-group flex-1">
          <label><span class="required">*</span>Select Location</label>
          <select
            v-model="selectedDropdownLocation"
            class="form-input"
            @change="handleLocationSelection"
          >
            <option value="" disabled>Select an address</option>
            <option v-for="location in predefinedLocations" :key="location" :value="location">
              {{ location }}
            </option>
          </select>
        </div>
        <div class="form-group flex-1">
          <label>&nbsp;</label> <!-- Placeholder for alignment -->
          <div class="location-display-wrapper">
            <input
              type="text"
              v-model="addressData.city"
              placeholder="City, Country"
              class="form-input"
              readonly
              required
            />
            <!-- Font Awesome icon for location. Assumes Font Awesome is available in the environment. -->
            <i class="fas fa-map-marker-alt location-icon"></i>
          </div>
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
import { reactive, ref } from 'vue';

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
      city: '', // This will hold the selected city/country for display and submission
      detail: ''
    });

    // A separate ref for the dropdown's v-model to control its display independently
    const selectedDropdownLocation = ref('');

    // Predefined list of locations for the dropdown
    const predefinedLocations = ref([
      'Phnom Penh, Cambodia',
      'Siem Reap, Cambodia',
      'Battambang, Cambodia',
      'Sihanoukville, Cambodia',
      'Kampot, Cambodia',
      'Takeo, Cambodia'
    ]);

    // Function to handle location selection from the dropdown
    const handleLocationSelection = () => {
      // Update the actual city data with the selected value
      addressData.city = selectedDropdownLocation.value;
      // Reset the dropdown's v-model to make it visually revert to the placeholder
      selectedDropdownLocation.value = '';
    };

    const updateAddress = () => {
      emit('update-address', addressData);
      console.log('Address updated successfully:', addressData);
    };

    return {
      addressData,
      selectedDropdownLocation, // Expose the new ref
      predefinedLocations,
      handleLocationSelection, // Expose the new handler
      updateAddress
    };
  }
};
</script>

<style scoped>
/* Base styling for the address form */
h2 {
  font-size: 24px;
  color: #666;
  margin-bottom: 25px;
}

.address-form {
  max-width: 800px;
}

/* Flexbox for form rows to align elements horizontally */
.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

/* Flex item for each form group within a row, allowing it to grow */
.form-group {
  flex: 1; /* Ensures equal width distribution */
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

/* Styling for all input fields and textarea */
.form-input, .form-textarea, select.form-input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
  box-sizing: border-box;
  -webkit-appearance: none; /* Remove default browser styling for select */
  -moz-appearance: none; /* Remove default browser styling for select */
  appearance: none; /* Remove default browser styling for select */
  background-color: #fff; /* Ensure white background for select */
  /* Custom arrow for select (SVG encoded) */
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20256%20256%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M205.66%2099.34l-72%2072a8%208%200%2001-11.32%200l-72-72a8%208%200%200111.32-11.32L128%20161.32l66.34-66.32a8%208%200%200111.32%2011.32z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  cursor: pointer;
}

.form-input[readonly] {
    background-color: #f9f9f9; /* Slightly different background for read-only */
    cursor: default; /* Indicate it's not editable */
}


.form-input:focus, .form-textarea:focus, select.form-input:focus {
  outline: none;
  border-color: #0a1f44;
}

/* Wrapper for the read-only input and icon */
.location-display-wrapper {
  position: relative;
  width: 100%;
  display: flex; /* Use flex to align input and icon if needed, though position absolute works too */
  align-items: center;
}

.location-display-wrapper .form-input {
  padding-right: 40px; /* Make space for the icon */
}

.location-icon {
  position: absolute;
  right: 15px; /* Adjust based on padding */
  color: #666;
  font-size: 18px; /* Adjust icon size */
}


/* Action buttons styling */
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
  transition: background-color 0.3s;
}

.cancel-button:hover {
  background-color: #c82333;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;
}

/* Responsive adjustments for smaller screens */
@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  .location-icon {
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>

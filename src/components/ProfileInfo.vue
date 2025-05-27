<template>
  <div class="profile-info">
    <h1 class="profile-title">My Profile</h1>
    <div class="profile-details">
      <div class="detail-item">
        <label class="detail-label">First Name</label>
        <span class="detail-value">{{ userFirstName }}</span>
      </div>
      <div class="detail-item">
        <label class="detail-label">Last Name</label>
        <span class="detail-value">{{ userLastName }}</span>
      </div>
      <div class="detail-item">
        <label class="detail-label">Email</label>
        <span class="detail-value">{{ userEmail }}</span>
      </div>
      <div class="detail-item">
        <label class="detail-label">Contact</label>
        <span class="detail-value">{{ userContact }}</span>
      </div>
      <div class="detail-item">
        <label class="detail-label">Birthdate</label>
        <span class="detail-value">{{ userBirthdate }}</span>
      </div>
      <div class="detail-item">
        <label class="detail-label">Gender</label>
        <span class="detail-value">{{ userGender }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return '18 November 1998';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const userFirstName = computed(() => localStorage.getItem('userFirstName') || 'Tooru');
const userLastName = computed(() => localStorage.getItem('userLastName') || 'Kirishima');
const userEmail = computed(() => localStorage.getItem('userEmail') || 'kirishimababy@gmail.com');
const userContact = computed(() => localStorage.getItem('userContact') || '012345678');
const userBirthdate = computed(() => formatDate(localStorage.getItem('userBirthdate')));
const userGender = computed(() => localStorage.getItem('userGender') || 'Male');
</script>

<style scoped>
.profile-info {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.profile-title {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.detail-label {
  font-weight: 600;
  color: #555;
  flex: 1;
}

.detail-value {
  color: #333;
  flex: 2;
  text-align: right;
}

@media (max-width: 768px) {
  .profile-info {
    padding: 15px;
  }

  .profile-title {
    font-size: 20px;
  }

  .detail-item {
    flex-direction: column;
    text-align: left;
  }

  .detail-value {
    margin-top: 5px;
    text-align: left;
  }
}
</style>
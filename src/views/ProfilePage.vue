<template>
  <div class="profile-container">
    <Sidebar />
    <div class="profile-content">
      <h1 class="welcome-message">Welcome Back, Tooru!</h1>
      <div class="profile-header">
        <h2>My Profile</h2>
        <i class="fas fa-edit edit-icon"></i>
      </div>
      <div class="profile-info">
        <div class="form-row">
          <div class="form-group">
            <label>First name</label>
            <input type="text" value="Tooru" readonly class="form-input" />
          </div>
          <div class="form-group">
            <label>Last name</label>
            <input type="text" value="Kirishima" readonly class="form-input" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Email</label>
            <input type="email" value="kirishimababy@gmail.com" readonly class="form-input" />
          </div>
          <div class="form-group">
            <label>Contact</label>
            <input type="text" value="012345678" readonly class="form-input" />
          </div>
        </div>
        <div class="form-group">
          <label>Birthdate</label>
          <div class="birthdate-row">
            <input type="text" value="18" readonly class="birthdate-input" />
            <input type="text" value="November" readonly class="birthdate-input" />
            <input type="text" value="1998" readonly class="birthdate-input" />
          </div>
        </div>
        <div class="form-group">
          <label>Gender</label>
          <div class="gender-row">
            <label class="gender-option">
              <input type="radio" value="Male" checked disabled />
              Male
            </label>
            <label class="gender-option">
              <input type="radio" value="Female" disabled />
              Female
            </label>
            <label class="gender-option">
              <input type="radio" value="Other" disabled />
              Other
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue';
</script>

<style scoped>
.profile-container {
  display: flex;
  min-height: calc(100vh - 120px); /* Adjust for NavBar and Footer height */
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.profile-content {
  margin-left: 270px; /* Sidebar width (250px) + padding */
  padding: 20px;
  flex-grow: 1;
}

.welcome-message {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.profile-header h2 {
  font-size: 20px;
  color: #333;
  margin: 0;
}

.edit-icon {
  margin-left: 10px;
  color: #666;
  cursor: pointer;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  font-size: 16px;
}

.birthdate-row {
  display: flex;
  gap: 10px;
}

.birthdate-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  font-size: 16px;
  text-align: center;
}

.gender-row {
  display: flex;
  gap: 20px;
}

.gender-option {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #333;
}

.gender-option input {
  margin-right: 5px;
}

.gender-option input:checked {
  accent-color: #0a1f44; /* Match the theme color */
}
</style>
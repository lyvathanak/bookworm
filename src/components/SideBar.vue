<template>
  <div class="sidebar">
    <div class="user-info">
      <img src="@/assets/user-avatar.png" alt="User Avatar" class="user-avatar" />
      <div class="user-details">
        <h3 class="user-name">Tooru Kirishima</h3>
        <p class="user-role">Baby sitter</p>
      </div>
    </div>

    <ul class="nav-list">
      <li class="nav-item">
        <router-link to="/profile" class="nav-link" active-class="nav-link-active">
          <i class="fas fa-user icon"></i> My Profile
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/orders" class="nav-link" active-class="nav-link-active">
          <i class="fas fa-shopping-bag icon"></i> My Orders
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/wishlist" class="nav-link" active-class="nav-link-active">
          <i class="fas fa-heart icon"></i> My Wishlist
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/address" class="nav-link" active-class="nav-link-active">
          <i class="fas fa-map-marker-alt icon"></i> My Address
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/change-password" class="nav-link" active-class="nav-link-active">
          <i class="fas fa-key icon"></i> Change Password
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/auth/signin" class="nav-link">
          <i class="fas fa-sign-out-alt icon"></i> Log out
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #0a1f44; /* Dark blue background to match the theme */
  color: white;
  padding: 20px;
  position: fixed;
  top: 0; /* Changed to 0 to align with the top of the viewport */
  bottom: 0;
  left: 0; /* Ensure it sticks to the left */
  overflow-y: auto;
  padding-top: 40px; /* Add padding to the top for visual spacing */
  border-top-right-radius: 40px; /* Rounded top-right corner */
  border-bottom-right-radius: 40px; /* Rounded bottom-right corner */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

/* User Info Section */
.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-left: 10px; /* Add some padding to align with nav items */
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover; /* Ensure the image covers the area nicely */
  border: 2px solid white; /* Small border around avatar */
}

.user-details {
  flex: 1;
}

.user-name {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: white;
}

.user-role {
  margin: 5px 0 0;
  font-size: 14px;
  color: #a0a0a0; /* Slightly lighter gray for role */
}

/* Navigation Links */
.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 8px; /* Reduced margin for tighter spacing */
}

.nav-link {
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  font-size: 16px;
  padding: 12px 20px; /* Increased padding for better click area */
  border-radius: 8px; /* Slightly rounded corners for links */
  transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover {
  background-color: #1e3a6c; /* Darker blue on hover */
  color: #e6d430; /* Highlight color on hover */
}

.nav-link-active {
  background-color: #1e3a6c; /* Active link background */
  color: #e6d430; /* Active link text color */
  font-weight: 600; /* Bold for active link */
}

.icon {
  margin-right: 12px; /* Adjusted margin for icon */
  font-size: 19px; /* Slightly larger icons */
}
</style>
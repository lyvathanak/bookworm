<template>
  <div class="singUp-page">
    <div class="breadcrumb">
      <a href="/" class="breadcrumb-link home">Home</a>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-current">Sign Up</span>
    </div>
  </div>

  <div class="auth-container">

    <div class="logo-section">
      <img src="../assets/bookworm.png" alt="Bookworm Logo" class="logo" />
      <!-- <h1 class="title">
        BOOK <span class="highlight">WORM</span><br />
        <small>ONLINE BOOKSTORE</small>
      </h1> -->
    </div>

    <form @submit.prevent="handleSignup" class="auth-form">
      <input type="text" v-model="firstName" placeholder="First Name" required />
      <input type="text" v-model="lastName" placeholder="Last Name" required />
      <input type="date" v-model="dob" placeholder="Date of Birth" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />

      <button type="submit" class="btn-primary">Sign Up</button>
    </form>

    <div class="divider"><span>OR</span></div>

    <div class="social-icons">
      <img src="../assets/google.png" alt="Google" @click="socialLogin('google')" />
      <img src="../assets/facebook.png" alt="Facebook" @click="socialLogin('facebook')" />
      <img src="../assets/apple-logo.png" alt="Apple" @click="socialLogin('apple')" />
    </div>

    <p class="switch-auth">
      Already have an account? <router-link to="/auth/signin">Sign in</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      dob: '',
      email: '',
      password: '',
    };
  },
  methods: {
    handleSignup() {
      // Add your signup API call here
      console.log('Signup data:', this.firstName, this.lastName, this.dob, this.email, this.password);
      alert('Sign-up successful! Please sign in with your new account.');
      // After signup success, redirect to signin
      this.$router.push('/auth/signin');
    },
    socialLogin(provider) {
      alert(`Social login with ${provider} clicked`);
      // Implement OAuth social login if needed
    },
  },
};
</script>

<style scoped>
.signUp-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.breadcrumb {
  margin-bottom: 20px;
  font-size: 14px;
}

.breadcrumb-link {
  text-decoration: none;
}

.home {
  color: #e6d430;
}

.breadcrumb-separator {
  margin: 0 5px;
  color: #666;
}

.breadcrumb-current {
  color: #666;
}
.auth-container {
  max-width: 512px;
  margin: auto;
  height: 100vh; /* full viewport height */
  display: flex;
  flex-direction: column;
  justify-content: center; /* vertical center */
  align-items: center;
  font-family: 'Poppins', sans-serif;
  padding: 0 1rem;
  text-align: center;
}

.back-button {
  align-self: flex-start; /* put back arrow on left */
  font-size: 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
  margin-bottom: rem;
  user-select: none;
  padding-left: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.logo-section {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 201px;
  height: auto;
  margin-bottom: 0.5rem;
}

.title {
  font-weight: 700;
  font-size: 1.5rem;
  color: #0a1e3f; /* dark blue */
  line-height: 1.2;
}

.highlight {
  color: #f8b500; /* yellow */
}

.title small {
  font-weight: 400;
  font-size: 0.8rem;
  color: #0a1e3f;
  margin-top: 0.1rem;
  display: block;
}

.auth-form {
  width: 100%;
}

.auth-form input {
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

.auth-form input[type="date"] {
  /* Make date input placeholder style consistent */
  color: #999;
}

.auth-form input[type="date"]:focus {
  color: #000;
}

.btn-primary {
  background-color: #0a1e3f;
  color: white;
  font-weight: 700;
  padding: 15px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
}

.options-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #555;
  align-items: center;
}

.options-row label {
  display: flex;
  align-items: center;
  gap: 6px;
}

.forgot-password {
  color: #0a1e3f;
  text-decoration: none;
  font-weight: 500;
}

.divider {
  display: flex;
  align-items: center;
  margin: 2rem 0 1rem;
  font-weight: 600;
  color: #444;
  width: 100%;
}

.divider span {
  padding: 0 1rem;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #ccc;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.social-icons img {
  width: 36px;
  height: 36px;
  cursor: pointer;
}

.switch-auth {
  margin-top: 1.5rem;
  font-style: italic;
  color: #555;
}

.switch-auth a {
  font-weight: 700;
  color: #0a1e3f;
  text-decoration: none;
}

</style>

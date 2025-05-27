<template>
  <div class="singIn-page">
    <div class="breadcrumb">
      <a href="/" class="breadcrumb-link home">Home</a>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-current">Sign In</span>
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

    <form @submit.prevent="handleSignin" class="auth-form">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />

      <div class="options-row">
        <label>
          <input type="checkbox" v-model="rememberMe" />Remember me
        </label>
        <router-link to="/forgot-password" class="forgot-password">Forgot password?</router-link>
      </div>

      <button type="submit" class="btn-primary">Sign in</button>
    </form>

    <div class="divider"><span>OR</span></div>

    <div class="social-icons">
      <img src="../assets/google.png" alt="Google" @click="socialLogin('google')" />
      <img src="../assets/facebook.png" alt="Facebook" @click="socialLogin('facebook')" />
      <img src="../assets/apple-logo.png" alt="Apple" @click="socialLogin('apple')" />
    </div>

    <p class="switch-auth">
      Don’t have an Account? <router-link to="/auth/signup">Sign Up</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
    };
  },
  methods: {
    handleSignin() {
      // Add your signin API call here
      console.log('Signin data:', this.email, this.password, this.rememberMe);
      alert('Sign-in successful!');
      // On successful login, redirect to home page
      this.$router.push('/home');
    },
    socialLogin(provider) {
      alert(`Social login with ${provider} clicked`);
      // Implement OAuth social login if needed
    },
  },
};
</script>

<style scoped>
.signIn-page {
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
  align-self: flex-start; 
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
  padding-top: 0;
  margin-top: 0;
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
  font-size: 0.8rem;
  color: #555;
  align-items: center;
  

}

.options-row label {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}
.options-row input[type="checkbox"]{
    margin: 0;
    vertical-align: middle;
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

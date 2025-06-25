<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="w-full max-w-md p-10 bg-white rounded-2xl shadow-xl">
            <div class="text-center mb-8">
                <img src="@/assets/logo.png" alt="Book Worm Logo" class="h-20 w-auto mx-auto mb-4">
                <h2 class="text-3xl font-bold text-navy">Admin Portal</h2>
                <p class="mt-2 text-sm text-gray-600">Please sign in to continue</p>
            </div>
            <form class="space-y-6" @submit.prevent="handleLogin">
                <div class="relative">
                    <input id="email" v-model="email" type="email" required class="peer w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Email">
                    <label for="email" class="absolute left-4 -top-3.5 text-gray-500 text-sm bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-gold peer-focus:text-sm">Email Address</label>
                </div>
                <div class="relative">
                    <input id="password" v-model="password" type="password" required class="peer w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Password">
                    <label for="password" class="absolute left-4 -top-3.5 text-gray-500 text-sm bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-gold peer-focus:text-sm">Password</label>
                </div>
                <div v-if="authStore.error" class="text-red-600 text-sm text-center p-2 bg-red-100 rounded-lg">
                    {{ authStore.error }}
                </div>
                <div>
                    <button type="submit" class="w-full btn-primary py-3" :disabled="loading">
                        {{ loading ? 'Signing In...' : 'Sign In' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

const email = ref('admin@bookworm.com'); 
const password = ref('password123'); 
const loading = ref(false);

const authStore = useAuthStore(); 
const router = useRouter();

const handleLogin = async () => {
    loading.value = true;
    // This call now works perfectly with the simplified auth store.
    const success = await authStore.login({ email: email.value, password: password.value });
    if (success) { 
        router.push('/'); 
    }
    loading.value = false;
};
</script>
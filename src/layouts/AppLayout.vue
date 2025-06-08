<template>
    <div class="flex h-screen bg-gray-100">
        <aside class="w-64 flex-shrink-0 bg-navy text-gray-200 flex flex-col p-4">
            <div class="flex items-center justify-center mb-10 pt-4"><img src="@/assets/logo.png" alt="Book Worm Logo" class="h-16 w-auto"></div>
            <nav class="flex-grow">
                <router-link v-for="item in navItems" :key="item.name" :to="item.path" class="nav-link">
                    <component :is="item.icon" class="w-5 h-5 mr-4"/><span>{{ item.name }}</span>
                </router-link>
            </nav>
            <div class="mt-auto">
                <div class="p-4 rounded-lg flex items-center">
                    <img src="https://placehold.co/40x40/FFD700/001F3F?text=A" alt="Admin" class="w-10 h-10 rounded-full mr-3 border-2 border-gold">
                    <div>
                        <p class="font-semibold text-white">Admin User</p>
                        <button @click="handleLogout" class="flex items-center text-sm text-gray-400 hover:text-gold"><LogOut class="w-4 h-4 mr-1"/> Log out</button>
                    </div>
                </div>
            </div>
        </aside>
        <main class="flex-1 flex flex-col p-6 overflow-y-auto"><router-view/></main>
    </div>
</template>
<script setup>
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import { LayoutDashboard, BookCopy, Users, Star, Headset, LogOut, ShoppingCart, PenSquare } from 'lucide-vue-next';
const authStore = useAuthStore();
const router = useRouter();
const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard }, { name: 'Product Manager', path: '/products', icon: BookCopy },
    { name: 'Order Manager', path: '/orders', icon: ShoppingCart }, { name: 'Author Manager', path: '/authors', icon: PenSquare },
    { name: 'Account Manager', path: '/accounts', icon: Users }, { name: 'Ratings Manager', path: '/ratings', icon: Star },
    { name: 'Customer Service', path: '/support', icon: Headset },
];
const handleLogout = () => { authStore.logout(); router.push('/login'); }
</script>
<style scoped>
.nav-link { @apply flex items-center py-3 px-4 my-2 rounded-lg text-gray-300 font-medium transition-colors duration-200 hover:bg-gray-500/20 hover:text-white; }
.router-link-exact-active { @apply bg-gold text-navy shadow-lg; }
.router-link-exact-active .lucide { color: #001F3F; }
</style>

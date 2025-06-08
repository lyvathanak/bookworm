<template><div><header class="mb-8"><h1 class="text-4xl font-bold text-navy">Account Management</h1></header><div v-if="loading" class="text-center p-10 card">Loading...</div><div v-if="error" class="card text-red-500 p-10 text-center">{{ error }}</div><div v-if="!loading && !error" class="card"><p v-if="!users.length" class="text-center text-gray-500 py-10">No users found.</p><table v-else class="w-full text-left"><thead><tr class="border-b-2"><th>Name</th><th>Email</th><th>Role</th><th>Orders</th></tr></thead><tbody><tr v-for="user in users" :key="user.uid" class="border-b"><td class="py-3">{{user.fname}} {{user.lname}}</td><td class="py-3">{{user.email}}</td><td class="py-3"><span class="px-2 py-1 text-xs rounded-full" :class="user.role === 'admin' ? 'bg-gold text-navy' : 'bg-gray-200'">{{user.role}}</span></td><td>{{user.orders.length}}</td></tr></tbody></table></div></div></template>
<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';
const users = ref([]); const loading = ref(true); const error = ref(null);
onMounted(async () => {
    try { users.value = (await api.getUsers()).data; }
    catch (e) { error.value = 'Failed to load users.'; console.error(e); }
    finally { loading.value = false; }
});
</script>
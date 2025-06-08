<template><div><header class="mb-8"><h1 class="text-4xl font-bold text-navy">Order Management</h1></header><div v-if="loading" class="text-center p-10 card">Loading...</div><div v-if="error" class="card text-red-500 p-10 text-center">{{ error }}</div><div v-if="!loading && !error" class="card"><p v-if="!orders.length" class="text-center text-gray-500 py-10">No orders found.</p><table v-else class="w-full text-left"><thead><tr class="border-b-2"><th>ID</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th></tr></thead><tbody><tr v-for="order in orders" :key="order.order_id" class="border-b"><td class="py-3 font-mono">#{{order.order_id}}</td><td>{{order.user.fname}} {{order.user.lname}}</td><td>{{new Date(order.created_at).toLocaleDateString()}}</td><td>${{order.total.toFixed(2)}}</td><td><span class="px-2 py-1 text-xs rounded-full" :class="statusColor(order.status)">{{order.status}}</span></td></tr></tbody></table></div></div></template>
<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';
const orders = ref([]); const loading = ref(true); const error = ref(null);
onMounted(async () => {
    try { orders.value = (await api.getOrders()).data; }
    catch (e) { error.value = 'Failed to load orders.'; console.error(e); }
    finally { loading.value = false; }
});
const statusColor = (status) => { if (status === 'Delivered') return 'bg-green-100 text-green-800'; if (status === 'Shipped') return 'bg-blue-100 text-blue-800'; if (status === 'Canceled') return 'bg-red-100 text-red-800'; return 'bg-yellow-100 text-yellow-800'; };
</script>
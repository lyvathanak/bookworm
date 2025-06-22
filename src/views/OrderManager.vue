<template>
    <div>
        <header class="mb-8">
            <h1 class="text-4xl font-bold text-navy">Order Management</h1>
            <p class="text-gray-500">View and update the status of customer orders.</p>
        </header>

        <div v-if="loading" class="text-center p-10 card">Loading orders...</div>
        <div v-if="error" class="card text-red-500 p-10 text-center">{{ error }}</div>

        <div v-if="!loading && !error" class="card">
            <p v-if="!orders.length" class="text-center text-gray-500 py-10">No orders found.</p>
            <table v-else class="w-full text-left">
                <thead>
                    <tr class="border-b-2 border-gray-200">
                        <th class="p-2 font-semibold">ID</th>
                        <th class="p-2 font-semibold">Customer</th>
                        <th class="p-2 font-semibold">Date</th>
                        <th class="p-2 font-semibold">Total</th>
                        <th class="p-2 font-semibold">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders" :key="order.order_id" class="border-b last:border-b-0 hover:bg-gray-50">
                        <td class="p-2 font-mono">#{{order.order_id}}</td>
                        <td class="p-2">{{order.user.fname}} {{order.user.lname}}</td>
                        <td class="p-2">{{new Date(order.created_at).toLocaleDateString()}}</td>
                        <td class="p-2">${{order.total.toFixed(2)}}</td>
                        <td class="p-2">
                            <select 
                                v-model="order.status" 
                                @change="handleStatusChange(order)"
                                class="p-1 text-xs rounded-lg border-gray-300 focus:ring-gold focus:border-gold"
                                :class="statusColor(order.status)"
                            >
                                <option>Processing</option>
                                <option>Paid</option>
                                <option>Shipped</option>
                                <option>Delivered</option>
                                <option>Canceled</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

const orders = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await api.getOrders();
        orders.value = response.data;
    } catch (e) {
        error.value = 'Failed to load orders.';
        console.error(e);
    } finally {
        loading.value = false;
    }
});

// ADD THIS NEW METHOD TO HANDLE STATUS UPDATES
const handleStatusChange = async (order) => {
    try {
        await api.updateOrderStatus(order.order_id, order.status);
        // Optionally show a success toast/notification here
        console.log(`Updated order #${order.order_id} to ${order.status}`);
    } catch (e) {
        alert('Failed to update order status.');
        console.error(e);
        // Optionally revert the change in the UI if the API call fails
        fetchData(); // or simply refetch all data
    }
};

const statusColor = (status) => {
    if (status === 'Paid' || status === 'Delivered') return 'bg-green-100 text-green-800 border-green-200';
    if (status === 'Shipped') return 'bg-blue-100 text-blue-800 border-blue-200';
    if (status === 'Canceled') return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-yellow-100 text-yellow-800 border-yellow-200'; // Processing
};
</script>
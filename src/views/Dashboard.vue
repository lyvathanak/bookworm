<template>
    <div>
        <header class="mb-8">
            <h1 class="text-4xl font-bold text-navy">Analytics Dashboard</h1>
            <p class="text-gray-500">Your store's performance at a glance.</p>
        </header>
        <div v-if="loading" class="text-center p-10 card">Loading dashboard...</div>
        <div v-if="error" class="text-center p-10 card bg-red-50 text-red-700">{{ error }}</div>
        <div v-if="!loading && !error">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="card text-navy">
                    <p class="text-sm text-gray-500">Total Revenue</p>
                    <h3 class="text-2xl font-bold">${{ stats.totalRevenue.toFixed(2) }}</h3>
                </div>
                <div class="card text-navy">
                    <p class="text-sm text-gray-500">Total Orders</p>
                    <h3 class="text-2xl font-bold">{{ stats.totalOrders }}</h3>
                </div>
                <div class="card text-navy">
                    <p class="text-sm text-gray-500">Total Customers</p>
                    <h3 class="text-2xl font-bold">{{ stats.totalUsers }}</h3>
                </div>
                <div class="card text-navy">
                    <p class="text-sm text-gray-500">Total Products</p>
                    <h3 class="text-2xl font-bold">{{ stats.totalProducts }}</h3>
                </div>
            </div>
             <div class="card">
                 <h3 class="font-bold text-lg mb-4 text-navy">Sales Over Time</h3>
                 <div class="h-80">
                    <canvas ref="salesChartCanvas"></canvas>
                 </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';
import Chart from 'chart.js/auto';

const loading = ref(true); 
const error = ref(null);
const stats = ref({ totalRevenue: 0, totalOrders: 0, totalUsers: 0, totalProducts: 0 });
const salesChartCanvas = ref(null);
let salesChartInstance = null;

onMounted(async () => {
    try {
        const [ordersRes, usersRes, booksRes] = await api.getDashboardStats();
        stats.value = {
            totalOrders: ordersRes.data.length,
            totalUsers: usersRes.data.length,
            totalProducts: booksRes.data.length,
            totalRevenue: ordersRes.data.reduce((sum, order) => sum + order.total, 0),
        };
        renderChart();
    } catch (e) { 
        error.value = "Failed to load dashboard data."; 
        console.error(e);
    } finally { 
        loading.value = false; 
    }
});

const renderChart = () => {
    if (salesChartInstance) salesChartInstance.destroy();
    if (salesChartCanvas.value) {
        salesChartInstance = new Chart(salesChartCanvas.value.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{ label: 'Sales ($)', data: [1200, 1900, 3000, 5000, 2300, 3200, 4500], borderColor: '#001F3F', tension: 0.4 }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
};
</script>
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
import Chart from 'chart.js/auto'; // Import Chart.js

const loading = ref(true);
const error = ref(null);
const stats = ref({ totalRevenue: 0, totalOrders: 0, totalUsers: 0, totalProducts: 0 });

// A ref to hold the canvas element
const salesChartCanvas = ref(null);
// A variable to hold the chart instance so we can destroy it properly
let salesChartInstance = null;

// This function fetches all the data from the backend
const fetchData = async () => {
    loading.value = true;
    error.value = null;
    try {
        const [ordersRes, usersRes, booksRes] = await api.getDashboardStats();
        stats.value = {
            totalOrders: ordersRes.data.length,
            totalUsers: usersRes.data.length,
            totalProducts: booksRes.data.length,
            totalRevenue: ordersRes.data.reduce((sum, order) => sum + order.total, 0),
        };
        // THIS IS THE CRITICAL STEP THAT WAS MISSING
        // We must call the function to render the chart AFTER the data is fetched.
        renderChart();
    } catch (e) { 
        error.value = "Failed to load dashboard data."; 
        console.error(e);
    } finally { 
        loading.value = false; 
    }
};

// This function handles the logic for drawing the chart
const renderChart = () => {
    // If a chart already exists, destroy it before drawing a new one
    if (salesChartInstance) {
        salesChartInstance.destroy();
    }
    // Make sure the canvas element is available
    if (salesChartCanvas.value) {
        const ctx = salesChartCanvas.value.getContext('2d');
        salesChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{ 
                    label: 'Sales ($)', 
                    // This is sample data, but in a real app, it would come from your API
                    data: [1250, 1950, 3000, 5100, 4200, 7500, 6800], 
                    borderColor: '#001F3F', 
                    tension: 0.4, 
                    backgroundColor: 'rgba(0, 31, 63, 0.1)', 
                    fill: true 
                }]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false 
            }
        });
    }
};

// Fetch data when the component is first mounted
onMounted(fetchData);
</script>
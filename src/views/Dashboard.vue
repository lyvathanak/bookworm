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

const fetchData = async () => {
    loading.value = true;
    error.value = null;
    try {
        // Fetch stats and sales data concurrently
        const [statsRes, salesRes] = await Promise.all([
            api.getDashboardStats(),
            api.getSalesData()
        ]);
        
        stats.value = statsRes.data;
        
        // Pass the real sales data to the chart renderer
        renderChart(salesRes.data);

    } catch (e) { 
        error.value = "Failed to load dashboard data."; 
        console.error(e);
    } finally { 
        loading.value = false; 
    }
};

// The renderChart function now accepts data as an argument
const renderChart = (salesData) => {
    if (salesChartInstance) {
        salesChartInstance.destroy();
    }
    
    if (salesChartCanvas.value && salesData) {
        // Process the data for Chart.js
        const labels = salesData.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        const dataPoints = salesData.map(d => parseFloat(d.sales));

        const ctx = salesChartCanvas.value.getContext('2d');
        salesChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels, // Use dynamic labels
                datasets: [{ 
                    label: 'Sales ($)', 
                    data: dataPoints, // Use dynamic data
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

onMounted(fetchData);
</script>
<template><div><header class="mb-8"><h1 class="text-4xl font-bold text-navy">Ratings & Reviews</h1></header><div v-if="loading" class="text-center p-10 card">Loading...</div><div v-if="error" class="card text-red-500 p-10 text-center">{{ error }}</div><div v-if="!loading && !error" class="card"><p v-if="!ratings.length" class="text-center text-gray-500 py-10">No ratings found.</p><ul v-else class="space-y-4"><li v-for="rating in ratings" :key="rating.rating_id" class="p-3 bg-gray-50 rounded-lg flex justify-between items-start"><div><p><span class="font-bold">{{rating.user.fname}}</span> on <span class="text-navy">{{rating.book.title}}</span></p><div class="flex items-center"><Star v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= rating.star ? 'text-gold fill-current' : 'text-gray-300'"/></div></div><button @click="handleDelete(rating.rating_id)" class="p-2 text-red-600 hover:bg-red-100 rounded-full"><Trash2 class="w-5 h-5"/></button></li></ul></div></div></template>
<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';
import { Star, Trash2 } from 'lucide-vue-next';
const ratings = ref([]); const loading = ref(true); const error = ref(null);
const fetchData = async () => {
    loading.value = true; error.value = null;
    try { ratings.value = (await api.getRatings()).data; }
    catch(e) { error.value = "Failed to load ratings."; }
    finally { loading.value = false; }
};
onMounted(fetchData);
const handleDelete = async (id) => { if(confirm('Delete this rating?')) { await api.deleteRating(id); await fetchData();} };
</script>
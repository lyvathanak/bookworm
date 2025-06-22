<template>
  <div>
    <header class="mb-8">
      <h1 class="text-4xl font-bold text-navy">Ratings & Reviews</h1>
    </header>

    <div v-if="loading" class="text-center p-10 card">Loading...</div>
    <div v-if="error" class="card text-red-500 p-10 text-center">{{ error }}</div>

    <div v-if="!loading && !error" class="card">
      <p v-if="!ratings.length" class="text-center text-gray-500 py-10">No ratings found.</p>

      <ul v-else class="space-y-4">
        <li
          v-for="rating in ratings"
          :key="rating.rating_id"
          class="p-3 bg-gray-50 rounded-lg flex justify-between items-start"
        >
          <div>
            <p>
              <span class="font-bold">{{ rating.user.fname }}</span> on
              <span class="text-navy">{{ rating.book.title }}</span>
            </p>
            <div class="flex items-center space-x-1 mb-1">
              <Star
                v-for="i in 5"
                :key="i"
                class="w-4 h-4"
                :class="i <= rating.star ? 'text-gold fill-current' : 'text-gray-300'"
              />
            </div>
            <p class="text-sm text-gray-500">Status: {{ rating.status || 'Pending' }}</p>
            <div class="flex space-x-2 mt-2">
              <button
                @click="handleStatusUpdate(rating.rating_id, 'Approved')"
                class="text-green-600 hover:bg-green-100 p-1 rounded-full"
                title="Approve"
              >
                <Check class="w-5 h-5" />
              </button>
              <button
                @click="handleStatusUpdate(rating.rating_id, 'Rejected')"
                class="text-yellow-600 hover:bg-yellow-100 p-1 rounded-full"
                title="Reject"
              >
                <X class="w-5 h-5" />
              </button>
            </div>
          </div>
          <button
            @click="handleDelete(rating.rating_id)"
            class="p-2 text-red-600 hover:bg-red-100 rounded-full"
            title="Delete"
          >
            <Trash2 class="w-5 h-5" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';
import { Star, Check, X, Trash2 } from 'lucide-vue-next';

const ratings = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchData = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await api.getRatings();
        ratings.value = response.data;
    } catch (e) {
        error.value = "Failed to load ratings.";
        console.error(e);
    } finally {
        loading.value = false;
    }
};

onMounted(fetchData);

const handleStatusUpdate = async (id, status) => {
    try {
        await api.updateRatingStatus(id, status);
        const rating = ratings.value.find(r => r.rating_id === id);
        if (rating) {
            rating.status = status;
        }
    } catch (e) {
        alert('Failed to update status.');
    }
};

const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this rating?')) {
        try {
            await api.deleteRating(id);
            await fetchData(); // Refresh list after deleting
        } catch (e) {
            alert('Failed to delete rating.');
        }
    }
};
</script>
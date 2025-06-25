<template>
    <div>
        <header class="mb-8 flex justify-between items-center">
            <h1 class="text-4xl font-bold text-navy">Author Management</h1>
            <button @click="openAddModal" class="btn-primary flex items-center">
                <Plus class="w-5 h-5 mr-2"/>Add New Author
            </button>
        </header>

        <div v-if="loading" class="text-center p-10 card">Loading...</div>
        <div v-if="error" class="card text-red-500 p-10 text-center">{{ error }}</div>

        <div v-if="!loading && !error" class="card">
            <p v-if="!authors.length" class="text-center text-gray-500 py-10">No authors found.</p>
            <table v-else class="w-full text-left">
                <thead>
                    <tr class="border-b-2">
                        <th class="p-2">Author</th>
                        <th class="p-2">Bio</th> <th class="p-2">Books</th>
                        <th class="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="author in authors" :key="author.author_id" class="border-b">
                        <td class="p-2 flex items-center gap-4">
                            <img :src="getImageUrl(author.avatar)"
                                 onerror="this.src='https://placehold.co/48x48/ccc/ffffff?text=N/A'"
                                 class="w-12 h-12 rounded-full object-cover">
                            <div>
                            <p class="font-semibold">{{ author.author_name }}</p>
                            <p class="text-xs text-gray-500">ID: {{ author.author_id }}</p>
                            </div>
                        </td>
                        <td class="p-2 text-sm text-gray-600 max-w-xs truncate" :title="author.bio">
                            {{ author.bio || 'N/A' }}
                        </td>
                        <td class="p-2">{{ author.books?.length || 0 }}</td>
                        <td class="p-2">
                            <button @click="openEditModal(author)" class="p-1 text-blue-600">
                            <FilePenLine class="w-5 h-5" />
                            </button>
                            <button @click="handleDelete(author.author_id)" class="p-1 text-red-600 ml-2">
                            <Trash2 class="w-5 h-5" />
                            </button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

        <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
                <h2 class="text-2xl font-bold text-navy mb-6">{{ modalTitle }}</h2>
                <form @submit.prevent="saveAuthor" class="space-y-4">
                    <input v-model="currentAuthor.author_name" type="text" placeholder="Author Name" class="w-full p-2 border rounded" required>
                    
                    <!-- FIX: Changed to text input for URL -->
                    <div>
                        <label class="text-sm font-medium text-gray-700">Author Avatar URL</label>
                        <input v-model="currentAuthor.avatar" type="url" placeholder="https://example.com/image.jpg" class="w-full p-2 border rounded">
                    </div>
                    
                    <textarea v-model="currentAuthor.bio" placeholder="Author Bio" class="w-full p-2 border rounded h-24"></textarea>
                    
                    <div class="flex justify-end gap-4 pt-4">
                        <button type="button" @click="isModalOpen = false" class="px-4 py-2 rounded-lg bg-gray-200">Cancel</button>
                        <button type="submit" class="btn-primary">Save Author</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'; // <-- FIX: Added this import
import api from '@/services/api';
import { Plus, FilePenLine, Trash2 } from 'lucide-vue-next';

const authors = ref([]);
const loading = ref(true);
const error = ref(null);
const isModalOpen = ref(false);
const isEditing = ref(false);
const currentAuthor = ref({});

const modalTitle = computed(() => (isEditing.value ? 'Edit Author' : 'Add New Author'));

// This function is no longer needed if the backend provides full URLs, but it's safe to keep for now.
const getImageUrl = (imagePath) => {
    if (!imagePath || imagePath.startsWith('http')) {
        return imagePath || 'https://placehold.co/48x48/ccc/ffffff?text=N/A';
    }
    return `http://localhost:5000/${imagePath}`;
};

const fetchData = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await api.getAuthors();
        authors.value = response.data;
    } catch(e) {
        error.value = 'Failed to load authors.';
        console.error(e);
    } finally {
        loading.value = false;
    }
};

onMounted(fetchData);

const openAddModal = () => {
    isEditing.value = false;
    currentAuthor.value = {};
    isModalOpen.value = true;
};

const openEditModal = (author) => {
    isEditing.value = true;
    currentAuthor.value = { ...author };
    isModalOpen.value = true;
};

// FIX: Simplified saveAuthor for URL-based images
const saveAuthor = async () => {
    try {
        if (isEditing.value) {
            await api.updateAuthor(currentAuthor.value.author_id, currentAuthor.value);
        } else {
            await api.createAuthor(currentAuthor.value);
        }
        await fetchData();
        isModalOpen.value = false;
    } catch(e) {
        alert('Could not save author. See console for details.');
        console.error(e);
    }
};

const handleDelete = async (id) => {
    if (confirm('Delete this author? All their books will also be affected.')) {
        try {
            await api.deleteAuthor(id);
            await fetchData();
        } catch(e) {
            alert('Failed to delete author.');
        }
    }
};
</script>
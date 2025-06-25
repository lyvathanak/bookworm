<template>
  <div>
    <header class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-4xl font-bold text-navy">Product Management</h1>
        <p class="text-gray-500">Add, edit, or remove books from your store.</p>
      </div>
      <button @click="openAddModal" class="btn-primary flex items-center">
        <Plus class="w-5 h-5 mr-2" />
        Add New Book
      </button>
    </header>

    <div v-if="loading" class="text-center p-10 card">Loading products...</div>
    <div v-else-if="error" class="card text-center p-10 text-red-500">{{ error }}</div>

    <div v-else class="card">
      <table v-if="products.length > 0" class="w-full text-left">
        <thead>
          <tr class="border-b-2 border-gray-200">
            <th class="p-2 font-semibold">Product</th>
            <th class="p-2 font-semibold">Author</th>
            <th class="p-2 font-semibold">Price</th>
            <th class="p-2 font-semibold">Stock</th>
            <th class="p-2 font-semibold">Type</th>
            <th class="p-2 font-semibold">Status</th>
            <th class="p-2 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.bid" class="border-b hover:bg-gray-50">
            <td class="p-2 flex items-center gap-4">
              <img :src="product.image || 'https://placehold.co/48x72/ccc/ffffff?text=N/A'" onerror="this.src='https://placehold.co/48x72/ccc/ffffff?text=N/A'" class="w-12 h-[72px] object-cover rounded-md shadow" />
              <div>
                <p class="font-semibold text-navy">{{ product.title }}</p>
                <p class="text-xs text-gray-500">{{ product.genre }}</p>
              </div>
            </td>
            <td class="p-2">{{ product.author?.author_name || 'N/A' }}</td>
            <td class="p-2">${{ (product.price || 0).toFixed(2) }}</td>
            <td class="p-2">{{ product.stock }}</td>
            <td class="p-2">{{ product.booktype }}</td>
            <td class="p-2">
              <span :class="['px-2 py-1 text-xs rounded-full font-semibold', product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800']">
                {{ product.status }}
              </span>
            </td>
            <td class="p-2">
              <button @click="openEditModal(product)" class="p-1 text-blue-600 hover:text-blue-800"><FilePenLine class="w-5 h-5" /></button>
              <button @click="handleDelete(product.bid)" class="p-1 text-red-600 hover:text-red-800 ml-2"><Trash2 class="w-5 h-5" /></button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="text-center text-gray-500 py-10">
        No products found. Add one to get started!
      </p>
    </div>
    
    <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 class="text-2xl font-bold text-navy mb-6">{{ modalTitle }}</h2>
            <form @submit.prevent="saveProduct" class="space-y-4">
                <input v-model="currentProduct.title" type="text" placeholder="Book Title" class="w-full p-2 border rounded" required>
                
                <!-- FIX: Added textarea for the description -->
                <textarea
                    v-model="currentProduct.description"
                    placeholder="Book Description"
                    class="w-full p-2 border rounded h-24 resize-none"
                  ></textarea>

                <select v-model="currentProduct.author_id" class="w-full p-2 border rounded bg-white" required>
                    <option disabled value="">Select an Author</option>
                    <option v-for="author in authors" :key="author.author_id" :value="author.author_id">{{ author.author_name }}</option>
                </select>
                <div class="grid grid-cols-2 gap-4">
                    <input v-model="currentProduct.genre" type="text" placeholder="Genre" class="w-full p-2 border rounded">
                    <input v-model.number="currentProduct.published_year" type="number" placeholder="Published Year" class="w-full p-2 border rounded">
                </div>
                <div class="grid grid-cols-3 gap-4">
                    <select v-model="currentProduct.booktype" class="w-full p-2 border rounded bg-white" required>
                        <option>Physical</option>
                        <option>E-book</option>
                    </select>
                    <input v-model.number="currentProduct.price" type="number" step="0.01" placeholder="Price" class="w-full p-2 border rounded">
                    <input v-model.number="currentProduct.stock" type="number" placeholder="Stock" class="w-full p-2 border rounded">
                </div>
                
                <!-- FIX: Changed file input to text input for image URL -->
                <div>
                    <label class="text-sm font-medium text-gray-700">Book Cover Image URL</label>
                    <input v-model="currentProduct.image" type="url" placeholder="https://example.com/image.jpg" class="w-full p-2 border rounded">
                </div>

                <div class="flex justify-end gap-4 pt-4">
                    <button type="button" @click="isModalOpen = false" class="px-4 py-2 rounded-lg bg-gray-200">Cancel</button>
                    <button type="submit" class="btn-primary">{{ isEditing ? 'Save Changes' : 'Add Book' }}</button>
                </div>
            </form>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '@/services/api';
import { Plus, FilePenLine, Trash2 } from 'lucide-vue-next';

const products = ref([]);
const authors = ref([]);
const loading = ref(true);
const error = ref(null);
const isModalOpen = ref(false);
const isEditing = ref(false);
const currentProduct = ref({});

const modalTitle = computed(() => (isEditing.value ? 'Edit Book' : 'Add New Book'));

// This function is no longer needed since we expect full URLs from the database.
// The template directly binds to `product.image`.
const getImageUrl = (imagePath) => {
    return imagePath || 'https://placehold.co/48x72/ccc/ffffff?text=N/A';
};

const fetchData = async () => {
    loading.value = true;
    error.value = null;
    try {
        const [productsRes, authorsRes] = await Promise.all([
            api.getBooks(),
            api.getAuthors(),
        ]);
        products.value = productsRes.data;
        authors.value = authorsRes.data;
    } catch (e) {
        error.value = 'Failed to load data.';
        console.error(e);
    } finally {
        loading.value = false;
    }
};

onMounted(fetchData);

const openAddModal = () => {
    isEditing.value = false;
    // FIX: Initialize all fields, including description and image
    currentProduct.value = { 
        title: '',
        description: '',
        image: '',
        price: 0, 
        stock: 0, 
        author_id: null, 
        booktype: 'Physical', 
        status: 'Active' 
    };
    isModalOpen.value = true;
};

const openEditModal = (p) => {
    isEditing.value = true;
    currentProduct.value = JSON.parse(JSON.stringify(p));
    currentProduct.value.author_id = p.author?.author_id || null;
    isModalOpen.value = true;
};

const saveProduct = async () => {
    try {
        if (isEditing.value) {
            await api.updateBook(currentProduct.value.bid, currentProduct.value);
        } else {
            await api.createBook(currentProduct.value);
        }
        await fetchData();
        isModalOpen.value = false;
    } catch (e) {
        alert("Could not save product. Please check console for details.");
        console.error(e);
    }
};

const handleDelete = async (id) => {
  if (confirm('Are you sure you want to delete this product?')) {
    try {
      await api.deleteBook(id);
      await fetchData();
    } catch(e) {
      alert("Failed to delete product.");
      console.error(e);
    }
  }
}
</script>

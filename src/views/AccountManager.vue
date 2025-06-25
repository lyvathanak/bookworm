<template>
    <div>
        <header class="mb-8 flex justify-between items-center">
            <div>
                <h1 class="text-4xl font-bold text-navy">Account Management</h1>
                <p class="text-gray-500">Create new users or modify existing ones.</p>
            </div>
            <button @click="openAddModal" class="btn-primary flex items-center">
                <Plus class="w-5 h-5 mr-2" />Add New User
            </button>
        </header>

        <div v-if="loading" class="text-center p-10 card">Loading users...</div>
        <div v-if="error" class="card text-center p-10 text-red-500">{{ error }}</div>

        <div v-if="!loading && !error" class="card">
            <p v-if="!users.length" class="text-center text-gray-500 py-10">No users found. Add one to get started!</p>
            <table v-else class="w-full text-left">
                <thead>
                    <tr class="border-b-2 border-gray-200">
                        <th class="p-2 font-semibold">Name</th>
                        <th class="p-2 font-semibold">Email</th>
                        <th class="p-2 font-semibold">Role</th>
                        <th class="p-2 font-semibold">Total Orders</th>
                        <th class="p-2 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.uid" class="border-b last:border-b-0 hover:bg-gray-50">
                        <td class="p-2">{{ user.fname }} {{ user.lname }}</td>
                        <td class="p-2">{{ user.email }}</td>
                        <td class="p-2">
                            <span class="px-2 py-1 text-xs rounded-full font-semibold" :class="user.role === 'admin' ? 'bg-gold text-navy' : 'bg-gray-200 text-gray-700'">
                                {{ user.role }}
                            </span>
                        </td>
                        <td class="p-2">{{ user.orders.length }}</td>
                        <td class="p-2">
                            <button @click="openEditModal(user)" class="p-1 text-blue-600 hover:text-blue-800" title="Edit User">
                                <FilePenLine class="w-5 h-5" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Add/Edit User Modal -->
        <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
                <h2 class="text-2xl font-bold text-navy mb-6">{{ modalTitle }}</h2>
                <form @submit.prevent="saveUser" class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <input v-model="currentUser.fname" type="text" placeholder="First Name" class="w-full p-2 border rounded" required>
                        <input v-model="currentUser.lname" type="text" placeholder="Last Name" class="w-full p-2 border rounded" required>
                    </div>
                    <input v-model="currentUser.email" type="email" placeholder="Email Address" class="w-full p-2 border rounded" required>
                    
                    <!-- Password field only for new users -->
                    <input v-if="!isEditing" v-model="currentUser.password" type="password" placeholder="Password (min 8 characters)" class="w-full p-2 border rounded" required>
                    
                    <div>
                        <label class="font-semibold text-sm">Role</label>
                        <select v-model="currentUser.role" class="w-full p-2 border rounded bg-white" required>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div class="flex justify-end gap-4 pt-4">
                        <button type="button" @click="isModalOpen = false" class="px-4 py-2 rounded-lg bg-gray-200">Cancel</button>
                        <button type="submit" class="btn-primary">Save User</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'; // <-- FIX: Added this import
import api from '@/services/api';
import { Plus, FilePenLine } from 'lucide-vue-next';

const users = ref([]);
const loading = ref(true);
const error = ref(null);
const isModalOpen = ref(false);
const isEditing = ref(false);
const currentUser = ref({});

const modalTitle = computed(() => (isEditing.value ? 'Edit User Role' : 'Create New User'));

const fetchData = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await api.getUsers();
        users.value = response.data;
    } catch (e) {
        error.value = 'Failed to load users.';
        console.error(e);
    } finally {
        loading.value = false;
    }
};

onMounted(fetchData);

const openAddModal = () => {
    isEditing.value = false;
    currentUser.value = { role: 'user' }; // Default role
    isModalOpen.value = true;
};

const openEditModal = (user) => {
    isEditing.value = true;
    currentUser.value = { uid: user.uid, fname: user.fname, lname: user.lname, email: user.email, role: user.role };
    isModalOpen.value = true;
};

const saveUser = async () => {
    try {
        if (isEditing.value) {
            await api.updateUser(currentUser.value.uid, { role: currentUser.value.role });
        } else {
            await api.createUser(currentUser.value);
        }
        await fetchData();
        isModalOpen.value = false;
    } catch (e) {
        if (e.response && e.response.status === 409) {
            alert('Error: A user with this email address already exists.');
        } else {
            alert('Could not save user. Please check the console for details.');
        }
        console.error(e);
    }
};
</script>
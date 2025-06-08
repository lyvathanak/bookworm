<template>
    <div>
        <header class="mb-8">
            <h1 class="text-4xl font-bold text-navy">Comments & Reviews</h1>
            <p class="text-gray-500">Approve or delete user-submitted reviews.</p>
        </header>

        <div class="card space-y-4">
            <div v-for="comment in comments" :key="comment.id" class="p-4 rounded-lg flex items-start gap-4" :class="comment.status === 'Pending' ? 'bg-yellow-50' : 'bg-white'">
                <div class="flex-grow">
                    <div class="flex justify-between items-center">
                        <p class="font-semibold text-navy">{{ comment.user }} on <span class="font-bold">{{ comment.book }}</span></p>
                        <span class="text-xs text-gray-400">{{ comment.date }}</span>
                    </div>
                    <div class="flex items-center my-1">
                        <Star v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= comment.rating ? 'text-gold fill-current' : 'text-gray-300'" />
                    </div>
                    <p class="text-gray-700">{{ comment.text }}</p>
                </div>
                <div class="flex-shrink-0 flex gap-2">
                    <template v-if="comment.status === 'Pending'">
                        <button class="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200"><Check class="w-5 h-5"/></button>
                        <button class="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200"><X class="w-5 h-5"/></button>
                    </template>
                     <button v-else class="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"><Trash2 class="w-5 h-5"/></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Star, Check, X, Trash2 } from 'lucide-vue-next';

const comments = ref([
    { id: 1, user: 'Robert G.', book: 'The Three-Body Problem', rating: 5, text: "Absolutely mind-bending science fiction. A must-read for the genre.", date: '2025-06-07', status: 'Approved' },
    { id: 2, user: 'Mark M.', book: 'Atomic Habits', rating: 2, text: "A bit repetitive. Could have been a blog post.", date: '2025-06-07', status: 'Pending' },
    { id: 3, user: 'Jane S.', book: 'The Subtle Art of Not Giving a F*ck', rating: 4, text: "Great message, very entertaining read.", date: '2025-06-06', status: 'Approved' },
]);
</script>

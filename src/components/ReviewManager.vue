<template>
  <div class="main-content">
    <header class="page-header">
      <h1>Review & Rating Manager</h1>
      <p>Approve or delete customer reviews</p>
    </header>

    <div class="toolbar">
       <input type="search" v-model="searchTerm" placeholder="Search by book title or user name..." class="search-input" />
    </div>

    <div class="data-table">
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Book</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="review in filteredReviews" :key="review.id">
            <td>{{ getUserName(review.userId) }}</td>
            <td>{{ getBookTitle(review.bookId) }}</td>
            <td>
                <span class="star-rating">
                    <font-awesome-icon v-for="n in 5" :key="n" :icon="n <= review.rating ? 'star' : ['far', 'star']" />
                </span>
            </td>
            <td class="review-comment">{{ review.comment }}</td>
            <td>
                <span class="status" :class="review.status">{{ review.status }}</span>
            </td>
            <td class="action-buttons">
                <button v-if="review.status === 'pending'" @click="approveReview(review.id)" class="btn-action approve">
                    <font-awesome-icon icon="check-circle" /> Approve
                </button>
                <button @click="deleteReview(review.id)" class="btn-action delete">
                    <font-awesome-icon icon="trash" /> Delete
                </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ReviewManager',
  setup() {
    const store = useStore();
    const searchTerm = ref('');

    const reviews = computed(() => store.state.reviews);
    const users = computed(() => store.state.users);
    const books = computed(() => store.state.books);

    const getUserName = (userId) => users.value.find(u => u.id === userId)?.name || 'Unknown';
    const getBookTitle = (bookId) => books.value.find(b => b.id === bookId)?.title || 'Unknown';

    const filteredReviews = computed(() => {
        if (!searchTerm.value) return reviews.value;
        const lowerSearch = searchTerm.value.toLowerCase();
        return reviews.value.filter(review =>
            getUserName(review.userId).toLowerCase().includes(lowerSearch) ||
            getBookTitle(review.bookId).toLowerCase().includes(lowerSearch)
        );
    });

    const approveReview = (id) => {
        store.dispatch('approveReview', id);
    };

    const deleteReview = (id) => {
        if(confirm('Are you sure you want to permanently delete this review?')) {
            store.dispatch('deleteReview', id);
        }
    };

    return {
        searchTerm,
        filteredReviews,
        getUserName,
        getBookTitle,
        approveReview,
        deleteReview
    };
  }
};
</script>

<style scoped>
.main-content { flex-grow: 1; padding: 2rem; background-color: #fff; }
.page-header { margin-bottom: 2rem; color: #0d1b2a; }
.toolbar { display: flex; justify-content: flex-start; align-items: center; margin-bottom: 1.5rem; }
.search-input { padding: 0.5rem; border: 1px solid #ccc; border-radius: 5px; width: 350px; }
.data-table table { width: 100%; border-collapse: collapse; text-align: left; }
.data-table th, .data-table td { padding: 1rem; border-bottom: 1px solid #eee; vertical-align: middle; }
.data-table th { background-color: #1b263b; color: white; }
.star-rating { color: #fec82d; }
.review-comment { max-width: 300px; }
.status {
  padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem; color: white; text-transform: capitalize;
}
.status.approved { background-color: #4caf50; }
.status.pending { background-color: #ff9800; }
.action-buttons .btn-action { background: none; border: none; cursor: pointer; font-size: 0.9rem; margin-right: 10px; padding: 5px 10px; border-radius: 5px; }
.btn-action.approve { color: #4caf50; border: 1px solid #4caf50; }
.btn-action.approve:hover { background-color: #4caf50; color: white; }
.btn-action.delete { color: #f44336; border: 1px solid #f44336; }
.btn-action.delete:hover { background-color: #f44336; color: white; }
</style>
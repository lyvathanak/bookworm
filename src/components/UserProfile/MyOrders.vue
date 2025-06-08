<template>
  <div class="my-orders">
    <h2>My Orders</h2>

    <div v-if="orders.length === 0" class="empty-state">
      <i class="fas fa-shopping-bag empty-icon"></i>
      <p>No orders yet</p>
      <router-link to="/home" class="browse-btn">Start Shopping</router-link>
    </div>

    <div v-else class="orders-table">
      <div class="table-header">
        <div class="header-cell">Order Details</div>
        <div class="header-cell">Quantity</div>
        <div class="header-cell">Price</div>
        <div class="header-cell">Status</div>
      </div>

      <!-- Scrollable container for order rows -->
      <div class="orders-scroll-container">
        <div v-for="order in displayedOrders" :key="order.id" class="order-row">
          <div class="order-detail">
            <img :src="order.coverImage || 'https://placehold.co/60x80/E0E0E0/333333?text=Book'" :alt="order.title" class="book-image" />
            <div class="book-info">
              <h4>{{ order.title }}</h4>
              <p>{{ order.author }}</p>
              <span class="book-format">{{ order.format || 'Paperback' }}</span>
              <div class="order-date">{{ formatDate(order.orderDate) }}</div>
            </div>
          </div>
          <div class="order-quantity">{{ order.quantity }}</div>
          <div class="order-price">${{ order.price.toFixed(2) }}</div>
          <div class="order-status" :class="getStatusClass(order.status)">
            {{ order.status }}
          </div>
        </div>
      </div>

      <!-- Show more button -->
      <div v-if="hasMoreOrders" class="show-more-container">
        <button @click="loadMore" class="show-more-btn">Show More</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'MyOrders',
  props: {
    orders: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const itemsPerPage = 5; // Number of orders to show initially and load more each time
    const currentLimit = ref(itemsPerPage); // Reactive limit for displayed orders

    // Computed property to get the orders that should be currently displayed
    const displayedOrders = computed(() => {
      return props.orders.slice(0, currentLimit.value);
    });

    // Computed property to check if there are more orders to load
    const hasMoreOrders = computed(() => {
      return currentLimit.value < props.orders.length;
    });

    // Function to load more orders
    const loadMore = () => {
      currentLimit.value += itemsPerPage; // Increase the limit by itemsPerPage
      // Ensure the limit does not exceed the total number of orders
      if (currentLimit.value > props.orders.length) {
        currentLimit.value = props.orders.length;
      }
    };

    const formatDate = (dateString) => {
      if (!dateString) return '';
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };

    const getStatusClass = (status) => {
      switch (status?.toLowerCase()) {
        case 'delivered':
          return 'status-delivered';
        case 'shipped':
          return 'status-shipped';
        case 'order in progress':
        default:
          return 'status-progress';
      }
    };

    return {
      displayedOrders,
      hasMoreOrders,
      loadMore,
      formatDate,
      getStatusClass
    };
  }
};
</script>

<style scoped>
h2 {
  font-size: 24px;
  color: #666;
  margin-bottom: 25px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.empty-icon {
  font-size: 60px;
  color: #ddd;
  margin-bottom: 20px;
}

.browse-btn {
  display: inline-block;
  background-color: #0a1f44;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.browse-btn:hover {
  background-color: #083a6b;
}

.orders-table {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex; /* Use flexbox to stack header, scrollable content, and show more button */
  flex-direction: column;
  overflow: hidden; /* Ensures rounded corners apply to the entire table */
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  background-color: #0a1f44;
  color: white;
  padding: 15px 20px;
  font-weight: 600;
  flex-shrink: 0; /* Prevents header from shrinking */
}

/* New scrollable container for order rows */
.orders-scroll-container {
  max-height: 400px; /* Set a fixed height for scrolling */
  overflow-y: auto; /* Enable vertical scrolling */
  flex-grow: 1; /* Allows the scroll container to grow and take available space */
}

.order-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 20px;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.orders-scroll-container .order-row:last-child {
  border-bottom: none; /* Remove border for the very last item in the scrollable list */
}

.order-detail {
  display: flex;
  align-items: center;
  gap: 15px;
}

.book-image {
  width: 60px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  flex-shrink: 0;
}

.book-info h4 {
  margin: 0 0 5px 0;
  font-size: 16px;
  color: #333;
  font-weight: 600;
}

.book-info p {
  margin: 0 0 5px 0;
  color: #666;
  font-size: 14px;
}

.book-format {
  font-size: 12px;
  color: #999;
  background: #f8f9fa;
  padding: 2px 6px;
  border-radius: 4px;
}

.order-date {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}

.order-quantity, .order-price, .order-status {
  text-align: center;
  font-weight: 500;
}

.order-price {
  color: #28a745;
  font-weight: 600;
}

.status-progress {
  color: #ffc107;
}

.status-shipped {
  color: #17a2b8;
}

.status-delivered {
  color: #28a745;
}

.show-more-container {
  display: flex;
  justify-content: center;
  padding: 15px 20px;
  background-color: #f8f8f8; /* Light background for the button container */
  border-top: 1px solid #eee; /* Separator from the orders list */
  flex-shrink: 0; /* Prevents button container from shrinking */
}

.show-more-btn {
  background-color: #0a1f44;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.show-more-btn:hover {
  background-color: #0a1f44;
}

@media (max-width: 768px) {
  .table-header {
    display: none;
  }

  .order-row {
    grid-template-columns: 1fr;
    gap: 15px;
    text-align: left;
  }

  .order-quantity, .order-price, .order-status {
    text-align: left;
  }
}
</style>

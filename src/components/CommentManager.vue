<template>
  <div class="main-content">
    <header class="page-header">
      <h1>Comment Manager</h1>
      <p>Name: Overview</p>
    </header>
    <div class="toolbar">
      <div class="tabs">
        <button class="tab-btn">Overview</button>
        <button class="tab-btn active">Comment</button>
        <button class="tab-btn">Activity</button>
      </div>
      <div class="actions">
        <input type="search" placeholder="Search..." class="search-input" />
      </div>
    </div>
    <div class="comment-grid">
      <div class="comment-list">
        <div class="comment-card" v-for="comment in comments" :key="comment.id">
            <div class="comment-avatar"></div>
            <div class="comment-content">
                <div class="comment-header">
                    <strong>{{ comment.user }}</strong>
                    <span class="timestamp">{{ comment.timestamp }}</span>
                </div>
                <p>{{ comment.message }}</p>
                <div class="comment-footer">
                    <span>{{ comment.responses }} Responses</span>
                </div>
            </div>
        </div>
      </div>
      <div class="comment-sidebar">
        <div class="progress-panel">
            <h3>Progress</h3>
            <div class="progress-bar">
                <div class="progress" style="width: 89%"></div>
            </div>
            <span>89%</span>
        </div>
        <div class="chart-panel">
            <div class="panel-header">
                 <div class="tabs">
                    <button class="tab-btn">12 months</button>
                    <button class="tab-btn">1 month</button>
                    <button class="tab-btn active">7 days</button>
                 </div>
            </div>
            <div class="line-chart">
                <svg viewBox="0 0 100 50" preserveAspectRatio="none">
                    <path d="M 0 40 L 10 30 L 20 35 L 30 20 L 40 25 L 50 15 L 60 25 L 70 10 L 80 20 L 90 5 L 100 15" fill="none" stroke="#415a77" stroke-width="1"/>
                </svg>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'CommentManager',
  setup() {
    const store = useStore();
    return {
      comments: computed(() => store.state.comments),
      monthlyProgress: computed(() => store.state.monthlyProgress),
    };
  },
};
</script>

<style scoped>
.main-content {
  flex-grow: 1; padding: 2rem; background-color: #fff;
}
.page-header {
  margin-bottom: 2rem; color: #0d1b2a;
}
.toolbar {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;
}
.tabs .tab-btn {
  padding: 0.5rem 1rem; border: none; background-color: #0d1b2a; color: white; border-radius: 5px; cursor: pointer; margin-right: 5px;
}
.tabs .tab-btn.active { background-color: #415a77; }
.actions .search-input {
  padding: 0.5rem; border: 1px solid #ccc; border-radius: 5px; width: 250px;
}
.comment-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1.5rem;
}
.comment-card {
    display: flex;
    padding: 1rem;
    background-color: #fdfdfd;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    margin-bottom: 1rem;
}
.comment-avatar {
    width: 40px; height: 40px; border-radius: 50%; background-color: #ccc; margin-right: 1rem; flex-shrink: 0;
}
.comment-content { flex-grow: 1; }
.comment-header { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
.comment-header .timestamp { font-size: 0.8rem; color: #999; }
.comment-footer { text-align: right; font-size: 0.8rem; color: #415a77; font-weight: bold; }
.comment-sidebar > div { padding: 1.5rem; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 1.5rem;}
.progress-panel {
    display: flex; align-items: center; gap: 1rem;
}
.progress-bar { flex-grow: 1; background-color: #e0e0e0; border-radius: 10px; height: 10px; }
.progress-bar .progress { height: 100%; border-radius: 10px; background-color: #42a5f5; }
.line-chart { height: 150px; }
.line-chart svg { width: 100%; height: 100%; }
</style>
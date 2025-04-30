<template>
    <div class="comment-manager">
      <div class="header">
        <h1>Comments Manager</h1>
        <div class="user-info">
          <span>Name/ Overview</span>
        </div>
      </div>
  
      <div class="comments-container">
        <div class="tab-container">
          <button class="tab-btn active">All Comments</button>
          <button class="tab-btn">Flagged</button>
          <button class="tab-btn">Resolved</button>
        </div>
  
        <div class="comments-list">
          <div class="comment-card" v-for="comment in comments" :key="comment.id">
            <div class="comment-header">
              <div class="user-info">
                <div class="user-avatar"></div>
                <div class="user-details">
                  <h3>{{ comment.user }}</h3>
                  <span class="timestamp">{{ comment.timestamp }}</span>
                </div>
              </div>
              <div class="comment-actions">
                <button class="action-btn reply">
                  <i class="fas fa-reply"></i> Reply
                </button>
                <button class="action-btn flag">
                  <i class="fas fa-flag"></i> Flag
                </button>
                <button class="action-btn delete">
                  <i class="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
            <div class="comment-content">
              <p>{{ comment.message }}</p>
            </div>
            <div class="comment-footer">
              <span class="responses">{{ comment.responses }} responses</span>
              <button class="view-btn">View all</button>
            </div>
          </div>
        </div>
  
        <div class="pagination">
          <button class="pagination-btn">Previous</button>
          <div class="pagination-pages">
            <button class="page-btn active">1</button>
            <button class="page-btn">2</button>
            <button class="page-btn">3</button>
          </div>
          <button class="pagination-btn">Next</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  
  export default {
    name: 'CommentManager',
    computed: {
      ...mapState(['comments'])
    }
  }
  </script>
  
  <style scoped>
  .comment-manager {
    padding: 0;
    background-color: #f5f5f5;
    min-height: 100vh;
  }
  
  .header {
    background-color: #002140;
    color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .header h1 {
    font-size: 24px;
    margin: 0;
    color: #ffc107;
  }
  
  .user-info {
    font-size: 14px;
  }
  
  .comments-container {
    padding: 20px;
  }
  
  .tab-container {
    display: flex;
    margin-bottom: 20px;
  }
  
  .tab-btn {
    padding: 10px 20px;
    background-color: white;
    border: 1px solid #eee;
    border-radius: 5px 5px 0 0;
    margin-right: 10px;
    cursor: pointer;
  }
  
  .tab-btn.active {
    background-color: #002140;
    color: white;
    border: none;
  }
  
  .comments-list {
    margin-bottom: 20px;
  }
  
  .comment-card {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 15px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  }
  
  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 15px;
  }
  
  .user-info {
    display: flex;
    align-items: center;
  }
  
  .user-avatar {
    width: 40px;
    height: 40px;
    background-color: #eee;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .user-details h3 {
    margin: 0;
    font-size: 16px;
  }
  
  .timestamp {
    font-size: 12px;
    color: #999;
  }
  
  .comment-actions {
    display: flex;
  }
  
  .action-btn {
    background: none;
    border: none;
    margin-left: 10px;
    cursor: pointer;
    font-size: 12px;
    color: #666;
  }
  
  .action-btn.reply {
    color: #1890ff;
  }
  
  .action-btn.flag {
    color: #faad14;
  }
  
  .action-btn.delete {
    color: #ff4d4f;
  }
  
  .comment-content {
    margin-bottom: 15px;
  }
  
  .comment-content p {
    margin: 0;
    line-height: 1.5;
  }
  
  .comment-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    border-top: 1px solid #eee;
  }
  
  .responses {
    font-size: 12px;
    color: #666;
  }
  
  .view-btn {
    background: none;
    border: none;
    color: #1890ff;
    cursor: pointer;
    font-size: 12px;
  }
  
  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .pagination-btn {
    padding: 5px 15px;
    background-color: #002140;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .pagination-pages {
    display: flex;
  }
  
  .page-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #ddd;
    background-color: white;
    margin: 0 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .page-btn.active {
    background-color: #002140;
    color: white;
    border: none;
  }
  </style>
  
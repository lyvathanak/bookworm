<template>
    <div class="customer-service">
      <div class="header">
        <h1>Customer Service</h1>
        <div class="user-info">
          <span>Name/ Overview</span>
        </div>
      </div>
  
      <div class="chat-container">
        <div class="chat-sidebar">
          <div class="search-box">
            <input type="text" placeholder="Search conversations..." />
            <button class="search-btn">
              <i class="fas fa-search"></i>
            </button>
          </div>
  
          <div class="chat-list">
            <div class="chat-item active">
              <div class="chat-avatar"></div>
              <div class="chat-details">
                <h3>Sarah Johnson</h3>
                <p>Thanks for your help with my order...</p>
              </div>
              <div class="chat-meta">
                <span class="timestamp">5 min</span>
                <span class="notification">2</span>
              </div>
            </div>
            <div class="chat-item">
              <div class="chat-avatar"></div>
              <div class="chat-details">
                <h3>John Smith</h3>
                <p>When will my books arrive?</p>
              </div>
              <div class="chat-meta">
                <span class="timestamp">20 min</span>
              </div>
            </div>
            <div class="chat-item">
              <div class="chat-avatar"></div>
              <div class="chat-details">
                <h3>Emma Davis</h3>
                <p>I need to return a damaged book</p>
              </div>
              <div class="chat-meta">
                <span class="timestamp">1 hour</span>
              </div>
            </div>
            <div class="chat-item">
              <div class="chat-avatar"></div>
              <div class="chat-details">
                <h3>Michael Brown</h3>
                <p>Do you have this book in stock?</p>
              </div>
              <div class="chat-meta">
                <span class="timestamp">2 days</span>
              </div>
            </div>
          </div>
        </div>
  
        <div class="chat-main">
          <div class="chat-header">
            <div class="chat-person">
              <div class="chat-avatar"></div>
              <div class="chat-details">
                <h3>Sarah Johnson</h3>
                <span class="status online">Online</span>
              </div>
            </div>
            <div class="chat-actions">
              <button class="action-icon">
                <i class="fas fa-phone"></i>
              </button>
              <button class="action-icon">
                <i class="fas fa-video"></i>
              </button>
              <button class="action-icon">
                <i class="fas fa-ellipsis-v"></i>
              </button>
            </div>
          </div>
  
          <div class="chat-messages">
            <div class="message received">
              <div class="message-content">
                <p>Hello, I have a question about my recent order #37291. Some of the books arrived damaged.</p>
              </div>
              <span class="timestamp">10:15 AM</span>
            </div>
            <div class="message sent">
              <div class="message-content">
                <p>I'm sorry to hear that, Sarah. Can you provide some details about which books were damaged?</p>
              </div>
              <span class="timestamp">10:17 AM</span>
            </div>
            <div class="message received">
              <div class="message-content">
                <p>The copy of "History of Modern Literature" has water damage on several pages, and "The Great Adventure" has a torn cover.</p>
              </div>
              <span class="timestamp">10:20 AM</span>
            </div>
            <div class="message sent">
              <div class="message-content">
                <p>Thank you for providing these details. We apologize for the inconvenience. We can process a replacement for these items right away.</p>
              </div>
              <span class="timestamp">10:22 AM</span>
            </div>
            <div class="message received">
              <div class="message-content">
                <p>That would be great, thank you!</p>
              </div>
              <span class="timestamp">10:23 AM</span>
            </div>
            <div class="message sent">
              <div class="message-content">
                <p>You're welcome! I've processed the replacements. They should ship within the next 24 hours. Is there anything else I can help you with today?</p>
              </div>
              <span class="timestamp">10:25 AM</span>
            </div>
            <div class="message received">
              <div class="message-content">
                <p>No, that's all. Thanks for your help with my order. I appreciate the quick response.</p>
              </div>
              <span class="timestamp">10:27 AM</span>
            </div>
          </div>
  
          <div class="chat-input">
            <button class="attachment-btn">
              <i class="fas fa-paperclip"></i>
            </button>
            <input type="text" placeholder="Type a message..." />
            <button class="emoji-btn">
              <i class="fas fa-smile"></i>
            </button>
            <button class="send-btn">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
  
        <div class="chat-info">
          <div class="customer-info">
            <h2>Customer Info</h2>
            <div class="info-section">
              <div class="avatar-large"></div>
              <h3>Sarah Johnson</h3>
              <p>Premium Member</p>
            </div>
            <div class="info-details">
              <div class="detail-item">
                <span class="label">Email:</span>
                <span class="value">sarah.johnson@email.com</span>
              </div>
              <div class="detail-item">
                <span class="label">Phone:</span>
                <span class="value">+1 (555) 123-4567</span>
              </div>
              <div class="detail-item">
                <span class="label">Address:</span>
                <span class="value">123 Book Lane, Reading, CA 90210</span>
              </div>
              <div class="detail-item">
                <span class="label">Member since:</span>
                <span class="value">March 2023</span>
              </div>
            </div>
          </div>
  
          <div class="order-history">
            <h2>Order History</h2>
            <div class="order-item">
              <div class="order-header">
                <span class="order-id">#37291</span>
                <span class="order-date">April 27, 2025</span>
              </div>
              <div class="order-details">
                <p>3 items - $54.99</p>
                <span class="order-status shipped">Shipped</span>
              </div>
            </div>
            <div class="order-item">
              <div class="order-header">
                <span class="order-id">#36782</span>
                <span class="order-date">March 15, 2025</span>
              </div>
              <div class="order-details">
                <p>2 items - $32.50</p>
                <span class="order-status delivered">Delivered</span>
              </div>
            </div>
            <div class="order-item">
              <div class="order-header">
                <span class="order-id">#35609</span>
                <span class="order-date">February 2, 2025</span>
              </div>
              <div class="order-details">
                <p>5 items - $79.95</p>
                <span class="order-status delivered">Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CustomerService'
  }
  </script>
  
  <style scoped>
  .customer-service {
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
  
  .chat-container {
    display: flex;
    height: calc(100vh - 80px);
  }
  
  .chat-sidebar {
    width: 300px;
    background-color: white;
    border-right: 1px solid #eee;
    display: flex;
    flex-direction: column;
  }
  
  .search-box {
    display: flex;
    padding: 15px;
    border-bottom: 1px solid #eee;
  }
  
  .search-box input {
    flex: 1;
    border: 1px solid #eee;
    border-radius: 20px;
    padding: 10px 15px;
    font-size: 14px;
  }
  
  .search-btn {
    background: none;
    border: none;
    margin-left: 10px;
    cursor: pointer;
  }
  
  .chat-list {
    flex: 1;
    overflow-y: auto;
  }
  
  .chat-item {
    display: flex;
    padding: 15px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
  }
  
  .chat-item.active {
    background-color: #f5f5f5;
  }
  
  .chat-avatar {
    width: 40px;
    height: 40px;
    background-color: #eee;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .chat-details {
    flex: 1;
    overflow: hidden;
  }
  
  .chat-details h3 {
    margin: 0;
    font-size: 14px;
    margin-bottom: 5px;
  }
  
  .chat-details p {
    margin: 0;
    font-size: 12px;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .chat-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  
  .timestamp {
    font-size: 12px;
    color: #999;
  }
  
  .notification {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #1890ff;
    color: white;
    border-radius: 50%;
    text-align: center;
    font-size: 12px;
    line-height: 20px;
    margin-top: 5px;
  }
  
  .chat-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: white;
  }
  
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #eee;
  }
  
  .chat-person {
    display: flex;
    align-items: center;
  }
  
  .chat-person .chat-details h3 {
    margin: 0;
    font-size: 16px;
  }
  
  .status {
    font-size: 12px;
    display: flex;
    align-items: center;
  }
  
  .status:before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 5px;
  }
  
  .status.online:before {
    background-color: #52c41a;
  }
  
  .chat-actions {
    display: flex;
  }
  
  .action-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #f5f5f5;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    cursor: pointer;
  }
  
  .chat-messages {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    background-color: #f9f9f9;
  }
  
  .message {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    max-width: 70%;
  }
  
  .message.received {
    align-items: flex-start;
  }
  
  .message.sent {
    align-items: flex-end;
    align-self: flex-end;
  }
  
  .message-content {
    padding: 10px 15px;
    border-radius: 15px;
    margin-bottom: 5px;
  }
  
  .message.received .message-content {
    background-color: white;
    border: 1px solid #eee;
  }
  
  .message.sent .message-content {
    background-color: #e6f7ff;
    color: #1890ff;
  }
  
  .message .timestamp {
    font-size: 10px;
  }
  
  .chat-input {
    display: flex;
    align-items: center;
    padding: 15px;
    border-top: 1px solid #eee;
  }
  
  .chat-input input {
    flex: 1;
    border: 1px solid #eee;
    border-radius: 20px;
    padding: 10px 15px;
    margin: 0 10px;
    font-size: 14px;
  }
  
  .attachment-btn, .emoji-btn, .send-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #f5f5f5;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  
  .send-btn {
    background-color: #1890ff;
    color: white;
  }
  
  .chat-info {
    width: 300px;
    background-color: white;
    border-left: 1px solid #eee;
    padding: 15px;
    overflow-y: auto;
  }
  
  .customer-info, .order-history {
    margin-bottom: 20px;
  }
  
  .customer-info h2, .order-history h2 {
    font-size: 16px;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .info-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .avatar-large {
    width: 80px;
    height: 80px;
    background-color: #eee;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  
  .info-section h3 {
    margin: 5px 0;
    font-size: 16px;
  }
  
  .info-section p {
    margin: 0;
    font-size: 14px;
    color: #1890ff;
  }
  
  .info-details {
    margin-bottom: 20px;
  }
  
  .detail-item {
    margin-bottom: 10px;
  }
  
  .label {
    font-weight: bold;
    margin-right: 5px;
    color: #666;
  }
  
  .order-item {
    background-color: #f9f9f9;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .order-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  
  .order-id {
    font-weight: bold;
  }
  
  .order-date {
    font-size: 12px;
    color: #999;
  }
  
  .order-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .order-details p {
    margin: 0;
    font-size: 14px;
  }
  
  .order-status {
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 10px;
  }
  
  .order-status.shipped {
  background-color: #fff7e6;
  color: #faad14;
}

.order-status.delivered {
  background-color: #f6ffed;
  color: #52c41a;
}
</style>
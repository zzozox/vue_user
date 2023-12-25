<template>
  <Header></Header>
  <section class="message-center">
    <h2 class="message-title">消息中心</h2>
    <ul class="message-container">
      <li class="message-item" v-for="(message, index) in messages" :key="index">
        <div class="message-content">
          <h3 class="message-heading">{{ message.title }}</h3>
          <time class="message-time">{{ message.time }}</time>
          <p class="message-detail">{{ message.content }}</p>
        </div>
        <button class="message-read">已读</button>
        <button class="message-delete" @click="deleteMessage(index)">
          <span class="glyphicon glyphicon-remove"></span>
        </button>
      </li>
    </ul>
  </section>
</template>

<script setup>
import Header from "@/component/Header.vue";
import {onMounted, ref} from 'vue';
import axios from "axios";

const messages = ref([
  {
    title: '系统提醒',
    time: '2021-06-08 06:20:07',
    content: '你好！你的主题为《肖生克的救赎》的视频审核通过。'
  },
]);
const getMessages=()=>{
  axios.post('',{}).then(response=>{
    messages.value=response.data;
  }).catch(error=>{
    console.log(error.message);
  })
}
const deleteMessage = (index) => {
  messages.value.splice(index, 1);
};

onMounted(()=>{
  getMessages();
})
</script>

<style scoped>
.message-center {
  margin-top: 100px; /* 或者根据 Header 高度调整 */
  padding: 0 1rem;
}

.message-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.message-container {
  list-style-type: none;
  padding: 0;
  max-width: 800px;
  margin: 0 auto;
}

.message-item {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.message-content {
  flex: 1;
}

.message-heading {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.message-time {
  font-size: 0.875rem;
  color: #888;
}

.message-detail {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.message-read {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.message-delete {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.glyphicon-remove {
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  .message-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .message-read,
  .message-delete {
    width: 100%;
    margin: 0.5rem 0;
  }
}
</style>

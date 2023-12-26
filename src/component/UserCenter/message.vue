<template>
  <section class="message-center">
<!--    <h2 class="message-title">Messages</h2>-->
    <ul class="message-container">
      <li class="message-item" v-for="(message, index) in Messages" :key="index">
        <div class="message-content">
          <h3 class="message-heading">{{ message.msgTitle }}</h3>
          <time class="message-time">{{ message.msgSendDate }}</time>
          <p class="message-detail">{{ message.msgContext }}</p>
        </div>
        <button v-show="message.msgState.stateId===6" class="message-read" @click="read(message)">未读</button>
        <button v-show="message.msgState.stateId===7" class="message-read">已读</button>
        <button class="message-delete" @click="deleteMessage(message)">删除</button>
      </li>
    </ul>
  </section>
</template>

<script setup>
import axios from "axios";
import {ref,onMounted} from 'vue';
const user=ref({})
const userId=ref(sessionStorage.getItem('userId'))
const getUser=()=>{
  axios.post(`/user/getUserById/${userId.value}`,{userId:userId.value}).then(response=>{
    user.value=response.data;
  }).catch(error=>{
    console.log(error.message);
  })
}
//获取的全部是系统消息
const Messages = ref([]);
const getMessages=()=>{
  let params = new URLSearchParams();
  params.append('userId', userId.value);
  params.append('msgTypeName', 'SystemMsg');
  axios.post(`/message/getMsgListByType`,params).then(response=>{
    Messages.value=response.data.data;
    console.log(Messages.value)
  }).catch(error=>{
    console.log(error.message);
  })
}
//读消息
const read=(message)=>{
  axios.post(`/message/readMsg/${message.msgId}`,{msgId:message.msgId}).then(res=>{
    console.log('已读')
    getMessages()
  }
  ).catch(error=>{
    console.log(error.message)
  })
}
//删除消息
const deleteMessage=(message)=>{
  axios.post(`/message/delMsgById/${message.msgId}`,{msgId:message.msgId}).then(res=>{
        console.log('删除')
        getMessages()
      }
  ).catch(error=>{
    console.log(error.message)
  })
}

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

<template>
  <ul>
    <li v-for="item in fanArr" :key="item.userId" class="fan-item">
      <img :src="'data:image/jpeg;base64,'+item.iconUrl" alt="Profile Image" class="profile-image" />
      <p>{{ item.userName }}</p>
    </li>
  </ul>
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

const fanArr=ref([])
const getFans=()=>{
  axios.post(`/focus/fansList/${userId.value}`,{userId:userId.value}).then(response=>{
    fanArr.value=response.data.data;
    console.log(' fanArr.value', response.data.data);
    for(const item of fanArr.value){
      axios.post(`/user/getIcon/${item.userId}`,{userId:item.userId}).then(response=>{
        item.iconUrl=response.data.data;
        console.log('item.iconUrl', item.iconUrl)
      }).catch(error=>{
        console.log(error.message)
      })
    }
  }).catch(error=>{
    console.log(error.message);
  })
}

onMounted(()=>{
  getFans();
  getUser();
})
</script>

<style>
.fan-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* 可根据需要调整 */
}

.profile-image {
  width: 40px; /* 调整头像大小 */
  height: 40px; /* 调整头像大小 */
  border-radius: 50%; /* 使头像成为圆形 */
  margin-right: 10px; /* 头像和用户名之间的间距 */
}

p {
  margin: 0; /* 移除段落默认的外边距 */
}

/* 可以添加媒体查询以进一步优化响应式布局 */
@media (max-width: 600px) {
  .fan-item {
    /* 在小屏幕上的样式调整 */
  }
}
</style>

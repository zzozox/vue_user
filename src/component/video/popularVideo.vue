<template>
  <div class="popular-videos">
    <div class="container">
      <h3 class="title">最受欢迎</h3>
      <ul class="video-list">
        <li v-for="item in popularVideoArray" class="video-item" :key="item.videoId">
          <div class="video-box">
            <figure>
              <img :src="item.thunmbnailUrl" :alt="item.videoTitle" class="video-image">
            </figure>
            <div class="video-info">
              <h3 class="video-title">{{ item.videoTitle }}</h3>
              <span class="fa fa-clock-o video-icon"></span>
              <span class="fa fa-heart video-icon"></span>
            </div>
            <el-button class="watch-button" @click="toVideoPlay(item)">现在观看</el-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios";
import router from "@/router";

const popularVideoArray = ref([]);

const toVideoPlay = (item) => {
  router.push({ path: '/videoPlay', query: { videoId: item.videoId } });
};

onMounted(() => {
  axios.get('/video/getIndexRecommendVideo').then(response => {
    popularVideoArray.value = response.data;
    for (const item in popularVideoArray.value){
      axios.post(`/video/getVideoImage/${item.videoId}`,{videoId:item.videoId}).then(response=>{
        item.thunmbnailUrl=response.data;
      }).catch(error=>{
        console.error(error.message);
      })}
  }).catch(error => {
    console.log(error.message);
  });
});
</script>

<style scoped>
.popular-videos .container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.video-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  list-style-type: none;
  padding: 0;
}

.video-item {
  flex: 1 1 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.video-box {
  padding: 15px;
  text-align: center;
}

.video-image {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.video-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.video-info {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.watch-button {
  border: none;
  background-color: #91c494;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
}

.watch-button:hover {
  background-color: #3a8a3e;
}

@media (max-width: 768px) {
  .video-list {
    flex-direction: column;
  }

  .video-item {
    flex-basis: 100%;
  }
}
</style>

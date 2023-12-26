<template>
  <Header></Header>
  <div class="recent-videos">
    <div class="container">
      <h3 class="section-title">搜索结果</h3>
      <div class="video-list">
        <div v-for="item in searchResults" class="video-item" :key="item.videoId">
          <div class="video-content">

            <img class="video-image" :src="'data:image/jpeg;base64,'+item.thunmbnailUrl" :alt="item.videoTitle">
            <figcaption class="video-title">{{ item.videoTitle }}</figcaption>

            <p class="video-info">{{ item.videoInfo }}</p>
            <el-button class="watch-button" @click="toVideoPlay(item)">现在观看</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup>
import { ref ,onMounted} from 'vue';
import router from '@/router';
import axios from "axios";
import Header from "@/component/Header.vue";
import Footer from "@/component/Footer.vue";
import {useRoute} from "vue-router";
const route=useRoute();
const videoTitle=ref(route.query.videoTitle)
const searchResults = ref([]);

const getSearchResults=()=>{
  axios.post(`/video/search/${videoTitle.value}`, {videoTitle:videoTitle.value}).then(response=>{
    console.log('Success:', response.data.data);
    searchResults.value=response.data.data;
    for (const item of searchResults.value) {
      console.log('item.videoId:',item.videoId)
      axios.post(`/video/getVideoImage/${item.videoId}`,{videoId:item.videoId}).then(response=>{
        item.thunmbnailUrl=response.data.data;
      }).catch(error=>{
        console.error(error.message);
      })
    }
  }).catch (error=>{
    console.error('Error:', error);
  })

}
const toVideoPlay = (item) => {
  router.push({ path: '/videoPlay', query: { videoId: item.videoId } });
};
onMounted(()=>{
  getSearchResults();
})
</script>

<style scoped>
.recent-videos .container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

.section-title {
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

.video-content {
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

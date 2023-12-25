<template>
  <Header></Header>
  <div class="search-results">
    <div class="container">
      <h3 class="section-title">搜索结果</h3>
      <div class="video-list">
        <div v-for="item in searchResults" :key="item.videoId" class="video-item">
          <figure>
            <img class="video-image" :src="item.thunmbnailUrl" :alt="item.videoTitle">
          </figure>
          <div class="video-info">
            <h3 class="video-title">{{ item.videoTitle }}</h3>
            <div class="video-details">
              <span class="fa fa-clock-o"></span> <!-- Add timestamp here -->
              <span class="fa fa-heart text-right"></span>
            </div>
            <button @click="toVideoPlay(item)" class="play-button">
              <span class="fa fa-play"></span>
              <span>现在观看</span>
            </button>
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

const searchResults = ref([]);
searchResults.value=JSON.parse(route.query.searchResults);
// const getResults=()=>{
//   axios.post('',{}).then=(response=>{
//     searchResults.value=response.data;
//   }).catch(error => {
//     console.log(error.message);
//   })
// }
// onMounted(()=>{
//   getResults();
// })
for (const item in searchResults.value){
  axios.post('/video/getVideoImage',{videoId:item.videoId}).then(response=>{
    item.thunmbnailUrl=response.data;
  }).catch(error=>{
    console.error(error.message);
  })}
const toVideoPlay = (item) => {
  router.push({ path: '/videoPlay', query: { videoId: item.videoId } });
};
</script>

<style scoped>
.search-results .container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

.section-title {
  text-align: center;
  margin-bottom: 20px;
}

.video-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.video-item {
  flex: 1 1 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.video-item figure {
  margin: 0;
}

.video-image {
  width: 100%;
  height: auto;
}

.video-info {
  padding: 15px;
  text-align: center;
  width: 100%; /* 确保宽度填满父元素 */
}

.video-title {
  display: flex;
  flex-direction: column;
  align-items: center; /* 新增：垂直居中 */
  font-weight: bold;
  margin-bottom: 5px;
}

.video-details {
  font-size: 14px;
  color: #666;
}

.fa-play.video-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  padding: 10px;
}

@media (max-width: 768px) {
  .video-list {
    flex-direction: column;
  }

  .video-item {
    flex-basis: 100%;
  }
}

.play-button {
  background-color: #91c494;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  width: 80%; /* 或根据需要设置特定宽度 */
}

.play-button:hover {
  background-color: #3a8a3e;
}

.fa-play {
  margin-right: 5px;
}
</style>

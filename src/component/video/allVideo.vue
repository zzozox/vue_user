<template>
  <div class="all-videos">
    <div class="container">
      <div class="video-header">
        <h3 class="section-title">所有</h3>
        <div class="video-categories">
          <el-button class="category-btn" @click="loadAll">查看全部<i class="fa fa-hand-o-down"></i></el-button>
          <div class="video-type-selector">
            <label>按类型：</label>
            <el-button v-for="type in videoTypes" @click="loadByType(type.id)" class="category-btn" :key="type.id">
              {{ type.name }}
            </el-button>
          </div>
        </div>
      </div>
      <ul class="video-list">
        <li v-for="item in allVideoArray" class="video-item" :key="item.videoId">
          <div class="video-box">
            <figure>
              <img :src="'data:image/jpeg;base64,'+item.thunmbnailUrl" :alt="item.videoTitle" class="video-image">
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
import {ref, onMounted, toRaw} from 'vue';
import axios from 'axios';
import router from '@/router';

const allVideoArray = ref([]);

const videoTypes = ref(
    [
      { id: 1, name: '冒险' },
      { id: 2, name: '战斗' },
      { id: 3, name: '搞笑' },
      { id: 4, name: '科幻' },
      { id: 5, name: '校园' },
      { id: 6, name: '悬疑' },
      { id: 7, name: '竞技' },
      { id: 8, name: '娱乐' },
      { id: 9, name: '科技数码' },
      { id: 10, name: '体育' },
      { id: 12, name: '国漫' },
    ]
)

const toVideoPlay = (item) => {
  router.push({ path: '/videoPlay', query: {videoId:item.videoId } });
};

const loadAll=()=>{
  axios.get('/video/getAllVideo').then(response => {
    allVideoArray.value = response.data;
    for (const item of allVideoArray.value){
      changeImg(item);
    }
  }).catch(error => {
    console.error(error.message);
  });
}
const loadByType=(typeId)=>{
  axios.post('/video/getVideoByType',{videoTypeId:typeId}).then(response=>{
    allVideoArray.value=response.data;
    for (const item of allVideoArray.value){
      changeImg(item);
    }
  }).catch(error=>{
    console.error(error.message);
  })
}
const changeImg=(item)=>{
  axios.post(`/video/getVideoImage/${item.videoId}`,{videoId:item.videoId}).then(response=>{
    item.thunmbnailUrl=response.data.data;
  }).catch(error=>{
    console.error(error.message);
  })
}
onMounted(() => {
  loadAll();
});
</script>

<style scoped>
/* 以下是样式代码，根据需要进行调整 */
.all-videos .container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

.section-title {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.video-categories {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.category-btn {
  background: #f0f0f0;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
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
}

.video-title {
  font-weight: bold;
  margin-bottom: 5px;
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

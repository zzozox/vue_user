<template>
  <div v-if="user" class="swiper-container">
    <swiper :options="swiperOptions">
      <swiper-slide v-for="item in sliderVideos" :key="item.videoId">
        <div class="slider-info" :element-loading-background="'data:image/jpeg;base64,'+item.thunmbnailUrl">
          <div class="banner-info">
            <h3>最近上线视频</h3>
            <p class="over-para">{{ item.description }}</p>
            <a @click="playVideo(item)" class="play-view">
              <span class="video-play-icon">
                <span class="fa fa-play"></span>
              </span>
              <h6>现在观看</h6>
            </a>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <!-- Swiper的导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '@/router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';

// Swiper组件需要的模块
SwiperCore.use([Navigation, Pagination]);

const user=ref(localStorage.getItem('userInfo'))
const sliderVideos = ref([]);

const swiperOptions = ref({
  slidesPerView: 3,
  spaceBetween: 30,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

const playVideo = (item) => {
  // 根据视频ID播放视频，可以跳转到视频播放页面或者实现一个弹窗播放器
  router.push({ path: '/videoPlay', query: { item } });
};

onMounted(() => {
  getSlider();
});
const getSlider=()=>{
  // 获取轮播视频数据
  axios.post('/video/getVideoListByUserId',{userId:user.value.userId}).then(response => {
    sliderVideos.value = response.data;
    for (const item of sliderVideos.value){
      changeImg(item);
      }
  }).catch(error => {
    console.error(error.message);
  });
}
const changeImg=(item)=>{
  console.log('item.videoId:',item.videoId)
  axios.post(`/video/getVideoImage/${item.videoId}`,{videoId:item.videoId}).then(response=>{
    item.thunmbnailUrl=response.data.data;
  }).catch(error=>{
    console.error(error.message);
  })
}
</script>


<style scoped>
.swiper-container {
  width: 100%;
  height: 300px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 100%;
}

.slider-info {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-info {
  text-align: center;
  color: white;
}

.over-para {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
}

.play-view {
  display: inline-block;
  margin-top: 10px;
  background-color: #ff5722;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
}

.play-view:hover {
  background-color: #e64a19;
}

.video-play-icon {
  margin-right: 5px;
}

.swiper-button-prev,
.swiper-button-next {
  color: white;
  width: 30px;
  height: 30px;
}

.swiper-pagination {
  bottom: 10px;
}
</style>

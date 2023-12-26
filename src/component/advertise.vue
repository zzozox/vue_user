<template>
  <div class="ad-container">
    <img :src="'data:image/jpeg;base64,'+advertise" class="video-image">
  </div>

</template>

<script setup>
import {ref,onMounted} from 'vue';
import axios from "axios";
const advertise=ref()
const getAdvertise=()=>{
  axios.get('/advertisement/getAd').then(response=>{
    advertise.value=response.data.data;
    console.log(advertise.value)
  })
}
onMounted(()=>{
  getAdvertise();
})

</script>

<style scoped>
.ad-container {
  width: 20%; /* 设置宽度为界面的五分之一 */
  position: relative; /* 根据需要调整位置 */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  border-radius: 10px; /* 圆角边框 */
  overflow: hidden; /* 确保图片圆角 */
  margin: 10px; /* 添加外边距 */
  transition: transform 0.3s ease-in-out; /* 平滑的过渡效果 */
}

.video-image {
  width: 100%; /* 图像宽度与容器宽度相同 */
  height: auto; /* 保持图像的宽高比 */
  display: block; /* 删除图像下方的空白 */
}

.ad-container:hover {
  transform: scale(1.05); /* 鼠标悬停时放大 */
}
</style>

<template>
  <div class="form-container">
    <form class="video-form">
      <div class="form-group">
        <label for="videoTitle">视频标题:</label>
        <input type="text" id="videoTitle" v-model="form.videoTitle" required>
      </div>

      <div class="form-group">
        <label for="videoInfo">视频描述:</label>
        <textarea id="videoInfo" v-model="form.videoInfo" placeholder="请输入内容"></textarea>
      </div>

      <div class="form-group">
        <label for="typeName">视频类型:</label>
        <select id="typeName" v-model="form.typeName">
          <option value="冒险">冒险</option>
          <option value="战斗">战斗</option>
          <option value="搞笑">搞笑</option>
          <option value="科幻">科幻</option>
          <option value="校园">校园</option>
          <option value="悬疑">悬疑</option>
          <option value="竞技">竞技</option>
          <option value="娱乐">娱乐</option>
          <option value="科技数码">科技数码</option>
          <option value="体育">体育</option>
          <option value="美食">美食</option>
          <option value="音乐">音乐</option>
          <option value="国漫">国漫</option>
        </select>
      </div>
    </form>
    <image-upload @image-uploaded="handleImageUploaded"></image-upload>
    <el-button @click="uploadImg">上传视频封面</el-button>
    <video-upload @video-uploaded="handleVideoUploaded"></video-upload>
    <el-button @click="uploadVideo">上传视频</el-button>
    <el-button @click="handin">立即提交</el-button>
  </div>
</template>

<script setup>
import ImageUpload from "@/component/upload/imageUpload.vue";
import VideoUpload from "@/component/upload/videoUpload.vue";
import axios from "axios";
import { ref } from 'vue';
import {Open} from "@element-plus/icons-vue";

const userId=ref(sessionStorage.getItem('userId'))
const image=ref('')
const video=ref('')
const form = ref({
  videoTitle: '',
  videoInfo: '',
  typeName: '',
});
//获取上传的图片的base64编码
// const handleImageUploaded = (base64Image) => {
//   image.value=base64Image;
//   console.log('接收到的图片Base64数据：',image.value)
// };
// const uploadImg=()=>{
//   axios.post('/video/uploadImage',{file:image.value}).then(res=>{
//     if(res.data===200){
//       Element.message('上传成功');
//     }
//   }).catch(error=>{
//     console.log(error.message)
//     Element.warning('上传失败')
//   })
// }
// 获取上传的图片文件
const handleImageUploaded = (imageFile) => {
  image.value = imageFile;
  console.log('接收到的图片文件：', image.value);
};
const uploadImg = () => {
  let formData = new FormData();
  formData.append('file', image.value);
  axios.post('/video/uploadImage', formData
  //     , {
  //   headers: {
  //     'Content-Type': 'multipart/form-data'
  //   }
  // }
  ).then(res => {
    ElMessage.success('上传成功');
  }).catch(error => {
    console.log(error.message);
    // ElMessage.warning('上传失败');
  });
};


//获取上传的视频
// const handleVideoUploaded = (base64Video) => {
//   video.value=base64Video;
//   console.log("接收到的视频 Base64 数据:", video.value);
// };
//获取上传的视频文件
const handleVideoUploaded = (videoFile) => {
  video.value = videoFile;
  console.log("接收到的视频文件:", video.value);
};
const uploadVideo = () => {
  let formData = new FormData();
  formData.append('file', video.value);

  axios.post('/video/uploadVideo', formData,
  //     {
  //   headers: {
  //     'Content-Type': 'multipart/form-data'
  //   }
  // }
  ).then(res => {
    ElMessage.success('上传成功');
  }).catch(error => {
    console.log(error.message);
    // Element.warning('上传失败');
  });
};
// const uploadVideo=()=>{
//   axios.post('/video/uploadVideo',{file:video.value}).then(res=>{
//     if(res.data===200){
//       Element.message('上传成功')
//     }
//   }).catch(error=>{
//     console.log(error.message)
//     Element.warning('上传失败')
//   })
// }
//处理视频信息提交:
const handin=()=>{
  let params = new URLSearchParams();
  params.append('userId',userId.value );
  params.append('videoTitle', form.value.videoTitle);
  params.append('videoInfo', form.value.videoInfo);
  params.append('typeName', form.value.typeName);
  axios.post('/video/uAddVideo', params).then(response=>{
      ElMessage.success('上传视频信息成功')
  }).catch (error=> {
    console.log(error.message)
    ElMessage.warning('上传失败')
  })
}
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.video-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input[type="text"],
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group textarea {
  resize: vertical;
}

.el-button {
  display: block;
  width: 100%;
  margin-top: 10px;
}
</style>

<template>
  <Header></Header>
  <el-container class="video-playback-container">
    <el-row class="main-content">
      <el-col :span="16" class="left-section">

        <div class="video-container">
          <video
              :src="'data:video/mp4;base64,' + video.videoUrl"
              class="video-player"
              controls>
          </video>
        </div>
        <div class="danmaku-section">
          <scrolling></scrolling>
        </div>
      </el-col>

      <el-col :span="8" class="right-section">
        <el-card class="video-info">
          <p>名称：{{ videoUser.username }}</p>
          <!-- 其他用户信息 -->
        </el-card>
        <el-card class="video-info">
          <template #header>
            <span>视频信息</span>
          </template>
          <p>名称：{{ video.videoTitle }}</p>
          <p>描述：{{video.videoInfo}}</p>
        </el-card>
      </el-col>
    </el-row>

    <el-footer class="footer-comment">
      <div class="comment-section">
        <h5>评论区</h5>
        <el-input
            type="textarea"
            placeholder="写下精彩评论吧"
            v-model="newComment.commentInfo"
            class="comment-input">
        </el-input>
        <el-button type="primary" @click="postComment">评论</el-button>
        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <!-- 评论内容 -->
        </div>
      </div>
    </el-footer>
  </el-container>
</template>

<script setup>
import Header from "@/component/Header.vue";
import Scrolling from "@/component/videoPlay/scrolling.vue";
import {onMounted, ref, toRaw} from 'vue';
import axios from "axios";
import {useRoute} from "vue-router";
const route=useRoute();
//视频获取
const videoId=ref(route.query.videoId)
const video=ref({})
const getVideo=()=>{
  axios.post(`/video/getVideoById/${videoId.value}`,{videoId:videoId.value}).then((res)=>{
    video.value=res.data;
    console.log(' video.value',video.value)
    //请求视频base64
    changeVideo();
    //请求视频主信息
    getVideoUser();
  }).catch(error=>{
    console.log(error.message);
  })
}
const changeVideo=()=>{
  axios.post(`/video/videoPlay/${videoId.value}`,{videoId:videoId.value}).then(response=>{
    video.value.videoUrl=response.data.data;
    // console.log('video.value.videoUrl',video.value.videoUrl)
  }).catch(error=>{
    console.log(error.message);
  })
}
//视频用户
const videoUser=ref({})
const getVideoUser=()=>{
  console.log(' video.value.userId', video.value.userId)
  axios.post(`/user/getUserById/${video.value.userId}`,{userId:video.value.userId}).then(response=>{
    videoUser.value=response.data;
    console.log(' videoUser.value', videoUser.value)
  }).catch(error=>{
    console.log(error.message);
  })
}

//登录用户获取
const user=ref({})
const userId=ref(sessionStorage.getItem('userId'))
const getUser=()=>{
  axios.post(`/user/getUserById/${userId.value}`,{userId:userId.value}).then(response=>{
    user.value=response.data.data;
  }).catch(error=>{
    console.log(error.message);
  })
}

// 发布新评论的逻辑
const newComment = ref({
  commentInfo:'',
  parentId:1,
  videoId:videoId.value
});
const postComment = () => {
  axios.post('/comment/sendComment',newComment.value).then(res=>{
    if(res.data===200){
      listComments();
    }
  }).catch(error=>{
    console.log(error.message)
  })
};
//已有评论
const comments = ref([]);
const listComments=()=>{
  axios.post(`/comment/listCommentByVideoId/${videoId.value}`,{videoId:videoId.value}).then(res=>{
    comments.value=res.data;
    console.log('comments:',res.data)
  }).catch(error=>{
    console.log(error.message)
  })
}

// 回复评论的逻辑
const replyToComment = (commentId) => {

};


onMounted(()=>{
  getUser();
  getVideo();
  console.log(videoId.value)
  listComments();
})
</script>

<style scoped>
.left-section {
  display: flex;
  flex-direction: column;
  flex-basis: 70%;
  max-height: 100vh;
}

.user-info {
  /* 用户信息样式 */
}

.video-container {
  flex-grow: 1;
  /* 视频容器样式 */
}

.video-player {
  width: 100%;
  max-height: calc(100vh - 200px); /* 假设用户信息和弹幕区域高度总和为200px */
  /* 视频播放器样式，如控制尺寸等 */
}

.danmaku-section {
  /* 弹幕区域样式 */
}

.video-info {
  flex-basis: 30%;
  /* 视频信息样式 */
}

.cc_comment h5 {
  color: #333; /* 深色文字 */
  margin-bottom: 15px;
}

.comment-input {
  width: 100%; /* 宽度100% */
  border: 1px solid #ddd; /* 边框 */
  border-radius: 4px; /* 圆角边框 */
  padding: 10px;
  resize: vertical; /* 允许垂直调整大小 */
}

.cc_comment h5 {
  color: #333;
  margin-bottom: 15px;
}

.comment-input {
  width: calc(100% - 20px); /* 减去内边距 */
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  resize: vertical;
}

/* 媒体查询，针对更小屏幕的调整 */
@media (max-width: 600px) {
  .comment-button {
    position: static;
    width: 100%;
    margin-top: 10px;
  }

  .comment-input {
    width: 100%; /* 小屏幕上，输入框占满整个宽度 */
  }
}

</style>

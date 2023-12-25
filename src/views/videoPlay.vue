<template>
  <Header></Header>
  <div class="container websitecolor">
<!--    视频及弹幕区域-->
    <div class="video-section">
      <video :src="'data:video/mp4;base64,'+video.videoUrl"></video>
      <div>
        <p>名称：{{video.videoTitle}}</p>
      </div>
      <scrolling></scrolling>
    </div>
<!--    底部评论-->
    <footer class="footer">
      <div class="cc_comment">
        <h5>评论区</h5>
        <div class="cc_comment__textarea">
          <textarea placeholder="写下精彩评论吧" v-model="newComment.commentInfo" class="comment-input"></textarea>
          <el-button type="primary" @click="postComment" class="comment-button">评论</el-button>
        </div>
        <div v-for="comment in comments" :key="comment.id" class="cc_comments">
<!--          评论-->
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Header from "@/component/Header.vue";
import Footer from "@/component/Footer.vue";
import Scrolling from "@/component/videoPlay/scrolling.vue";
import {onMounted, ref, toRaw} from 'vue';
import axios from "axios";
import {useRoute} from "vue-router";
const route=useRoute();

const videoId=ref(route.query.videoId)
const video=ref({})
const user=ref({})
user.value=sessionStorage.getItem('userInfo')

//发送的评论
const newComment = ref({
  commentInfo:'',
  parentId:1,
  videoId:videoId.value
});
//已有评论
const comments = ref([]);
//列出该视频的评论
const listComments=()=>{
  axios.post(`/comment/listCommentByVideoId/${videoId.value}`,{videoId:videoId.value}).then(res=>{
    comments.value=res.data;
    console.log('comments:',comments.value)
  }).catch(error=>{
    console.log(error.message)
  })
}
// 发布新评论的逻辑
const postComment = () => {
  axios.post('/comment/sendComment',newComment.value).then(res=>{
    if(res.data===200){
      listComments();
    }
  }).catch(error=>{
    console.log(error.message)
  })
};
// 回复评论的逻辑
const replyToComment = (commentId) => {

};

const getVideo=()=>{
  axios.post(`/video/getVideoById/${videoId.value}`,{videoId:videoId.value}).then((res)=>{
    console.log(res.data)
    video.value=res.data;
    changeVideo();
  }).catch(error=>{
    console.log(error.message);
  })
}
const changeVideo=()=>{
  axios.post(`/video/videoPlay/${videoId.value}`,{videoId:videoId.value}).then(response=>{
    console.log(response.data.data)
    video.value.videoUrl=response.data.data;
  }).catch(error=>{
    console.log(error.message);
  })
}
onMounted(()=>{
  getVideo();
  console.log(videoId.value)
  listComments();
})
</script>

<style scoped>
.container {
  margin: 0;
  padding: 0;
  border: none;
}

.video-section {
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
}

.video-container {
  flex-basis: 60%;
}

.video-player {
  width: 100%;
  height: auto;
}

.cc_comment {
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
}

.cc_comment__textarea {
  margin-bottom: 20px;
}

.comment-input {
  width: 100%;
  height: 100px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.comment-button {
  float: right;
  margin-top: 10px;
}

.cc_comments {
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
}

.child-comments {
  margin-left: 20px;
  border-left: 2px solid #eee;
  padding-left: 10px;
}

.child-comment {
  margin-bottom: 10px;
}

.comment-user {
  font-weight: bold;
  color: #333;
}

.comment-content {
  margin-top: 5px;
  color: #666;
}

@media (max-width: 768px) {
  .video-section {
    flex-direction: column;
  }

  .video-container {
    flex-basis: 100%;
  }
}
</style>

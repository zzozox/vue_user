<template>
  <Header></Header>
  <el-container class="video-playback-container">
    <el-row class="main-content">
      <el-col :span="16" class="left-section">

        <div class="video-container">
          <video :src="'data:video/mp4;base64,' + video.videoUrl" class="video-player" controls></video>
        </div>

        <div class="container-fluid custom-container">
          <div class="row">
            <div class="col-12 mb-3">
              <div class="row g-2">
                <div class="col-sm-9 col-8">
                  <input
                      type="text"
                      class="form-control custom-input"
                      placeholder="请输入弹幕内容"
                      v-model="newComment.commentInfo"
                  />
                </div>
                <div class="col-sm-3 col-4">
                  <button
                      type="button"
                      class="btn btn-primary btn-sm w-100 custom-button"
                      title="弹幕"
                      @click="postComment"
                  >
                    发布弹幕
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="8" class="right-section">
        <el-card class="video-info">
<!--          <img :src="'data:image/jpeg;base64,'+videoUser.iconUrl" alt="Profile Image" />-->
          <p>名称：{{ videoUser.userName }}</p>
          <el-button v-show="!user.userId!==video.userId" @click="focusing">关注</el-button>
          <p>粉丝：{{videoUser.fanNum}}</p>
        </el-card>
        <el-card class="video-info">
          <template #header>
            <span>视频信息</span>
          </template>
          <p>名称：{{ video.videoTitle }}</p>
          <p>描述：{{video.videoInfo}}</p>
          <p>观看量：{{video.viewNum}}</p>
          <p>上传日期：{{video.editDate}}</p>
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
          <img :src="'data:image/jpeg;base64,'+comment.userUrl" alt="User Image" />
          <div class="comment-content">
            <span class="username">{{comment.username}}</span>
            <span class="commentInfo">{{comment.commentInfo}}</span>
            <span class="commentDate">{{comment.commentDate}}</span>
          </div>
        </div>
      </div>
    </el-footer>
  </el-container>
</template>

<script setup>
import Header from "@/component/Header.vue";
import Scrolling from "@/component/videoPlay/scrolling.vue";
import {onMounted, ref, toRaw,computed} from 'vue';
import vueDanmaku from 'vue3-danmaku';
import axios from "axios";
import {useRoute} from "vue-router";
import {ElMessage} from "element-plus";
const route=useRoute();
//视频获取
const videoId=ref(route.query.videoId)
const video=ref({})
const getVideo=()=>{
  axios.post(`/video/getVideoById/${videoId.value}`,{videoId:videoId.value}).then((res)=>{
    video.value=res.data;
    console.log(video.value)
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
    axios.post(`/user/getIcon/${video.value.userId}`,{userId:video.value.userId}).then(response=>{
      videoUser.iconUrl=response.data.data;
      console.log('videoUser.iconUrl', videoUser.iconUrl)
    }).catch(error=>{
      console.log(error.message)
    })
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
    axios.post(`/user/getIcon/${userId.value}`,{userId:userId.value}).then(response=>{
      user.iconUrl=response.data.data;
      console.log('user.iconUrl', user.iconUrl)
    }).catch(error=>{
      console.log(error.message)
    })
  }).catch(error=>{
    console.log(error.message);
  })
}

// 发布新评论的逻辑
const newComment = ref({
  id:0,
  userId:userId.value,
  videoId:videoId.value,
  commentDate:'',
  commentInfo:'',
  parentId:0,
  userName:user.value.username,
  userUrl:user.value.iconUrl,
  replies:null
});
const postComment = () => {
  let params = new URLSearchParams();
  params.append('userId',userId.value)
  params.append('parentId',newComment.value.parentId)
  params.append('videoId',newComment.value.videoId)
  params.append('commentInfo',newComment.value.commentInfo)
  axios.post('/comment/sendComment',params).then(res=>{
    ElMessage.success('发送成功')
    listComments();
  }).catch(error=>{
    console.log(error.message)
  })
};
//已有评论
const comments = ref([]);
const listComments=()=>{
  axios.post(`/comment/listCommentByVideoId/${videoId.value}`,{videoId:videoId.value}).then(res=>{
    comments.value=res.data;
    console.log('comments:',comments.value)
    for (const item of comments.value){
      console.log(item)
      changeImage(item);
    }
  }).catch(error=>{
    console.log(error.message)
  })
}
//用户头像
const changeImage=(item)=>{
  axios.post(`/user/getIcon/${item.userId}`,{userId:item.userId}).then(response=>{
    item.userUrl=response.data.data;
    console.log('item.userUrl',item.userUrl)
  }).catch(error=>{
    console.log(error.message)
  })
}

// 回复评论的逻辑
const replyToComment = (commentId) => {

};
//关注
const focusing=()=>{
  let params = new URLSearchParams();
  params.append('fanId',userId.value)
  params.append('focusedId',videoUser.value.userId)
  axios.post("/focus/focusUser",params).then(()=>{
    ElMessage.success("关注成功")
  }).catch(error=>{
    console.log(error.message)
  })
}
//弹幕滚动

onMounted(()=>{
  console.log(videoId.value)
  getUser();
  getVideo();
  getVideoUser();
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
  position: relative;
  flex-grow: 1;
}

.video-player {
  width: 100%;
  max-height: calc(100vh - 200px);
}

.barrage-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.barrage {
  position: absolute;
  left: 100%;
  white-space: nowrap;
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
.comment-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
}

.comment-item img {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.comment-content {
  display: flex;
  flex-direction: column;
}

.comment-content .username {
  font-weight: bold; /* 使用户名更突出 */
}

.comment-content .commentInfo {
  margin-top: 5px;
}

.comment-content .commentDate {
  margin-top: 5px;
  color: #999;
}
.custom-container {
  max-width: 100%;
}

.custom-input {
  border: 1px solid #ced4da;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-family: 'Arial', sans-serif;
}

.custom-button {
  background-color: #91c494;
  border-radius: 5px;
  font-family: 'Arial', sans-serif;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.custom-button:hover {
  background-color: #3a8a3e;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

</style>

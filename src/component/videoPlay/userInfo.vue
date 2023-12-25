<template>
  <div class="container">
    <div class="row user-info-row">
      <!-- 用户名和头像部分 -->
      <div class="col-md-6 col-lg-3 user-details">
        <div class="user-avatar">
          <!-- img标签的src属性应通过数据绑定动态获取 -->
<!--          <img src="user.value.iconUrl" alt="User Avatar">-->
        </div>
        <div class="user-nickname">{{user.value.userName}}</div>
        <div class="user-stats">
          <span class="user-followers">{{user.value.fanNum}}</span>
        </div>
      </div>

      <!-- 互动按钮组 -->
      <div class="col-md-6 col-lg-3 ml-auto user-actions">
        <button @click="follow" type="button" id="focuson" class="btn btn-primary btn-sm">
          <i class="glyphicon glyphicon-plus"></i> 关注
        </button>
<!--        <button type="button" class="btn btn-secondary btn-sm" data-toggle="modal" data-target="#privatemsg">-->
<!--          <i class="glyphicon glyphicon-comment"></i> 私信-->
<!--        </button>-->
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref,onMounted} from 'vue';
import axios from "axios";

const videoUser=ref({});
const user=ref(localStorage.getItem('userInfo'))
//用户头像
const userImg=ref('')
const getUserImg=()=>{
  axios.get('/user/getIcon').then(res=>{
    userImg.value=res.data
  }).catch(error=>{
    console.log(error.message)
  })
}
//用户信息
const getVideoUserInfo=()=>{
  axios.post('',{}).then(res=>{
    videoUser.value=res.data;
  }).catch(error=>{
    console.log(error.message)
  })
}
//实现关注逻辑
const follow=()=>{
  axios.post('/focus/focusUser',{focusedId:user.value.id})
}

//页面加载时请求用户信息
onMounted(()=>{
  getVideoUserInfo();
  getUserImg();
})

</script>

<style scoped>
.user-info-row {
  align-items: center;
  margin-top: 10px;
}

.user-details {
  display: flex;
  align-items: center;
}

.user-avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-nickname {
  font-size: 18px;
}

.user-stats {
  display: flex;
  align-items: center;
}

.user-followers {
  margin-top: 8px;
  margin-left: 8px;
}

.user-actions {
  display: flex;
  justify-content: flex-end;
  padding: 0;
}

.user-actions button {
  margin-left: 10px;
}

@media (max-width: 768px) {
  .user-info-row {
    flex-direction: column;
  }

  .user-details {
    flex-direction: column;
    align-items: flex-start;
  }

  .user-actions {
    flex-direction: column;
    align-items: flex-start;
  }

  .user-actions button {
    margin: 5px 0;
  }
}
</style>

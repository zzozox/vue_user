<template>
  <Header></Header>
  <div class="user-center">
    <aside class="sidebar">
      <ul>
        <li @click="editComponent(editUser)">修改个人信息</li>
        <li @click="editComponent(addVideo)">上传视频</li>
        <li @click="editComponent(followings)">我的关注</li>
        <li @click="editComponent(followers)">我的粉丝</li>
        <li @click="editComponent(myVideos)">我的视频</li>
        <li @click="editComponent(message)">消息中心</li>
      </ul>
    </aside>
    <section class="content">
      <component :is="currentComponent"></component>
    </section>
  </div>
  <Footer></Footer>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import editUser from '../component/UserCenter/editUser.vue';
import addVideo from '../component/UserCenter/addVideo.vue';
import followings from '../component/UserCenter/followings.vue';
import followers from '../component/UserCenter/followers.vue';
import myVideos from '../component/UserCenter/myVideos.vue';
import message from '../component/UserCenter/message.vue';
import Header from "@/component/Header.vue";
import Footer from "@/component/Footer.vue";

const components = {
  editUser,
  addVideo,
  followings,
  followers,
  myVideos,
  message
};

const currentComponent = ref('');
const editComponent=(component)=>{
  currentComponent.value=component;
}
onMounted(()=>{
  editComponent(editUser)
})
</script>


<style scoped>
.user-center {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.sidebar {
  width: 200px;
  background-color: #f7f7f7;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar ul li {
  padding: 15px 20px;
  cursor: pointer;
  color: #333;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.sidebar ul li:hover {
  background-color: #e9ecef;
  color: #007bff;
}

.content {
  flex-grow: 1;
  padding: 20px;
  background-color: #fff;
}

@media (max-width: 768px) {
  .user-center {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
  }
}
</style>

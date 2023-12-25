<template>
  <div class="container">
    <form @submit.prevent="submitForm" class="user-form">
      <image-upload @image-uploaded="handleImageUpload" class="image-preview">
        <img :src="userImg" alt="Profile Image" />
      </image-upload>
      <el-button @click="uploadImg">上传头像</el-button>
      <div class="input-group">
        <label for="userName">用户昵称</label>
        <input id="userName" type="text" v-model="user.value.userName" required>
      </div>
<!--      <div class="input-group">-->
<!--        <label for="prePassword">密码</label>-->
<!--        <input id="prePassword" type="password" v-model="user.password" autocomplete="off">-->
<!--      </div>-->
<!--      <div class="input-group">-->
<!--        <label for="password">确认密码</label>-->
<!--        <input id="password" type="password" v-model="user.password" autocomplete="off">-->
<!--      </div>-->

<!--      <div class="input-group gender">-->
<!--        <label>性别</label>-->
<!--        <div>-->
<!--          <input type="radio" id="male" v-model="user.userSex" value="男">-->
<!--          <label for="male">男</label>-->
<!--          <input type="radio" id="female" v-model="user.userSex" value="女">-->
<!--          <label for="female">女</label>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="input-group">-->
<!--        <label for="userAge">年龄</label>-->
<!--        <input id="userAge" type="text" v-model="user.userAge" required autocomplete="off">-->
<!--      </div>-->

      <div class="input-group">
        <label for="preEncryptedProblem">密保</label>
        <input id="preEncryptedProblem" type="text" v-model="user.value.preEncryptedProblem" autocomplete="off">
      </div>

      <div class="input-group">
        <label for="encryptedProblem">修改密保</label>
        <input id="encryptedProblem" type="text" v-model="user.value.encryptedProblem" autocomplete="off">
      </div>
      <div class="input-group">
        <button type="submit">立即提交</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ImageUpload from "@/component/upload/imageUpload.vue";
import Header from "@/component/Header.vue";
import Footer from "@/component/Footer.vue";
import axios from "axios";

const userInfo = ref(localStorage.getItem('userInfo'));
const userImg=ref('')

user.value = {
  preEncryptedProblem:'',
  userId:userInfo.value.userId,
  userName:'',
  encryptedProblem:''
}


const submitForm = () => {
  console.log('提交的表单数据:', user.value);
  axios.post('/user/UEditorUser',user.value)
};

//获取上传的图片的base64编码,上传头像
const handleImageUpload = (base64Image) => {
  userImg.value=base64Image;
  console.log('接收到的图片Base64数据：',userImg.value)
};
const uploadImg=()=>{
  axios.post('/user/upload',{file:userImg.value}).then(res=>{
    if(res.data===200){
      Element.message('上传头像成功')
    }
  }).catch(error=>{
    console.log(error.message)
    Element.warning('上传头像失败')
  })
}
// onMounted(() => {
//
// });
</script>
<style scoped>
.container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.user-form {
  display: flex;
  flex-direction: column;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 10px;
  color: #333;
  font-size: 16px;
  font-weight: 500;
}

.input-group input[type="text"],
.input-group input[type="password"],
.input-group select,
.input-group textarea {
  width: 100%;
  padding: 10px;
  border: 2px solid #e2e2e2;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.input-group input[type="text"]:focus,
.input-group input[type="password"]:focus,
.input-group select:focus,
.input-group textarea:focus {
  border-color: #a4d7f5;
  outline: none;
}

.input-group button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.input-group button:hover {
  background-color: #0056b3;
}

.image-preview {
  margin-bottom: 20px;
  text-align: center;
}

.image-preview img {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
}
.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-size: 16px;
}

.input-group input[type="text"],
.input-group input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.input-group.gender label {
  margin-right: 10px;
}

.input-group.gender input[type="radio"] {
  margin-right: 5px;
}

.input-group button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.input-group button:hover {
  background-color: #0056b3;
}

/* 新增样式，以美化radio按钮和整体布局 */
.gender {
  display: flex;
  align-items: center;
}

.gender div {
  display: flex;
  align-items: center;
}

.gender input[type="radio"] {
  margin-top: 0; /* 对齐单选按钮与标签文本 */
}
</style>

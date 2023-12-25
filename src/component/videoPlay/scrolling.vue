<template>
  <div class="col-lg-9 col-md-12 mb-3">
    <div class="row g-2">
      <div class="col-sm-9 col-8">
        <input
            type="text"
            class="form-control"
            placeholder="请输入弹幕内容"
            v-model="barrageText"
        />
      </div>
      <div class="col-sm-3 col-4">
        <button
            type="button"
            class="btn btn-primary btn-sm w-100"
            title="弹幕"
            @click="sendBarrage"
        >
          发布弹幕
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const barrageText = ref(''); // 绑定弹幕输入框的数据

// 发送弹幕的函数
const sendBarrage = async () => {
  if (!barrageText.value.trim()) {
    alert('请输入弹幕内容');
    return;
  }
  axios.post('',{ text: barrageText.value }).then(response=>{
    console.log(response.data);
    // 发送成功后清空输入框
    barrageText.value = '';
  }).catch(error=>{
    console.error('发送弹幕失败:', error);
  })
}

</script>

<style scoped>

</style>

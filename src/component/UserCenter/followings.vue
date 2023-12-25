<template>
  <li v-for="item in focusArr" :key="item.userId">
    <p>{{ item.userName }}</p>
  </li>
</template>

<script setup>
import axios from "axios";
import {ref,onMounted} from 'vue';

const user=ref({})
const userId=ref(sessionStorage.getItem('userId'))
const getUser=()=>{
  axios.post(`/user/getUserById/${userId.value}`,{userId:userId.value}).then(response=>{
    user.value=response.data;
  }).catch(error=>{
    console.log(error.message);
  })
}

const focusArr=ref([])
const getFocus=()=>{
  axios.post(`/focus/focusedList/${userId.value}`,{userId:userId.value}).then(response=>{
    focusArr.value=response.data.data;
    console.log('focusArr.value', response.data.data);
  }).catch(error=>{
    console.log(error.message);
  })
}

onMounted(()=>{
  getFocus();
  getUser();
})
</script>

<style scoped>

</style>

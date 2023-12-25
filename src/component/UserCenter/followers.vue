<template>
<li v-for="item in fanArr" :key="item.userId">
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

const fanArr=ref([])
const getFans=()=>{
  axios.post(`/focus/fansList/${userId.value}`,{userId:userId.value}).then(response=>{
    fanArr.value=response.data.data;
    console.log(' fanArr.value', response.data.data);
  }).catch(error=>{
    console.log(error.message);
  })
}

onMounted(()=>{
  getFans();
  getUser();
})
</script>

<style scoped>

</style>

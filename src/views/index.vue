<template>
  <Header></Header>
<!--  <slider-video></slider-video>-->
<!--  <popular-video></popular-video>-->
  <recent-video></recent-video>
  <all-video></all-video>
  <Footer></Footer>
</template>

<script setup>
import Header from "@/component/Header.vue";
import Footer from "@/component/Footer.vue";
import AllVideo from "@/component/video/allVideo.vue";
import RecentVideo from "@/component/video/recentVideo.vue";
import PopularVideo from "@/component/video/popularVideo.vue";
import { ref, onMounted, onUnmounted } from 'vue';
</script>

<style scoped>
</style>

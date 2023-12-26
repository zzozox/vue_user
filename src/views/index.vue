<template>
  <Header></Header>
<!--  <slider-video></slider-video>-->
<!--  <popular-video></popular-video>-->
  <recent-video></recent-video>
  <advertise></advertise>
  <all-video></all-video>
  <Footer></Footer>
</template>

<script setup>
import Header from "@/component/Header.vue";
import Footer from "@/component/Footer.vue";
import AllVideo from "@/component/video/allVideo.vue";
import RecentVideo from "@/component/video/recentVideo.vue";
import Advertise from "@/component/advertise.vue";
import SliderVideo from "@/component/video/sliderVideo.vue";
import PopularVideo from "@/component/video/popularVideo.vue";
</script>

<style scoped>
</style>

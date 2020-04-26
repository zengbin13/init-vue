<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
import { getBannerData, getUserData } from "../api/home.js";
export default {
  name: "Home",
  methods: {
    //api
  },
  async mounted() {
    let result = await getUserData();
  }
};
</script>

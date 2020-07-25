<template>
  <v-app>
    <home-app-bar />

    <base-view />

    <Footer />
  </v-app>
</template>

<script>
import HomeAppBar from "@/layouts/common/AppBar";
import Footer from "@/components/Footer";
import BaseView from "@/components/BaseView";
export default {
  name: "HomeLayout",

  components: {
    HomeAppBar,
    Footer,
    BaseView
  }
};
</script>

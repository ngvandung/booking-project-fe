<template>
  <v-app>
    <home-app-bar />

    <base-view />

    <Footer />
  </v-app>
</template>

<script>
export default {
  name: "HomeLayout",

  components: {
    HomeAppBar: () => import("@/layouts/common/AppBar"),
    Footer: () => import("@/components/Footer"),
    BaseView: () => import("@/components/BaseView")
  }
};
</script>

<template>
  <v-app>
    <host-app-bar />

    <base-view />

    <Footer />
  </v-app>
</template>

<script>
export default {
  name: "HostLayout",
  components: {
    HostAppBar: () => import("@/layouts/host/AppBar"),
    Footer: () => import("@/components/Footer"),
    BaseView: () => import("@/components/BaseView")
  },
  beforeCreate: function() {
    let vm = this;
    if (
      localStorage.getItem("isSign") != "true" ||
      localStorage.getItem("roleName") != "ROLE_MANAGER"
    ) {
      vm.$router.replace("/error/403");
    }
  }
};
</script>

<style>
</style>
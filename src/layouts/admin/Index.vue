<template>
  <v-app>
    <admin-app-bar />

    <base-view />

    <Footer />
  </v-app>
</template>

<script>
export default {
  name: "AdminLayout",

  components: {
    AdminAppBar: () => import("@/layouts/admin/AppBar"),
    Footer: () => import("@/components/Footer"),
    BaseView: () => import("@/components/BaseView")
  },
  beforeCreate: function() {
    let vm = this;
    if (
      localStorage.getItem("isSign") != "true" ||
      localStorage.getItem("roleName") != "ROLE_ADMIN"
    ) {
      vm.$router.replace("/error/403");
    }
  }
};
</script>

<style>

</style>
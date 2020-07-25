<template>
  <v-app>
    <base-view />
  </v-app>
</template>

<script>
import BaseView from "@/components/BaseView";
export default {
  name: "HostLayout",
  components: {
    BaseView
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
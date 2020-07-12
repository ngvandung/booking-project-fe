<template>
  <drawner-bar :tabs="tabs" />
</template>

<script>
export default {
  components: { DrawnerBar: () => import("@/components/DrawnerBar.vue") },
  data() {
    return {
      roleName: localStorage.getItem("roleName"),
      tabs: {
        //items: [{ title: "Dashboard", router: "/admin/dashboard" }]
      }
    };
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
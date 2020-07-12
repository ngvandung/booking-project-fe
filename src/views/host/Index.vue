<template>
  <drawner-bar :tabs="tabs" />
</template>

<script>
export default {
  components: { DrawnerBar: () => import("@/components/DrawnerBar.vue") },
  data() {
    return {
      tabs: {
        items: [
          //{ title: "Dashboard", router: "/host/dashboard" },
          { title: "My Homes", router: "/host/homes" },
          { title: "Account Setting", router: "/host/edit-account/profile" },
          { title: "Messages", router: "/dsdsa" }
        ]
      }
    };
  },
  beforeCreate: function() {
    if (
      localStorage.getItem("isSign") != "true" ||
      localStorage.getItem("roleName") != "ROLE_HOST"
    ) {
      this.$router.replace("/error/403");
    }
  }
};
</script>

<style>
</style>
<template>
  <drawner-bar :tabs="tabs" />
</template>

<script>
import DrawnerBar from "@/components/DrawnerBar.vue";
export default {
  components: { DrawnerBar },
  data() {
    return {
      tabs: {
        items: [
          { title: "Dashboard", router: "/host/dashboard", icon: "dashboard" },
          { title: "My Houses", router: "/host/houses", icon: "house" },
          {
            title: "Account Setting",
            router: "/host/edit-account/profile",
            icon: "account_circle",
          },
          { title: "Messages", router: "/dsdsa", icon: "chat" },
        ],
      },
    };
  },
  beforeCreate: function () {
    if (
      localStorage.getItem("isSign") != "true" ||
      localStorage.getItem("roleName") != "ROLE_HOST"
    ) {
      this.$router.replace("/error/403");
    }
  },
};
</script>

<style>
</style>
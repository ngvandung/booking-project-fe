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
          {
            title: "Dashboard",
            router: "/manager/dashboard",
            icon: "dashboard",
          },
          {
            title: "Account Setting",
            router: "/manager/edit-account/profile",
            icon: "account_circle",
          },
          {
            title: "Host Pending",
            router: "/manager/hosts",
            icon: "supervisor_account",
          },
          {
            title: "House Pending",
            router: "/manager/houses",
            icon: "house",
          },
        ],
      },
    };
  },
  beforeMount: function () {
    let vm = this;
    if (
      localStorage.getItem("isSign") != "true" ||
      localStorage.getItem("roleName") != "ROLE_MANAGER"
    ) {
      vm.$router.replace("/error/403");
    }
  },
};
</script>

<style>
</style>
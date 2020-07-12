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
          // {
          //   title: "Dashboard",
          //   router: "/manager/dashboard"
          // },
          {
            title: "Account Setting",
            router: "/manager/edit-account/profile"
          },
          {
            title: "Host Pending",
            router: "/manager/hosts"
          },
          {
            title: "Home Pending",
            router: "/manager/homes"
          }
        ]
      }
    };
  },
  beforeMount: function() {
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
<template>
  <drawner-bar :tabs="tabs" />
</template>

<script>
import DrawnerBar from "@/components/DrawnerBar.vue";
export default {
  components: { DrawnerBar },
  data() {
    return {
      roleName: localStorage.getItem("roleName"),
      tabs: {
        items: [
          {
            title: "List Users",
            router: "/admin/users",
            icon: "supervisor_account",
          },
          {
            title: "Indexing",
            router: "/admin/indexing",
            icon: "list",
          },
        ],
      },
    };
  },
  beforeCreate: function () {
    let vm = this;
    if (
      localStorage.getItem("isSign") != "true" ||
      localStorage.getItem("roleName") != "ROLE_ADMIN"
    ) {
      vm.$router.replace("/error/403");
    }
  },
};
</script>

<style>
</style>
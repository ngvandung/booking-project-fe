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
          {
            title: "My Bookings",
            router: "/me/bookings"
          },
          {
            title: "Messages",
            router: "/hdfdsfds"
          },
          {
            title: "Account Setting",
            router: "/me/edit-account/profile"
          },
          {
            title: "Wishlist",
            router: "/dsdsdsff"
          }
        ]
      }
    };
  },
  beforeMount: function() {
    let vm = this;
    if (localStorage.getItem("isSign") != "true") {
      vm.$router.replace("/error/403");
    }
  }
};
</script>

<style>
</style>
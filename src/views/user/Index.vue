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
            title: "My Bookings",
            router: "/me/bookings",
            icon: "assignment",
            subMenus: [
              {
                title: "House",
                router: "/me/bookings?className=com.booking.model.House"
              },
              {
                title: "Test",
                router: "/me/bookings"
              }
            ]
          },
          {
            title: "Messages",
            router: "/hdfdsfds",
            icon: "chat"
          },
          {
            title: "Account Setting",
            router: "/me/edit-account/profile",
            icon: "account_circle"
          },
          {
            title: "Wishlist",
            router: "/dsdsdsff",
            icon: "dns"
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
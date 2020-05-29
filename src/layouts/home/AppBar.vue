<template>
  <div>
    <v-app-bar id="home-app-bar" app color="white" elevation="1" height="80">
      <v-img
        src="@/assets/logo.png"
        class="mr-3 hidden-xs-only"
        contain
        max-width="52"
        width="100%"
      />

      <div>
        <v-tabs class="hidden-sm-and-down" optional>
          <v-tab
            v-for="item in items"
            :key="item.router"
            :to="item.router"
            :exact="item.title === 'Flight + Hotel'"
            :ripple="false"
            active-class="text--primary"
            class="font-weight-bold"
            min-width="96"
            text
          >{{ item.title }}</v-tab>
        </v-tabs>
      </div>

      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer" />

      <v-spacer />
      <template v-if="isSign">
        <h2 style="padding: 0 20px">Xin chào: {{username}}</h2>
        <button v-on:click="logout()" class="btn btn-primary">Logout</button>
      </template>
      <template v-else>
        <v-hover v-slot:default="{ hover }">
          <v-btn to="/host" :elevation="hover ? 6 : 2" class="ma-2" outlined color="#ff567d">Host</v-btn>
        </v-hover>
        <v-btn to="/login" text color="rgb(83, 146, 249)">Sign in</v-btn>
        <v-hover v-slot:default="{ hover }">
          <v-btn
            to="/registry"
            :elevation="hover ? 6 : 2"
            class="ma-2"
            outlined
            color="rgb(83, 146, 249)"
          >Create Account</v-btn>
        </v-hover>
      </template>
    </v-app-bar>

    <home-drawer v-model="drawer" :items="items" />
  </div>
</template>

<script>
export default {
  name: "HomeAppBar",
  components: {
    HomeDrawer: () => import("./Drawer")
  },
  data: () => ({
    drawer: null,
    items: [
      { title: "Flight + Hotel", router: "/flighthotel" },
      { title: "Hotels & Homes", router: "/hotelhome" },
      { title: "Flights", router: "/flight" },
      { title: "Today’s deals", router: "/deal" }
    ]
  }),
  methods: {
    logout() {
      localStorage.clear();
      this.$router.go();
    }
  }
};
</script>

<style>
#home-app-bar .v-tabs-slider {
  max-width: 24px;
  margin: 0 auto;
}

#home-app-bar .v-tab::before {
  display: none;
}
</style>
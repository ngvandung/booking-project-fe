<template>
  <div>
    <v-app-bar id="home-app-bar" app color="white" elevation="1" height="80">
      <router-link to="/">
        <v-img
          src="/static/images/favicon.ico"
          class="mr-3 hidden-xs-only"
          contain
          max-width="52"
          width="100%"
        />
      </router-link>

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
          >{{ item.title }}</v-tab>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn white icon v-on="on">
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-title>Click 1</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Click 2</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Click 3</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-tabs>
      </div>

      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer" />

      <v-spacer />
      <template v-if="isSign">
        <template v-if="isHost">
          <v-hover v-slot:default="{ hover }">
            <v-btn
              style="margin-right: 20px!important"
              :elevation="hover ? 6 : 2"
              class="ma-2"
              outlined
              color="#ff567d"
              v-on:click="toHost"
            >Host</v-btn>
          </v-hover>
        </template>
        <v-menu content-class="menu-setting-profile" offset-y>
          <template v-slot:activator="{ on }">
            <v-chip
              style="height: 40px; padding: 15px;"
              class="ma-2"
              color="primary"
              v-on="on"
              outlined
              pill
            >
              <v-avatar left>
                <v-img :src="user.avatar"></v-img>
              </v-avatar>
              {{username}}
            </v-chip>
          </template>
          <v-list style="padding: 0">
            <v-list-item v-for="(item, index) in profileMenu" :key="index">
              <v-list-item-title>
                <template v-if="item.title == 'Logout'">
                  <v-btn text small v-on:click="logout()">{{ item.title }}</v-btn>
                </template>
                <template v-else>
                  <v-btn text small :to="item.router">{{ item.title }}</v-btn>
                </template>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-else>
        <v-btn to="/login" text color="rgb(83, 146, 249)">Sign in</v-btn>
        <v-dialog width="750" height="100%">
          <template v-slot:activator="{ on }">
            <v-hover v-slot:default="{ hover }">
              <v-btn
                :elevation="hover ? 6 : 2"
                class="ma-2"
                outlined
                color="rgb(83, 146, 249)"
                v-on="on"
              >Create Account</v-btn>
            </v-hover>
          </template>
          <registry />
        </v-dialog>
      </template>
    </v-app-bar>

    <home-drawer v-model="drawer" :items="items" />
  </div>
</template>

<script>
import HomeDrawer from "./Drawer";
import Registry from "@/views/common/Registry.vue";
export default {
  name: "HomeAppBar",
  components: {
    HomeDrawer,
    Registry,
  },
  data: () => ({
    user: {
      userId: "",
      username: "",
      firstName: "",
      lastName: "",
      age: 0,
      address: "",
      email: "",
      phone: "",
      birthDay: "",
      description: "",
      avatar: "",
    },
    profileMenu: [],
    drawer: null,
    items: [
      { title: "Flight + Hotel", router: "/flighthotel" },
      { title: "Hotels & Homes", router: "/hotelhome" },
      { title: "Flights", router: "/flight" },
      { title: "Today’s deals", router: "/deal" },
    ],
    isSign: false,
    username: "",
    isHost: false,
    roleName: "",
  }),
  methods: {
    logout() {
      localStorage.clear();
      this.$router.go();
    },
    toHost() {
      let vm = this;
      let userId = localStorage.getItem("userId");
      vm.$axios
        .get(`/booking/api/v1/user/` + userId, {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        })
        .then((response) => {
          let hashSecret = response.data.hashSecret;
          let tmnCode = response.data.tmnCode;
          if (hashSecret && tmnCode) {
            vm.$router.push("/host");
          } else {
            vm.$router.push("/host/edit-account/profile");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created: function () {
    let vm = this;
    vm.isSign = localStorage.getItem("isSign") === "true" ? true : false;
    vm.username = localStorage.getItem("username");
    vm.isHost = localStorage.getItem("roleName") === "ROLE_HOST" ? true : false;
    vm.roleName = localStorage.getItem("roleName");

    if (vm.roleName != "ROLE_ADMIN") {
      let typeUser = "/me";
      if (vm.roleName == "ROLE_HOST") {
        typeUser = "/host";
      } else if (vm.roleName == "ROLE_MANAGER") {
        typeUser = "/manager";
      } else {
        vm.profileMenu.push({
          title: "My Bookings",
          router: "/me/bookings?className=com.booking.model.House",
        });
      }
      vm.profileMenu.push({
        title: "Your Profile",
        router: typeUser + "/edit-account/profile",
      });
      vm.profileMenu.push({ title: "Message", router: "" });
      //vm.profileMenu.push({ title: "Your Setting", router: "" });
      vm.profileMenu.push({ title: "Logout", router: "" });
    } else {
      vm.profileMenu.push({ title: "Logout", router: "" });
    }

    let userId = localStorage.getItem("userId");
    if (userId) {
      vm.$axios
        .get(`/booking/api/v1/user/` + userId, {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        })
        .then((response) => {
          if (response.data) {
            vm.user = response.data;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
};
</script>

<style>
.menu-setting-profile {
  margin-top: 20px;
  contain: initial;
  overflow: visible;
}
.menu-setting-profile::before {
  position: absolute;
  content: "";
  top: 0;
  right: 33px;
  transform: translateY(-100%);
  width: 10px;
  height: 13px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 13px solid #fff;
}
</style>
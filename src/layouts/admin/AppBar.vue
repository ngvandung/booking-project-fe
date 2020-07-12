<template>
  <div>
    <v-app-bar id="admin-app-bar" app color="blue" elevation="1" height="80">
      <v-btn @click="goBack" text color="white" outlined>Back to home</v-btn>
      <v-spacer />
      <template v-if="isSign">
        <v-menu content-class="menu-setting-profile" offset-y>
          <template v-slot:activator="{ on }">
            <v-chip style="height: 37px" class="ma-2" color="#E3F2FD" v-on="on" outlined pill>
              <v-avatar left>
                <v-icon right>mdi-account-outline</v-icon>
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
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "AdminAppBar",
  methods: {
    goBack() {
      this.$router.replace(process.env.BASE_URL);
    },
    logout() {
      localStorage.clear();
      this.$router.replace(process.env.BASE_URL);
    }
  },
  data() {
    return {
      isSign: localStorage.getItem("isSign") === "true" ? true : false,
      username: localStorage.getItem("username"),
      profileMenu: [
        { title: "Your Profile", router: "" },
        { title: "Message", router: "" },
        { title: "Your Setting", router: "" },
        { title: "Logout", router: "" }
      ]
    };
  }
};
</script>

<style>
</style>
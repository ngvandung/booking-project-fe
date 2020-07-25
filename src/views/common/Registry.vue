<template>
  <div class="registry">
    <v-responsive class="d-flex" height="100%" max-width="750" width="100%">
      <v-row>
        <v-col cols="12" sm="6" style="background-color: white">
          <v-container>
            <p style="font-size: 30px">Sign up</p>
            <div>
              <v-tabs
                v-model="tabs.tabItems"
                class="d-flex justify-center align-center"
                background-color="transparent"
                color="#5392f9"
                grow
              >
                <v-tab
                  style="color: #5392f9"
                  v-for="item in tabs.items"
                  :key="item.tab"
                >{{ item.tab }}</v-tab>
              </v-tabs>
              <v-tabs-items v-model="tabs.tabItems">
                <v-tab-item v-for="item in tabs.items" :key="item.tab">
                  <v-text-field v-model="user.username" label="Username" outlined />
                  <v-text-field type="password" v-model="user.password" label="Password" outlined />
                  <v-text-field v-model="user.firstName" label="First name" outlined />
                  <v-text-field v-model="user.lastName" label="Last name" outlined />
                  <v-checkbox v-model="user.isHost" label="Host" />
                  <v-hover v-slot:default="{ hover }">
                    <v-btn
                      :elevation="hover ? 6 : 2"
                      class="ma-2"
                      width="100%"
                      outlined
                      color="rgb(83, 146, 249)"
                      v-on:click="registry()"
                    >Create Account</v-btn>
                  </v-hover>
                  <p
                    class="text-sm-left"
                  >By signing in, I agree to Booking's Terms of Use and Privacy Policy.</p>
                </v-tab-item>
              </v-tabs-items>
            </div>
          </v-container>
        </v-col>
        <v-col cols="12" sm="6" style="background-color: #ecf6ff" class="d-flex align-center">
          <v-responsive>
            <v-img
              src="@/assets/illustration-deals-social.svg"
              class="mr-3 hidden-xs-only"
              contain
            />
          </v-responsive>
        </v-col>
      </v-row>
    </v-responsive>
  </div>
</template>

<script>
export default {
  name: "Registry",
  data() {
    return {
      tabs: {
        items: [{ tab: "EMAIL" }, { tab: "MOBILE" }]
      },
      user: {
        username: "",
        firstName: "",
        lastName: "",
        age: 0,
        address: null,
        email: null,
        phone: null,
        birthDay: null,
        description: null,
        isHost: false,
        password: ""
      }
    };
  },
  methods: {
    registry() {
      let vm = this;
      if (vm.user.isHost) {
        vm.user.isHost = 1;
      } else {
        vm.user.isHost = 0;
      }
      vm.$axios
        .post(`/booking/api/v1/user`, vm.user)
        .then(response => {
          if (response.data.userId) {
            alert("Registry successfully");
          }
        })
        .catch(e => {
          vm.errors.push(e);
        });
    }
  }
};
</script>

<style>
.v-dialog--active {
  max-height: 100% !important;
}
</style>
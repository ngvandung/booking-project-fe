<template>
  <div style="background-color: #f9f9f9">
    <v-container class="d-flex justify-center align-center">
      <v-responsive class="d-flex" :elevation="20" max-width="500" style="background-color: white">
        <v-container>
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
                <v-text-field
                  v-model="user.username"
                  label="Username"
                  outlined
                  v-on:keyup.enter="login()"
                ></v-text-field>
                <v-text-field
                  type="password"
                  v-model="user.password"
                  label="Password"
                  outlined
                  v-on:keyup.enter="login()"
                ></v-text-field>
                <p
                  class="text-sm-left"
                >By signing in, I agree to Booking's Terms of Use and Privacy Policy.</p>
                <v-hover v-slot:default="{ hover }">
                  <v-btn
                    :elevation="hover ? 6 : 2"
                    class="primary"
                    width="100%"
                    v-on:click="login()"
                  >Sign in</v-btn>
                </v-hover>
              </v-tab-item>
            </v-tabs-items>
          </div>
        </v-container>
      </v-responsive>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      tabs: {
        items: [{ tab: "EMAIL" }, { tab: "MOBILE" }]
      },
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      let vm = this;
      vm.$axios
        .post(`http://localhost:8080/booking/api/v1/login`, vm.user)
        .then(response => {
          if (response.data.code == 200) {
            localStorage.setItem("jwtToken", response.data.jwtToken);
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("isSign", true);
            localStorage.setItem("roleName", response.data.roleName);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem(
              "isHost",
              response.data.isHost == 1 ? true : false
            );
            vm.$router.replace("/");
            vm.$router.go("");
          } else {
            alert(response.data.message);
          }
        })
        .catch(e => {
          vm.errors.push(e);
        });
    }
  },
  beforeCreate: function() {
    let vm = this;
    if (localStorage.getItem("isSign") === "true") {
      vm.$router.replace("/");
    }
  }
};
</script>

<style>
</style>
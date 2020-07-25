<template>
  <v-responsive class="d-flex" height="100%" width="100%">
    <div class="d-flex justify-space-between" style="height: 100%;">
      <v-card height="100%">
        <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img :src="avt"></v-img>
            </v-list-item-avatar>

            <v-list-item-title>{{userName}}</v-list-item-title>

            <v-btn icon @click.stop="mini = !mini">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-list-item>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-item-group>
              <v-list-item
                v-for="tab in tabs.items"
                :key="tab.router"
                color="rgba(0.0,0.0,0.0,0.0)"
                link
              >
                <template v-if="tab.subMenus">
                  <v-list-group style="margin-left: -15px;">
                    <template v-slot:activator>
                      <span style="margin-right: 5px;" class="material-icons">{{tab.icon}}</span>
                      <v-list-item-content>
                        <v-list-item-title v-text="tab.title"></v-list-item-title>
                      </v-list-item-content>
                    </template>

                    <v-list-item
                      v-for="subItem in tab.subMenus"
                      :key="subItem.router"
                      color="primary"
                    >
                      <router-link
                        :to="subItem.router"
                        style="text-decoration: none; color: black; width: 100%; height: 100%;"
                      >
                        <v-list-item-content>
                          <v-list-item-title
                            style="padding: 0 25px; font-size: 13px;"
                            v-text="subItem.title"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </router-link>
                    </v-list-item>
                  </v-list-group>
                </template>
                <template v-else>
                  <router-link
                    :to="tab.router"
                    style="text-decoration: none; width: 100%; height: 100%; color: black"
                    class="d-flex align-center"
                  >
                    <span style="margin-right: 10px;" class="material-icons">{{tab.icon}}</span>
                    <v-list-item-content>
                      <v-list-item-title style="font-size: 13px;" v-text="tab.title"></v-list-item-title>
                    </v-list-item-content>
                  </router-link>
                </template>
              </v-list-item>
              <v-list-item link>
                <div
                  @click="goHome"
                  class="d-flex align-center"
                  style="width: 100%; height: 100%; color: black"
                >
                  <span style="margin-right: 10px;" class="material-icons">arrow_back</span>
                  <v-list-item-content>
                    <v-list-item-title style="font-size: 13px;" v-text="'Go Home'"></v-list-item-title>
                  </v-list-item-content>
                </div>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-card>
      <div style="width: 100%">
        <router-view />
      </div>
    </div>
  </v-responsive>
</template>

<script>
export default {
  props: {
    tabs: {
      items: {
        type: Array,
        required: true,
      },
    },
  },
  name: "DrawnerBar",
  data() {
    return {
      drawer: true,
      mini: true,
      avt: "",
      userName: localStorage.getItem("username"),
    };
  },
  methods: {
    goHome() {
      let vm = this;
      vm.$router.replace(process.env.BASE_URL);
      vm.$router.go();
    },
  },
  created: function () {
    let vm = this;
    let userId = localStorage.getItem("userId");
    vm.$axios
      .get(`http://localhost:8080/booking/api/v1/user/` + userId, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((response) => {
        if (response.data) {
          vm.avt = response.data.avatar;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>

<style>
</style>
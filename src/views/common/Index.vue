<template>
  <div class="home">
    <v-img
      :min-height="minHeight"
      src="/static/images/home-hero.png"
      class="black--text"
      gradient="to right, rgb(121, 193, 204, .2), rgb(190, 224, 208, .2)"
    >
      <v-container class="fill-height px-4 py-12 justify-center align-center">
        <v-responsive class="d-flex" height="100%" max-width="650" width="100%">
          <v-responsive>
            <h1
              class="text-center"
              style="font-size: 2em; font-weight: 700;"
            >HOTELS, RESORTS, HOSTELS & MORE</h1>
            <h2
              class="text-center"
              style="font-size: 1.3em; font-weight: 400;"
            >Get the best prices on 2,000,000+ properties, worldwide</h2>
            <div>
              <v-tabs
                v-model="tabs.tabItems"
                class="d-flex justify-center align-center"
                background-color="transparent"
                color="black"
                grow
              >
                <v-tab
                  style="color: black"
                  v-for="item in tabs.items"
                  :key="item.tab"
                >{{ item.tab }}</v-tab>
              </v-tabs>
              <v-tabs-items v-model="tabs.tabItems">
                <v-tab-item v-for="(item, index) in tabs.items" :key="item.tab">
                  <v-container style="padding: 10px 30px">
                    <v-row>
                      <v-text-field
                        v-model="search.textSearch"
                        style="background-color: white;"
                        height="85"
                        hide-details="auto"
                        placeholder="Enter a destination or property"
                        v-on:keyup.enter="searchHouse()"
                        outlined
                      />
                    </v-row>
                    <v-row style="margin-top: 10px">
                      <v-menu
                        ref="fromMenu"
                        v-model="date.fromMenu"
                        :close-on-content-click="false"
                        :return-value.sync="date.fromDate"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            height="85"
                            v-model="date.fromDate"
                            readonly
                            v-on="on"
                            outlined
                            style="background-color: white;"
                          />
                        </template>
                        <v-date-picker v-model="date.fromDate" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="fromMenu[index] = false">Cancel</v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.fromMenu[index].save(date.fromDate)"
                          >OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                      <v-menu
                        ref="toMenu"
                        v-model="date.toMenu"
                        :close-on-content-click="false"
                        :return-value.sync="date.toDate"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            height="85"
                            v-model="date.toDate"
                            readonly
                            v-on="on"
                            outlined
                            style="background-color: white;"
                          />
                        </template>
                        <v-date-picker v-model="date.toDate" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="toMenu[index] = false">Cancel</v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.toMenu[index].save(date.toDate)"
                          >OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-row>
                    <v-row style="margin-top: 10px">
                      <v-combobox
                        style="background-color: white;"
                        v-model="guest.selectCBB"
                        height="85"
                        :items="guest.itemCBBs"
                        outlined
                      ></v-combobox>
                      <v-btn
                        height="85"
                        width="180"
                        color="primary"
                        v-on:click="searchHouse()"
                      >SEARCH</v-btn>
                    </v-row>
                  </v-container>
                  <v-row
                    style="margin-top: 10px; margin: 0 20px; background-color: rgb(252, 223, 207); height: 85px;"
                  >
                    <v-container>
                      <v-checkbox v-model="sale" label="Save up to 25% on hotels" />
                    </v-container>
                  </v-row>
                </v-tab-item>
              </v-tabs-items>
            </div>
          </v-responsive>
        </v-responsive>
      </v-container>
    </v-img>
  </div>
</template>

<script>
export default {
  name: "Home",
  provide: {
    theme: { isDark: true }
  },
  data() {
    return {
      search: {
        textSearch: "",
        from: "",
        to: "",
        guest: ""
      },
      tabs: {
        tabItems: null,
        items: [
          { id: 1, tab: "Hotels & Homes" },
          { id: 2, tab: "Flight + Hotel" },
          { id: 3, tab: "Flights" }
        ]
      },
      guest: {
        selectCBB: { count: 2, text: "2 guest" },
        itemCBBs: [
          { count: 1, text: "1 guest" },
          { count: 2, text: "2 guest" },
          { count: 3, text: "3 guest" },
          { count: 4, text: "4 guest" }
        ]
      },
      date: {
        fromDate: new Date().toISOString().substr(0, 10),
        toDate: new Date().toISOString().substr(0, 10),
        fromMenu: false,
        toMenu: false
      },
      sale: false
    };
  },
  methods: {
    searchHouse() {
      let vm = this;
      let link = "/search";
      if (link === "/search" && vm.search.textSearch) {
        link = link + "?text=" + vm.search.textSearch;
      } else if (link && link != "/search" && vm.search.textSearch) {
        link = link + "&text=" + vm.search.textSearch;
      }

      if (link === "/search" && vm.search.from) {
        link = link + "?from=" + vm.search.from;
      } else if (link && link != "/search" && vm.search.from) {
        link = link + "&from=" + vm.search.from;
      }

      if (link === "/search" && vm.search.to) {
        link = link + "?to=" + vm.search.to;
      } else if (link && link != "/search" && vm.search.to) {
        link = link + "&to=" + vm.search.to;
      }

      if (link === "/search" && vm.guest.selectCBB.count) {
        link = link + "?guest=" + vm.guest.selectCBB.count;
      } else if (link && link != "/search" && vm.guest.selectCBB.count) {
        link = link + "&guest=" + vm.guest.selectCBB.count;
      }

      if (vm.search.textSearch) {
        this.$router.push(link);
      }
    }
  },
  computed: {
    minHeight() {
      const height = this.$vuetify.breakpoint.mdAndUp ? "100vh" : "50vh";

      return `calc(${height} - ${this.$vuetify.application.top}px)`;
    }
  }
};
</script>

<style>
.home .v-tabs-items {
  background-color: transparent !important;
}
.home .v-input {
  height: 85px !important;
}
</style>
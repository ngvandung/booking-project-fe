<template>
  <v-item-group>
    <v-container fluid>
      <div class="d-flex justify-end" style="height: 80px;">
        <v-col cols="12" lg="6" class="d-flex align-center">
          <v-menu offset-y v-for="(el, index) in dropdownSearchs" :key="index">
            <template v-slot:activator="{ on, attrs }">
              <v-btn style="margin-right: 20px" v-bind="attrs" v-on="on">
                <span class="material-icons">{{el.icon}}</span>
                {{el.title}}
              </v-btn>
            </template>
            <v-list max-height="300px" class="overflow-y-auto">
              <v-list-item v-for="item in el.items" :key="item.id">
                <v-btn width="105" text @click="searchAPI(item.name)">{{ item.name }}</v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col cols="12" lg="6">
          <v-text-field
            v-model="search"
            outlined
            label="Search"
            type="text"
            v-on:keyup.enter="searchAPI(search)"
          >
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-progress-circular v-if="loading" size="24" color="info" indeterminate></v-progress-circular>
                <span class="material-icons">search</span>
              </v-fade-transition>
            </template>
          </v-text-field>
        </v-col>
      </div>
      <v-divider></v-divider>
      <v-row>
        <v-col
          class="home-preview"
          v-for="home in homes"
          :key="home._source.homeId"
          cols="12"
          lg="3"
        >
          <router-link
            style="text-decoration: none;"
            :to="{name: 'CommonHome', params: {homeId: home._source.homeId}}"
          >
            <v-item>
              <v-card class="mx-auto my-12" max-width="374">
                <v-img height="200" :src="home._source.avt"></v-img>
                <v-card-title class="title text-truncate">{{home._source.name}}</v-card-title>
                <v-card-text>
                  <v-row align="center" class="mx-0">
                    <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>
                    <div class="grey--text ml-4">4.5 (413)</div>
                  </v-row>
                  <div
                    class="my-4 subtitle-1 font-weight-bold"
                  >{{formatPrice(home._source.price)}}$/night</div>
                  <div
                    class="text-truncate"
                  >{{home._source.villageName}}, {{home._source.districtName}}, {{home._source.cityName}}, {{home._source.stateName}}</div>
                </v-card-text>
                <v-divider class="mx-4"></v-divider>
                <v-card-text>{{home._source.maxGuest}} guests • {{home._source.livingroom}} Livingroom • {{home._source.bathroom}} Bathroom • {{home._source.bedroom}} Bedroom</v-card-text>
              </v-card>
            </v-item>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
export default {
  name: "ListHouse",
  props: {
    query: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      homes: [],
      search: null,
      loading: false,
      dropdownSearchs: [
        { title: "Area", icon: "location_on", items: [] },
        { title: "Price", icon: "local_offer", items: [] },
        { title: "Bedrooms", icon: "weekend", items: [] },
        { title: "More filters", items: [] }
      ]
    };
  },
  created: function() {
    let vm = this;
    vm.$axios
      .post(`http://localhost:8080/booking/api/v1/_search`, vm.query)
      .then(async response => {
        for (let home of response.data.hits.hits) {
          let image = await vm.callAPI(home._source.homeId);
          home._source.avt = "http://localhost:8080/booking/images/" + image[0];
          vm.homes.push(home);
        }
      })
      .catch(err => {
        console.log(err);
      });
    vm.$axios
      .get(`http://localhost:8080/booking/api/v1/citys`, {
        params: { start: 0, end: 5000 }
      })
      .then(response => {
        for (let item of response.data.content) {
          let obj = { id: item.cityId, name: item.cityName };
          vm.dropdownSearchs[0].items.push(obj);
        }
      })
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed().replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    callAPI(homeId) {
      let vm = this;
      return new Promise((resolve, reject) => {
        vm.$axios
          .get(
            `http://localhost:8080/booking/api/v1/image/com.booking.model.Home/` +
              homeId
          )
          .then(function(response) {
            resolve(response.data.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    searchAPI(keywordSearch) {
      let vm = this;
      //let keywordSearch = vm.search;
      vm.loading = true;
      var query = {
        indice: "Home",
        query: {
          bool: {
            must: [
              {
                match: {
                  _type: "Home"
                }
              },
              {
                match: {
                  isActive: 1
                }
              }
            ]
          }
        }
      };
      if (keywordSearch) {
        query = {
          indice: "Home",
          query: {
            bool: {
              must: [
                {
                  match: {
                    _type: "Home"
                  }
                },
                {
                  match: {
                    isActive: 1
                  }
                },
                {
                  bool: {
                    should: [
                      {
                        match: {
                          name: keywordSearch
                        }
                      },
                      {
                        match: {
                          cityName: keywordSearch
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        };
      }
      vm.$axios
        .post(`http://localhost:8080/booking/api/v1/_search`, query)
        .then(async response => {
          vm.homes = [];
          for (let home of response.data.hits.hits) {
            let image = await vm.callAPI(home._source.homeId);
            home._source.avt =
              "http://localhost:8080/booking/images/" + image[0];
            vm.homes.push(home);
          }
          vm.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.home-preview .my-12 {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
</style>
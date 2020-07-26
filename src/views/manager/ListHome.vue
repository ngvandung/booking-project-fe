<template>
  <data-table :dt="homes" ref="dataTable">
    <template v-slot:data-table-title>
      <v-chip class="ma-2" color="#2196F3" label outlined>Houses are pending</v-chip>
    </template>
    <template v-slot:route-link-house-host="slotProps">
      <router-link
        style="text-decoration: none; color: rgba(0, 0, 0, 0.87);"
        :to="{name: 'CommonHome', params: {homeId: slotProps.item._source.homeId}}"
      >
        <v-menu open-on-hover :nudge-width="200" offset-y>
          <template v-slot:activator="{ on }">
            <span v-on="on">{{ slotProps.item._source.name }}</span>
          </template>
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{slotProps.item._source.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{slotProps.item._source.description}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </router-link>
    </template>
    <template v-slot:data-table-action="slotProps">
      <v-menu offset-y transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text color="primary" dark v-bind="attrs" v-on="on">
            <span class="material-icons">menu</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group color="primary">
            <v-list-item style="min-height: 30px!important;">
              <span class="material-icons">check</span>
              <v-btn small text v-on:click="actionHome(slotProps.item._source.homeId, 1)">Active</v-btn>
            </v-list-item>
            <v-list-item style="min-height: 30px!important;">
              <span class="material-icons">visibility_off</span>
              <v-btn small text v-on:click="actionHome(slotProps.item._source.homeId, 0)">Disable</v-btn>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </template>
  </data-table>
</template>

<script>
import DataTable from "@/components/DataTable.vue";
export default {
  name: "ListHomeAdmin",
  components: { DataTable },
  data() {
    return {
      homes: {
        headers: [
          { text: "Name", value: "_source.name" },
          { text: "Type", value: "_source.typeName" },
          { text: "Guest", value: "_source.maxGuest" },
          { text: "Price", value: "_source.price" },
          { text: "Action", value: "actions", sortable: false }
        ],
        data: []
      }
    };
  },
  methods: {
    actionHome(_homeId, _status) {
      let vm = this;
      const options = {
        method: "PUT",
        headers: { Authorization: localStorage.getItem("jwtToken") },
        url: "/booking/api/v1/home/action/" + _homeId,
        params: { status: _status }
      };
      vm.$axios(options)
        .then(response => {
          if (response.data.homeId) {
            vm.$router.go();
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  beforeMount: function() {
    let vm = this;
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
                isActive: 2
              }
            }
          ]
        }
      }
    };

    vm.$axios
      .post(`/booking/api/v1/_search`, query, {
        headers: {
          Authorization: localStorage.getItem("jwtToken")
        }
      })
      .then(response => {
        if (vm.$refs.dataTable) {
          vm.$refs.dataTable["loading"] = false;
        }
        vm.homes.data = response.data.hits.hits;
      })
      .catch(e => {
        if (vm.$refs.dataTable) {
          vm.$refs.dataTable["loading"] = false;
        }
        console.log(e);
      });
  }
};
</script>

<style>
</style>
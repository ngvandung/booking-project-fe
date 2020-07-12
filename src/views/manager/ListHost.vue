<template>
  <data-table :dt="hostUsers">
    <template v-slot:data-table-title>
      <v-chip class="ma-2" color="#2196F3" label outlined>Hosts are pending</v-chip>
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
            <v-list-item>
              <span class="material-icons">check</span>
              <v-btn small text v-on:click="actionUserRoleHost(slotProps.item.userId, 1)">Active</v-btn>
            </v-list-item>
            <v-list-item>
              <span class="material-icons">visibility_off</span>
              <v-btn small text v-on:click="actionUserRoleHost(slotProps.item.userId, 0)">Disable</v-btn>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </template>
  </data-table>
</template>

<script>
export default {
  components: { DataTable: () => import("@/components/DataTable") },
  data() {
    return {
      hostUsers: {
        headers: [
          { text: "First Name", value: "firstName" },
          { text: "Last Name", value: "lastName" },
          { text: "Age", value: "age" },
          { text: "Address", value: "address" },
          { text: "Status", value: "isEnabled" },
          { text: "Action", value: "actions", sortable: false }
        ],
        data: []
      }
    };
  },
  methods: {
    actionUserRoleHost(_userId, _status) {
      let vm = this;
      const options = {
        method: "PUT",
        headers: { Authorization: localStorage.getItem("jwtToken") },
        url: "http://localhost:8080/booking/api/v1/user/action/" + _userId,
        params: { status: _status }
      };
      vm.$axios(options)
        .then(() => {
          alert("done!");
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted: function() {
    let vm = this;
    vm.$axios
      .get(`http://localhost:8080/booking/api/v1/users`, {
        headers: {
          Authorization: localStorage.getItem("jwtToken")
        },
        params: {
          isEnabled: 2,
          isHost: 1
        }
      })
      .then(response => {
        vm.hostUsers.data = response.data.content;
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>

<style>
</style>
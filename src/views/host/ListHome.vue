<template>
  <data-table :dt="dataHome">
    <template v-slot:data-table-title>
      <v-btn to="/host/home" color="primary">Add Home</v-btn>
    </template>
    <template v-slot:route-link-house="slotProps">
      <router-link
          style="text-decoration: none; color: rgba(0, 0, 0, 0.87);"
          :to="{name: 'HostHomeDetail', params: {homeId: slotProps.item.homeId}}"
        >
          <v-menu open-on-hover :nudge-width="200" offset-y>
            <template v-slot:activator="{ on }">
              <span v-on="on">{{ slotProps.item.name }}</span>
            </template>
            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{slotProps.item.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{slotProps.item.description}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </router-link>
    </template>
    <template v-slot:status-house="slotProps">
      <span v-if="slotProps.item.bookingStatus == 'renting' && slotProps.item.isActive == 1">Renting</span>
        <span v-else-if="slotProps.item.bookingStatus == 'paying' && slotProps.item.isActive == 1">Paying</span>
        <span v-else-if="slotProps.item.isActive == 0">Disabled</span>
        <span v-else-if="slotProps.item.isActive == 2">Pending</span>
        <span v-else>Active</span>
    </template>
  </data-table>
</template>

<script>
export default {
  components: { DataTable: () => import("@/components/DataTable") },
  data() {
    return {
      dataHome: {
        headers: [
          { text: "Name", value: "name" },
          { text: "Type", value: "typeName" },
          { text: "Guest", value: "maxGuest" },
          { text: "Price", value: "price" },
          { text: "Status", value: "bookingStatus" },
          { text: "", value: "actions", sortable: false }
        ],
        data: []
      },
      search: ""
    };
  },
  mounted: function() {
    let vm = this;
    var userId = localStorage.getItem("userId");

    vm.$axios
      .get(`http://localhost:8080/booking/api/v1/homes?userId=` + userId, {
        headers: {
          Authorization: localStorage.getItem("jwtToken")
        }
      })
      .then(response => {
        vm.dataHome.data = response.data;
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>

<style>
</style>
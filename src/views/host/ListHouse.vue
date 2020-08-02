<template>
  <data-table :dt="dataHouse" ref="dataTable">
    <template v-slot:data-table-title>
      <v-btn to="/host/house" color="primary">Add House</v-btn>
    </template>
    <template v-slot:route-link-house="slotProps">
      <router-link
        style="text-decoration: none; color: rgba(0, 0, 0, 0.87);"
        :to="{name: 'HostHouseDetail', params: {houseId: slotProps.item.houseId}}"
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
      <span style="color: blue;" v-if="slotProps.item.value && slotProps.item.isActive == 1">Rented</span>
      <span style="color: red;" v-else>Empty</span>
    </template>
    <template v-slot:data-table-action="slotProps">
      <v-btn
        small
        text
        v-on:click="detailBookings(slotProps.item.ownerHouseId, 'com.booking.model.House', slotProps.item.value)"
      >
        Detail Booking
        <span style="font-size: 12px;" class="material-icons">arrow_forward</span>
      </v-btn>
    </template>
  </data-table>
</template>

<script>
import DataTable from "@/components/DataTable.vue";
export default {
  components: { DataTable },
  data() {
    return {
      dataHouse: {
        headers: [
          { text: "Name", value: "name" },
          { text: "Type", value: "typeName" },
          { text: "Guest", value: "maxGuest" },
          { text: "Price", value: "price" },
          { text: "Status", value: "bookingStatus" },
          { text: "", value: "actions", sortable: false },
        ],
        data: [],
      },
      search: "",
    };
  },
  methods: {
    detailBookings(ownerHouseId, className, classPK) {
      let vm = this;
      vm.$router.push(
        "/host/detail/bookings?className=" +
          className +
          "&ownerId=" +
          ownerHouseId +
          "&classPK=" +
          classPK
      );
    },
  },
  mounted: function () {
    let vm = this;
    var userId = localStorage.getItem("userId");

    vm.$axios
      .get(`/booking/api/v1/houses?ownerHouseId=` + userId, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((response) => {
        if (vm.$refs.dataTable) {
          vm.$refs.dataTable["loading"] = false;
        }
        vm.dataHouse.data = response.data;
      })
      .catch((e) => {
        if (vm.$refs.dataTable) {
          vm.$refs.dataTable["loading"] = false;
        }
        console.log(e);
      });
  },
};
</script>

<style>
</style>
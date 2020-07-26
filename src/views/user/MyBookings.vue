<template>
  <data-table :dt="myBookings" ref="dataTable">
    <template v-slot:data-table-title>
      <v-chip class="ma-2" color="#2196F3" label outlined>My bookings</v-chip>
    </template>
    <template v-slot:filter-my-bookings>
      <v-list style="padding: 0;">
        <v-list-item style="padding: 0;">
          <div v-for="filter in filters" :key="filter.bookingStatus">
            <template v-if="highLight == filter.index">
              <v-btn
                color="primary"
                @click="funcFilter(filter.bookingStatus, filter.index)"
                style="font-size: 13px;"
              >{{filter.title}}</v-btn>
            </template>
            <template v-else>
              <v-btn
                text
                @click="funcFilter(filter.bookingStatus, filter.index)"
                style="font-size: 13px;"
              >{{filter.title}}</v-btn>
            </template>
          </div>
        </v-list-item>
      </v-list>
    </template>
    <template v-slot:route-link-house="slotProps">
      <router-link
        style="text-decoration: none; color: rgba(0, 0, 0, 0.87);"
        :to="{name: 'CommonHome', params: {homeId: slotProps.item.homeId}}"
      >
        <span>{{ slotProps.item.name }}</span>
      </router-link>
    </template>
    <template v-slot:status-booking="slotProps">
      <span v-if="slotProps.item.bookingStatus == 'renting'">Renting</span>
      <span v-else-if="slotProps.item.bookingStatus == 'paying'">Paying</span>
      <span v-else-if="slotProps.item.bookingStatus == 'cancel_pending'">Cancel pending</span>
      <span v-else-if="slotProps.item.bookingStatus == 'cancel_failed'">Cancel Failed</span>
      <span v-else-if="slotProps.item.bookingStatus == 'cancel_succes'">Cancel Success</span>
      <span v-else-if="slotProps.item.bookingStatus == 'done'">Rented</span>
    </template>
    <template v-slot:data-table-qrcode="slotProps">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn small color="red lighten-2" dark v-bind="attrs" v-on="on">Show</v-btn>
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2">QRCode</v-card-title>
          <v-img :src="slotProps.item.qrCode"></v-img>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:data-table-action="slotProps">
      <v-menu offset-y transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text color="primary" dark v-bind="attrs" v-on="on">
            <span class="material-icons">menu</span>
          </v-btn>
        </template>
        <template v-if="slotProps.item.bookingStatus == 'renting'">
          <v-list>
            <v-list-item-group color="primary">
              <template v-if="slotProps.item.bookingStatus == 'renting'">
                <v-list-item style="min-height: 30px!important;">
                  <span class="material-icons">close</span>
                  <v-btn small text v-on:click="requestToCancel(slotProps.item.bookingId)">Cancel</v-btn>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </template>
      </v-menu>
    </template>
  </data-table>
</template>

<script>
import DataTable from "@/components/DataTable";
export default {
  components: {
    DataTable,
  },
  name: "MyBookings",
  data() {
    return {
      myBookings: {
        headers: [
          { text: "Name", value: "name" },
          { text: "From", value: "fromDate" },
          { text: "To", value: "toDate" },
          { text: "Status", value: "bookingStatus" },
          { text: "Total Amount", value: "totalAmount" },
          { text: "QRCode", value: "qrCode" },
          { text: "Actions", value: "actions" },
        ],
        data: [],
      },
      filters: [
        { index: 1, bookingStatus: "renting", title: "Renting" },
        { index: 2, bookingStatus: "done", title: "Rented" },
        { index: 3, bookingStatus: "paying", title: "Paying" },
      ],
      highLight: 0,
    };
  },
  methods: {
    funcFilter(bookingStatus, index) {
      let vm = this;
      vm.highLight = index;
      let _userId = localStorage.getItem("userId");
      let className = vm.$route.query.className;
      const options = {
        method: "GET",
        url: "/booking/api/v1/bookings/me",
        headers: { Authorization: localStorage.getItem("jwtToken") },
        params: {
          userId: _userId,
          className: className,
          bookingStatus: bookingStatus,
        },
      };
      vm.$axios(options)
        .then((response) => {
          if (response.data) {
            let array = response.data;
            array.forEach((el) => {
              el.fromDate = new Date(el.fromDate).toLocaleDateString("vi-VN");
              el.toDate = new Date(el.toDate).toLocaleDateString("vi-VN");
            });
            vm.myBookings.data = array;
            if (vm.$refs.dataTable) {
              vm.$refs.dataTable["loading"] = false;
            }
          }
        })
        .catch((err) => {
          if (vm.$refs.dataTable) {
            vm.$refs.dataTable["loading"] = false;
          }
          console.log(err);
        });
    },
    requestToCancel(bookingId) {
      let vm = this;
      vm.$axios
        .post("/booking/api/v1/booking/cancelrequest/" + bookingId, null, {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        })
        .then((response) => {
          if (response.data.bookingId) {
            alert("Done");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created: function () {
    let vm = this;
    let _userId = localStorage.getItem("userId");
    const options = {
      method: "GET",
      url: `/booking/api/v1/bookings/me`,
      headers: { Authorization: localStorage.getItem("jwtToken") },
      params: {
        userId: _userId,
        className: vm.$route.query.className,
      },
    };
    let bookingStatus = vm.$route.query.bookingStatus;
    if (bookingStatus) {
      options.params.bookingStatus = bookingStatus;
    }
    vm.$axios(options)
      .then((response) => {
        if (response.data) {
          let array = response.data;
          array.forEach((el) => {
            el.fromDate = new Date(el.fromDate).toLocaleDateString("vi-VN");
            el.toDate = new Date(el.toDate).toLocaleDateString("vi-VN");
          });
          vm.myBookings.data = array;
          if (vm.$refs.dataTable) {
            vm.$refs.dataTable["loading"] = false;
          }
        }
      })
      .catch((err) => {
        if (vm.$refs.dataTable) {
          vm.$refs.dataTable["loading"] = false;
        }
        console.log(err);
      });
  },
};
</script>

<style>
</style>
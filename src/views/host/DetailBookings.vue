<template>
  <data-table :dt="dataHome" ref="dataTable">
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
    <template v-slot:status-booking="slotProps">
      <span v-if="slotProps.item.bookingStatus == 'renting'">Renting</span>
      <span v-else-if="slotProps.item.bookingStatus == 'paying'">Paying</span>
      <span v-else-if="slotProps.item.bookingStatus == 'cancel_pending'">Cancel pending</span>
      <span v-else-if="slotProps.item.bookingStatus == 'cancel_failed'">Cancel Failed</span>
      <span v-else-if="slotProps.item.bookingStatus == 'cancel_succes'">Cancel Success</span>
      <span v-else-if="slotProps.item.bookingStatus == 'done'">Rented</span>
    </template>
    <template v-slot:data-table-action="slotProps">
      <v-menu offset-y transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text color="primary" dark v-bind="attrs" v-on="on">
            <span class="material-icons">menu</span>
          </v-btn>
        </template>
        <template v-if="slotProps.item.bookingStatus == 'cancel_pending'">
          <v-list>
            <v-list-item-group color="primary">
              <template v-if="slotProps.item.bookingStatus == 'cancel_pending'">
                <v-list-item style="min-height: 30px!important;">
                  <span class="material-icons">check</span>
                  <v-btn
                    small
                    text
                    v-on:click="cancelAction(slotProps.item.bookingId, 'cancel_success')"
                  >Accept</v-btn>
                </v-list-item>
                <v-list-item style="min-height: 30px!important;">
                  <span class="material-icons">close</span>
                  <v-btn
                    small
                    text
                    v-on:click="cancelAction(slotProps.item.bookingId, 'cancel_failed')"
                  >Cancel</v-btn>
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
export default {
  components: { DataTable: () => import("@/components/DataTable") },
  data() {
    return {
      dataHome: {
        headers: [
          { text: "Renter name", value: "fullName" },
          { text: "Date From", value: "fromDate" },
          { text: "Date To", value: "toDate" },
          { text: "Price", value: "price" },
          { text: "QRCode", value: "qrCode" },
          { text: "Actions", value: "actions" },
        ],
        data: [],
      },
      search: "",
    };
  },
  created: function () {
    let vm = this;
    let options = {
      method: "GET",
      url: `/booking/api/v1/booking/detail`,
      headers: { Authorization: localStorage.getItem("jwtToken") },
      params: {
        ownerId: vm.$route.query.ownerId,
        className: vm.$route.query.className,
        classPK: vm.$route.query.classPK,
      },
    };

    vm.$axios(options)
      .then((response) => {
        let array = response.data;
        array.forEach((el) => {
          el.fromDate = new Date(el.fromDate).toLocaleDateString("vi-VN");
          el.toDate = new Date(el.toDate).toLocaleDateString("vi-VN");
        });
        if (vm.$refs.dataTable) {
          vm.$refs.dataTable["loading"] = false;
        }
        vm.dataHome.data = array;
      })
      .catch((e) => {
        if (vm.$refs.dataTable) {
          vm.$refs.dataTable["loading"] = false;
        }
        console.log(e);
      });
  },
  methods: {
    cancelAction(bookingId, bookingStatus) {
      let vm = this;
      let options = {
        method: "POST",
        url:
          `/booking/api/v1/booking/cancelaction/` +
          bookingId,
        headers: { Authorization: localStorage.getItem("jwtToken") },
        params: {
          bookingStatus: bookingStatus,
        },
      };
      vm.$axios(options)
        .then((response) => {
          if (response.data.bookingId) {
            alert("done");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style>
</style>
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
};
</script>

<style>
</style>
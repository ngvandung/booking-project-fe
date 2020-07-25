<template>
  <v-container>
    <div class="d-flex flex-column justify-center align-center">
      <h1 bold style="font-size: 100px">Thank You!</h1>
      <v-row no-gutters class="d-flex flex-row justify-center" style="width: 50%; border: 1px solid grey; padding: 20px 40px">
        <v-col cols="12" lg="12">
          <v-row>
            <p>Mã đơn hàng: {{this.$route.query.vnp_TxnRef}}</p>
          </v-row>
          <v-row>
            <p>Tổng tiền: {{formatPrice(this.$route.query.vnp_Amount / 100)}}$</p>
          </v-row>
          <v-row>
            <p>Nội dung: {{this.$route.query.vnp_OrderInfo}}</p>
          </v-row>
          <v-row>
            <p>Trạng thái: {{status}}</p>
          </v-row>
        </v-col>
      </v-row>
      <p class="lead">
        <strong>Please check your email</strong> for further instructions on how to complete your account setup.
      </p>
      <hr />
      <p>
        Having trouble?
        <a href>Contact us</a>
      </p>
      <p class="lead">
        <a
          class="btn btn-primary btn-sm"
          href="https://bootstrapcreative.com/"
          role="button"
        >Continue to homepage</a>
      </p>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "VnPayResponse",
  data() {
    return {
      status: ""
    };
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed().replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  created: function() {
    let vm = this;
    let bookingId = vm.$route.query.vnp_TxnRef;
    const currentUrl = window.location.href;
    let array = currentUrl.split("?");
    vm.$axios
      .get(
        `/booking/api/v1/vnpay/confirm/` +
          bookingId +
          "?" +
          array[1]
      )
      .then(response => {
        if (response.data.status == 200) {
          vm.status = "Payment successfully";
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>

<style>
</style>
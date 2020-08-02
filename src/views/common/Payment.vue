<template>
  <v-container id="payment-view">
    <h3 style="font-size: 1.75rem; font-weight: 900; margin-bottom: 20px;">Your information</h3>
    <v-row>
      <v-col cols="12" lg="8">
        <v-text-field v-model="booking.fullName" label="Fullname" outlined></v-text-field>
        <v-text-field v-model="booking.email" label="Email" outlined></v-text-field>
        <v-text-field v-model="booking.phone" label="Phone" outlined></v-text-field>
        <v-select
          return-object
          item-text="stateName"
          item-value="stateId"
          v-model="state.selected"
          :items="state.items"
          label="Select state"
          solo
        ></v-select>
        <v-divider></v-divider>
        <p
          style="font-size: 1rem; font-weight: 700; margin: 20px 0 10px 0; color: #222"
        >Damage Policy</p>
        <p
          style="color: #555; font-size: .875rem;"
        >You will be responsible for any damage to the rental property caused by you or your party during your stay.</p>
        <p
          style="font-size: 1rem; font-weight: 700; margin: 20px 0 10px 0; color: #222"
        >House's rules</p>
        <p
          style="color: #555; font-size: .875rem; margin-bottom: 5px;"
        >ID/Passport or Deposit Required.</p>
        <p
          style="color: #555; font-size: .875rem; margin-bottom: 5px;"
        >Avoid making noises after 10 pm.</p>
        <p style="color: #555; font-size: .875rem; margin-bottom: 5px;">No shoes in house.</p>
        <p
          style="color: #555; font-size: .875rem; margin-bottom: 5px;"
        >No smoking in shared spaces and common areas.</p>
        <v-divider></v-divider>
        <v-btn
          class="primary"
          height="40"
          v-on:click="requestToBook"
          style="margin-top: 20px;"
        >Payment</v-btn>
      </v-col>
      <v-col cols="12" lg="4" class="target-payment-info">
        <v-card class="mx-auto my-12">
          <v-img height="200" :src="targetPayment.avt"></v-img>
          <v-card-title class="title text-truncate">{{targetPayment.name}}</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>
              <div class="grey--text ml-4">4.5 (413)</div>
            </v-row>
            <div
              class="my-4 subtitle-1 font-weight-bold"
            >{{formatPrice(targetPayment.price)}}$/night</div>
            <div
              class="text-truncate"
            >{{targetPayment.villageName}}, {{targetPayment.districtName}}, {{targetPayment.cityName}}, {{targetPayment.stateName}}</div>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-card-text>{{targetPayment.maxGuest}} guests • {{targetPayment.livingroom}} Livingroom • {{targetPayment.bathroom}} Bathroom • {{targetPayment.bedroom}} Bedroom</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    bookingInfo: {
      numberOfGuest: {
        type: Number,
        required: true
      },
      fromDate: {
        type: String,
        required: true
      },
      toDate: {
        type: String,
        required: true
      },
      classPK: {
        type: String,
        required: true
      },
      className: { type: String, required: true }
    }
  },
  name: "payment-view",
  data() {
    return {
      booking: {
        numberOfGuest: null,
        fromDate: null,
        toDate: null,
        classPK: null,
        className: null,
        fullName: null,
        email: null,
        phone: null,
        stateId: null,
        stateName: null
      },
      state: {
        selected: { stateId: 1, stateName: "Việt Nam" },
        items: []
      },
      targetPayment: {
        name: "",
        typeName: "",
        stateName: "",
        cityName: "",
        districtName: "",
        villageName: "",
        linkGoogleMap: "",
        price: "",
        bedroom: "",
        livingroom: "",
        bathroom: "",
        maxGuest: "",
        avt: ""
      }
    };
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed().replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    callAPI(houseId) {
      let vm = this;
      return new Promise((resolve, reject) => {
        vm.$axios
          .get(
            `/booking/api/v1/image/com.booking.model.House/` +
              houseId
          )
          .then(function(response) {
            resolve(response.data.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    requestToBook() {
      let vm = this;
      vm.booking.numberOfGuest = vm.bookingInfo.numberOfGuest;
      vm.booking.fromDate = vm.bookingInfo.fromDate;
      vm.booking.toDate = vm.bookingInfo.toDate;
      vm.booking.classPK = vm.bookingInfo.classPK;
      vm.booking.className = vm.bookingInfo.className;
      vm.booking.stateId = vm.state.selected.stateId;
      vm.booking.stateName = vm.state.selected.stateName;
      vm.$axios
        .post(`/booking/api/v1/booking/house`, vm.booking, {
          headers: {
            Authorization: localStorage.getItem("jwtToken")
          }
        })
        .then(response => {
          if (response.data.code === "00") {
            if (!window.vnpay) {
              window.location.href = response.data.data;
            }
            return false;
          } else {
            alert(response.data.message);
          }
        })
        .catch(e => {
          if (e.response.status == 403) {
            alert("You can't your house");
          } else if (e.response.status == 400) {
            alert("It's renting");
          }
        });
    }
  },
  beforeMount: function() {
    let vm = this;
    let classPK = vm.bookingInfo.classPK;

    if (!classPK) {
      this.$router.replace("/error/403");
    }

    vm.$axios
      .get(`/booking/api/v1/states`, {
        params: { start: 0, end: 5000 }
      })
      .then(response => {
        vm.state.items = response.data.content;
      })
      .catch(e => {
        console.log(e);
      });
    vm.$axios
      .get(`/booking/api/v1/house/` + classPK, {
        headers: {
          Authorization: localStorage.getItem("jwtToken")
        }
      })
      .then(async response => {
        let image = await vm.callAPI(response.data.houseId);
        vm.targetPayment = response.data;
        vm.targetPayment.avt =
          "/booking/images/" + image[0];
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>

<style>
.target-payment-info .my-12 {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
</style>
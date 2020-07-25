<template>
  <v-app>
    <template v-if="homeId">
      <slide-show-home :images="homeImages" />
    </template>
    <v-container>
      <h1>Information</h1>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="home.name" label="Name" required></v-text-field>
          <v-text-field v-model="home.price" label="Price" required></v-text-field>
          <v-text-field v-model="home.bedroom" label="Bedroom" required></v-text-field>
          <v-text-field v-model="home.livingroom" label="Livingroom" required></v-text-field>
          <v-text-field v-model="home.bathroom" label="Bathroom" required></v-text-field>
          <v-text-field v-model="home.maxGuest" label="Guest" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            return-object
            item-text="typeName"
            item-value="homeTypeId"
            v-model="homeType.selected"
            :items="homeType.items"
            label="Select type"
            solo
          ></v-select>
          <v-select
            return-object
            item-text="stateName"
            item-value="stateId"
            v-model="state.selected"
            :items="state.items"
            label="Select state"
            solo
          ></v-select>
          <v-select
            return-object
            v-on:input="changeCityId()"
            item-text="cityName"
            item-value="cityId"
            v-model="city.selected"
            :items="city.items"
            label="Select city"
            solo
          ></v-select>
          <v-select
            return-object
            v-on:input="changeDistrictId()"
            item-text="districtName"
            item-value="districtId"
            v-model="district.selected"
            :items="district.items"
            label="Select district"
            solo
          ></v-select>
          <v-select
            return-object
            item-text="villageName"
            item-value="villageId"
            v-model="village.selected"
            :items="village.items"
            label="Select village"
            solo
          ></v-select>
          <input
            type="file"
            id="files"
            ref="files"
            label="Files"
            required
            multiple
            v-on:change="handleFileUploads()"
          />
        </v-col>
      </v-row>
      <v-divider style="margin-top: 20px"></v-divider>
      <h1>Facilities</h1>
      <v-row>
        <v-col cols="12" lg="2">
          <v-checkbox v-model="home.isWifi" label="Wifi" />
          <v-checkbox v-model="home.isOven" label="Oven" />
          <v-checkbox v-model="home.isAirConditioning" label="Air Conditioning" />
        </v-col>
        <v-col cols="12" lg="2">
          <v-checkbox v-model="home.isShampoo" label="Shampoo" />
          <v-checkbox v-model="home.isTowels" label="Towels" />
          <v-checkbox v-model="home.isToothpaste" label="Toothpaste" />
        </v-col>
        <v-col cols="12" lg="2">
          <v-checkbox v-model="home.isSoap" label="Soap" />
          <v-checkbox v-model="home.isHairDryer" label="HairDryer" />
          <v-checkbox v-model="home.isMicroWave" label="MicroWave" />
        </v-col>
        <v-col cols="12" lg="2">
          <v-checkbox v-model="home.isFridge" label="Fridge" />
          <v-checkbox v-model="home.isBalcony" label="Balcony" />
          <v-checkbox v-model="home.isWindows" label="Windows" />
        </v-col>
        <v-col cols="12" lg="2">
          <v-checkbox v-model="home.isSmartTv" label="SmartTv" />
          <v-checkbox v-model="home.isExtraMattress" label="Extra Mattress" />
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-textarea v-model="home.description" label="Description" required></v-textarea>
      <v-btn v-on:click="postToHome()" color="primary">Post to feed</v-btn>
    </v-container>
  </v-app>
</template>

<script>
import SlideShowHome from "@/components/SlideShowHome";
export default {
  name: "HostHome",
  components: {
    SlideShowHome
  },
  data() {
    return {
      refCityId: "",
      refDistrictId: "",
      home: {
        homeId: "",
        name: "",
        categoryId: "",
        homeTypeId: "",
        typeName: "",
        stateId: "",
        stateName: "",
        cityId: "",
        cityName: "",
        districtId: "",
        districtName: "",
        villageId: "",
        villageName: "",
        linkGoogleMap: "",
        price: "",
        bedroom: "",
        livingroom: "",
        bathroom: "",
        maxGuest: "",
        description: "",
        isWifi: false,
        isOven: false,
        isAirConditioning: false,
        isShampoo: false,
        isTowels: false,
        isToothpaste: false,
        isSoap: false,
        isHairDryer: false,
        isMicroWave: false,
        isFridge: false,
        isBalcony: false,
        isWindows: false,
        isSmartTv: false,
        isExtraMattress: false
      },
      homeType: {
        selected: "",
        items: []
      },
      state: {
        selected: "",
        items: []
      },
      city: {
        selected: "",
        items: []
      },
      district: {
        selected: "",
        items: []
      },
      village: {
        selected: "",
        items: []
      },
      homes: [],
      files: "",
      classPK: "",
      homeImages: [],
      homeId: ""
    };
  },
  methods: {
    convertBooleanToInt(temp) {
      if (temp) {
        return 1;
      } else {
        return 0;
      }
    },
    changeCityId() {
      let vm = this;
      vm.refCityId = vm.city.selected.cityId;
      vm.$axios
        .get(`/booking/api/v1/districts`, {
          params: { cityId: vm.refCityId, start: 0, end: 5000 }
        })
        .then(response => {
          vm.district.items = response.data.content;
        })
        .catch(e => {
          console.log(e);
        });
    },
    changeDistrictId() {
      let vm = this;
      vm.refDistrictId = vm.district.selected.districtId;
      vm.$axios
        .get(`/booking/api/v1/villages`, {
          params: { districtId: vm.refDistrictId, start: 0, end: 5000 }
        })
        .then(response => {
          vm.village.items = response.data.content;
        })
        .catch(e => {
          console.log(e);
        });
    },
    async postToHome() {
      let vm = this;
      vm.home.isWifi = vm.convertBooleanToInt(vm.home.isWifi);
      vm.home.isOven = vm.convertBooleanToInt(vm.home.isOven);
      vm.home.isAirConditioning = vm.convertBooleanToInt(
        vm.home.isAirConditioning
      );
      vm.home.isShampoo = vm.convertBooleanToInt(vm.home.isShampoo);
      vm.home.isTowels = vm.convertBooleanToInt(vm.home.isTowels);
      vm.home.isToothpaste = vm.convertBooleanToInt(vm.home.isToothpaste);
      vm.home.isSoap = vm.convertBooleanToInt(vm.home.isSoap);
      vm.home.isHairDryer = vm.convertBooleanToInt(vm.home.isHairDryer);
      vm.home.isMicroWave = vm.convertBooleanToInt(vm.home.isMicroWave);
      vm.home.isFridge = vm.convertBooleanToInt(vm.home.isFridge);
      vm.home.isBalcony = vm.convertBooleanToInt(vm.home.isBalcony);
      vm.home.isWindows = vm.convertBooleanToInt(vm.home.isWindows);
      vm.home.isSmartTv = vm.convertBooleanToInt(vm.home.isSmartTv);
      vm.home.isExtraMattress = vm.convertBooleanToInt(vm.home.isExtraMattress);
      let data = vm.home;

      data.stateId = vm.state.selected.stateId;
      data.stateName = vm.state.selected.stateName;
      data.cityId = vm.city.selected.cityId;
      data.cityName = vm.city.selected.cityName;
      data.districtId = vm.district.selected.districtId;
      data.districtName = vm.district.selected.districtName;
      data.villageId = vm.village.selected.villageId;
      data.villageName = vm.village.selected.villageName;
      data.homeTypeId = vm.homeType.selected.homeTypeId;
      data.typeName = vm.homeType.selected.typeName;

      if (vm.homeId) {
        await vm.$axios
          .put(`/booking/api/v1/home`, data, {
            headers: {
              Authorization: localStorage.getItem("jwtToken")
            }
          })
          .then(response => {
            vm.classPK = response.data.homeId;
          })
          .catch(e => {
            console.log(e);
          });

        if (vm.files.length) {
          let formData = new FormData();
          for (let i = 0; i < vm.files.length; i++) {
            let file = vm.files[i];

            formData.append("files", file);
          }
          formData.append("className", "com.booking.model.Home");
          formData.append("classPK", vm.classPK);
          await vm.$axios
            .post("/booking/api/v1/updatefileentry", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: localStorage.getItem("jwtToken")
              }
            })
            .then(() => {
              vm.$router.push("/host/homes");
              vm.$router.go();
            })
            .catch(e => {
              console.log(e);
            });
        }
      } else {
        await vm.$axios
          .post(`/booking/api/v1/home`, data, {
            headers: {
              Authorization: localStorage.getItem("jwtToken")
            }
          })
          .then(response => {
            vm.classPK = response.data.homeId;
            if (vm.classPK) {
              alert("Successfully");
            }
          })
          .catch(e => {
            console.log(e);
          });

        if (vm.files.length) {
          let formData = new FormData();
          for (let i = 0; i < vm.files.length; i++) {
            let file = vm.files[i];

            formData.append("files", file);
          }
          formData.append("className", "com.booking.model.Home");
          formData.append("classPK", vm.classPK);
          await vm.$axios
            .post("/booking/api/v1/fileentry", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: localStorage.getItem("jwtToken")
              }
            })
            .then(() => {
              vm.$router.push("/host/homes");
              vm.$router.go();
            })
            .catch(e => {
              console.log(e);
            });
        }
      }
    },
    showFormHome() {
      let vm = this;
      vm.showForm = true;
    },
    showListHome() {
      let vm = this;
      vm.showForm = false;
    },
    handleFileUploads() {
      let vm = this;
      vm.files = vm.$refs.files.files;
    }
  },
  created: function() {
    let vm = this;
    vm.homeId = this.$route.params.homeId;
    if (vm.homeId) {
      vm.$axios
        .get(`/booking/api/v1/home/` + vm.homeId, {
          headers: {
            Authorization: localStorage.getItem("jwtToken")
          }
        })
        .then(response => {
          vm.home = response.data;
          vm.homeType.selected = {
            homeTypeId: response.data.homeTypeId,
            typeName: response.data.typeName
          };
          vm.state.selected = {
            stateId: response.data.stateId,
            stateName: response.data.stateName
          };
          vm.city.selected = {
            cityId: response.data.cityId,
            cityName: response.data.cityName
          };
          vm.district.selected = {
            districtId: response.data.districtId,
            districtName: response.data.districtName
          };
          vm.village.selected = {
            villageId: response.data.villageId,
            villageName: response.data.villageName
          };
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  beforeCreate: function() {
    if (localStorage.getItem("isSign") != "true") {
      this.$router.push("login");
    }

    let vm = this;
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
      .get(`/booking/api/v1/citys`, {
        params: { start: 0, end: 5000 }
      })
      .then(response => {
        vm.city.items = response.data.content;
      })
      .catch(e => {
        console.log(e);
      });

    vm.$axios
      .get(`/booking/api/v1/districts`, {
        params: { start: 0, end: 5000 }
      })
      .then(response => {
        vm.district.items = response.data.content;
      })
      .catch(e => {
        console.log(e);
      });

    vm.$axios
      .get(`/booking/api/v1/villages`, {
        params: { start: 0, end: 5000 }
      })
      .then(response => {
        vm.village.items = response.data.content;
      })
      .catch(e => {
        console.log(e);
      });

    vm.$axios
      .get(`/booking/api/v1/hometypes`, {
        params: { start: 0, end: 5000 }
      })
      .then(response => {
        vm.homeType.items = response.data.content;
      })
      .catch(e => {
        console.log(e);
      });

    vm.homeId = this.$route.params.homeId;
    if (vm.homeId) {
      vm.$axios
        .get(`/booking/api/v1/image/com.booking.model.Home/` + vm.homeId)
        .then(response => {
          vm.homeImages = response.data.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style>
</style>
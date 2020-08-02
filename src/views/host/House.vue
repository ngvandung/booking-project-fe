<template>
  <v-app>
    <template v-if="houseId">
      <slide-show-house :images="houseImages" />
    </template>
    <v-container>
      <h1>Information</h1>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="house.name" label="Name" required></v-text-field>
          <v-text-field v-model="house.price" label="Price" required></v-text-field>
          <v-text-field v-model="house.bedroom" label="Bedroom" required></v-text-field>
          <v-text-field v-model="house.livingroom" label="Livingroom" required></v-text-field>
          <v-text-field v-model="house.bathroom" label="Bathroom" required></v-text-field>
          <v-text-field v-model="house.maxGuest" label="Guest" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            return-object
            item-text="typeName"
            item-value="houseTypeId"
            v-model="houseType.selected"
            :items="houseType.items"
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
          <v-checkbox v-model="house.isWifi" label="Wifi" />
          <v-checkbox v-model="house.isOven" label="Oven" />
          <v-checkbox v-model="house.isAirConditioning" label="Air Conditioning" />
        </v-col>
        <v-col cols="12" lg="2">
          <v-checkbox v-model="house.isShampoo" label="Shampoo" />
          <v-checkbox v-model="house.isTowels" label="Towels" />
          <v-checkbox v-model="house.isToothpaste" label="Toothpaste" />
        </v-col>
        <v-col cols="12" lg="2">
          <v-checkbox v-model="house.isSoap" label="Soap" />
          <v-checkbox v-model="house.isHairDryer" label="HairDryer" />
          <v-checkbox v-model="house.isMicroWave" label="MicroWave" />
        </v-col>
        <v-col cols="12" lg="2">
          <v-checkbox v-model="house.isFridge" label="Fridge" />
          <v-checkbox v-model="house.isBalcony" label="Balcony" />
          <v-checkbox v-model="house.isWindows" label="Windows" />
        </v-col>
        <v-col cols="12" lg="2">
          <v-checkbox v-model="house.isSmartTv" label="SmartTv" />
          <v-checkbox v-model="house.isExtraMattress" label="Extra Mattress" />
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-textarea v-model="house.description" label="Description" required></v-textarea>
      <v-btn v-on:click="postToHouse()" color="primary">Post to feed</v-btn>
    </v-container>
  </v-app>
</template>

<script>
import SlideShowHouse from "@/components/SlideShowHouse";
export default {
  name: "HostHouse",
  components: {
    SlideShowHouse
  },
  data() {
    return {
      refCityId: "",
      refDistrictId: "",
      house: {
        houseId: "",
        name: "",
        categoryId: "",
        houseTypeId: "",
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
      houseType: {
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
      houses: [],
      files: "",
      classPK: "",
      houseImages: [],
      houseId: ""
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
    async postToHouse() {
      let vm = this;
      vm.house.isWifi = vm.convertBooleanToInt(vm.house.isWifi);
      vm.house.isOven = vm.convertBooleanToInt(vm.house.isOven);
      vm.house.isAirConditioning = vm.convertBooleanToInt(
        vm.house.isAirConditioning
      );
      vm.house.isShampoo = vm.convertBooleanToInt(vm.house.isShampoo);
      vm.house.isTowels = vm.convertBooleanToInt(vm.house.isTowels);
      vm.house.isToothpaste = vm.convertBooleanToInt(vm.house.isToothpaste);
      vm.house.isSoap = vm.convertBooleanToInt(vm.house.isSoap);
      vm.house.isHairDryer = vm.convertBooleanToInt(vm.house.isHairDryer);
      vm.house.isMicroWave = vm.convertBooleanToInt(vm.house.isMicroWave);
      vm.house.isFridge = vm.convertBooleanToInt(vm.house.isFridge);
      vm.house.isBalcony = vm.convertBooleanToInt(vm.house.isBalcony);
      vm.house.isWindows = vm.convertBooleanToInt(vm.house.isWindows);
      vm.house.isSmartTv = vm.convertBooleanToInt(vm.house.isSmartTv);
      vm.house.isExtraMattress = vm.convertBooleanToInt(vm.house.isExtraMattress);
      let data = vm.house;

      data.stateId = vm.state.selected.stateId;
      data.stateName = vm.state.selected.stateName;
      data.cityId = vm.city.selected.cityId;
      data.cityName = vm.city.selected.cityName;
      data.districtId = vm.district.selected.districtId;
      data.districtName = vm.district.selected.districtName;
      data.villageId = vm.village.selected.villageId;
      data.villageName = vm.village.selected.villageName;
      data.houseTypeId = vm.houseType.selected.houseTypeId;
      data.typeName = vm.houseType.selected.typeName;

      if (vm.houseId) {
        await vm.$axios
          .put(`/booking/api/v1/house`, data, {
            headers: {
              Authorization: localStorage.getItem("jwtToken")
            }
          })
          .then(response => {
            vm.classPK = response.data.houseId;
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
          formData.append("className", "com.booking.model.House");
          formData.append("classPK", vm.classPK);
          await vm.$axios
            .post("/booking/api/v1/updatefileentry", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: localStorage.getItem("jwtToken")
              }
            })
            .then(() => {
              vm.$router.push("/host/houses");
              vm.$router.go();
            })
            .catch(e => {
              console.log(e);
            });
        }
      } else {
        await vm.$axios
          .post(`/booking/api/v1/house`, data, {
            headers: {
              Authorization: localStorage.getItem("jwtToken")
            }
          })
          .then(response => {
            vm.classPK = response.data.houseId;
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
          formData.append("className", "com.booking.model.House");
          formData.append("classPK", vm.classPK);
          await vm.$axios
            .post("/booking/api/v1/fileentry", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: localStorage.getItem("jwtToken")
              }
            })
            .then(() => {
              vm.$router.push("/host/houses");
              vm.$router.go();
            })
            .catch(e => {
              console.log(e);
            });
        }
      }
    },
    showFormHouse() {
      let vm = this;
      vm.showForm = true;
    },
    showListHouse() {
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
    vm.houseId = this.$route.params.houseId;
    if (vm.houseId) {
      vm.$axios
        .get(`/booking/api/v1/house/` + vm.houseId, {
          headers: {
            Authorization: localStorage.getItem("jwtToken")
          }
        })
        .then(response => {
          vm.house = response.data;
          vm.houseType.selected = {
            houseTypeId: response.data.houseTypeId,
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
      .get(`/booking/api/v1/housetypes`, {
        params: { start: 0, end: 5000 }
      })
      .then(response => {
        vm.houseType.items = response.data.content;
      })
      .catch(e => {
        console.log(e);
      });

    vm.houseId = this.$route.params.houseId;
    if (vm.houseId) {
      vm.$axios
        .get(`/booking/api/v1/image/com.booking.model.House/` + vm.houseId)
        .then(response => {
          vm.houseImages = response.data.data;
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
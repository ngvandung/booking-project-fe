<template>
  <v-app id="common-home">
    <slide-show-home :images="homeImages" />
    <v-container>
      <v-row>
        <div style="width: 100%" class="d-flex justify-space-between align-lg-center">
          <div>
            <v-breadcrumbs :items="items" large></v-breadcrumbs>
          </div>
          <div class="d-flex align-lg-center">
            <v-btn small width="70" text @click="sharing">
              <span>Share</span>
              <span style="margin-left: 3px" class="material-icons">share</span>
            </v-btn>
            <v-btn :disabled="highLightVote" small width="70" text @click="voting">
              <span v-if="highLightVote" style="color: #e97575">Like</span>
              <span v-else>Like</span>
              <span
                v-if="highLightVote"
                style="margin-left: 3px; color: #e97575;"
                class="material-icons"
              >favorite_border</span>
              <span v-else style="margin-left: 3px" class="material-icons">favorite_border</span>
            </v-btn>
          </div>
        </div>
        <v-col cols="12" lg="8">
          <v-responsive class="infomation">
            <p class="font-weight-bold" style="font-size: 2rem;">{{home.name}}</p>
            <div>
              <p class="d-flex align-lg-center">
                <span class="material-icons">place</span>
                <span>{{home.villageName}}, {{home.districtName}}, {{home.cityName}}, {{home.stateName}}</span>
              </p>
              <p class="d-flex align-lg-center">
                <span class="material-icons">apartment</span>
                <span>100m2</span>
              </p>
              <p
                class="d-flex align-lg-center"
              >{{home.maxGuest}} guests • {{home.livingroom}} Livingroom • {{home.bathroom}} Bathroom • {{home.bedroom}} Bedroom</p>
              <p style="margin-top: 30px;">{{home.description}}</p>
            </div>
            <p class="font-weight-bold" style="font-size: 1.75rem; margin-top: 30px">Amenities</p>
            <p style="margin: 0;">Amenities and services at the accommodation</p>
            <p class="font-weight-bold" style="font-size: 1.25rem; margin-top: 20px">Facilities</p>
            <div class="d-flex justify-space-between">
              <template v-if="home.isWifi || home.isOven || home.isAirConditioning">
                <v-col cols="12" lg="4">
                  <template v-if="home.isWifi">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <span class="material-icons" style="margin-right: 5px">wifi</span>Wifi
                    </div>
                  </template>
                  <template v-if="home.isOven">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <span class="material-icons" style="margin-right: 5px">wifi</span>Oven
                    </div>
                  </template>
                  <template v-if="home.isAirConditioning">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <span class="material-icons" style="margin-right: 5px">wifi</span>Air-conditioning
                    </div>
                  </template>
                </v-col>
              </template>
              <template v-if="home.isTowels || home.isSoap">
                <v-col cols="12" lg="4">
                  <template v-if="home.isTowels">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <span class="material-icons" style="margin-right: 5px">wifi</span>Towels
                    </div>
                  </template>
                  <template v-if="home.isSoap">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <span class="material-icons" style="margin-right: 5px">wifi</span>Soap
                    </div>
                  </template>
                  <template v-if="true">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <span class="material-icons" style="margin-right: 5px">wifi</span>Napkins
                    </div>
                  </template>
                </v-col>
              </template>
              <template v-if="home.isShampoo || home.Toiletries">
                <v-col cols="12" lg="4">
                  <template v-if="true">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <span class="material-icons" style="margin-right: 5px">wifi</span>Washing machine
                    </div>
                  </template>
                  <template v-if="home.isShampoo">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <span class="material-icons" style="margin-right: 5px">wifi</span>Shampoo, Conditioner
                    </div>
                  </template>
                  <template v-if="home.Toiletries">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <span class="material-icons" style="margin-right: 5px">wifi</span>Toiletries
                    </div>
                  </template>
                </v-col>
              </template>
            </div>
            <p
              class="font-weight-bold"
              style="font-size: 1.25rem; margin-top: 20px"
            >Kitchen Facilities</p>
            <div class="d-flex justify-space-between">
              <template v-if="home.isHairDryer || home.isMicroWave || home.isMicroWave">
                <v-col cols="12" lg="4">
                  <template v-if="home.isHairDryer">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <span class="material-icons" style="margin-right: 5px">wifi</span>Hair Dryer
                    </div>
                  </template>
                  <template v-if="home.isMicroWave">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <span class="material-icons" style="margin-right: 5px">wifi</span>Micro Wave
                    </div>
                  </template>
                  <template v-if="home.isMicroWave">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <span class="material-icons" style="margin-right: 5px">wifi</span>Micro Wave
                    </div>
                  </template>
                </v-col>
              </template>
              <template v-if="home.isFridge || home.isBalcony">
                <v-col cols="12" lg="4">
                  <template v-if="home.isFridge">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <span class="material-icons" style="margin-right: 5px">wifi</span>Fridge
                    </div>
                  </template>
                  <template v-if="home.isBalcony">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <span class="material-icons" style="margin-right: 5px">wifi</span>Balcony
                    </div>
                  </template>
                  <template v-if="true">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <span class="material-icons" style="margin-right: 5px">wifi</span>Napkins
                    </div>
                  </template>
                </v-col>
              </template>
              <template v-if="home.isWindows || home.isSmartTv || home.isExtraMattress">
                <v-col cols="12" lg="4">
                  <template v-if="true">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <span class="material-icons" style="margin-right: 5px">wifi</span>Windows
                    </div>
                  </template>
                  <template v-if="home.isShampoo">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <span class="material-icons" style="margin-right: 5px">wifi</span>SmartTv
                    </div>
                  </template>
                  <template v-if="home.Toiletries">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <span class="material-icons" style="margin-right: 5px">wifi</span>ExtraMattress
                    </div>
                  </template>
                </v-col>
              </template>
            </div>
          </v-responsive>
        </v-col>
        <v-col cols="12" lg="4" style="padding: 12px 0 12px 20px!important;">
          <v-card class="mx-auto" max-width="100%">
            <v-card-title>
              <span
                style="font-size: 28px!important; font-weight: 900!important;"
              >{{formatPrice(home.price)}}$</span>
              <span style="font-size: 14px!important; padding-top: 5px;">
                /
                <span v-if="isPrice">{{diffDays}}</span> night
              </span>
            </v-card-title>

            <v-container>
              <div class="d-flex justify-center">
                <v-menu
                  ref="fromMenu"
                  v-model="date.fromMenu"
                  :close-on-content-click="false"
                  :return-value.sync="date.fromDate"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="date.fromDate" readonly v-on="on" />
                  </template>
                  <v-date-picker v-model="date.fromDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="fromMenu = false">Cancel</v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.fromMenu.save(date.fromDate)"
                      v-on:click="calculator"
                    >OK</v-btn>
                  </v-date-picker>
                </v-menu>
                <v-menu
                  ref="toMenu"
                  v-model="date.toMenu"
                  :close-on-content-click="false"
                  :return-value.sync="date.toDate"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="date.toDate" readonly v-on="on" />
                  </template>
                  <v-date-picker v-model="date.toDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="toMenu = false">Cancel</v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.toMenu.save(date.toDate)"
                      v-on:click="calculator"
                    >OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </div>
              <div>
                <v-combobox
                  style="background-color: white;"
                  v-model="guest.selectCBB"
                  :items="guest.itemCBBs"
                  outlined
                ></v-combobox>
              </div>
              <div class="d-flex justify-space-between" v-if="isPrice">
                <p class="font-weight-bold">Total</p>
                <p class="font-weight-bold">{{formatPrice(bookingPrice)}}$</p>
              </div>
              <v-card-actions>
                <v-btn
                  max-width="100%"
                  width="100%"
                  height="3rem"
                  style="box-shadow: 0 4px 12px 0 rgba(246,116,57,.4); background-image: linear-gradient(90deg,#f65e38 0,#f68a39 51%,#f65e38); color: white"
                  v-on:click="requestToBook()"
                  :disabled="isRequest"
                >Request to book</v-btn>
              </v-card-actions>
            </v-container>
            <v-divider></v-divider>
          </v-card>
        </v-col>
      </v-row>
      <v-responsive v-if="home.linkGoogleMap" class="map-area">
        <p class="font-weight-bold" style="font-size: 1.25rem;">Google map</p>
        <iframe
          :src="home.linkGoogleMap"
          width="100%"
          height="450"
          frameborder="0"
          style="border:0;"
          allowfullscreen
          aria-hidden="false"
          tabindex="0"
        ></iframe>
      </v-responsive>
      <v-divider style="margin: 20px 0;"></v-divider>
      <v-responsive class="comment-area">
        <v-row>
          <v-col cols="12" lg="10">
            <v-textarea
              v-model="comment.content"
              label="Comment"
              auto-grow
              outlined
              rows="1"
              row-height="15"
            ></v-textarea>
          </v-col>
          <v-col cols="12" lg="2">
            <v-btn class="primary" v-on:click="postComment()">Comment</v-btn>
          </v-col>
        </v-row>
        <div v-for="(userComment, index) in userComments" :key="index">
          <v-row>
            <v-col cols="12" lg="12">
              <v-avatar left>
                <v-img :src="user.avatar"></v-img>
              </v-avatar>
              <v-chip class="ma-2">
                <span style="font-weight: bold">{{user.username}}</span>
                <span style="margin-left: 10px">{{userComment._source.content}}</span>
              </v-chip>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </div>
      </v-responsive>
    </v-container>
  </v-app>
</template>

<script>
import SlideShowHome from "@/components/SlideShowHome";
export default {
  components: {
    SlideShowHome,
  },
  data() {
    return {
      user: {
        userId: "",
        username: "",
        firstName: "",
        lastName: "",
        age: 0,
        address: "",
        email: "",
        phone: "",
        birthDay: "",
        description: "",
        avatar: "",
      },
      homeImages: [],
      items: [],
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
        isExtraMattress: false,
      },
      guest: {
        selectCBB: { count: 2, text: "2 guest" },
        itemCBBs: [
          { count: 1, text: "1 guest" },
          { count: 2, text: "2 guest" },
          { count: 3, text: "3 guest" },
          { count: 4, text: "4 guest" },
        ],
      },
      date: {
        fromDate: new Date().toISOString().substr(0, 10),
        toDate: new Date().toISOString().substr(0, 10),
        fromMenu: false,
        toMenu: false,
      },
      isPrice: false,
      bookingPrice: 0,
      diffDays: 1,
      comment: {
        classPK: 0,
        className: "",
        content: "",
      },
      userComments: [],
      isRequest: false,
      highLightVote: false,
    };
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed().replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    calculator() {
      let vm = this;
      if (vm.date.fromDate && vm.date.toDate) {
        if (vm.date.fromDate < vm.date.toDate) {
          const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
          const fromDate = new Date(vm.date.fromDate);
          const toDate = new Date(vm.date.toDate);

          const diffDays = Math.round(Math.abs((fromDate - toDate) / oneDay));
          const price = Math.round(
            Math.abs((fromDate - toDate) / oneDay) * vm.home.price
          );
          vm.diffDays = diffDays;
          vm.bookingPrice = price;
          vm.isPrice = true;
        }
        let query = {
          indice: "Booking",
          size: 10000,
          query: {
            bool: {
              must: [
                {
                  match: {
                    _type: "Booking",
                  },
                },
                {
                  match: {
                    classPK: vm.$route.params.homeId,
                  },
                },
                {
                  match: {
                    className: "com.booking.model.Home",
                  },
                },
                {
                  match: {
                    bookingStatus: "renting",
                  },
                },
                {
                  bool: {
                    should: [
                      {
                        range: {
                          fromDate: {
                            gte: vm.toTimestamp(vm.date.fromDate),
                            lte: vm.toTimestamp(vm.date.toDate),
                          },
                        },
                      },
                      {
                        range: {
                          toDate: {
                            lte: vm.toTimestamp(vm.date.fromDate),
                            gte: vm.toTimestamp(vm.date.toDate),
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        };
        vm.$axios
          .post(`/booking/api/v1/_search`, query)
          .then((response) => {
            if (response.data.hits.hits.length > 0) {
              vm.isRequest = true;
            } else {
              vm.isRequest = false;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    requestToBook() {
      let vm = this;
      let homeId = vm.$route.params.homeId;
      let booking = {
        classPK: homeId,
        numberOfGuest: vm.guest.selectCBB.count,
        fromDate: vm.date.fromDate,
        toDate: vm.date.toDate,
      };
      if (booking.toDate > booking.fromDate) {
        vm.$router.push({
          name: "PaymentView",
          params: {
            bookingInfo: booking,
          },
        });
      } else {
        alert("Chọn lại ngày!");
      }
    },
    postComment() {
      let vm = this;
      vm.comment.classPK = vm.$route.params.homeId;
      vm.comment.className = "com.booking.model.Home";
      vm.$axios
        .post(`/booking/api/v1/comment`, vm.comment, {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        })
        .then((response) => {
          console.log(response);
          vm.$router.go();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    toTimestamp(strDate) {
      return Date.parse(strDate);
    },
    sharing() {},
    voting() {
      let vm = this;
      let voting = {
        className: "com.booking.model.Home",
        classPK: vm.$route.params.homeId,
        star: 1,
      };
      let options = {
        method: "POST",
        url: `/booking/api/v1/voting`,
        data: voting,
        headers: { Authorization: localStorage.getItem("jwtToken") },
      };
      vm.$axios(options)
        .then((response) => {
          if (response.data) {
            vm.highLightVote = true;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created: function () {
    let vm = this;

    let userId = localStorage.getItem("userId");
    vm.$axios
      .get(`/booking/api/v1/user/` + userId, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((response) => {
        if (response.data) {
          vm.user = response.data;
        }
      })
      .catch((e) => {
        vm.errors.push(e);
      });
    vm.$axios
      .get(
        `/booking/api/v1/image/com.booking.model.Home/` +
          vm.$route.params.homeId
      )
      .then((response) => {
        vm.homeImages = response.data.data;
      })
      .catch((e) => {
        console.log(e);
      });

    vm.$axios
      .get(`/booking/api/v1/home/` + vm.$route.params.homeId)
      .then((response) => {
        vm.home = response.data;
        let state = {
          text: vm.home.stateName,
          disabled: false,
          href: "",
        };
        let city = {
          text: vm.home.cityName,
          disabled: false,
          href: "",
        };
        let district = {
          text: vm.home.districtName,
          disabled: false,
          href: "",
        };
        let village = {
          text: vm.home.villageName,
          disabled: true,
          href: "",
        };
        vm.items.push(state);
        vm.items.push(city);
        vm.items.push(district);
        vm.items.push(village);
      })
      .catch((e) => {
        console.log(e);
      });

    var query = {
      indice: "Comment",
      query: {
        bool: {
          must: [
            {
              match: {
                _type: "Comment",
              },
            },
            {
              match: {
                classPK: vm.$route.params.homeId,
              },
            },
            {
              match: {
                className: "com.booking.model.Home",
              },
            },
          ],
        },
      },
    };
    vm.$axios
      .post(`/booking/api/v1/_search`, query)
      .then((response) => {
        vm.userComments = response.data.hits.hits;
      })
      .catch((err) => {
        console.log(err);
      });

    var query2 = {
      indice: "Booking",
      size: 10000,
      query: {
        bool: {
          should: [
            {
              bool: {
                must: [
                  {
                    match: {
                      _type: "Booking",
                    },
                  },
                  {
                    match: {
                      classPK: vm.$route.params.homeId,
                    },
                  },
                  {
                    match: {
                      className: "com.booking.model.Home",
                    },
                  },
                  {
                    match: {
                      bookingStatus: "renting",
                    },
                  },
                  {
                    bool: {
                      should: [
                        {
                          range: {
                            fromDate: {
                              gte: vm.toTimestamp(vm.date.fromDate),
                              lte: vm.toTimestamp(vm.date.toDate),
                            },
                          },
                        },
                        {
                          range: {
                            toDate: {
                              lte: vm.toTimestamp(vm.date.fromDate),
                              gte: vm.toTimestamp(vm.date.toDate),
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              bool: {
                must: [
                  {
                    match: {
                      _type: "Home",
                    },
                  },
                  {
                    match: {
                      homeId: vm.$route.params.homeId,
                    },
                  },
                  {
                    bool: {
                      should: [
                        {
                          match: {
                            isActive: 0,
                          },
                        },
                        {
                          match: {
                            isActive: 2,
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    };
    vm.$axios
      .post(`/booking/api/v1/_search`, query2)
      .then((response) => {
        if (response.data.hits.hits.length > 0) {
          vm.isRequest = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });

    let queryVote = {
      indice: "Voting",
      size: 10000,
      query: {
        bool: {
          must: [
            {
              match: {
                _type: "Voting",
              },
            },
            {
              match: {
                className: "com.booking.model.Home",
              },
            },
            {
              match: {
                classPK: vm.$route.params.homeId,
              },
            },
            {
              match: {
                userId: localStorage.getItem("userId"),
              },
            },
          ],
        },
      },
    };
    vm.$axios
      .post(`/booking/api/v1/_search`, queryVote)
      .then((response) => {
        if (response.data.hits.hits.length > 0) {
          vm.highLightVote = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
#common-home .v-breadcrumbs {
  padding-left: 12px !important;
}
.disable-events {
  pointer-events: none;
}

.margin-bot-custom {
  margin-bottom: 15px;
}
</style>
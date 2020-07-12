<template>
  <v-container fluid>
    <div style="width: 100%" v-for="element in listIndex" :key="element">
      <div class="d-flex justify-space-between align-center" style="width: 100%">
        <v-chip class="ma-2" color="blue" label text-color="white">
          <v-icon left>mdi-label</v-icon>
          {{element.title}}
        </v-chip>
        <v-btn v-on:click="indexing(element.api)">Indexing</v-btn>
      </div>
      <v-divider></v-divider>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      listIndex: [
        {
          title: "State Category",
          api: "http://localhost:8080/booking/api/v1/state/indexing"
        },
        {
          title: "City Category",
          api: "http://localhost:8080/booking/api/v1/city/indexing"
        },
        {
          title: "District Category",
          api: "http://localhost:8080/booking/api/v1/district/indexing"
        },
        {
          title: "Village Category",
          api: "http://localhost:8080/booking/api/v1/village/indexing"
        },
        {
          title: "Home Type",
          api: "http://localhost:8080/booking/api/v1/hometype/indexing"
        },
        {
          title: "Home",
          api: "http://localhost:8080/booking/api/v1/home/indexing"
        },
        {
          title: "User",
          api: "http://localhost:8080/booking/api/v1/user/indexing"
        }
      ]
    };
  },
  methods: {
    indexing(api) {
      let vm = this;
      vm.$axios
        .post(api, null, {
          headers: {
            Authorization: localStorage.getItem("jwtToken")
          }
        })
        .then(() => {
          alert("done!");
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
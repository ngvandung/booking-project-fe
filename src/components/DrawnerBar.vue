<template>
  <v-responsive class="d-flex" height="100%" width="100%">
    <v-row style="height: 100%">
      <v-col cols="12" sm="2">
        <v-tabs vertical>
          <v-tab :to="item.router" v-for="item in tabs.items" :key="item.router">{{item.title}}</v-tab>
        </v-tabs>
      </v-col>
      <v-col style="border-left: 1px solid #e1e1e1" cols="12" sm="10">
        <router-view />
      </v-col>
    </v-row>
  </v-responsive>
</template>

<script>
export default {
  props: {
    tabs: {
      items: {
          type: Array,
          required: true
      }
    }
  },
  name: "DrawnerBar"
};
</script>

<style>
</style>
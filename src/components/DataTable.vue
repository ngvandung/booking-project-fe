<template>
  <v-app>
    <div class="d-flex justify-space-between">
      <v-col cols="12" md="6" style="max-height: 80px;">
        <slot name="data-table-title"></slot>
      </v-col>
      <v-col cols="12" md="6" style="max-height: 80px;">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
    </div>
    <v-data-table
      :headers="dt.headers"
      :items="dt.data"
      :items-per-page="5"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:item.name="props">
        <slot :item="props.item" name="route-link-house"></slot>
      </template>

      <template v-slot:item._source.name="props">
        <slot :item="props.item" name="route-link-house-host"></slot>
      </template>

      <template v-slot:item.bookingStatus="props">
        <slot :item="props.item" name="status-house"></slot>
      </template>

      <template v-slot:item.actions="props">
        <slot :item="props.item" name="data-table-action"></slot>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
export default {
  props: {
    dt: {
      headers: {
        type: Array,
        required: true
      },
      data: {
        type: Array,
        required: true
      }
    }
  },
  name: "DataTable",
  data() {
    return {
      search: ""
    };
  }
};
</script>

<style>
</style>
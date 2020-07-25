<template>
  <div class="slide-show">
    <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
      <v-carousel-item v-for="(image, i) in images" :key="i">
        <v-sheet height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <v-img max-height="400" :src="'/booking/images/' + image"></v-img>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
</style>
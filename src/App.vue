<template>
  <v-fade-transition mode="out-in">
    <router-view />
  </v-fade-transition>
</template>

<script>
export default {
  name: "App",
  metaInfo: {
    title: "App",
    titleTemplate: "%s | Zero Pro",
    htmlAttrs: { lang: "en" },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ]
  }
};
</script>

<style>
.extra-padding {
  padding-bottom: 96px !important;
  padding-top: 96px !important;
}

@media screen and (max-width: 959px) {
  .extra-padding {
    padding-top: 48px !important;
    padding-bottom: 48px !important;
  }
}
</style>

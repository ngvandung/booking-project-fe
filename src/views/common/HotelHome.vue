<template>
  <list-house :query="query" />
</template>

<script>
export default {
  components: {
    ListHouse: () => import("@/components/ListHouse")
  },
  data() {
    return {
      query: {
        indice: "Home",
        query: {
          bool: {
            must: [
              {
                match: {
                  _type: "Home"
                }
              },
              {
                match: {
                  isActive: 1
                }
              }
            ]
          }
        }
      }
    };
  }
};
</script>

<style>
</style>
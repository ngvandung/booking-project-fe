<template>
  <list-house :query="query" />
</template>

<script>
import ListHouse from "@/components/ListHouse";
export default {
  components: {
    ListHouse
  },
  data() {
    return {
      query: {
        indice: "Home",
        size: "10000",
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
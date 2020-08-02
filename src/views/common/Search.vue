<template>
  <list-house :query="query" />
</template>

<script>
import ListHouse from "@/components/ListHouse";
export default {
  components: { ListHouse },
  data() {
    return {
      houses: [],
      textSearch: this.$route.query.text,
      from: this.$route.query.from,
      to: this.$route.query.to,
      guest: this.$route.query.guest,
      query: null
    };
  },
  created: function() {
    let vm = this;
    var query = {
      indice: "House",
      size: "10000",
      query: {
        bool: {
          must: [
            {
              match: {
                _type: "House"
              }
            },
            {
              range: {
                maxGuest: {
                  gte: vm.guest
                }
              }
            },
            {
              match: {
                isActive: 1
              }
            },
            {
              bool: {
                should: [
                  {
                    match: {
                      cityName: vm.textSearch
                    }
                  },
                  {
                    match: {
                      stateName: vm.textSearch
                    }
                  },
                  {
                    match: {
                      districtName: vm.textSearch
                    }
                  },
                  {
                    match: {
                      villageName: vm.textSearch
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    };
    vm.query = query;
  }
};
</script>

<style>
</style>
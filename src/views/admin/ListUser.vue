<template>
  <data-table :dt="users">
    <template v-slot:data-table-title>
      <v-chip class="ma-2" color="#2196F3" label outlined>Managers are pending</v-chip>
    </template>
    <template v-slot:data-table-action="slotProps">
      <v-btn small v-on:click="activeUserRoleManager(slotProps.item.userId)">Active</v-btn>
    </template>
  </data-table>
</template>

<script>
export default {
  name: "ListUser",
  components: { DataTable: () => import("@/components/DataTable") },
  data() {
    return {
      users: {
        headers: [
          { text: "First Name", value: "firstName" },
          { text: "Last Name", value: "lastName" },
          { text: "Age", value: "age" },
          { text: "Address", value: "address" },
          { text: "Status", value: "isEnabled" },
          { text: "", value: "actions", sortable: false }
        ],
        data: []
      }
    };
  },
  methods: {
    activeUserRoleManager(_userId) {
      let vm = this;
      var userRole = {
        userId: _userId,
        roleId: 3
      };
      vm.$axios
        .put(`http://localhost:8080/booking/api/v1/admin/userrole`, userRole, {
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
  },
  created: function() {
    let vm = this;
    vm.$axios
      .get(`http://localhost:8080/booking/api/v1/userrole/users`, {
        headers: {
          Authorization: localStorage.getItem("jwtToken")
        },
        params: {
          roleId: 1,
          isHost: 0
        }
      })
      .then(response => {
        vm.users.data = response.data;
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>

<style>
</style>
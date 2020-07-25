<template>
  <data-table :dt="users" ref="dataTable">
    <template v-slot:data-table-title>
      <v-chip class="ma-2" color="#2196F3" label outlined>Managers are pending</v-chip>
    </template>
    <template v-slot:data-table-action="slotProps">
      <v-btn small v-on:click="activeUserRoleManager(slotProps.item.userId)">Active</v-btn>
    </template>
  </data-table>
</template>

<script>
import DataTable from "@/components/DataTable";
export default {
  name: "ListUser",
  components: { DataTable },
  data() {
    return {
      users: {
        headers: [
          { text: "First Name", value: "firstName" },
          { text: "Last Name", value: "lastName" },
          { text: "Age", value: "age" },
          { text: "Address", value: "address" },
          { text: "Status", value: "isEnabled" },
          { text: "", value: "actions", sortable: false },
        ],
        data: [],
      },
    };
  },
  methods: {
    activeUserRoleManager(_userId) {
      let vm = this;
      var userRole = {
        userId: _userId,
        roleId: 3,
      };
      vm.$axios
        .put(`/booking/api/v1/admin/userrole`, userRole, {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        })
        .then(() => {
          alert("done!");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created: function () {
    let vm = this;
    vm.$axios
      .get(`/booking/api/v1/userrole/users`, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
        params: {
          roleId: 1,
          isHost: 0,
        },
      })
      .then((response) => {
        if (vm.$refs.dataTable) {
          vm.$refs.dataTable["loading"] = false;
        }
        vm.users.data = response.data;
      })
      .catch((e) => {
        if (vm.$refs.dataTable) {
          vm.$refs.dataTable["loading"] = false;
        }
        console.log(e);
      });
  },
};
</script>

<style>
</style>
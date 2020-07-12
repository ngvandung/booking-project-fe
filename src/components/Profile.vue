<template>
  <v-container fluid>
    <v-stepper v-model="stepper">
      <v-stepper-header>
        <v-stepper-step :complete="stepper > 1" step="1">Account</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step v-if="roleName == 'ROLE_HOST'" :complete="stepper > 2" step="2">Payments</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step v-if="roleName == 'ROLE_HOST'" step="3">Change Password</v-stepper-step>
        <v-stepper-step v-else step="2">Change Password</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-container>
            <v-card max-width="300" outlined style="margin-bottom: 20px;" class="d-flex">
              <v-list-item-avatar tile size="150" color="grey" style="margin: 10px;">
                <v-img :src="user.avatar"></v-img>
              </v-list-item-avatar>
              <v-card-actions class="d-flex justify-end flex-column">
                <label
                  for="files"
                  style="padding: 5px 10px; border-radius: 5px; cursor: pointer; color: white; font-size: 14px; margin-bottom: 2px;"
                  class="primary"
                >Change Avatar</label>
                <input
                  type="file"
                  id="files"
                  ref="files"
                  label="Files"
                  accept="image/*"
                  style="display: none;"
                  required
                  @change="handleFileUpload"
                />
              </v-card-actions>
            </v-card>
            <v-text-field
              v-model="user.firstName"
              label="First Name"
              placeholder="First Name"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="user.lastName"
              label="Last Name"
              placeholder="Last Name"
              outlined
            ></v-text-field>
            <v-text-field v-model="user.email" label="Email" placeholder="Email" outlined></v-text-field>
            <v-text-field v-model="user.address" label="Address" placeholder="Address" outlined></v-text-field>
            <v-text-field v-model="user.phone" label="Phone" placeholder="Phone" outlined></v-text-field>
            <v-textarea
              v-model="user.description"
              label="Describe yourself"
              placeholder="Description"
              outlined
            ></v-textarea>
          </v-container>
          <v-btn color="primary" @click="stepper = 2">Continue</v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content v-if="roleName == 'ROLE_HOST'" step="2">
          <v-container>
            <v-text-field
              v-model="user.hashSecret"
              label="Secret Key"
              placeholder="Secret Key"
              outlined
              type="password"
            ></v-text-field>
            <v-text-field
              v-model="user.tmnCode"
              label="Terminal ID"
              placeholder="Terminal ID"
              outlined
            ></v-text-field>
          </v-container>
          <v-btn color="primary" @click="stepper = 3">Continue</v-btn>
          <v-btn @click="stepper = 1" text>Back</v-btn>
        </v-stepper-content>
        <v-stepper-content v-if="roleName == 'ROLE_HOST'" step="3">
          <v-container>
            <v-text-field
              v-model="currentPassword"
              label="Current Password"
              placeholder="Current Password"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="newPassword"
              label="New Password"
              placeholder="New Password"
              outlined
              type="password"
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              label="Confirm New Password"
              placeholder="Confirm New Password"
              outlined
              type="password"
            ></v-text-field>
          </v-container>
          <v-btn color="primary" v-on:click="updateUser">Update</v-btn>
          <v-btn @click="stepper = 2" text>Back</v-btn>
        </v-stepper-content>
        <v-stepper-content v-else step="2">
          <v-container>
            <v-text-field
              v-model="currentPassword"
              label="Current Password"
              placeholder="Current Password"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="newPassword"
              label="New Password"
              placeholder="New Password"
              outlined
              type="password"
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              label="Confirm New Password"
              placeholder="Confirm New Password"
              outlined
              type="password"
            ></v-text-field>
          </v-container>
          <v-btn color="primary" v-on:click="updateUser">Update</v-btn>
          <v-btn @click="stepper = 1" text>Back</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
export default {
  name: "profile",
  data() {
    return {
      user: {
        userId: "",
        username: "",
        firstName: "",
        lastName: "",
        age: 0,
        address: "",
        email: "",
        phone: "",
        birthDay: "",
        description: "",
        hashSecret: "",
        tmnCode: "",
        avatar: ""
      },
      roleName: localStorage.getItem("roleName"),
      stepper: 1,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    };
  },
  beforeMount: function() {
    let vm = this;
    let userId = localStorage.getItem("userId");
    vm.$axios
      .get(`http://localhost:8080/booking/api/v1/user/` + userId, {
        headers: {
          Authorization: localStorage.getItem("jwtToken")
        }
      })
      .then(response => {
        if (response.data) {
          vm.user = response.data;
        }
      })
      .catch(e => {
        vm.errors.push(e);
      });
  },
  methods: {
    async handleFileUpload() {
      let vm = this;
      const image = document.querySelector("#files").files[0];
      let formData = new FormData();
      formData.append("file", image);

      await vm.$axios
        .post(
          `http://localhost:8080/booking/api/v1/user/` +
            vm.user.userId +
            "/avatar",
          formData,
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken"),
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateUser() {
      let vm = this;
      if (vm.currentPassword && vm.newPassword && vm.confirmPassword) {
        if (vm.newPassword === vm.confirmPassword) {
          let formData = new FormData();
          formData.append("currentPassword", vm.currentPassword);
          formData.append("newPassword", vm.newPassword);
          formData.append("confirmPassword", vm.confirmPassword);
          let userId = localStorage.getItem("userId");
          vm.$axios
            .post(
              `http://localhost:8080/booking/api/v1/user/` + userId,
              formData,
              {
                headers: {
                  Authorization: localStorage.getItem("jwtToken"),
                  "Content-Type": "multipart/form-data"
                }
              }
            )
            .then(response => {
              if (response.data.userId) {
                alert("Change Password successfully");
              }
            })
            .catch(e => {
              vm.errors.push(e);
            });
        }
      }
      vm.$axios
        .put(`http://localhost:8080/booking/api/v1/user`, vm.user, {
          headers: {
            Authorization: localStorage.getItem("jwtToken")
          }
        })
        .then(response => {
          if (response.data.userId) {
            alert("Update successfully");
          }
        })
        .catch(e => {
          vm.errors.push(e);
        });
    }
  }
};
</script>

<style>
</style>
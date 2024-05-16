import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state() {
    return {
      userId: "",
      userName: "",
      userEmail: "",
      userPhone: "",
      isLoggedIn: false,
    };
  },
  actions: {
    loginSuccess(user) {
      this.userId = user.userId;
      this.userName = user.userName;
      this.userEmail = user.userEmail;
      this.userPhone = user.userPhone;
      this.isLoggedIn = true;
    },

    logout() {
      this.userId = "";
      this.userName = "";
      this.userEmail = "";
      this.userPhone = "";
      this.isLoggedIn = false;
    },
  },
  getters: {},
});

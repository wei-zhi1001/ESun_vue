<template>
  <header class="p-3 text-bg-dark mb-3">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <ul
          class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
        >
          <li>
            <router-link to="/" class="nav-link px-2 text-secondary"
              >首頁</router-link
            >
          </li>
          <li>
            <router-link to="/shop" class="nav-link px-2 text-white"
              >瀏覽</router-link
            >
          </li>
          <li>
            <router-link to="/cart" class="nav-link px-2 text-white"
              >發文</router-link
            >
          </li>
        </ul>

        <div class="text-end">
          <router-link to="/login" class="text-decoration-none">
            <button
              type="button"
              class="btn btn-outline-light me-2"
              v-if="!isLoggedIn"
            >
              登入
            </button>
          </router-link>
          <template v-if="isLoggedIn">
            <router-link to="/profile" class="text-decoration-none">
              <button type="button" class="btn btn-warning">
                {{ name }}
              </button></router-link
            >
            <img :src="photo" width="8%" class="mx-2" />

            <button type="button" class="btn btn-outline-light" @click="logout">
              登出
            </button>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import { useUserStore } from "@/stores/userStore";
import axios from "axios";
export default {
  computed: {
    name() {
      const userStore = useUserStore();
      return userStore.userName;
    },
    id() {
      const userStore = useUserStore();
      return userStore.userId;
    },
    photo() {
      const userStore = useUserStore();
      return userStore.userPhoto;
    },
    isLoggedIn() {
      return useUserStore().isLoggedIn;
    },
  },
  methods: {
    logout() {
      console.log("logout");
      axios
        .get(`${this.API_URL}/user/logout`)
        .then((rs) => {
          const userStore = useUserStore();
          userStore.logout();
          this.$router.push("/");
        })
        .catch((error) => {
          console.log("登出失敗", error);
        });
    },
  },
};
</script>
<style></style>

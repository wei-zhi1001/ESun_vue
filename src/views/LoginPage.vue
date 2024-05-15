<template>
  <main class="container col-xl-10 col-xxl-8 px-4 py-5">
    <div class="row align-items-center g-lg-5 py-5">

      <div class="col-md-10 mx-auto col-lg-5">
        <form class="p-4 p-md-5 border rounded-3 bg-light">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="name@example.com"
              v-model="phone"
            />
            <label>Phone Number</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Password"
              v-model="password"
            />
            <label>Password</label>
          </div>
          <div class="row mb-4">
            <div class="col">

            </div>
          </div>
          <button class="w-100 btn btn-lg btn-primary" @click.prevent="login">
            SIGN IN
          </button>
          <div class="text-danger text-center mt-3">{{ message }}</div>

          <hr class="my-4" />
          <div class="text-center">
            <p>Not a member? <a href="/register">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
<script>
import axios from "axios";
import { useUserStore } from "@/stores/userStore";

export default {
  data() {
    return {
      phone: "",
      password: "12345678",
      message: "",
    };
  },
  methods: {
    login() {
      const fd = new FormData();
      fd.append("phone", this.phone);
      fd.append("password", this.password);

      axios
        .post(`${this.API_URL}/user/login`, fd)
        .then((rs) => {
          const userStore = useUserStore();
          userStore.loginSuccess(rs.data);
          sessionStorage.setItem("loggedInMember", JSON.stringify(rs.data));
          this.$router.push("/");
        })
        .catch(() => {
          this.message = "登入失敗";
        });
    },
    check() {
      axios.get(`${this.API_URL}/check`).then((rs) => console.log(rs.data));
    },
  },
};
</script>
<style></style>

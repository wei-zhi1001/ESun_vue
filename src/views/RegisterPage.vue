<template>
  <main class="vh-80" style="background-color: #eee">
    <div class="container h-80">
      <div class="row d-flex justify-content-center align-items-center h-80">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    立即註冊會員
                  </p>

                  <form class="mx-1 mx-md-4">
                    <div class="d-flex flex-row align-items-center mb-4">
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          id="form3Example1c"
                          class="form-control"
                          v-model="name"
                          required
                        />
                        <label class="form-label" for="form3Example1c"
                          >Your Name</label
                        >
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          id="form3Example3c"
                          class="form-control"
                          v-model="email"
                          required
                        />
                        <label class="form-label" for="form3Example3c"
                          >Your Email &nbsp;&nbsp;</label
                        >
                      </div>
                    </div>


                    <div class="d-flex flex-row align-items-center mb-4">
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          id="form3Example3b"
                          class="form-control"
                          v-model="phone"
                          required
                        />
                        <label class="form-label" for="form3Example3c"
                          >Your Phone</label
                        >
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="password"
                          id="form3Example4c"
                          class="form-control"
                          v-model="password"
                          required
                        />
                        <label class="form-label" for="form3Example4c"
                          >Password</label
                        >
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="password"
                          id="form3Example4cd"
                          class="form-control"
                          v-model="password2"
                          required
                        />
                        <label class="form-label" for="form3Example4cd"
                          >Repeat your password</label
                        >
                      </div>
                    </div>

                    <div class="form-check d-flex justify-content-center mb-5">
                      <input
                        class="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3c"
                        v-model="check"
                      />
                      <label class="form-check-label" for="form2Example3">
                        I agree all statements in
                        <a href="#!">Terms of service</a>
                      </label>
                    </div>

                    <div
                      class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                    >
                      <button
                        type="button"
                        class="btn btn-primary btn-lg"
                        @click.prevent="register"
                      >
                        Register
                      </button>
                    </div>
                    <div class="text-danger text-center mt-3">
                      {{ message }}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "amy",
      email: "amy@mail.com",
      phone: "0987654321",
      password: "",
      password2: "",
      check: "",
      message: "",
      message2: "",
    };
  },
  methods: {
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    register() {
      if (this.password != this.password2) {
        this.message = "兩次輸入的密碼不相符";
      }else if(!this.validateEmail(this.email)){
        this.message = "信箱格式錯誤";
      }else if (!this.check) {
        this.message = "您尚未同意服務條款";
      } else {
        const fd = new FormData();
        fd.append("name", this.name);
        fd.append("email", this.email);
        fd.append("phone", this.phone);
        fd.append("password", this.password);

        axios
          .post(`${this.API_URL}/user/register`, fd)
          .then((rs) => {
            this.$router.push("/");
          })
          .catch(() => {
            this.message = "註冊失敗";
          });
      }
    },


  },
};
</script>
<style></style>

<template>
  <div class="d-flex justify-content-center">
    <div class="input-container">
      <label for="input" class="form-label">發布貼文</label>
      <input type="text" id="input" class="form-control" v-model="content">
    </div>
  </div>
  <div class="d-flex justify-content-center mt-3">
    <button @click="addPost()" class="submit-button">確認發布</button>
  </div>
</template>

<script>
import axios from "axios";
import { useUserStore } from "@/stores/userStore.js";

export default {
  data() {
    return {
      content: "",
      image: "",
    };
  },
  methods: {
    addPost() {
      const userStore = useUserStore();
      if (this.content.trim() !== "") {
        const fd = new FormData();
        fd.append("userId", userStore.userId);
        fd.append("content", this.content);
        fd.append("image", this.image);

        axios
            .post(`${this.API_URL}/post/newPost`, fd)
            .then(() => {
              window.alert("發布成功！")
              this.content="";
            })
            .catch((error) => {
              window.alert("發布失敗:");
            });
      } else {
        window.alert("貼文內容不能為空");
      }
    },
  },
  mounted() {
    const userStore = useUserStore();
    if (userStore.isLoggedIn) {
      console.log("歡迎使用");
    } else {
      window.alert("請先登入");
      this.$router.push("/login");
    }
  },
};
</script>

<style>
.input-container {
  width: 80%;
}

.submit-button {
  margin-top: 10px; /* 調整按鈕與輸入框之間的距離 */
}
</style>

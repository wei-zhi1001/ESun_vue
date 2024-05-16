<template>
  <main class="main-container">
    <div class="content-container">
      <div
          v-for="post in Posts"
          :key="post.postId"
          class="post-container"
      >
        <div class="post-content">
          <span>貼文id：{{ post.postId }} - 發布時間：{{ formatCreatedAt(post.createdAt) }}</span><br>
          <span>內容：{{ post.content }}</span>
          <template v-if="post.user.userId == id()">
            <button @click="editPost(post)" class="submit-button">
              編輯
            </button>
            <button @click="deletePost(post)" class="submit-button">
              刪除
            </button>
          </template>
        </div>
      </div>
    </div>

    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeEditModal">&times;</span>
        <textarea v-model="editedContent"></textarea>
        <button @click="saveEditedPost" class="submit-button">保存</button>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { useUserStore } from "@/stores/userStore.js";

export default {
  data() {
    return {
      Posts: [],
      editedPostId: null,
      editedContent: "",
      showEditModal: false,
      image: "",
    };
  },
  methods: {
    fetchData() {
      axios.get(`${this.API_URL}/post/listAll`).then((rs) => {
        console.log(rs);
        this.Posts = rs.data;
      });
    },
    editPost(post) {
      this.editedPostId = post.postId;
      this.editedContent = post.content;
      this.showEditModal = true;
    },
    saveEditedPost() {
      const fd = new FormData();
      fd.append("postId", this.editedPostId);
      fd.append("content", this.editedContent);
      fd.append("image", this.image);

      axios
          .put(`${this.API_URL}/post/editPost`, fd)
          .then(() => {
            this.fetchData();
            this.closeEditModal();
          });
    },
    closeEditModal() {
      this.showEditModal = false;
      this.editedPostId = null;
      this.editedContent = "";
    },
    deletePost(post) {
      axios.delete(`${this.API_URL}/post/deletePost?postId=${post.postId}`).then(() => {
        this.fetchData();
      });
    },
    id() {
      const userStore = useUserStore();
      return userStore.userId;
    },
    formatCreatedAt(createdAt) {
      const date = new Date(createdAt);
      return date.toLocaleString();
    },
  },
  mounted() {
    const userStore = useUserStore();
    if (userStore.isLoggedIn) {
      this.fetchData();
    } else {
      console.log("請先登入");
    }
  },
};
</script>

<style>
.main-container {
  padding: 20px;
}

.content-container {
  margin-bottom: 20px;
}

.post-container {
  border: 1px solid #ccc; /* 加上外框 */
  background-color: #f9f9f9; /* 加上背景色 */
  padding: 10px;
  margin-bottom: 10px;
}

.post-content {
  margin-bottom: 10px;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.submit-button {
  margin-top: 10px;
  margin-left: auto; /* 將按鈕置中 */
  display: block; /* 讓按鈕佔據整行 */
}

textarea {
  width: 100%;
  height: 100px;
}
</style>

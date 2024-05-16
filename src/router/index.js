import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/HomePage.vue"),
    },
    {
      path: "/login",
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      path: "/register",
      component: () => import("@/views/RegisterPage.vue"),
    },
    {
      path: "/postList",
      component: () => import("@/views/PostList.vue"),
    },
    {
      path: "/postAdd",
      component: () => import("@/views/PostAdd.vue"),
    },

  ],
});

export default router;

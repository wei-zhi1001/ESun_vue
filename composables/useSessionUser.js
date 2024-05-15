import { ref } from "vue";
import httpClient from "@/main";
import { useRouter } from "vue-router";

export function useSessionUser() {
  const router = useRouter();

  const userId = ref(null);
  const userName = ref(null);
  const error = ref(null);

  // 登入動作之後才用，因為之後就放在上面的綁定變數，其他 component 直接拿上面，但登入相關頁面還是要 fetch
  const fetchSessionUser = async () => {
    try {
      const response = await httpClient.get("/user/map");
      userName.value = response.data.userName;
      userId.value = response.data.userId;
    } catch (err) {
      if (
        err.response &&
        (err.response.status === 401 || err.response.status === 403)
      ) {
        error.value = "沒有權限";
        router.push("/login");
      } else {
        error.value = "其他錯誤";
        router.push("/login");
      }
    }
  };

  return { userName, userId, error, fetchSessionUser };
}

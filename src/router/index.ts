import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../store/auth-store";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const userStore = useUserStore();
  userStore.onAuthChange();

  if (to.name !== "login" && !(await userStore.isLoggedIn)) {
    return { name: "login" };
  }
});

export default router;

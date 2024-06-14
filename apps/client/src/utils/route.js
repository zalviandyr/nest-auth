import { createRouter, createWebHistory } from "vue-router";
import RegisterPage from "../components/RegisterPage.vue";
import LoginPage from "../components/LoginPage.vue";
import HomePage from "../components/HomePage.vue";
import { storeUser } from "./storage";

// routes
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/register", component: RegisterPage },
    { path: "/login", component: LoginPage },
  ],
});

// authenticate middleware
router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = storeUser.get();

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  next();
});

export default router;

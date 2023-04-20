import { createRouter, createWebHistory } from "vue-router";

import Profile from "./components/Profile.vue";
import Hour from "./components/Hour.vue";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";

const router = createRouter({
  routes: [
    { path: "/profile", name: "profile", component: Profile },
    { path: "/", name: "home", component: Home },
    { path: "/hour", name: "hour", component: Hour },
    { path: "/login", name: "login", component: Login },
  ],
  history: createWebHistory(),
});

export default router;

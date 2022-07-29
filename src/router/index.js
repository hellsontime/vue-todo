import { createRouter, createWebHistory } from "vue-router";
// import store from "@/store";
import Home from "@/views/Todo.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import PageNotFound from "@/views/PageNotFound";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
      auth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
      auth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
      auth: false,
    },
  },
  {
    path: "/:catchAll(.*)*",
    name: "PageNotFound",
    component: PageNotFound,
    meta: {
      title: "404",
      auth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Change document titles
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Vue Todo`;
  next();
});

// Route guard for auth routes
router.beforeEach((to, from, next) => {
  if (to.meta.auth === true) {
    const user = localStorage.getItem("user");
    if (!user) {
      next({ name: "Login" });
      return;
    }
  }
  next();
  return;
});

export default router;

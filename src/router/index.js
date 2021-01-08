import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "Snippets" }
  },
  {
    path: "/snippets",
    name: "Snippets",
    meta: {
      title: "Snippets",
      layout: "default"
    },
    component: () => import("../views/Snippets.vue")
  },
  {
    path: "/snippet/:id",
    name: "SnippetDetails",
    meta: {
      title: "Snippet Details",
      layout: "default"
    },
    component: () => import("../views/SnippetDetails")
  },
  {
    path: "/snippets/add",
    name: "AddSnippet",
    meta: {
      title: "Add Snippet",
      layout: "default"
    },
    component: () => import("../views/AddSnippet.vue")
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "Login",
      layout: "empty"
    },
    component: () => import("../views/Login")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthorized = localStorage.getItem("isAuthorized");
  if (isAuthorized || to.name === "Login") {
    next();
  } else {
    next({ name: "Login" });
  }
  document.title = to.meta.title;
  next();
});

export default router;

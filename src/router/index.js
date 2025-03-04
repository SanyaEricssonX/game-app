import MainPage from "@/pages/MainPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundPage,
  },
  {
    path: "/",
    name: "Home",
    component: MainPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(/*to, from, savedPosition*/) {
        return { top: 0 };
      },
})

export default router;

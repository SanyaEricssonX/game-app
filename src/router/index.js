import MainPage from "@/pages/MainPage";
import NotFoundPage from "@/pages/NotFoundPage";
import InventoryPage from "@/pages/InventoryPage";
import ShopPage from "@/pages/ShopPage";
import MapPage from "@/pages/MapPage";
import ManualPage from "@/pages/ManualPage";
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
  {
    path: "/inventory",
    name: "Inventory",
    component: InventoryPage,
  },
  {
    path: "/shop",
    name: "Shop",
    component: ShopPage,
  },
  {
    path: "/map",
    name: "Map",
    component: MapPage,
  },
  {
    path: "/manual",
    name: "Manual",
    component: ManualPage,
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

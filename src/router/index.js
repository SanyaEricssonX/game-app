import MainPage from "@/pages/MainPage";
import NotFoundPage from "@/pages/NotFoundPage";
import InventoryPage from "@/pages/InventoryPage";
import ShopPage from "@/pages/ShopPage";
import MapPage from "@/pages/MapPage";
import CampPage from "@/pages/CampPage";
import KnowledgeBasePage from "@/pages/KnowledgeBasePage";
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
    props: (route) => ({ tab: route.query.tab || 'general' }), // Query param с default
    beforeEnter: (to, from, next) => {
      const validTabs = ['general', 'settings', 'updates'];
      if (to.query.tab && !validTabs.includes(to.query.tab)) {
        next({ name: 'Home', query: { tab: 'general' } }); // Редирект с query
      } else {
        next();
      }
    }
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
    path: "/camp",
    name: "Camp",
    component: CampPage,
  },
  {
    path: "/knowledge-base",
    name: "KnowledgeBase",
    component: KnowledgeBasePage,
    props: (route) => ({ tab: route.query.tab || 'general' }), // Query param с default
    beforeEnter: (to, from, next) => {
      const validTabs = ['general', 'combat', 'profession', 'items', 'craft'];
      if (to.query.tab && !validTabs.includes(to.query.tab)) {
        next({ name: 'KnowledgeBase', query: { tab: 'general' } }); // Редирект с query
      } else {
        next();
      }
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
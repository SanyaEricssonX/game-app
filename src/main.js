window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;

import "./assets/style/normalize.css";
import "./assets/style/index.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import components from "@/components/UI";

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

app.use(store).use(router).mount("#app");


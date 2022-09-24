import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { router } from "./router/index";
import "./router/permission";
import "./utils/request";
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/assets/styles/reset.scss";
import "@/assets/styles/common.scss";

const app = createApp(App).use(router).use(createPinia()).mount("#app");

export default app;

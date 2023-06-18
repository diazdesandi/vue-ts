import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import { VueQueryPlugin } from "@tanstack/vue-query";

const app = createApp(App);

// VueQueryPlugin Global
VueQueryPlugin.install(app, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 120, // 2 minutos
        refetchOnReconnect: "always",
      },
    },
  },
});

// .use(VueQueryPlugin)
app.use(router);
app.mount("#app");

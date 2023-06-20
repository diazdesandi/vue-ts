import CounterOptions from "@/counter/pages/CounterOptionsPage.vue";
import CounterSetup from "@/counter/pages/CounterSetupPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "counter-options",
      component: CounterOptions,
    },
    {
      path: "/counter-setup",
      name: "counter-setup",
      component: CounterSetup,
    },
  ],
});

export default router;

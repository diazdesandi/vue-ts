import Counter1Value from "@/counter/pages/Counter1Value.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "counter-1",
      component: Counter1Value,
    },
  ],
});

export default router;

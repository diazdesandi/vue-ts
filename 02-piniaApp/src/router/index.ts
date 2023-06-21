import { createRouter, createWebHistory } from "vue-router";

import CounterOptions from "@/counter/pages/CounterOptionsPage.vue";
import CounterSetup from "@/counter/pages/CounterSetupPage.vue";
import ClientsLayout from "@/clients/layout/ClientsLayout.vue";
import ListPage from "@/clients/pages/ListPage.vue";
import ClientPage from "@/clients/pages/ClientPage.vue";

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
    {
      path: "/clients",
      name: "clients",
      component: ClientsLayout,
      redirect: { name: "list" },
      children: [
        {
          path: "/clients/list",
          name: "list",
          component: ListPage,
        },
        {
          path: "/clients/:id",
          name: "client-id",
          component: ClientPage,
        },
      ],
    },
  ],
});

export default router;

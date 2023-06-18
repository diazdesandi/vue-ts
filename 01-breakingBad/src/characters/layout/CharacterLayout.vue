<script setup lang="ts">
import NavBar from "@/shared/components/NavBar.vue";
import characterRoute from "../router";
import type { RouterLink } from "@/router/link-routes";

const routeLinks: RouterLink[] = characterRoute
  .children!.filter(
    (route) => (route.props as { title: string; visible: boolean }).visible
  )
  .map((route) => {
    return {
      name: route.name as string,
      path: route.path,
      title: (route.props as { title: string; visible: boolean }).title,
    };
  });
</script>
<template>
  <div>
    <h1>Personajes</h1>

    <!-- NavBar -->
    <NavBar :show-icon="false" :links="routeLinks" />

    <!-- RouterView + Suspense -->
    <!-- <Suspense> -->
    <RouterView />
    <!-- </Suspense> -->
  </div>
</template>

<style scoped></style>

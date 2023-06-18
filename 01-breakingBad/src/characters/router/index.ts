import type { RouteRecordRaw } from "vue-router";
import CharacterLayout from "../layout/CharacterLayout.vue";
import CharacterID from "../pages/CharacterID.vue";
import CharacterList from "../pages/CharacterList.vue";
import CharacterSearch from "../pages/CharacterSearch.vue";

const characterRoute: RouteRecordRaw = {
  path: "/characters",
  redirect: "/characters/list",
  component: CharacterLayout,
  children: [
    {
      path: "by/:id",
      name: "character-id",
      props: { title: "Personaje por ID", visible: false },
      component: CharacterID,
    },
    {
      path: "/characters/list",
      name: "character-list",
      props: { title: "Lista", visible: true },
      component: CharacterList,
    },
    {
      path: "/characters/search",
      name: "character-search",
      props: { title: "Búsqueda", visible: true },
      component: CharacterSearch,
    },
  ],
};

export default characterRoute;

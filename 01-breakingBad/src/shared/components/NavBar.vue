<script setup lang="ts">

// const props = defineProps({
//     title: {
//         type: String,
//         required: true,
//     }
// })

import type { RouterLink } from '@/router/link-routes';

export interface Props {
    title?: string;
    links?: RouterLink[]
    showIcon?: boolean
}

// const props = defineProps<{ title?: string }>();
const props = withDefaults(defineProps<Props>(),
    {
        showIcon: true,
        links: () => [],
    }
);

</script>
<template>
    <nav>
                    <img v-if="props.showIcon" src="@/assets/logo.svg" alt="Vue logo" height="25" width="25">
                    <span>{{ props.title || 'No title' }}</span>
                    <!-- <RouterLink to="/">Inicio</RouterLink>
                                        <RouterLink to="/about">Sobre</RouterLink> -->

                    <RouterLink v-for="link of props.links" :key="link.path" :to="link.path">{{ link.title }}</RouterLink>
    </nav>
</template>


<style scoped>
nav {
    align-items: flex-start;
    display: flex;
    font-size: 12px;
    margin-top: 10px;
    text-align: center;
    width: 100%;
}

img {
    margin-right: 5px;
}

span {
    margin-right: 10px;
}

a {
    margin-right: 5px;
}
</style>
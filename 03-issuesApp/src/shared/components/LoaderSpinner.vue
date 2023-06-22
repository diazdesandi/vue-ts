<script setup lang="ts">
// Props
interface Props {
    color?: string,
    size?: string,
    thickness?: number,
}

withDefaults(defineProps<Props>(),{
    color: 'primary',
    size: '3rem',
    thickness: 5
})


</script>
<template>
    <div class="column items-center">
        <q-spinner :color="color" :size="size" :thickness="thickness" />
        <span class="q-mt-sm">Loading</span>
    </div>
</template>



<style scoped>

</style>
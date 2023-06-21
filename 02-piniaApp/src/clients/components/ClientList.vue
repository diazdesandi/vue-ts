<script setup lang="ts">
import useClients from '@/clients/composables/useClients';

const {isLoading, data} = useClients(); 

</script>
<template>
  <div>
    <ul>
      <RouterLink
        :to="{
          name: 'client-id',
          params: { id: 1 },
        }"
      >
        Client Name</RouterLink
      >
    </ul>
  </div>
</template>

<style scoped></style>

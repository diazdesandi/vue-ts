<script setup lang="ts">
interface Props {
  buttons: Button[];
}

interface Button {
  action: () => void;
  color?: string;
  icon: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

defineProps<Props>();
</script>
<template>
  <div class="fab">
    <q-btn
      class="q-mr-sm"
      v-for="button of buttons"
      :key="button.icon"
      round
      :color="button.color || 'primary'"
      :icon="button.icon"
      :size="button.size || 'lg'"
      @click="button.action"
    />
  </div>
</template>
<style scoped>
.fab {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
</style>

<script setup lang="ts">
import { useCounterOptionsStore } from "@/store/counter-options";
import { storeToRefs } from "pinia";
import CounterOptionsValue from "../components/CounterOptionsValue.vue";

// Se rompe la reactividad al desestructurar.
// const {counter, square } = useCounterOptionsStore();
const counterStore = useCounterOptionsStore();
const { count, squareCount } = storeToRefs(counterStore);

// Se pueden desestructurar los métodos
const { increment, incrementBy } = counterStore;
</script>
<template>
  <h1>Pinia Options</h1>
  <h4>Counter: {{ count }}</h4>
  <h4>Square: {{ squareCount }}</h4>
  <br />
  <button @click="increment()">+1</button>
  <button @click="incrementBy(2)">+2</button>
  <button @click="incrementBy(5)">+5</button>
  <!-- Reset viene ya programado -->
  <button @click="counterStore.$reset()">Reset</button>

  <br />
  <CounterOptionsValue />
</template>

<style scoped>
button {
  margin-right: 10px;
}
</style>

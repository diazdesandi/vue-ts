<script lang ="ts" src="./App.ts">

// Al separar el código en un archivo independiente,
// no se utilizaría setup.
// import { ref } from 'vue';

// const counter = ref<number>(0);


/*
export default defineComponent({
  setup() {
    const counter = ref(0);
    const increase = () => {
      counter.value++
    }

    return {
      // Properties
      counter,

      // Methods
      increase
    }
  }
})
*/

</script>

<template>
  <div class="wrapper">
    <h1>Counter {{ counter }} </h1>
    <button @click="counter++">+1</button>
  </div>
</template>

<style scoped>
.wrapper {
  /* display: flex; */
  place-items: flex-start;
  flex-wrap: wrap;
}
</style>

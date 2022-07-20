<template>
  <form @submit.prevent="addTodo" class="mb-8 relative">
    <input
      v-model="newTodo"
      id="newTodo"
      type="text"
      class="w-full py-4 px-5 pr-20 focus:outline-none shadow-sm"
      placeholder="Add new ..."
    />
    <i class="fa-regular fa-calendar-days"></i>
    <button
      type="submit"
      class="bg-at-blue text-white py-1.5 px-2 rounded absolute right-3 top-2.5"
    >
      Add
    </button>
  </form>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const newTodo = ref("");

    const addTodo = () => {
      console.log(newTodo.value);
      newTodo.value = "";
    };

    return { newTodo, addTodo };
  },
};
</script>

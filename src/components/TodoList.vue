<template>
  <hr />
  <div class="flex justify-end w-full items-center">
    <div class="flex items-center relative">
      <p class="mx-2">Filter</p>
      <select
        class="bg-white py-2 px-3 rounded-md appearance-none focus:outline-none pr-6"
      >
        <option value="">All</option>
        <option value="">With date</option>
      </select>
      <div class="absolute right-2 flex flex-col text-grey">
        <fa icon="fa-solid fa-sort" />
      </div>
    </div>
    <div class="flex items-center relative">
      <p class="mx-2">Sort</p>
      <select
        class="bg-white py-2 px-3 rounded-md appearance-none focus:outline-none pr-6"
      >
        <option value="">Added date</option>
        <option value="">Updated date</option>
      </select>
      <div class="absolute right-2 flex flex-col text-grey">
        <fa icon="fa-solid fa-sort" />
      </div>
    </div>
    <fa
      icon="fa-solid fa-arrow-down-short-wide"
      class="ml-2 text-xl text-at-blue"
    />
  </div>
  <div
    class="w-full flex flex-col mt-6"
    v-for="(todo, index) in $store.state.todos"
    :key="index"
  >
    <TodoItem :todo="todo" />
  </div>
</template>

<script>
import TodoItem from "@/components/TodoList/TodoItem";

export default {
  components: {
    TodoItem,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.arrows .arrow-bot {
  margin-top: -10px;
}
</style>

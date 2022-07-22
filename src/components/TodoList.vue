<template>
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

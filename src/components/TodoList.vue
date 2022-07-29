<template>
  <hr />

  <TodoFilter :updateTodos="updateTodos" />

  <div
    class="w-full flex flex-col mt-6"
    v-for="(todo, index) in todos"
    :key="index"
  >
    <TodoItem :todo="todo" />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import TodoItem from "@/components/TodoList/TodoItem";
import TodoFilter from "@/components/TodoList/TodoFilter";
import store from "@/store";

export default {
  components: {
    TodoItem,
    TodoFilter,
  },
  setup() {
    const todos = ref(computed(() => store.getters.fetchAllSortByCreatedAt));
    const updateTodos = (newTodos) => {
      todos.value = newTodos;
    };
    return { todos, updateTodos };
  },
};
</script>

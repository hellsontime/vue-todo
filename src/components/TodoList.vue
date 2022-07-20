<template>
  <div
    class="w-full flex flex-col mt-6"
    v-for="(todo, index) in todos.todoList"
    :key="index"
  >
    <TodoItem :todo="todo" />
  </div>
</template>

<script>
import { ref } from "vue";
import todoList from "@/constants/todos";
import TodoItem from "@/components/TodoList/TodoItem";

export default {
  components: {
    TodoItem,
  },
  setup() {
    const todos = ref(todoList);

    return { todos };
  },
};
</script>

<template>
  <div v-if="!loading">
    <hr />

    <TodoEmpty v-if="!todos.length" />

    <div v-else>
      <TodoFilter :updateTodos="updateTodos" />

      <div
        class="w-full flex flex-col mt-6"
        v-for="(todo, index) in todos"
        :key="index"
      >
        <TodoItem :todo="todo" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import TodoEmpty from "@/components/TodoEmpty";
import TodoItem from "@/components/TodoList/TodoItem";
import TodoFilter from "@/components/TodoList/TodoFilter";
import store from "@/store";

export default {
  props: {
    loading: {
      required: true,
      type: Boolean,
    },
  },
  components: {
    TodoItem,
    TodoFilter,
    TodoEmpty,
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

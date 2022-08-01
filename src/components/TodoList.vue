<template>
  <hr />

  <CardInfo
    v-if="!storeTodos.length"
    :icon="'fa-solid fa-hurricane'"
    class="mt-[40px]"
  >
    <template #heading>you have no todos</template>
    <template #info>let's add some</template>
  </CardInfo>

  <div v-else>
    <TodoFilter :updateTodos="updateTodos" />

    <CardInfo
      v-if="!todos.length"
      :icon="'fa-solid fa-filter-circle-xmark'"
      class="my-[80px]"
    >
      <template #heading>no todos fot this filter</template>
    </CardInfo>

    <div
      v-else
      class="w-full flex flex-col mt-6"
      v-for="(todo, index) in todos"
      :key="index"
    >
      <TodoItem :todo="todo" />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import CardInfo from "@/components/CardInfo";
import TodoItem from "@/components/TodoList/TodoItem";
import TodoFilter from "@/components/TodoList/TodoFilter";
import store from "@/store";

export default {
  props: {
    todos: {
      type: Array,
    },
    updateTodos: {
      type: Function,
    },
  },
  components: {
    TodoItem,
    TodoFilter,
    CardInfo,
  },
  setup() {
    const storeTodos = computed(() => store.state.todos);
    return { storeTodos };
  },
};
</script>

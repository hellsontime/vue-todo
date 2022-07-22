<template>
  <div
    class="max-w-screen-md mx-auto w-full flex flex-col justify-center p-8 my-20 bg-light-grey rounded-md shadow-md"
  >
    <div
      class="capitalize text-2xl text-at-blue font-bold flex justify-center mb-6"
    >
      vue todo app
    </div>

    <TodoForm />

    <hr />

    <TodoList />
  </div>
</template>

<script>
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default {
  components: {
    TodoForm,
    TodoList,
  },
  setup() {
    return {};
  },
};
</script>

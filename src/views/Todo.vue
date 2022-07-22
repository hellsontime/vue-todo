<template>
  <div
    class="max-w-screen-md mx-auto w-full flex flex-col justify-center p-8 my-20 bg-light-grey rounded-xl shadow-md"
  >
    <div
      class="uppercase text-2xl text-at-blue font-bold flex justify-start items-center mb-6"
    >
      <fa icon="fa-solid fa-list-check" class="mr-3" />
      <p class="tracking-wider text-xl">vue todo app</p>
    </div>

    <TodoForm />

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

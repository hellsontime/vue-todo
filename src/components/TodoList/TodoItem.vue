<template>
  <div
    class="flex items-center justify-between w-full bg-white p-6 rounded-md shadow-sm cursor-pointer group transition duration-500 relative z-[1000] item-parent"
  >
    <div
      class="flex gap-3 mr-4 bg-grey p-2 pr-6 rounded-md text-[1.15rem] group-hover:visible group-hover:opacity-100 duration-500 delay-200 absolute -z-5 top-5.25 left-[24px] group-hover:-left-[76px] transition-all item-child"
    >
      <div
        @click="deleteTodo"
        class="flex justify-center items-center bg-light-grey w-6 h-6 rounded hover:bg-at-blue transition text-grey hover:text-white"
      >
        <fa icon="fa-solid fa-trash" class="h-3.5" />
      </div>
      <div
        @click="editTodo"
        class="flex justify-center items-center bg-light-grey w-6 h-6 rounded hover:bg-at-blue transition text-grey hover:text-white"
      >
        <fa icon="fa-solid fa-pencil" class="h-3.5" />
      </div>
    </div>

    <div @click="toggleTodo" class="flex gap-3 items-center">
      <div
        class="flex justify-center items-center w-6 h-6 rounded transition text-white border-[1px] border-grey box-border"
        :class="
          todo.status ? 'bg-at-blue text-white border-none' : 'bg-light-grey'
        "
      >
        <fa v-if="todo.status" icon="fa-solid fa-check" class="h-4" />
      </div>
      <label
        class="text-lg flex-2 cursor-pointer"
        :for="'todo' + todo.id"
        :class="todo.status ? 'line-through' : null"
      >
        {{ todo.title }}
      </label>
    </div>

    <div
      v-if="todo.date"
      class="min-w-[120px] ml-auto flex justify-center items-center bg-light-grey px-3 py-2 radius-md ml-4"
    >
      {{ timeConverter(todo.date) }}
    </div>
  </div>
</template>

<script>
import { timeConverter } from "@/helpers/dateTimeHelper";
import store from "@/store";

export default {
  props: {
    todo: {
      required: true,
      type: Object,
    },
  },
  setup(props) {
    const toggleTodo = () => {
      store.dispatch("updateTodoStatus", {
        id: props.todo.id,
        status: !props.todo.status,
      });
    };

    const deleteTodo = () => {
      store.dispatch("deleteTodo", {
        id: props.todo.id,
      });
    };

    const editTodo = () => {
      const todoClone = { ...props.todo };
      store.commit("toggleEditMode");
      store.commit("setEditTodo", { todo: todoClone });
    };

    return { timeConverter, toggleTodo, deleteTodo, editTodo };
  },
};
</script>

<style scoped>
.item-parent {
  transform-style: preserve-3d;
}
.item-child {
  transform: translateZ(-10px);
}
</style>

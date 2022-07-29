<template>
  <div
    class="flex items-center w-full bg-white p-6 rounded-md shadow-sm cursor-pointer relative group transition duration-500 overflow-hidden"
  >
    <div
      class="transition-[width] duration-500 h-[10px] w-[0px] group-hover:w-[74px]"
    ></div>
    <div
      class="flex gap-3 mr-4 text-[1.15rem] group-hover:visible group-hover:opacity-100 duration-500 absolute top-5.25 -left-[60px] group-hover:left-[24px] transition-all"
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
    <input
      type="checkbox"
      class="h-5 w-5 mr-4 focus:outline-none rounded-sm cursor-pointer"
      :id="'todo' + todo.id"
      :checked="todo.status ? true : false"
      @change="toggleTodo"
    />
    <label
      class="text-lg flex-2 cursor-pointer"
      :for="'todo' + todo.id"
      :class="todo.status ? 'line-through' : null"
    >
      {{ todo.title }}
    </label>
    <div v-if="todo.date" class="bg-light-grey px-3 py-2 radius-md ml-4">
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
      store.commit("updateStatus", {
        id: props.todo.id,
      });
    };

    const deleteTodo = () => {
      store.commit("delete", {
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

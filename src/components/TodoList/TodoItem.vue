<template>
  <div
    class="flex items-center w-full bg-white p-6 rounded-md shadow-sm cursor-pointer relative group transition duration-500"
  >
    <div
      class="transition-[width] duration-500 h-[10px] w-[0px] group-hover:w-[80px]"
    ></div>
    <div
      class="flex invisible opacity-0 gap-3 mr-4 text-[1.15rem] group-hover:visible group-hover:opacity-100 transition duration-500 absolute top-5.25 left-5"
    >
      <div
        class="flex justify-center items-center bg-grey w-7 h-7 rounded-full hover:bg-at-blue transition"
      >
        <fa
          @click="deleteTodo"
          icon="fa-solid fa-trash"
          class="text-white h-3.5"
        />
      </div>
      <div
        class="flex justify-center items-center bg-grey w-7 h-7 rounded-full hover:bg-at-blue transition"
      >
        <fa
          @click="editTodo"
          icon="fa-solid fa-pencil"
          class="text-white h-3.5"
        />
      </div>
    </div>
    <input
      type="checkbox"
      class="h-5 w-5 mr-4 focus:outline-none rounded-sm cursor-pointer"
      :id="'todo' + todo.id"
      :checked="todo.done ? true : false"
      @change="toggleTodo"
    />
    <label
      class="text-lg flex-2 cursor-pointer"
      :for="'todo' + todo.id"
      :class="todo.done ? 'line-through' : null"
    >
      {{ todo.content }}
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
      store.commit("toggleEditMode");
    };

    return { timeConverter, toggleTodo, deleteTodo, editTodo };
  },
};
</script>

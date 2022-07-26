<template>
  <div
    class="flex items-center w-full bg-white p-4 rounded-md shadow-sm cursor-pointer"
  >
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

    return { timeConverter, toggleTodo };
  },
};
</script>

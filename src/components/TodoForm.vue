<template>
  <form @submit.prevent="addTodo" class="mb-6 relative">
    <input
      v-model="newTodo.content"
      id="newTodo"
      type="text"
      class="w-full py-4 px-5 pr-24 focus:outline-none shadow-sm rounded-md"
      placeholder="Add new ..."
    />
    <fa
      @click="toggleDatepicker"
      icon="fa-solid fa-calendar-days"
      class="absolute text-xl font-light top-4 right-[4.5rem] cursor-pointer"
      :class="dateVisible ? 'text-at-blue' : 'text-grey'"
    />
    <Datepicker
      v-if="dateVisible"
      v-model="date"
      format="dd-MM-yyyy"
      type="date"
      :minDate="new Date()"
      class="mt-3 shadow-sm border-none"
    ></Datepicker>
    <button
      :disabled="!inputEnabled"
      type="submit"
      class="text-white py-1.5 px-2 rounded absolute right-3 top-2.5"
      :class="inputEnabled ? 'bg-at-blue' : 'bg-grey'"
    >
      Add
    </button>
  </form>
</template>

<script>
import { ref, watchEffect, computed } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import emptyTodo from "@/constants/emptyTodo";
import store from "@/store";

export default {
  components: { Datepicker },
  setup() {
    // init value for new Todo
    const newTodo = ref(emptyTodo);

    // Add button enabled/disabled tracker
    const inputEnabled = ref(false);
    watchEffect(() => {
      computed(
        newTodo.value.content === null || newTodo.value.content === ""
          ? (inputEnabled.value = false)
          : (inputEnabled.value = true)
      );
    });

    // init value for datepicker
    const date = ref(new Date());
    const dateVisible = ref(false);
    const toggleDatepicker = () => {
      dateVisible.value = !dateVisible.value;
    };

    // clear new todo values after add
    const clearNewTodo = () => {
      newTodo.value.content = "";
      newTodo.value.date = null;
    };

    // add new todo method
    const addTodo = () => {
      if (dateVisible.value) {
        newTodo.value.date = date.value.toISOString().split("T")[0];
      }
      store.commit("add", {
        userId: newTodo.value.userId,
        content: newTodo.value.content,
        date: newTodo.value.date,
      });

      date.value = new Date();
      clearNewTodo();
      dateVisible.value = false;
    };

    return {
      newTodo,
      inputEnabled,
      addTodo,
      date,
      dateVisible,
      toggleDatepicker,
    };
  },
};
</script>

<template>
  <form
    @submit.prevent="addTodo"
    class="relative flex"
    :class="editMode ? '' : 'mb-6'"
  >
    <div
      v-if="editMode"
      @click="toggleEditMode"
      class="bg-white mr-3 flex justify-center items-center w-full max-w-[56px] shadow-sm rounded-md text-xl text-grey hover:text-at-blue cursor-pointer"
    >
      <fa icon="fa-solid fa-arrow-left-long" />
    </div>
    <input
      v-model="newTodo.content"
      id="newTodo"
      type="text"
      class="w-full py-4 px-5 pr-24 focus:outline-none shadow-sm rounded-md relative"
      :placeholder="editMode ? 'Edit todo ...' : 'Add new ...'"
    />
    <div v-if="date" class="absolute top-0 right-[105px] top-[16px] z-10">
      {{ formatDate }}
    </div>

    <Datepicker
      v-model="date"
      position="right"
      ref="datepicker"
      type="date"
      :enableTimePicker="false"
      :minDate="new Date()"
      class="mt-3 shadow-sm border-none w-50"
    >
      <template #trigger>
        <fa
          @click="toggleDatepicker"
          icon="fa-solid fa-calendar-days"
          class="absolute text-xl font-light top-4 right-[4.5rem] cursor-pointer"
          :class="dateVisible ? 'text-at-blue' : 'text-grey'"
        />
      </template>
    </Datepicker>

    <button
      :disabled="!inputEnabled"
      type="submit"
      class="text-white py-1.5 px-2 rounded absolute right-3 top-2.5"
      :class="inputEnabled ? 'bg-at-blue' : 'bg-grey'"
    >
      {{ editMode ? "Save" : "Add" }}
    </button>
  </form>
</template>

<script>
import { ref, watchEffect, computed } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import emptyTodo from "@/constants/emptyTodo";
import { timeConverter } from "@/helpers/dateTimeHelper";
import store from "@/store";

export default {
  components: { Datepicker },
  props: {
    editMode: {
      required: true,
      type: Boolean,
    },
  },
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

    // init values for datepicker
    const date = ref(null);
    const formatDate = ref(null);
    const dateVisible = ref(false);
    const datepicker = ref(null);

    const toggleDatepicker = () => {
      if (date.value) {
        date.value = null;
        datepicker.value.openMenu();
      }
    };

    watchEffect(() => {
      if (date.value) {
        dateVisible.value = true;
        return;
      }
      dateVisible.value = false;
      return;
    });

    watchEffect(() => {
      date.value
        ? (formatDate.value = timeConverter(date.value.toISOString()))
        : (formatDate.value = null);
    });

    watchEffect(() => {
      date.value ? console.log(date.value.toISOString()) : null;
    });

    // clear new todo values after add
    const clearNewTodo = () => {
      newTodo.value.content = "";
      newTodo.value.date = null;
    };

    // add new todo method
    const addTodo = () => {
      if (dateVisible.value) {
        newTodo.value.date = date.value.toISOString();
      }

      store.commit("add", {
        userId: newTodo.value.userId,
        content: newTodo.value.content,
        date: newTodo.value.date,
      });

      date.value = null;
      clearNewTodo();
      dateVisible.value = false;
    };

    // toggle edit mode
    const toggleEditMode = () => {
      store.commit("toggleEditMode");
    };

    return {
      newTodo,
      inputEnabled,
      addTodo,
      date,
      formatDate,
      dateVisible,
      datepicker,
      toggleDatepicker,
      toggleEditMode,
    };
  },
};
</script>

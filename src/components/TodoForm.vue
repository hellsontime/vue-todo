<template>
  <form
    @submit.prevent="editMode ? saveTodo() : addTodo()"
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
      v-if="editMode"
      v-model="editTodo.title"
      id="editTodo"
      type="text"
      class="w-full py-4 px-5 pr-24 focus:outline-none shadow-sm rounded-md relative"
      placeholder="Edit todo ..."
    />
    <input
      v-else
      v-model="newTodo.title"
      id="newTodo"
      type="text"
      class="w-full py-4 px-5 pr-24 focus:outline-none shadow-sm rounded-md relative"
      placeholder="Add new ..."
    />

    <div
      v-if="editTodo.date && editMode"
      class="absolute top-0 right-[105px] top-[16px] z-10"
    >
      {{ editFormatDate }}
    </div>

    <div
      v-if="date && !editMode"
      class="absolute top-0 right-[105px] top-[16px] z-10"
    >
      {{ formatDate }}
    </div>

    <Datepicker
      v-if="editMode"
      v-model="editTodo.date"
      position="right"
      ref="editDatepicker"
      type="date"
      :enableTimePicker="false"
      :minDate="new Date()"
      class="mt-3 shadow-sm border-none w-50"
    >
      <template #trigger>
        <fa
          @click="toggleEditDatepicker"
          icon="fa-solid fa-calendar-days"
          class="absolute text-xl font-light top-4 right-[4.5rem] cursor-pointer"
          :class="editDateVisible ? 'text-at-blue' : 'text-grey'"
        />
      </template>
    </Datepicker>

    <Datepicker
      v-else
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
      v-if="editMode"
      :disabled="!editInputEnabled"
      type="submit"
      class="text-white py-1.5 px-2 rounded absolute right-3 top-2.5"
      :class="editInputEnabled ? 'bg-at-blue' : 'bg-grey'"
    >
      Save
    </button>

    <button
      v-else
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
import { timeConverter } from "@/helpers/dateTimeHelper";
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
        newTodo.value.title === null || newTodo.value.title === ""
          ? (inputEnabled.value = false)
          : (inputEnabled.value = true)
      );
    });

    // init values for add datepicker
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

    // clear new todo values after add
    const clearNewTodo = () => {
      newTodo.value.title = "";
      newTodo.value.date = null;
    };

    // add new todo method
    const addTodo = () => {
      if (dateVisible.value) {
        newTodo.value.date = date.value.toISOString();
      }

      store.commit("add", {
        userId: newTodo.value.userId,
        title: newTodo.value.title,
        date: newTodo.value.date,
      });

      date.value = null;
      clearNewTodo();
      dateVisible.value = false;
    };

    const editTodo = computed(() => store.state.editTodo);
    const editMode = computed(() => store.state.editMode);

    const editFormatDate = ref(null);
    const editDateVisible = ref(false);
    const editDatepicker = ref(null);

    const toggleEditDatepicker = () => {
      if (editTodo.value.date) {
        editTodo.value.date = null;
        editDatepicker.value.openMenu();
      }
    };

    watchEffect(() => {
      if (editTodo.value.date) {
        editDateVisible.value = true;
        return;
      }
      editDateVisible.value = false;
      return;
    });

    watchEffect(() => {
      editTodo.value.date
        ? (editFormatDate.value = timeConverter(editTodo.value.date))
        : (editFormatDate.value = null);
    });

    // Save button enabled/disabled tracker
    const editInputEnabled = ref(true);
    watchEffect(() => {
      computed(
        editTodo.value.title === null || editTodo.value.title === ""
          ? (editInputEnabled.value = false)
          : (editInputEnabled.value = true)
      );
    });

    // toggle edit mode
    const toggleEditMode = () => {
      store.commit("toggleEditMode");
      store.commit("unsetEditTodo");
    };

    // save deited todo
    const saveTodo = () => {
      store.commit("update", { editTodo: editTodo.value });
      store.commit("toggleEditMode");
      store.commit("unsetEditTodo");
    };

    return {
      newTodo,
      inputEnabled,
      editInputEnabled,
      addTodo,
      date,
      formatDate,
      dateVisible,
      datepicker,
      toggleDatepicker,
      editMode,
      editTodo,
      saveTodo,
      toggleEditMode,
      toggleEditDatepicker,
      editDateVisible,
      editFormatDate,
      editDatepicker,
    };
  },
};
</script>

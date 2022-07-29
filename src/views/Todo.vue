<template>
  <div
    class="max-w-screen-md mx-auto w-full flex flex-col justify-center p-8 my-20 bg-light-grey rounded-xl shadow-md"
  >
    <div class="flex justify-start items-center justify-between mb-6">
      <div class="flex items-center uppercase text-2xl text-at-blue font-bold">
        <fa icon="fa-solid fa-list-check" class="mr-3" />
        <p class="tracking-wider text-xl">vue todo app</p>
      </div>

      <div
        @click="logout"
        class="flex items-center gap-2 text-grey cursor-pointer"
      >
        <fa icon="fa-solid fa-arrow-right-from-bracket" />
        <span>Logout</span>
      </div>
    </div>

    <TodoForm :editMode="editMode" />

    <TodoList v-if="!editMode" />
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import store from "@/store";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default {
  components: {
    TodoForm,
    TodoList,
  },
  setup() {
    const editMode = computed(() => store.state.editMode);

    const router = useRouter();

    const logout = async () => {
      store.commit("setUser", {});
      localStorage.clear();
      router.push({ name: "Login" });
    };

    return { editMode, logout };
  },
};
</script>

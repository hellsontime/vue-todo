<template>
  <div
    class="max-w-screen-md mx-auto w-full flex flex-col justify-center p-8 my-20 bg-light-grey rounded-xl shadow-md"
  >
    <div class="flex justify-start items-center justify-between mb-6">
      <div class="flex items-center uppercase text-2xl text-at-blue font-bold">
        <fa icon="fa-solid fa-list-check" class="mr-3" />
        <p class="tracking-wider text-xl">vue todo app</p>
      </div>

      <div class="flex items-center gap-2">
        <div>Hi, {{ user.name }}</div>
        <div
          class="flex items-center justify-center bg-at-light-blue h-[40px] w-[40px] rounded-full cursor-pointer relative group transition-all"
        >
          <div class="font-bold text-at-blue uppercase">
            {{ user.name.slice(0, 1) }}
          </div>
          <div
            class="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-200 delay-100 rounded-md top-[45px] -right-[10px] bg-white shadow-md p-4 z-10"
          >
            <div
              @click="logout"
              class="flex items-center gap-2 text-grey cursor-pointer"
            >
              <fa icon="fa-solid fa-arrow-right-from-bracket" />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <TodoError v-if="fetchError" />

    <div v-else>
      <TodoForm :editMode="editMode" />
      <TodoList v-if="!editMode" :loading="loading" />
    </div>
  </div>
</template>

<script>
import { ref, computed, watchEffect } from "vue";
import { useRouter } from "vue-router";
import store from "@/store";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import TodoError from "@/components/TodoError.vue";
import { customAxios } from "@/helpers/axiosHelper";
import { TODOS_API_ROUTE } from "@/constants/App";

export default {
  components: {
    TodoForm,
    TodoList,
    TodoError,
  },
  setup() {
    const user = store.state.user;

    const fetchError = ref(false);
    const loading = ref(true);

    watchEffect(() => {
      async function fetchTodos() {
        try {
          let res = await customAxios.get(TODOS_API_ROUTE);
          store.commit("setTodos", res.data);
          loading.value = false;
        } catch (err) {
          fetchError.value = true;
        }
      }

      fetchTodos();
    });

    const editMode = computed(() => store.state.editMode);

    const router = useRouter();

    const logout = async () => {
      store.commit("setUser", {});
      localStorage.clear();
      router.push({ name: "Login" });
    };

    return { user, editMode, logout, fetchError, loading };
  },
};
</script>

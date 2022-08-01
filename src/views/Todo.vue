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

    <CardInfo v-if="fetchError" :icon="'fa-solid fa-circle-exclamation'">
      <template #heading>service is unavailable now</template>
      <template #info>try again later</template>
    </CardInfo>

    <div v-else>
      <TodoForm v-if="!loading" :editMode="editMode" />
      <TodoList
        v-if="!editMode && !loading"
        :todos="todos"
        :updateTodos="updateTodos"
      />
    </div>

    <div
      v-if="globalError"
      class="absolute bottom-8 right-8 bg-red-100 py-2 px-4 rounded-md text-red-400 shadow-sm"
    >
      {{ globalError }}
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import store from "@/store";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import CardInfo from "@/components/CardInfo";

export default {
  components: {
    TodoForm,
    TodoList,
    CardInfo,
  },
  setup() {
    const user = store.state.user;
    const todos = ref(null);
    const updateTodos = (newTodos) => {
      todos.value = newTodos;
    };

    const fetchError = ref(false);
    const globalError = computed(() => store.state.globalError);
    const loading = ref(true);

    store
      .dispatch("fetchTodos")
      .then(() => {
        loading.value = false;
        todos.value = store.getters.fetchAllSortByCreatedAt;
        console.log(todos.value);
      })
      .catch(() => {
        fetchError.value = true;
      });

    const editMode = computed(() => store.state.editMode);

    const router = useRouter();

    const logout = async () => {
      store.commit("setUser", {});
      localStorage.clear();
      router.push({ name: "Login" });
    };

    return {
      user,
      editMode,
      logout,
      fetchError,
      loading,
      todos,
      updateTodos,
      globalError,
    };
  },
};
</script>

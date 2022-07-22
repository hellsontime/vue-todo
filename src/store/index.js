import { createStore } from "vuex";
import todos from "@/constants/initTodosList";
import { uid } from "uid";

const store = createStore({
  state() {
    return {
      todos: todos,
    };
  },
  mutations: {
    add(state, { userId, content, date }) {
      state.todos.push({
        id: uid(),
        userId,
        content,
        done: false,
        date,
      });
    },
    updateStatus(state, { id }) {
      state.todos.map((todo) =>
        todo.id !== id ? todo : (todo.done = !todo.done)
      );
    },
  },
});

export default store;

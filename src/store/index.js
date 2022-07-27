/* eslint-disable prettier/prettier */
import { createStore } from "vuex";
import todos from "@/constants/initTodosList";
import { uid } from "uid";

const store = createStore({
  state() {
    return {
      todos: todos,
    };
  },
  getters: {
    fetchAll(state) {
      return state.todos;
    },
    fetchAllSortById(state) {
      return state.todos.sort((a, b) => (a.id > b.id ? 1 : -1));
    },
    fetchAllSortByCreatedAt(state) {
      return state.todos.sort((a, b) =>
        (Date.parse(a.created_at) < Date.parse(b.created_at) ? 1 : -1)
      );
    },
    fetchAllSortByUpdatedAt(state) {
      return state.todos.sort((a, b) =>
        (Date.parse(a.updated_at) < Date.parse(b.updated_at) ? 1 : -1)
      );
    },
  },
  mutations: {
    add(state, { userId, content, date }) {
      state.todos.unshift({
        id: uid(),
        userId,
        content,
        done: false,
        date,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    },
    delete(state, {id}) {
      let index = state.todos.findIndex(todo => todo.id == id);
      state.todos.splice(index, 1);
    },
    updateStatus(state, { id }) {
      state.todos.map(todo =>
        todo.id !== id ? todo : (todo.done = !todo.done)
      );
    },
  },
});

export default store;

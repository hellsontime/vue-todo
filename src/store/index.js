import { createStore } from "vuex";
import todos from "@/constants/initTodosList";
import { uid } from "uid";

const store = createStore({
  state() {
    return {
      todos: todos,
      editMode: false,
      editTodo: {},
    };
  },
  getters: {
    fetchAllSortByCreatedAt(state) {
      return state.todos.sort((a, b) =>
        Date.parse(a.created_at) < Date.parse(b.created_at) ? 1 : -1
      );
    },
    fetchAllSortByUpdatedAt(state) {
      return state.todos.sort((a, b) =>
        Date.parse(a.updated_at) < Date.parse(b.updated_at) ? 1 : -1
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
    update(state, { editTodo }) {
      state.todos.map((todo) =>
        editTodo.id !== todo.id
          ? todo
          : (() => {
              todo.content = editTodo.content;
              todo.date = editTodo.date;
            })()
      );
    },
    delete(state, { id }) {
      let index = state.todos.findIndex((todo) => todo.id == id);
      state.todos.splice(index, 1);
    },
    updateStatus(state, { id }) {
      state.todos.map((todo) =>
        todo.id !== id ? todo : (todo.done = !todo.done)
      );
    },
    toggleEditMode(state) {
      state.editMode = !state.editMode;
    },
    setEditTodo(state, { todo }) {
      state.editTodo = todo;
    },
    unsetEditTodo(state) {
      state.editTodo = {};
    },
  },
});

export default store;

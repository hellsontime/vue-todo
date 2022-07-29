import { createStore } from "vuex";
import { uid } from "uid";

const store = createStore({
  state() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      todos: [],
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
    setUser(state, user) {
      state.user = user;
    },
    setTodos(state, todos) {
      state.todos = todos;
    },
    add(state, { userId, title, date }) {
      state.todos.unshift({
        id: uid(),
        userId,
        title,
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
              todo.title = editTodo.title;
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

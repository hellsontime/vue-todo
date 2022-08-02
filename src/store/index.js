import { createStore } from "vuex";
import { uid } from "uid";
import { customAxios } from "@/helpers/axiosHelper";
import { TODOS_API_ROUTE, STATUS_API_ROUTE } from "@/constants/App";

const store = createStore({
  state() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      todos: [],
      editMode: false,
      editTodo: {},
      globalError: null,
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
        status: false,
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
              todo.updated_at = new Date().toISOString();
            })()
      );
    },
    delete(state, { id }) {
      let index = state.todos.findIndex((todo) => todo.id == id);
      state.todos.splice(index, 1);
    },
    updateStatus(state, { id }) {
      state.todos.map((todo) =>
        todo.id !== id ? todo : (todo.status = !todo.status)
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
  actions: {
    async fetchTodos({ commit }) {
      let res = await customAxios.get(TODOS_API_ROUTE);
      commit("setTodos", res.data);
    },
    async addTodo({ commit }, { userId, title, date }) {
      await customAxios
        .post(TODOS_API_ROUTE, { title, date })
        .then(() => {
          commit("add", { userId, title, date });
        })
        .catch((_rej) => {
          store.state.globalError = _rej;
          setTimeout(() => {
            store.state.globalError = null;
          }, 5000);
        });
    },
    async deleteTodo({ commit }, { id }) {
      await customAxios
        .delete(TODOS_API_ROUTE + "/" + id)
        .then(() => {
          commit("delete", { id });
        })
        .catch((_rej) => {
          store.state.globalError = _rej;
          setTimeout(() => {
            store.state.globalError = null;
          }, 5000);
        });
    },
    async updateTodo({ commit }, { editTodo }) {
      await customAxios
        .put(TODOS_API_ROUTE + "/" + editTodo.id, {
          title: editTodo.title,
          date: editTodo.date,
        })
        .then(() => {
          commit("update", { editTodo });
          commit("toggleEditMode");
          commit("unsetEditTodo");
        })
        .catch((_rej) => {
          store.state.globalError = _rej;
          setTimeout(() => {
            store.state.globalError = null;
          }, 5000);
        });
    },
    async updateTodoStatus({ commit }, { id, status }) {
      await customAxios
        .put(TODOS_API_ROUTE + "/" + id + STATUS_API_ROUTE, {
          status: status ? 1 : 0,
        })
        .then(() => {
          commit("updateStatus", {
            id,
          });
        })
        .catch((_rej) => {
          console.log(_rej);
          store.state.globalError = _rej;
          setTimeout(() => {
            store.state.globalError = null;
          }, 5000);
        });
    },
  },
});

export default store;

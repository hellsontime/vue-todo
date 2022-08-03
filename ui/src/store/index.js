import { createStore } from "vuex";
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
    add(state, _res) {
      state.todos.unshift(_res);
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
      let _res = await customAxios.get(TODOS_API_ROUTE);
      commit("setTodos", _res.data);
    },
    async addTodo({ commit }, { title, date }) {
      await customAxios
        .post(TODOS_API_ROUTE, { title, date })
        .then((_res) => {
          console.log(_res.data);
          commit("add", _res.data);
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

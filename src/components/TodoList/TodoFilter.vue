<template>
  <div class="flex justify-end w-full items-center mt-5">
    <div class="flex items-center relative">
      <p class="mx-2">Filter</p>
      <select
        class="bg-white py-2 px-3 rounded-md appearance-none focus:outline-none pr-6"
        id="filter"
        @change="sortAndFilter"
      >
        <option value="filterAll">All</option>
        <option value="filterDate">With date</option>
        <option value="filterDone">Done</option>
        <option value="filterNotDone">Not Done</option>
      </select>
      <div class="absolute right-2 flex flex-col text-grey">
        <fa icon="fa-solid fa-sort" />
      </div>
    </div>
    <div class="flex items-center relative">
      <p class="mx-2">Sort</p>
      <select
        class="bg-white py-2 px-3 rounded-md appearance-none focus:outline-none pr-6"
        id="sort"
        @change="sortAndFilter"
      >
        <option value="sortAdded">Added date</option>
        <option value="sortUpdated">Updated date</option>
      </select>
      <div class="absolute right-2 flex flex-col text-grey">
        <fa icon="fa-solid fa-sort" />
      </div>
    </div>
    <fa
      icon="fa-solid fa-arrow-down-short-wide"
      class="ml-2 text-xl text-at-blue"
    />
  </div>
</template>

<script>
import store from "@/store";

export default {
  props: {
    updateTodos: {},
  },
  setup(props) {
    const sortAndFilter = () => {
      let filterValue = document.querySelector("#filter").value;
      let sortValue = document.querySelector("#sort").value;
      let updated;

      switch (sortValue) {
        case "sortAdded":
          updated = store.getters.fetchAllSortByCreatedAt;
          break;
        case "sortUpdated":
          updated = store.getters.fetchAllSortByUpdatedAt;
          break;
      }

      switch (filterValue) {
        case "filterAll":
          props.updateTodos(updated);
          break;
        case "filterDate":
          props.updateTodos(updated.filter((todo) => todo.date));
          break;
        case "filterDone":
          props.updateTodos(updated.filter((todo) => todo.done));
          break;
        case "filterNotDone":
          props.updateTodos(updated.filter((todo) => !todo.done));
          break;
      }
    };

    return { sortAndFilter };
  },
};
</script>

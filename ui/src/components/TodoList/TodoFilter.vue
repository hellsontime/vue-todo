<template>
  <div
    class="flex flex-col justify-center items-end xs:flex-row xs:justify-end w-full gap-3 mt-5"
  >
    <div class="flex items-center justify-start relative">
      <fa icon="fa-solid fa-filter" class="ml-2 text-lg text-at-blue" />
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
      <fa
        icon="fa-solid fa-arrow-down-wide-short"
        class="ml-2 text-xl text-at-blue"
      />
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
          props.updateTodos(updated.filter((todo) => todo.status));
          break;
        case "filterNotDone":
          props.updateTodos(updated.filter((todo) => !todo.status));
          break;
      }
    };

    return { sortAndFilter };
  },
};
</script>

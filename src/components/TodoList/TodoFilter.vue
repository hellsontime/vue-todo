<template>
  <div class="flex justify-end w-full items-center mt-5">
    <div class="flex items-center relative">
      <p class="mx-2">Filter</p>
      <select
        class="bg-white py-2 px-3 rounded-md appearance-none focus:outline-none pr-6"
      >
        <option value="">All</option>
        <option value="">With date</option>
      </select>
      <div class="absolute right-2 flex flex-col text-grey">
        <fa icon="fa-solid fa-sort" />
      </div>
    </div>
    <div class="flex items-center relative">
      <p class="mx-2">Sort</p>
      <select
        class="bg-white py-2 px-3 rounded-md appearance-none focus:outline-none pr-6"
        @change="sort"
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
    const sort = (e) => {
      if (e.target.value === "sortAdded") {
        props.updateTodos(store.getters.fetchAllSortByCreatedAt);
      }
      if (e.target.value === "sortUpdated") {
        props.updateTodos(store.getters.fetchAllSortByUpdatedAt);
      }
    };

    return { sort };
  },
};
</script>

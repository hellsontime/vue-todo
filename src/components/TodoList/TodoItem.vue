<template>
  <div class="flex items-center w-full">
    <input
      type="checkbox"
      class="h-5 w-5 mr-4 focus:outline-none rounded-sm"
      :id="'todo' + todo.id"
      :checked="todo.done ? true : false"
    />
    <label class="text-lg flex-2" :for="'todo' + todo.id">
      {{ todo.content }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      required: true,
      type: Object,
    },
  },
  setup() {
    return {};
  },
};
</script>

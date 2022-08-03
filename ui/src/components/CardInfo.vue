<template>
  <div class="flex flex-col items-center justify-center my-4">
    <fa v-if="icon" :icon="icon" class="text-grey text-[48px] mb-4" />
    <div class="capitalize text-lg text-light-black">
      <slot name="heading"></slot>
    </div>
    <div class="capitalize text-sm text-light-black">
      <slot name="info"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
    },
  },
  setup() {
    return {};
  },
};
</script>

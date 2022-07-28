<template>
  <div
    class="max-w-[450px] mx-auto w-full flex flex-col justify-center p-8 my-20 bg-light-grey rounded-xl shadow-md"
  >
    <div
      class="uppercase text-2xl text-at-blue font-bold flex justify-start items-center mb-4"
    >
      <fa icon="fa-solid fa-list-check" class="mr-3" />
      <p class="tracking-wider text-xl">Login</p>
    </div>
    <form class="flex flex-col">
      <div class="mb-3 relative">
        <input
          type="email"
          id="email"
          placeholder="E-mail"
          class="w-full py-2 px-4 mt-1 focus:outline-none shadow-sm rounded-md"
          required
        />
      </div>

      <div class="mb-3 relative">
        <input
          :type="showPassword ? 'text' : 'password'"
          id="password"
          placeholder="Password"
          class="w-full py-2 px-4 mt-1 focus:outline-none shadow-sm rounded-md"
          required
        />
        <div
          @click="toggelPassword"
          class="flex justify-center items-center px-3 absolute bottom-0 right-0 w-[45px] h-[40px] rounded-tr-md rounded-br-md cursor-pointer text-grey bg-light-white"
        >
          <fa v-if="!showPassword" icon="fa-solid fa-eye-slash" />
          <fa v-else icon="fa-solid fa-eye" class="text-at-blue" />
        </div>
      </div>

      <button
        type="submit"
        class="bg-at-blue rounded-md py-2 px-6 text-white font-bold mt-4"
      >
        Login
      </button>
      <router-link class="mt-4" :to="{ name: 'Register' }">
        Don't have an account?
        <span class="text-at-blue">Sign up now</span>
      </router-link>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
// import { useRouter } from "vue-router";

export default {
  name: "login",
  setup() {
    // const router = useRouter();

    const showPassword = ref(false);

    const toggelPassword = () => {
      showPassword.value = !showPassword.value;
    };

    return { showPassword, toggelPassword };
  },
};
</script>

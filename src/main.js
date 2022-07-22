import { createApp } from "vue";
import App from "./App.vue";

import store from "./store";

import "@/assets/tailwind.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

library.add(fas);

createApp(App)
  .use(store)
  .component("fa", FontAwesomeIcon)
  .component("Datepicker", Datepicker)
  .mount("#app");

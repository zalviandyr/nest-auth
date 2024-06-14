import { createApp } from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import router from "./utils/route";

import "./assets/index.css";

const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
app.mount("#app");

// additional components
app.component("pulse-loader", require("vue-spinner/src/PulseLoader.vue").default);
app.component("grid-loader", require("vue-spinner/src/GridLoader.vue").default);

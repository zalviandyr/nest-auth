import { createApp } from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";

import "./index.css";

const app = createApp(App);
app.use(VueAxios, axios);
app.mount("#app");

app.component("pulse-loader", require("vue-spinner/src/PulseLoader.vue").default);

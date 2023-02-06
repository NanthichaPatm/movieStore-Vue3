import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const app = createApp(App);
app.use(router);
app.component("BootstrapIcon", BootstrapIcon);
app.mount("#app");

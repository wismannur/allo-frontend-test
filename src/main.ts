import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import App from "./App.vue";
import router from "./router";
import { registerPlugins } from "./plugins";

const app = createApp(App);

registerPlugins(app);

app.use(createPinia());
app.use(VueQueryPlugin);
app.use(router);
app.mount("#app");

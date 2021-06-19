import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import App from "@/App";
import VueRouter from "vue-router";

Vue.config.productionTip = false;
Vue.use(VueRouter);

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app');

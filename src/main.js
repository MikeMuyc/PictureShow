import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import "@/styles/base.css";
import "@/styles/main.scss";
Vue.config.productionTip = false
//element组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import utils from "./utils/utils";
Vue.use(utils);
// 滚动条优化插件
import VuePerfectScrollbar from "./components/perfect-scrollbar";
Vue.use(VuePerfectScrollbar);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

import VuePerfectScrollbar from "./scroll";
import Vue from "vue";
// // 如果vue是全局变量,使用自动全局安装。
// if (typeof window !== "undefined" && window.Vue) {
//   Vue.component("vue-perfect-scrollbar", VuePerfectScrollbar);
// }
//
// export default {
//   install(Vue) {
//     Vue.component("vue-perfect-scrollbar", VuePerfectScrollbar);
//   }
// };
const perfScrollbar = {
    install(Vue) {
        Vue.component("vue-perfect-scrollbar", VuePerfectScrollbar);
    }
}

Vue.use(perfScrollbar);
export {VuePerfectScrollbar}

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: "",
      path: "/main",
      redirect: "main/content",
      component: () => import("@/views/main.vue"),
      children: [
        {
          path: "content",
          name: "组件",
          redirect: "content/detail",
          component: () => import("@/views/content/contentMng.vue"),
          children: [
            {
              path: "detail",
              name: "详情",
              component: () => import("@/views/content/detail.vue")
            },
            {
              name: "图片",
              path: "picture",
              component: () => import("@/views/content/picture.vue")
            },
          ]
        },
      ]
    },
    {
      path: "/*",
      redirect: "/main"
    }
  ]
});

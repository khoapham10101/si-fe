import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomePage from "../views/HomePage/index.vue";
import {
  BLANK_LAYOUT,
  DASHBOARD_LAYOUT,
  DEFAULT_LAYOUT,
} from "@/constants/common";
import { PATH } from "@/constants/path";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home-page",
    component: HomePage,
  },
  {
    path: "/product/:id",
    name: "product-detail-page",
    component: () => import("@/views/ProductDetail/index.vue"),
    meta: {
      layout: DEFAULT_LAYOUT,
    },
  },
  {
    path: PATH.Login,
    name: "login-page",
    component: () => import("@/views/LoginPage/index.vue"),
    meta: {
      layout: BLANK_LAYOUT,
    },
  },
  {
    path: PATH.Register,
    name: "register-page",
    component: () => import("@/views/RegisterPage/index.vue"),
    meta: {
      layout: BLANK_LAYOUT,
    },
  },
  {
    path: "/account/products",
    name: "admin-product-page",
    component: () => import("@/views/Dashboard/Products/index.vue"),
    meta: {
      layout: DASHBOARD_LAYOUT,
    },
  },
  {
    path: "/account/users",
    name: "admin-users-page",
    component: () => import("@/views/Dashboard/Users/index.vue"),
    meta: {
      layout: DASHBOARD_LAYOUT,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: "",
  routes,
});

function nextFactory(context: any, middleware: any, index: any) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters: any) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to: any, from: any, next: any) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);
    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;

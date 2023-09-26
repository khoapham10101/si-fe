import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomePage from "../views/HomePage/index.vue";
import {
  BLANK_LAYOUT,
  DASHBOARD_LAYOUT,
  DEFAULT_LAYOUT,
} from "@/constants/common";
import { PATH, accountPath } from "@/constants/path";
import { auth } from "@/middlewares/auth";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: PATH.Home,
    name: "home-page",
    component: HomePage,
  },
  {
    path: `${PATH.Product}/:id`,
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
    path: PATH.Account.Product,
    name: "admin-products-page",
    component: () => import("@/views/Dashboard/Products/index.vue"),
    meta: {
      layout: DASHBOARD_LAYOUT,
      middleware: [auth],
    },
  },
  {
    path: PATH.Account.User,
    name: "admin-users-page",
    component: () => import("@/views/Dashboard/Users/index.vue"),
    meta: {
      layout: DASHBOARD_LAYOUT,
      middleware: [auth],
    },
  },
  {
    path: PATH.Account.Wishlist,
    name: "admin-wishlist-page",
    component: () => import("@/views/Dashboard/Wishlist/index.vue"),
    meta: {
      layout: DASHBOARD_LAYOUT,
      middleware: [auth],
    },
  },
  {
    path: PATH.Account.Brand,
    name: "admin-brands-page",
    component: () => import("@/views/Dashboard/Brands/index.vue"),
    meta: {
      layout: DASHBOARD_LAYOUT,
      middleware: [auth],
    },
  },

  {
    path: PATH.Account.Profile,
    name: "profile-page",
    component: () => import("@/views/Dashboard/ProfilePage/index.vue"),
    meta: {
      layout: DASHBOARD_LAYOUT,
      middleware: [auth],
    },
  },

  {
    path: `${accountPath}/*`,
    name: "not-found-page",
    component: () => import("@/views/Dashboard/NotFoundPage/index.vue"),
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

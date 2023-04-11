import { createWebHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/product/main",
      name: "ProductPage",
      component: () => import("@/components/Product/ProductPage"),
      meta: { requiresAuth: true },
    },
    {
      path: "/product/receipt",
      name: "ProductReceiptPage",
      component: () => import("@/components/Product/ProductReceiptPage"),
      meta: { requiresAuth: true },
    },
    {
      path: "/product/order",
      name: "ProductOrderPage",
      component: () => import("@/components/Order/OrderPage"),
      meta: { requiresAuth: true },
    },
    {
      path: "/product/order/receipt",
      name: "OrderReceiptPage",
      component: () => import("@/components/Order/OrderReceiptPage"),
      meta: { requiresAuth: true },
    },
    {
      path: "/product/register",
      name: "ProductRegisterPage",
      component: () => import("@/components/Register/ProductRegisterPage"),
      meta: { requiresAuth: true },
    },
    {
      path: "/product/admin",
      name: "AdminPage",
      component: () => import("@/components/AdminPage"),
      meta: { requiresAuth: true },
    },
    {
      path: "/product/counsel",
      name: "CustomerServicePage",
      component: () =>
        import("@/components/CustomerService/CustomerServicePage"),
      meta: { requiresAuth: true },
    },
    {
      path: "/product/counsel/view",
      name: "CheckCSPage",
      component: () => import("@/components/CustomerService/CheckCSPage"),
      meta: { requiresAuth: true },
    },
  ],
});

import store from "./store/index";

router.beforeEach(async function (to, _, next) {
  await store.dispatch("refresh");
  await store.dispatch("getAlert");
  if (to.meta.requiresAuth) {
    await store.dispatch("verify");
    const accessmessage = await store.getters.getAccessMode;
    console.log(accessmessage);
    if (accessmessage == 0) {
      alert("로그인 후 이용해주세요.");
      next("/users/login");
    } else {
      next();
    }
  }
  if (to.meta.requiresAdmin) {
    const role = await store.getters.getUserRole;
    console.log(role);
    if (role == 0) {
      next();
    } else {
      alert("허용되지 않은 접근");
      next("/users/login");
    }
  }
  if (to.meta.requiresRole) {
    const role = await store.getters.getUserRole;
    console.log(role);
    if (role == 0) {
      next("/users/adminpage");
    } else if (role == 1) {
      next("/users/usermypage");
    } else {
      alert("로그인 후 이용해주세요.");
      next("/users/login");
    }
  } else {
    next();
  }
});

export default router;

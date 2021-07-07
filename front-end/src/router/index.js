import Vue from "vue";
import VueRouter from "vue-router";
import InventoryHome from "../views/InventoryHome.vue";
import ItemDetail from "../views/ItemDetail.vue";
import AddItem from "../views/AddItem.vue";
import CreateInventory from "../views/CreateInventory.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/inventory",
  },
  {
    path: "/inventory",
    name: "InventoryHome",
    component: InventoryHome,

    children: [
      {
        path: "add",
        component: AddItem,
        props: true,
        meta: {
          showModal: true,
        },
      },
      {
        path: ":itemId",
        component: ItemDetail,
        props: true,
        meta: {
          showModal: true,
        },
      },
    ],
  },
  {
    path: "/create-inventory",
    name: "CreateInventory",
    component: CreateInventory,
    children: [
      {
        path: "add",
        component: AddItem,
        props: true,
        meta: {
          showModal: true,
        },
      },
      {
        path: ":itemId",
        component: ItemDetail,
        props: true,
        meta: {
          showModal: true,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

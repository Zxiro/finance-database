import {createWebHistory, createRouter} from "vue-router"; //vue-router to control the relationship between vue component

const routes = [
    {
        path: "/", //the URL path
        alias: "/home", // optional name when we link to this route
        name:"home",
        component: () => import("./components/ListPage"),
    },
    {
        path: "/stocks", //the URL path
        name:"stock",
        component: () => import("./components/StockPage.vue")
    },
    {
        path: "/enterprises", //the URL path
        name:"enterprise",
        component: () => import("./components/EnterprisePage.vue")
    },
    {
        path: "/bonds", //the URL path
        name:"bond",
        component: () => import("./components/BondPage")
    },
    {
        path: "/options", //the URL path
        name:"option",
        component: () => import("./components/OptionPage.vue")
    },
    {
        path: "/futures", //the URL path
        name:"future",
        component: () => import("./components/FuturePage.vue")
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
  
export default router;
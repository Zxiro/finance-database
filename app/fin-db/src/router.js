import {createWebHistory, createRouter} from "vue-router"; //vue-router to control the relationship between vue component

const routes = [
    {
        path: "/", //the URL path
        alias: "/home", // optional name when we link to this route
        name:"home",
        component: () => import("./components/ListPage"),
        /*children:[
            {
                /*path:'stocks',
                component: () => import("./components/StockPage.vue")
            }
        ]*/
    },
    {
        path: "/stocks", //the URL path
        name:"stock",
        component: () => import("./components/StockPage.vue")
    },
    {
        path: "/bonds", //the URL path
        name:"bond",
        component: () => import("./components/BondPage")
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
  
export default router;
import {createWebHistory, createRouter} from "vue-router"; //vue-router to control the relationship between vue component

const routes = [
    {
        path: "/", //the URL path
        alias: "/home", // optional name when we link to this route
        name:"home",
        component: () => import("./components/HomePage")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
  
export default router;
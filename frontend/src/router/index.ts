import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../views/HomepageView.vue"),
        },
        {
            path: "/project",
            redirect: "/projects"
        },
        {
            path: "/projects",
            // redirect: "/"
            name: "projects",
            component: () => import("../views/DashboardView.vue"),
        },
        {
            path: "/project/:id",
            name: "project",
            component: () => import("../views/ProjectView.vue"),
        }
    ]
});

export default router;
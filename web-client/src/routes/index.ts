import Vue from "vue";
import App from "../components/pages/App.vue";
import Home from "../components/pages/Home.vue";
import Setting from "../components/pages/Setting.vue";
import Contact from "../components/pages/Contact.vue";
import Login from "../components/pages/Login.vue";
import Callback from "../components/pages/Callback.vue";
import Router from "vue-router";
import { authGuard } from "@/middleware";

Vue.use(Router);

const router: Router = new Router(
    {
        routes: [
            {
                path: "/",
                name: "home",
                component: Home
            },
            {
                path: "/app",
                name: "app",
                component: App,
                beforeEnter: authGuard
            },
            {
                path: "/settings",
                component: Setting,
                beforeEnter: authGuard
            },
            {
                path: "/contacts",
                component: Contact,
                beforeEnter: authGuard
            },
            {
                path: "/login",
                name: "login",
                component: Login,
                beforeEnter: authGuard
            },
            {
                path: "/callback",
                name: "callback",
                component: Callback
            }
        ],
        mode: "history"
    }
)

export default router;
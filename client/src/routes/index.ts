import Vue from "vue";
import App from "../components/pages/App.vue";
import Home from "../components/pages/Home.vue";
import Setting from "../components/pages/Setting.vue";
import Contact from "../components/pages/Contact.vue";
import Login from "../components/pages/Login.vue";
import Callback from "../components/pages/Callback.vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router(
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
                component: App
            },
            {
                path: "/settings",
                component: Setting
            },
            {
                path: "/contacts",
                component: Contact
            },
            {
                path: "/login",
                name: "login",
                component: Login
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

// router.beforeEach(async (to, from, next) => {
//     let user = await store.dispatch("getUser");
//     if ((to.name !== 'login' || to.name !== 'home') && !user) {
//         next({ name: 'login' })
//     }
//     else {
//         next()
//     }
// })

export default router;
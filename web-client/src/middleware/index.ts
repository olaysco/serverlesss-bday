import store from "@/store"
import { NavigationGuardNext, Route } from "vue-router";
export const authGuard = (to: Route, from: Route, next: NavigationGuardNext) => {
    const fn = () => {
        // If the user is authenticated, continue with the route
        if (store.state.isAuthenticated) {
            return next();
        }
        // Otherwise, log in
        store.dispatch("login", { appState: { targetUrl: to.fullPath } });
    };

    if (!store.state.authLoading) {
        return fn()
    }

    store.watch(state => state.authLoading, (newValue, oldValue) => {
        if (newValue === false) {
            return fn()
        }
    })
};

import vue from "vue";
import vuex from "vuex";
import Auth from "@/api/auth"
import { User } from "@/types"
import { RedirectLoginOptions } from "@auth0/auth0-spa-js";

vue.use(vuex);

export default new vuex.Store({
    state: {
        visibleModal: Array<any>(),
        alertData: {
            visible: false,
            title: "Error",
            type: "error",
            message: "An unexpected error occurred"
        },
        user: {},
        authLoading: <boolean>false,
        isAuthenticated: <boolean>false
    },
    mutations: {
        showModal(state, modal) {
            state.visibleModal.push(modal);
        },
        hideModal(state, modal) {
            state.visibleModal = state.visibleModal.filter(i => i == modal);
        },
        toggleAlert(state, payload) {
            let {
                visible,
                type = "error",
                title = "Error",
                message = "An unexpected error occurred"
            } = payload;
            state.alertData = {
                visible,
                title,
                type,
                message
            };
        },
        SET_USER(state, payload: User) {
            console.log(payload)
            state.user = payload
        },
        SET_AUTH_LOADING(state, payload: boolean) {
            state.authLoading = payload
        },
        SET_IS_AUTHENTICATED(state, payload: boolean) {
            state.isAuthenticated = payload
        }
    },
    actions: {
        async logout() {
            return await Auth.logout({ returnTo: window.location.origin });
        },
        async login(options: RedirectLoginOptions = {redirect_uri: `${window.location.origin}/callback`}) {
            return await Auth.loginWithRedirect(options)
        },
        async handleLoginCallback({ commit }) {
            try {
                commit('SET_AUTH_LOADING', true)
                const user: User | undefined = await Auth.handleRedirectCallback()
                commit('SET_USER', user || {})
                commit('SET_IS_AUTHENTICATED', true)  
            } finally {
                commit('SET_AUTH_LOADING', false)
            }
        }
    }
});

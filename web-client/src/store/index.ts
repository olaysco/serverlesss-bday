import vue from "vue";
import vuex from "vuex";
import VuexPersistence from "vuex-persist";
import Auth from "@/api/auth"
import { Contact, User } from "@/types"
import { RedirectLoginOptions } from "@auth0/auth0-spa-js";
import contactApi from "@/api/contact";

vue.use(vuex);

const vuexPersist = new VuexPersistence<any>({
  strictMode: true,
  storage: sessionStorage,
})

export default new vuex.Store({
    state: {
        visibleModal: Array<any>(),
        alertData: {
            visible: false,
            title: "Error",
            type: "error",
            message: "An unexpected error occurred"
        },
        user: { },
        authLoading: <boolean>false,
        isAuthenticated: <boolean>false,
        contact: <any>[],
        busy: <boolean>false
    },
    mutations: {
        RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION, // this mutation **MUST** be named "RESTORE_MUTATION"
        showModal(state, modal) {
            state.visibleModal.push(modal);
        },
        hideModal(state, modal) {
            state.visibleModal = state.visibleModal.filter(i => i != modal);
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
        },
        SET_CONTACT(state, payload) {
            state.contact = payload
        },
        SET_BUSY(state, payload: boolean) {
            state.busy = payload
        }
    },
    actions: {
        async LOGOUT() {
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
        },
        async GET_CONTACT({ commit }) {
            commit('SET_BUSY', true)
            const contact = await contactApi.getContact()
            commit('SET_CONTACT', contact)
            commit('SET_BUSY', false)
        },
        async POST_CONTACT({ commit, dispatch }, contact: Contact[]) {
            try {
                commit('SET_BUSY', true)
                await contactApi.postContact(contact)
                commit('toggleAlert', {visible: true, type: "success", title: "Success", message: "Contact successfully added"})
                commit('SET_BUSY', false)
                dispatch('GET_CONTACT')
            } catch (e) {
                commit('toggleAlert', {visible: true, type: "error", title: "Error", message: "An error occurred"})
            }
        },
        async DELETE_CONTACT({ commit, dispatch }, contact: Contact) {
            try {
                commit('SET_BUSY', true)
                await contactApi.deleteContact(contact)
                commit('toggleAlert', {visible: true, type: "success", title: "Success", message: "Contact successfully added"})
                dispatch('GET_CONTACT')
            } catch (e) {
                 commit('toggleAlert', {visible: true, type: "error", title: "Error", message: "An error occurred"})
            } finally {
                commit('SET_BUSY', false)
            }
        },
        async UPDATE_CONTACT({ commit, dispatch }, contact: Contact) {
            try {
                commit('SET_BUSY', true)
                await contactApi.updateContact(contact)
                commit('toggleAlert', {visible: true, type: "success", title: "Success", message: "Contact updated"})
                dispatch('GET_CONTACT')
            } catch (e) {
                 commit('toggleAlert', {visible: true, type: "error", title: "Error", message: "An error occurred"})
            } finally {
                commit('SET_BUSY', false)
            }
        },
        async GET_USER({ commit }) {
            try {
                commit('SET_BUSY', true)
                const user = await contactApi.userInfo()
                commit('SET_USER', user)
            } catch (e) {
                console.log(e);
            } finally {
                commit('SET_BUSY', false)
            }
        },
        async UPDATE_USER({ commit }, user) {
            try {
                commit('SET_BUSY', true)
                await contactApi.updateUser(user)
                commit('toggleAlert', {visible: true, type: "success", title: "Success", message: "Message updated"})
            } catch (e) {
                commit('toggleAlert', {visible: true, type: "error", title: "Error", message: "An error occurred"})
            } finally {
                commit('SET_BUSY', false)
            }
        },
        async UPLOAD_IMAGE({ commit, dispatch }, file: any) {
            try {
                commit('SET_BUSY', true)
                await contactApi.uploadFile(file)
                commit('toggleAlert', { visible: true, type: "success", title: "Success", message: "Card uploaded successfully" })
                dispatch("GET_USER")
            } catch (e) {
                commit('toggleAlert', {visible: true, type: "error", title: "Error", message: "An error occurred"})
            } finally {
                commit('SET_BUSY', false)
            }
        }
    },
    plugins: [vuexPersist.plugin]
});

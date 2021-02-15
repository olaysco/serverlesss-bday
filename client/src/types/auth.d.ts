// noinspection ES6UnusedImports
import Vue from 'vue'
// import { Auth0Plugin } from "../plugins/Auth0.js";

declare module 'vue/types/vue' {
    interface Vue {
        loginWithRedirect: () => void
    }
}
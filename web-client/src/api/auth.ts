import { domain } from "@/config";
import createAuth0Client, { Auth0Client, GetTokenSilentlyOptions, GetTokenWithPopupOptions, LogoutOptions, RedirectLoginOptions } from "@auth0/auth0-spa-js";

class Auth {

    public instance: Auth0Client | null = null;

    async getInstance(): Promise<Auth0Client> {
        if (this.instance) return this.instance 
        return this.instance = await  createAuth0Client({
            domain: domain,
            client_id: "7OxiATtNDzxwanpb6qTdoaKZKRc4jhLo",
            redirect_uri: `${window.location.origin}/callback`,
            audience: "https:://olaysco-bday-auth"
        })
    }
    async getTokenSilently(o?: GetTokenSilentlyOptions) {
        return this.getInstance().then(async instance => {
            return await instance.getTokenSilently(o);
        });
    }

    async getTokenWithPopup(o: GetTokenWithPopupOptions) {
        return this.getInstance().then(async instance => {
            return await  instance.getTokenWithPopup(o);
        });
    }

    async loginWithRedirect(o: RedirectLoginOptions) {
        return this.getInstance().then(async instance => {
            return await instance.loginWithRedirect(o);
        });
    }

    async handleRedirectCallback() {
        return this.getInstance().then(async instance => {
            await instance.handleRedirectCallback();
            const user = await instance.getUser();
            return user
        }).catch(e => {
            throw(e)
        });
    }

    logout(o: LogoutOptions): Promise<void> {
        return this.getInstance().then(instance => {
            return instance.logout(o);
        });
    }
    
}

export default new Auth();
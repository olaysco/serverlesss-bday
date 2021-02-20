import { API_URL } from "@/config";
import { Contact, User } from "@/types";
import axios from "axios";
import auth from "./auth";

class ContactApi {
    
    private token: string = ""

    constructor() {
        this.getToken()
    }

    async getToken() {
         this.token = await auth.getTokenSilently();
    }

    async getContact(): Promise<Contact[]|undefined> {
        try {
            const token = await auth.getTokenSilently();
            const response = await axios.get(`${API_URL}/contact`, {
                headers: {
                Authorization: `Bearer ${token}`
                }
            })
            return response.data.contacts as Contact[]
        } catch (e) {
            console.log(e)
        }
    }

    async postContact(contact: Contact[]) {
        const token = await auth.getTokenSilently();
        const response = await axios.post(`${API_URL}/contact`, contact, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        })
        return response;
    }

    async deleteContact(contact: Contact) {
        await axios.delete(`${API_URL}/contact/${contact.id}`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
    }

    async updateContact(contact: Contact) {
        await axios.put(`${API_URL}/contact/${contact.id}`, contact, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
    }

    async userInfo() {
        this.token = await auth.getTokenSilently()
        const response = await axios.get(`${API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        return response.data.user
    }

    async updateUser(user: User) {
        await axios.put(`${API_URL}/user`, user, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
    }

    async getUploadUrl() {
        const response = await axios.post(`${API_URL}/user/images`, {}, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        console.log(response)
        return response.data
    }

    async uploadFile(file: any): Promise<void> {
        const { signedUrl } = await this.getUploadUrl();
        console.log(signedUrl)
        await axios.put(signedUrl, file)
    }

    currentMonthName() {
        return new Date().toLocaleString("default", {month: "long"})
    }

    monthName(n: number) {
		return new Date(new Date().setMonth(n)).toLocaleString("default", {
			month: "long",
		});
    }
    

}

export default new ContactApi()
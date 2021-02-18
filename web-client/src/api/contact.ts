import { API_URL } from "@/config";
import { Contact } from "@/types";
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
        console.log(contact)
        await axios.put(`${API_URL}/contact/${contact.id}`, contact, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
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
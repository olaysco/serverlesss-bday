<template>
	<base-modal :title="'Add contact'" :name="modalName" :size="'lg'">
		<div class="h-auto">
			<div class="-mx-3 md:flex mb-6">
				<div class="md:w-1/2 px-3 mb-6 md:mb-0">
					<label
						class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
						for="first-name"
					>Full Name</label>
					<input
						class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
						id="first-name"
						type="text"
						v-model="contact.name"
						placeholder="Jane"
					/>
				</div>
				<div class="md:w-1/2 px-3 mb-6 md:mb-0">
					<label
						class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
						for="email"
					>Full Name</label>
					<input
						class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
						id="email"
						v-model="contact.email"
						type="email"
						placeholder="Email address"
					/>
				</div>
			</div>
			<div class="-mx-3 md:flex mb-6">
				<div class="md:w-1/2 px-3 mb-6 md:mb-0">
					<label
						class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
						for="title"
					>Title</label>
					<input
						class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
						id="title"
						v-model="contact.title"
						type="text"
						placeholder="Mr./ Mrs. /Dr."
					/>
				</div>
				<div class="md:w-1/2 px-3 mb-6 md:mb-0">
					<label
						class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
						for="phone"
					>Phone Number</label>
					<input
						class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
						id="phone"
						v-model="contact.phoneNumber"
						type="tel"
						placeholder="Phone Number with country code"
					/>
				</div>
			</div>
			<div class="-mx-3 md:flex mb-6">
				<div class="md:w-1/2 px-3 mb-6 md:mb-0">
					<label
						class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
						for="grid-first-name"
					>Day of Birth</label>
					<input
						class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
						id="day-of-birth"
						type="number"
						min="1"
						max="31"
						v-model="contact.dayOfBirth"
						placeholder="Day of Birth"
					/>
				</div>
				<div class="md:w-1/2 px-3 mb-6 md:mb-0">
					<label
						class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
						for="month-of-birth"
					>Month of Birth</label>
					<input
						class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
						id="month-of-birth"
						type="number"
						min="1"
						max="12"
						v-model="contact.monthOfBirth"
						placeholder="Month of Birth"
					/>
				</div>
			</div>
			<div class="flex justify-end mb-4">
				<button
					@click="submitContact"
					class="inline-flex items-center justify-center px-4 py-2 text-sm leading-5 rounded-md border font-medium shadow transition ease-in-out duration-150 focus:outline-none focus:shadow-outline bg-blue-700 border-gray-300 text-white"
					v-text="(shouldUpdate) ? 'Update contact': 'Add contact'"
				></button>
			</div>
		</div>
	</base-modal>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import { Contact } from "../types";
import BaseModal from "./base/BaseModal.vue";

@Component({
	components: { BaseModal },
})
export default class SingleContactModal extends Vue {
	@Prop({ required: false, default: false }) shouldUpdate!: boolean;
	@Prop({ required: false }) updateContact!: Contact;
	@Prop({ required: false, default: "Add contact" }) modalName!: string;

	public contact: Contact = {
		name: "",
		email: "",
		title: "",
		phoneNumber: "",
		dayOfBirth: 1,
		monthOfBirth: 1,
		dateOfBirth: "",
	};

	public error!: null;

	@Watch("updateContact", { immediate: true })
	onUpdateContactChanged() {
		if (this.updateContact) {
			this.contact = {
				id: this.updateContact.id ?? "",
				name: this.updateContact.name ?? "",
				email: this.updateContact.email ?? "",
				title: this.updateContact.title ?? "",
				phoneNumber: this.updateContact.phoneNumber ?? "",
				dayOfBirth: this.updateContact.dayOfBirth ?? 1,
				monthOfBirth: this.updateContact.monthOfBirth ?? 1,
				dateOfBirth: this.updateContact.dateOfBirth ?? "",
			};
		}
	}

	get fieldValid(): boolean {
		return (
			this.contact.name.length > 0 &&
			this.contact.email.length > 0 &&
			this.contact.title.length > 0 &&
			this.contact.phoneNumber.length > 0 &&
			this.contact.dayOfBirth > 0 &&
			this.contact.dayOfBirth <= 31 &&
			this.contact.monthOfBirth > 0 &&
			this.contact.monthOfBirth <= 12
		);
	}

	submitContact() {
		if (!this.fieldValid) {
			this.$store.commit("toggleAlert", {
				message: "all fields are mandatory",
				visible: true,
			});
			return;
		}
		try {
			this.contact.dateOfBirth = new Date(
				`1900 ${this.contact.monthOfBirth} ${this.contact.dayOfBirth} 00:00:00`
			).toISOString();
		} catch (e) {
			this.$store.commit("toggleAlert", {
				message: "Invalid date value",
				visible: true,
			});
			return;
		}
		if (!this.shouldUpdate) {
			this.$store.dispatch("POST_CONTACT", [this.contact]);
		} else {
			this.$store.dispatch("UPDATE_CONTACT", this.contact);
		}

		this.resetForm();
	}

	resetForm() {
		this.contact = {
			name: "",
			email: "",
			title: "",
			phoneNumber: "",
			dayOfBirth: 1,
			monthOfBirth: 1,
			dateOfBirth: "",
		};
	}
}
</script>
<style scoped>
</style>
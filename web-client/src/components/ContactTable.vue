<template>
	<div>
		<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
				<div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-md">
					<table class="min-w-full divide-y divide-gray-200">
						<thead>
							<tr>
								<th
									scope="col"
									class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>Name</th>
								<th
									scope="col"
									class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>Title</th>
								<th
									scope="col"
									class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>Email</th>
								<th
									scope="col"
									class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>Date of birth</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200">
							<tr v-for="(item, i) in list" :key="`${i}contact-row`">
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="flex items-center">
										<div class="ml-4">
											<div class="text-sm font-medium text-gray-900">{{item.name}}</div>
											<div class="text-sm text-gray-500" v-if="item.phoneNumber">{{item.phoneNumber}}</div>
											<div class="text-sm text-gray-500" v-else></div>
										</div>
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="text-sm text-gray-900">{{item.title}}</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="text-sm text-gray-900">{{item.email}}</div>
								</td>
								<td class="px-6 py-4 flex justify-between">
									<span
										class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
									>{{nth(item.dayOfBirth)}} of {{monthName(item.monthOfBirth)}}</span>
									<span v-if="showOperation">
										<a href="#" @click="updateContact(item)">
											<svg-icon name="pencil-box" />
										</a>
										<a href="#" @click="deleteContact(item)">
											<svg-icon name="trash-can" class="fill-current text-red-600" />
										</a>
									</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<single-contact-modal
			v-if="shouldUpdate"
			:shouldUpdate="shouldUpdate"
			:updateContact="contactToUpdadte"
			modalName="update-contact-modal"
		/>
	</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import { Contact } from "../types";
import SvgIcon from "./SvgIcon.vue";
import SingleContactModal from "./SingleContactModal.vue";
import { mapMutations } from "vuex";

@Component({
	components: { SvgIcon, SingleContactModal },
	methods: mapMutations(["showModal"]),
})
export default class ContactTable extends Vue {
	@Prop({ required: true }) list!: any[];
	@Prop({ required: false, default: false }) showOperation!: boolean;

	public shouldUpdate: boolean = false;
	public contactToUpdadte: Contact = {
		name: "",
		email: "",
		title: "",
		phoneNumber: "",
		dayOfBirth: 1,
		monthOfBirth: 1,
		dateOfBirth: "",
	};

	monthName(n: number) {
		return new Date(new Date().setMonth(n - 1)).toLocaleString("default", {
			month: "long",
		});
	}

	nth(n: number) {
		return `${n}${
			["st", "nd", "rd"][((((n % 10 + 90) % 100) - 10) % 10) - 1] || "th"
		}`;
	}

	deleteContact(contact: Contact) {
		this.$store.dispatch("DELETE_CONTACT", contact);
	}

	updateContact(contact: Contact) {
		this.contactToUpdadte = contact;
		this.shouldUpdate = true;
		this.$store.commit("showModal", "update-contact-modal");
	}
}
</script>
<style scoped>
</style>
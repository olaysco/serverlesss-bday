<template>
	<layout>
		<div class="flex flex-col w-full">
			<div class="flex">
				<div class="w-2/5">
					<h2 class="font-bold text-xl">Welcome</h2>
					<h3>{{ user.name }}</h3>
				</div>
				<div class="w-3/5 flex justify-end">
					<div>
						<button
							class="inline-flex items-center justify-center px-4 py-2 text-sm leading-5 rounded-md border font-medium shadow transition ease-in-out duration-150 focus:outline-none focus:shadow-outline bg-blue-700 border-gray-300 text-white"
						>
							<svg-icon name="credit-card" class="feather feather-activity leading-5 mr-2" />Fund Wallet
						</button>
					</div>
				</div>
			</div>
			<div class="w-full py-4">
				<div class="grid grid-cols-12 gap-4">
					<div class="col-span-12 sm:col-span-6 md:col-span-4">
						<div class="flex flex-row bg-white shadow rounded-md px-4 py-6">
							<div
								class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500"
							>
								<svg
									class="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
							</div>
							<div class="flex flex-col flex-grow ml-4">
								<div class="text-sm text-gray-500">Contacts</div>
								<div class="font-bold text-lg">{{contact.length}}</div>
							</div>
						</div>
					</div>
					<div class="col-span-12 sm:col-span-6 md:col-span-4">
						<div class="flex flex-row bg-white shadow rounded-md px-4 py-6">
							<div
								class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-red-100 text-red-500"
							>
								<svg-icon name="naira" class="fill-current" />
							</div>
							<div class="flex flex-col flex-grow ml-4">
								<div class="text-sm text-gray-500">Wallet Balance</div>
								<div class="font-bold text-lg">0</div>
							</div>
						</div>
					</div>
					<div class="col-span-12 sm:col-span-6 md:col-span-4">
						<div class="flex flex-row bg-white shadow rounded-md px-4 py-6">
							<div
								class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-orange-100 text-orange-500"
							>
								<svg-icon name="cake-outline" class="fill-current" />
							</div>
							<div class="flex flex-col flex-grow ml-4">
								<div class="text-sm text-gray-500">{{ month }}'s celebrants</div>
								<div class="font-bold text-lg">{{monthCelebrant.length}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="w-full py-4">
				<month-celebrant />
			</div>
		</div>
	</layout>
</template>
<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
// eslint-disable-next-line no-unused-vars
import { Contact } from "../../types";
import Layout from "../base/Layout.vue";
import MonthCelebrant from "../MonthCelebrant.vue";
import SvgIcon from "../SvgIcon.vue";

@Component({
	components: { SvgIcon, MonthCelebrant, Layout },
	computed: mapState(["user", "contact"]),
})
export default class App extends Vue {
	public user!: any;
	public contact!: Contact[];
	public monthCelebrant: Contact[] = [];

	@Watch("contact", { immediate: true })
	onContactChanged() {
		const currentMonth: number = new Date().getMonth() + 1;
		this.monthCelebrant = this.contact.filter((info: Contact) => {
			return (info.monthOfBirth = currentMonth);
		});
	}

	get month() {
		return new Date().toLocaleString("default", { month: "long" });
	}
}
</script>
<style scoped>
</style>
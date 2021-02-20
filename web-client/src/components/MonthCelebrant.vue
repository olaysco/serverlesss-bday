<template>
	<div>
		<div class="flex flex-col">
			<h4 class="text-gray-500 mb-2">{{ currentMonth}} Celebrants</h4>
			<contact-table :list="monthCelebrant" :showOperation="true" />
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import ApiContact from "../api/contact";
import { mapState } from "vuex";
// eslint-disable-next-line no-unused-vars
import { Contact } from "../types";
import ContactTable from "./ContactTable.vue";

@Component({
	components: { ContactTable },
	computed: mapState(["user", "contact"]),
})
export default class MonthCelebrant extends Vue {
	public monthCelebrant: Contact[] = [];
	public contact!: Contact[];
	public currentMonth: string = ApiContact.currentMonthName();

	@Watch("contact", { immediate: true })
	onContactChanged() {
		const currentMonth: number = new Date().getMonth() + 1;
		this.monthCelebrant = this.contact.filter((info: Contact) => {
			return (info.monthOfBirth = currentMonth);
		});
	}
}
</script>
<style scoped>
</style>
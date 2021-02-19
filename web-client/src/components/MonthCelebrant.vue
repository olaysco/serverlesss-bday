<template>
	<div>
		<div class="flex flex-col">
			<h4 class="text-gray-500 mb-2">{{ currentMonth}} Celebrants</h4>
			<contact-table :list="contact" :showOperation="true" />
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApiContact from "../api/contact";
// eslint-disable-next-line no-unused-vars
import { Contact } from "../types";
import ContactTable from "./ContactTable.vue";

@Component({
	components: { ContactTable },
})
export default class MonthCelebrant extends Vue {
	public contact: Contact[] = [];
	public currentMonth: string = ApiContact.currentMonthName();
}
</script>
<style scoped>
</style>
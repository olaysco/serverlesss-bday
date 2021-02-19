<template>
	<div class="flex flex-col">
		<textarea
			name
			id
			cols="30"
			rows="10"
			v-model="message"
			class="border border-gray-300 w-full rounded-md p-2 tetx-xs"
			placeholder="Enter Birthday message"
		></textarea>
		<button
			@click="addMessage"
			class="inline-flex items-center justify-center px-4 py-2 text-sm leading-5 rounded-md border font-medium shadow transition ease-in-out duration-150 focus:outline-none focus:shadow-outline bg-blue-700 border-gray-300 text-white mt-4"
		>Update birthday message</button>
	</div>
</template>
<script lang="ts">
// eslint-disable-next-line no-unused-vars
import { User } from "../types";
import { Vue, Component, Watch } from "vue-property-decorator";
import { mapState } from "vuex";
import contactApi from "../api/contact";

@Component({
	computed: mapState(["user"]),
})
export default class BirthDayMessage extends Vue {
	public user!: User;
	public message: string = "";

	addMessage() {
		if (!this.fieldValid) {
			this.$store.commit("toggleAlert", {
				message: "all fields are mandatory",
				visible: true,
			});
			return;
		}
		this.user.messages = [this.message];
		this.$store.dispatch("UPDATE_USER", this.user);
	}

	async getUploadUrl() {
		const uploadUrl = await contactApi.getUploadUrl();
		console.log(uploadUrl);
	}

	@Watch("user", { immediate: true })
	onUserChanged() {
		if (this.user.messages && this.user.messages[0]) {
			this.message = this.user.messages[0] ?? "";
		}
	}

	get fieldValid(): boolean {
		return this.message !== null && this.message.length > 2;
	}
}
</script>
<style scoped>
</style>
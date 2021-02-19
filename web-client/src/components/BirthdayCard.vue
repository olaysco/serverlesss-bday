<template>
	<div class="flex flex-col">
		<img :src="cardUrl" class="w-full h-auto object-cover rounded-md shadow-md" />
		<label>File</label>
		<input
			type="file"
			accept="image/*"
			placeholder="Image to upload"
			@change="filesChange($event.target.files);"
		/>
		<button
			@click="uploadImage"
			class="inline-flex items-center justify-center px-4 py-2 text-sm leading-5 rounded-md border font-medium shadow transition ease-in-out duration-150 focus:outline-none focus:shadow-outline bg-blue-700 border-gray-300 text-white mt-4"
		>Update Image</button>
	</div>
</template>
<script lang="ts">
// eslint-disable-next-line no-unused-vars
import { User } from "../types";
import { Vue, Component, Watch } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
	computed: mapState(["user"]),
})
export default class BirthDayMessage extends Vue {
	public user!: User;
	public cardUrl: string = "";
	public file: any;

	async uploadImage() {
		if (!this.file) {
			this.$store.commit("toggleAlert", {
				visible: true,
				type: "error",
				title: "Error",
				message: "No image selected",
			});
		}
		await this.$store.dispatch("UPLOAD_IMAGE", this.file);
	}

	@Watch("user", { immediate: true })
	onUserChanged() {
		if (this.user.cardUrl) {
			this.cardUrl = this.user.cardUrl ?? "";
		}
	}

	filesChange(fileList: any) {
		this.file = fileList;
		console.log(fileList);
	}
}
</script>
<style scoped>
</style>
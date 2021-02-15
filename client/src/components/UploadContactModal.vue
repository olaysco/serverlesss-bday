<template>
	<base-modal :title="'Upload contact'" name="upload-contact" :size="'lg'">
		<div class="h-64">
			<article
				aria-label="File Upload Modal"
				class="relative h-full flex flex-col"
				@drop.prevent="dropHandler"
				@dragover="dragOverHandler"
				@dragleave="dragLeaveHandler"
				@dragenter.prevent="dragEnterHandler"
			>
				<div
					v-if="showOverlay"
					class="w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md"
				>
					<i>
						<svg
							class="fill-current w-12 h-12 mb-3 text-blue-700"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
						>
							<path
								d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z"
							/>
						</svg>
					</i>
					<p class="text-lg text-blue-700">Drop files to upload</p>
				</div>
				<section class="overflow-auto p-8 w-full h-full flex flex-col">
					<header
						class="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center"
					>
						<p
							v-if="!filename"
							class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center"
						>
							<span>Drag and drop your</span>&nbsp;<span
								>files anywhere or</span
							>
						</p>
						<p
							class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center"
						>
							<span>{{ filename }}</span>
						</p>

						<button
							id="button"
							class="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none relative"
						>
							<input
								id="hidden-input"
								type="file"
								multiple
								class="absolute left-0 opacity-0 top-0 cursor-pointer"
								@change="fileSelected"
							/>
							Upload a file
						</button>
					</header>

					<h1 class="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">Data</h1>

					<ul class="flex flex-1 flex-wrap -m-1" v-if="!data">
						<li
							class="h-full w-full text-center flex flex-col justify-center items-center"
						>
							<img
								class="mx-auto w-32"
								src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
								alt="no data"
							/>
							<span class="text-small text-gray-500">No file selected</span>
						</li>
					</ul>
					<div v-else>
						<table class="border-collapse table">
							<thead>
								<tr class="text-left">
									<th
										v-for="heading in data.meta.fields"
										:key="heading"
										class="bg-gray-100 sticky top-0 border-b border-gray-200 px-3 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs"
									>
										{{ heading }}
									</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(contact, i) in data.data" :key="i">
									<td
										class="border-dashed border-t border-gray-200 px-3 text-xs"
										v-for="(heading, i) in data.meta.fields"
										:key="`${i}da`"
									>
										{{ contact[heading] }}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>
			</article>
		</div>
		<!--Footer-->
		<div class="flex justify-end mt-4">
			<button
				class="focus:outline-none modal-close px-4 bg-gray-400 p-2 rounded-lg text-black hover:bg-gray-300 text-sm"
				@click="hideModal('upload-contact')"
			>
				Cancel
			</button>
			<button
				class="focus:outline-none px-4 bg-blue-700 p-2 ml-3 rounded-lg text-white hover:bg-blue-400 text-sm"
			>
				Confirm
			</button>
		</div>
	</base-modal>
</template>
<script>
import { mapMutations } from "vuex";
import BaseModal from "./base/BaseModal.vue";
import Papa from "papaparse/papaparse";
export default {
	components: { BaseModal },
	data() {
		return {
			showOverlay: false,
			dragging: 0,
			data: false,
			filename: false,
			allowedFormat: ["text/plain", "application/vnd.ms-excel", "text/x-csv"],
		};
	},
	methods: {
		...mapMutations(["hideModal", "toggleAlert"]),
		fileSelected(ev) {
			let f = ev.target.files[0];
			this.addFile(f);
		},
		dropHandler(ev) {
			for (const file of ev.dataTransfer.files) {
				this.addFile(file);
				this.showOverlay = false;
				this.dragging = 0;
			}
		},
		dragOverHandler(e) {
			if (this.hasFiles(e)) {
				e.preventDefault();
			}
		},
		dragLeaveHandler() {
			1 > --this.dragging && (this.showOverlay = false);
		},
		dragEnterHandler(e) {
			if (!this.hasFiles(e)) {
				return;
			}
			++this.dragging && (this.showOverlay = true);
		},
		hasFiles(e) {
			return e.dataTransfer && e.dataTransfer.types.indexOf("Files") > -1;
		},
		addFile(file) {
			if (!file || !this.allowedFormat.includes(file.type)) {
				return this.toggleAlert({
					visible: true,
					type: "error",
					title: "Error",
					message: "only CSV file format is allowed",
				});
			}
			this.filename = file.name;
			Papa.parse(file, {
				header: true,
				skipEmptyLines: true,
				complete: (e) => {
					this.data = e;
				},
			});
		},
	},
};
</script>
<style scoped>
</style>
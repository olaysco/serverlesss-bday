<template>
	<layout>
		<div class="flex flex-col w-full">
			<div class="flex">
				<div class="w-2/5">
					<h2 class="font-bold text-xl">All Contacts</h2>
				</div>
				<div class="w-3/5 flex justify-end">
					<div>
						<div class="relative">
							<button
								@click="() => (dropdownOpen = !dropdownOpen)"
								class="relative z-10 inline-flex items-center justify-center px-4 py-2 text-sm leading-5 rounded-md border font-medium shadow-sm transition ease-in-out duration-150 focus:outline-none focus:shadow-outline bg-blue-700 border-gray-300 text-white"
							>
								Upload Contact
								<svg-icon
									name="tripple-dots"
									class="h-6 w-6 feather feather-activity leading-5 ml-2"
								/>
							</button>

							<div
								v-show="dropdownOpen"
								@click="() => (dropdownOpen = false)"
								class="fixed inset-0 h-full w-full z-10"
							></div>

							<div
								v-show="dropdownOpen"
								class="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-20"
							>
								<a
									href="https://bday-app-resource.s3-us-west-2.amazonaws.com/contact-format.csv"
									class="block px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-200"
									>Download CSV format
								</a>
								<a
									href="#"
									@click.prevent="showModal('upload-contact')"
									class="block px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-200"
									>Upload CSV
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="mb-4 flex justify-between items-center pt-4 pb-2">
				<div class="flex-1 pr-4">
					<div class="relative md:w-1/3">
						<input
							type="search"
							class="w-full pl-10 pr-4 py-2 rounded-md shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium text-sm"
							placeholder="Search..."
						/>
						<div class="absolute top-0 left-0 inline-flex items-center p-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-6 h-6 text-gray-400"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<rect x="0" y="0" width="24" height="24" stroke="none"></rect>
								<circle cx="10" cy="10" r="7" />
								<line x1="21" y1="21" x2="15" y2="15" />
							</svg>
						</div>
					</div>
				</div>
				<div>
					<div class="shadow rounded-md flex">
						<div class="relative">
							<button
								@click="() => (open = !open)"
								class="rounded-md inline-flex items-center bg-white hover:text-blue-700 focus:outline-none focus:shadow-outline text-gray-500 font-semibold py-2 px-2 md:px-4"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="w-6 h-6 md:hidden"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<rect x="0" y="0" width="24" height="24" stroke="none"></rect>
									<path
										d="M5.5 5h13a1 1 0 0 1 0.5 1.5L14 12L14 19L10 16L10 12L5 6.5a1 1 0 0 1 0.5 -1.5"
									/>
								</svg>
								<span class="hidden md:block text-sm">Filter Month</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="w-5 h-5 ml-1"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<rect x="0" y="0" width="24" height="24" stroke="none"></rect>
									<polyline points="6 9 12 15 18 9" />
								</svg>
							</button>

							<div
								v-show="open"
								class="z-40 absolute top-0 right-0 w-40 bg-white rounded-md shadow-lg mt-12 -mr-1 block py-1 overflow-hidden"
							>
								<div v-for="month in months" :key="`${month}`">
									<label
										class="flex justify-start items-center text-truncate hover:bg-gray-100 px-4 py-2"
									>
										<div class="text-teal-600 mr-3">
											<input
												type="checkbox"
												class="form-checkbox focus:outline-none focus:shadow-outline"
												checked
											/>
										</div>
										<div class="select-none text-gray-700">{{ month }}</div>
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="flex flex-col py-4">
				<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div
						class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
					>
						<div
							class="shadow overflow-hidden border-b border-gray-200 sm:rounded-md"
						>
							<table class="min-w-full divide-y divide-gray-200">
								<thead>
									<tr>
										<th
											scope="col"
											class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Name
										</th>
										<th
											scope="col"
											class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Title
										</th>
										<th
											scope="col"
											class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Date of birth
										</th>
									</tr>
								</thead>
								<tbody class="bg-white divide-y divide-gray-200">
									<tr>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="flex items-center">
												<div class="ml-4">
													<div class="text-sm font-medium text-gray-900">
														Olayiwola Odunsi
													</div>
													<div class="text-sm text-gray-500">08113376030</div>
												</div>
											</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="text-sm text-gray-900">Dr. Mr.</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<span
												class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
											>
												12th of August
											</span>
										</td>
									</tr>
									<tr>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="flex items-center">
												<div class="ml-4">
													<div class="text-sm font-medium text-gray-900">
														Olayiwola Odunsi
													</div>
													<div class="text-sm text-gray-500">08113376030</div>
												</div>
											</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="text-sm text-gray-900">Dr. Mr.</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<span
												class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
											>
												12th of August
											</span>
										</td>
									</tr>
									<tr>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="flex items-center">
												<div class="ml-4">
													<div class="text-sm font-medium text-gray-900">
														Olayiwola Odunsi
													</div>
													<div class="text-sm text-gray-500">08113376030</div>
												</div>
											</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="text-sm text-gray-900">Dr. Mr.</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<span
												class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
											>
												12th of August
											</span>
										</td>
									</tr>
									<tr>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="flex items-center">
												<div class="ml-4">
													<div class="text-sm font-medium text-gray-900">
														Olayiwola Odunsi
													</div>
													<div class="text-sm text-gray-500">08113376030</div>
												</div>
											</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="text-sm text-gray-900">Dr. Mr.</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<span
												class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
											>
												12th of August
											</span>
										</td>
									</tr>
									<tr>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="flex items-center">
												<div class="ml-4">
													<div class="text-sm font-medium text-gray-900">
														Olayiwola Odunsi
													</div>
													<div class="text-sm text-gray-500">08113376030</div>
												</div>
											</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="text-sm text-gray-900">Dr. Mr.</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<span
												class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
											>
												12th of August
											</span>
										</td>
									</tr>
									<tr>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="flex items-center">
												<div class="ml-4">
													<div class="text-sm font-medium text-gray-900">
														Olayiwola Odunsi
													</div>
													<div class="text-sm text-gray-500">08113376030</div>
												</div>
											</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="text-sm text-gray-900">Dr. Mr.</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<span
												class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
											>
												12th of August
											</span>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<upload-contact-modal />
		</div>
	</layout>
</template>
<script>
import SvgIcon from "../SvgIcon.vue";
import UploadContactModal from "../UploadContactModal.vue";
import { mapMutations } from "vuex";
import Layout from "../base/Layout.vue";
export default {
	components: { SvgIcon, UploadContactModal, Layout },
	data() {
		return {
			dropdownOpen: false,
			open: false,
			months: ["January", "February", "March", "April"],
		};
	},
	methods: {
		...mapMutations(["showModal"]),
	},
};
</script>
<style scoped>
</style>
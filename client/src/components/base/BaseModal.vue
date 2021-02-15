<template>
	<div>
		<div
			class="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden justify-center items-center animated faster"
			:class="[visible ? 'flex fadeIn' : 'hidden fadeOut']"
			style="background: rgba(0, 0, 0, 0.7)"
		>
			<div
				class="border border-teal-500 modal-container bg-white w-11/12 mx-auto rounded shadow-lg z-50 overflow-y-auto"
				:class="[size === 'md' ? 'md:max-w-md' : 'md:max-w-2xl']"
			>
				<div class="modal-content py-4 text-left px-6">
					<div class="flex justify-between items-center pb-3">
						<p class="text-sm font-bold">{{ title }}</p>
						<div class="modal-close cursor-pointer z-50">
							<a href="#" @click.prevent="hideModal('upload-contact')">
								<svg
									class="fill-current text-black"
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 18 18"
								>
									<path
										d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
									></path>
								</svg>
							</a>
						</div>
					</div>

					<slot />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		title: {
			required: true,
		},
		size: {
			default: "md",
		},
		name: {
			required: true,
		},
	},
	data() {
		return {
			visible: false,
		};
	},
	created() {
		this.unsubscribe = this.$store.subscribe((mutation) => {
			if (mutation.type === "showModal" && mutation.payload == this.name) {
				this.visible = true;
			}
			if (mutation.type === "hideModal" && mutation.payload == this.name) {
				this.visible = false;
			}
		});
	},
	beforeDestroy() {
		this.unsubscribe();
	},
};
</script>
<style>
</style>

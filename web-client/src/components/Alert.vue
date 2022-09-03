<template>
	<div class="absolute top-0 w-full z-40 p-4">
		<div
			class="alert flex flex-row items-center p-5 rounded border-b-2 relative"
			v-if="alertData.visible"
			:class="[alertData.type]"
		>
			<div
				class="alert-icon flex items-center border-2 justify-center h-10 w-10 flex-shrink-0 rounded-full"
			>
				<span class="text-red-500" v-if="alertData.type == 'error'">
					<svg-icon name="error" />
				</span>
				<span class="text-green-500" v-if="alertData.type == 'success'">
					<svg-icon name="success" />
				</span>
				<span class="text-yellow-500" v-if="alertData.type == 'warning'">
					<svg-icon name="warning" />
				</span>
				<span class="text-blue-500" v-if="alertData.type == 'info'">
					<svg-icon name="info" />
				</span>
			</div>
			<div class="alert-content ml-4">
				<div class="alert-title font-semibold text-lg">{{ alertData.title }}</div>
				<div class="alert-description text-sm">{{ alertData.message }}</div>
			</div>
			<a
				href="#"
				@click.prevent="close()"
				class="absolute right-0 left-0 mr-2 mt-2 top-0 text-right opacity-50"
			>x</a>
		</div>
	</div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import SvgIcon from "./SvgIcon.vue";
export default {
	components: { SvgIcon },
	computed: {
		...mapState(["alertData"]),
	},
	methods: {
		...mapMutations(["toggleAlert"]),
		close() {
			this.toggleAlert({ visible: false });
		},
	},
};
</script>
<style lang="scss" scoped>
.alert {
	&.error {
		@apply border-red-300 bg-red-200;
		& > .alert-icon {
			@apply bg-red-100 border-red-500;
		}
		& > .alert-title {
			@apply text-red-800;
		}
		& > .alert-description {
			@apply text-red-600;
		}
	}
	&.success {
		@apply border-green-300 bg-green-200;
		& > .alert-icon {
			@apply bg-green-100 border-green-500;
		}
		& > .alert-title {
			@apply text-green-800;
		}
		& > .alert-description {
			@apply text-green-600;
		}
	}
	&.info {
		@apply border-blue-300 bg-blue-200;
		& > .alert-icon {
			@apply bg-blue-100 border-blue-500;
		}
		& > .alert-title {
			@apply text-blue-800;
		}
		& > .alert-description {
			@apply text-blue-600;
		}
	}
	&.warning {
		@apply border-yellow-300 bg-yellow-200;
		& > .alert-icon {
			@apply bg-yellow-100 border-yellow-500;
		}
		& > .alert-title {
			@apply text-yellow-800;
		}
		& > .alert-description {
			@apply text-yellow-600;
		}
	}
}
</style>
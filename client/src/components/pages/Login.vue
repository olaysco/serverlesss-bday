<template>
	<div class="w-screen h-screen bg-gray-200 flex justify-center items-center">
		<button
			class="mt-2 rounded-sm px-4 py-2 bg-gray-900 hover:bg-gray-700 focus:shadow-outline focus:outline-none relative text-white flex items-center"
			@click="login('Google')"
		>
			<svg-icon name="google" class="mr-2 h-5 w-5" />
			Signin with Google
		</button>
	</div>
</template>
<script>
import SvgIcon from "../SvgIcon.vue";
export default {
	components: { SvgIcon },
	methods: {
		login() {
			return true;
		},
	},
};
</script>
<style scoped>
</style>
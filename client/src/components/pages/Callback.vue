
<template>
	<div>redirecting...</div>
</template>
<style scoped>
</style>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
	components: {},
})
export default class Callback extends Vue {
	async created() {
		try {
			await this.$store.dispatch("handleLoginCallback");
			if (!this.$store.state.isAuthenticated) {
				throw "login not unsucesssful";
			}
			this.$router.push("/app");
		} catch (e) {
			console.log(e);
			this.$router.push("/");
		}
	}
}
</script>
<style scoped>
</style>
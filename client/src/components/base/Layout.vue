<template>
	<div class="main bg-gray-100 flex">
		<div class="sidebar">
			<div class="head w-full h-16 p-4 flex justify-center items-center">
				<h1 class="text-white font-bold text-xl flex">
					<svg-icon name="cake-layered" class="mr-3" /> Birthday App
				</h1>
			</div>
			<div class="menu mt-16">
				<ul class="menu-wrapper text-left text-white">
					<li class="menu-item">
						<router-link to="/app">
							<svg-icon name="chart-bar" class="mr-3" /> Stats
						</router-link>
					</li>
					<li class="menu-item">
						<router-link to="/contacts">
							<svg-icon name="account-group" class="mr-3" /> Contacts
						</router-link>
					</li>
					<li class="menu-item">
						<router-link to="/settings">
							<svg-icon name="cog" class="mr-3" /> Settings
						</router-link>
					</li>
					<li class="menu-item">
						<a href="#" @click="handleLogout">
							<svg-icon name="power-off" class="mr-3" /> Log out
						</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="content">
			<slot />
		</div>
	</div>
</template>
<script>
import { mapActions } from "vuex";
export default {
	methods: {
		...mapActions(["logout"]),
		async handleLogout() {
			await this.logout();
			this.$router.push("/");
		},
	},
};
</script>
<style lang="scss" scoped>
.main {
	width: 100vw;
	min-height: 100vh;
	height: 100vh;
}
.sidebar {
	width: 250px;
	@apply h-full bg-gray-900;
}
.content {
	width: calc(100vw - 250px);
	@apply pt-16 p-8 overflow-y-scroll;
}
.menu-item {
	&:first-child > a {
		@apply border-t border-gray-800 border-opacity-25;
	}
	& > a {
		@apply border-b border-gray-800 border-opacity-25 w-full h-full p-3 pl-4 flex text-sm;
		&:hover,
		&:active,
		&.router-link-active {
			@apply bg-gray-800 border-b border-gray-900;
		}
	}
}
</style>
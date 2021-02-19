<template>
	<layout>
		<div class="flex flex-col w-full">
			<div>
				<h2 class="font-bold text-xl">App Settings</h2>
			</div>
			<div
				class="bg-gray-200 bg-opacity-50 my-4 border-b border-gray-200 overflow-hidden shadow sm:rounded-md"
			>
				<nav class="flex flex-col sm:flex-row text-xs uppercase">
					<button
						class="tab-btn"
						:class="[currentTab == 0 ? 'active' : '']"
						@click="() => (currentTab = 0)"
					>Birthday Messages</button>
					<button
						class="tab-btn"
						:class="[currentTab == 1 ? 'active' : '']"
						@click="() => (currentTab = 1)"
					>Birthday Card</button>
					<button
						class="tab-btn"
						:class="[currentTab == 2 ? 'active' : '']"
						@click="() => (currentTab = 2)"
					>API keys</button>
					<button
						class="tab-btn"
						:class="[currentTab == 3 ? 'active' : '']"
						@click="() => (currentTab = 3)"
					>Account</button>
				</nav>
				<div class="bg-white py-2 px-4">
					<birthday-messages v-if="currentTab == 0" />
					<account v-if="currentTab == 3" />
					<birthday-card v-if="currentTab == 1" />
				</div>
			</div>
		</div>
	</layout>
</template>
<script>
import Account from "../Account.vue";
import Layout from "../base/Layout.vue";
import BirthdayMessages from "../BirthdayMessages.vue";
import BirthdayCard from "../BirthdayCard";
export default {
	components: { BirthdayMessages, Account, Layout, BirthdayCard },
	data() {
		return {
			currentTab: 0,
		};
	},

	created() {
		this.$store.dispatch("GET_USER");
	},
};
</script>
<style lang="scss" scoped>
.tab-btn {
	outline: none;
	@apply text-gray-500 py-4 px-6 block uppercase;
	&.active {
		@apply text-blue-700 border-b-2 font-medium border-blue-700 uppercase;
	}
	&:hover {
		@apply text-blue-700;
	}
}
</style>
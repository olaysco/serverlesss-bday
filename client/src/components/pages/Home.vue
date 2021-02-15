<template>
	<div class="relative bg-black overflow-hidden">
		<div class="max-w-7xl mx-auto">
			<div class="relative z-10 pb-8 e sm:pb-16 md:pb-20 xl:pb-32">
				<div class="relative pt-6 px-4 sm:px-6">
					<nav class="relative flex items-center justify-between sm:h-10" aria-label="Global">
						<div class="flex items-center flex-grow flex-shrink-0">
							<div class="flex items-center justify-between w-full md:w-auto">
								<a href="#">
									<span class="sr-only">Birthday</span>
									<svg-icon name="cake-layered" class="logo-icon" />
								</a>
								<div class="-mr-2 flex items-center md:hidden">
									<button
										type="button"
										class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-700"
										id="main-menu"
										aria-haspopup="true"
										@click="toggleMobileMenu()"
									>
										<span class="sr-only">Open main menu</span>
										<!-- Heroicon name: menu -->
										<svg
											class="h-6 w-6"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M4 6h16M4 12h16M4 18h16"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
						<div class="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
							<a href="#" class="font-medium text-gray-500 hover:text-gray-900">Use cases</a>

							<a href="#" class="font-medium text-gray-500 hover:text-gray-900">Resources</a>

							<button
								v-if="!authLoading && !isAuthenticated"
								@click="login()"
								class="font-medium text-blue-700 hover:text-blue-700"
							>Log in</button>
							<button
								v-if="!authLoading && isAuthenticated"
								@click="logout()"
								class="font-medium text-blue-700 hover:text-blue-700"
							>Log out</button>
						</div>
					</nav>
				</div>

				<!--
        Mobile menu, show/hide based on menu open state.

        Entering: "duration-150 ease-out"
          From: "opacity-0 scale-95"
          To: "opacity-100 scale-100"
        Leaving: "duration-100 ease-in"
          From: "opacity-100 scale-100"
          To: "opacity-0 scale-95"
				-->
				<transition name="menu">
					<div
						class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
						v-show="showMobileMenu"
					>
						<div class="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
							<div class="px-5 pt-4 flex items-center justify-between">
								<div>
									<svg-icon name="cake-layered" class="logo-icon" />
								</div>
								<div class="-mr-2">
									<button
										type="button"
										class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-700"
										@click="toggleMobileMenu"
									>
										<span class="sr-only">Close main menu</span>
										<!-- Heroicon name: x -->
										<svg
											class="h-6 w-6"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
							</div>
							<div role="menu" aria-orientation="vertical" aria-labelledby="main-menu">
								<div class="px-2 pt-2 pb-3 space-y-1" role="none">
									<a
										href="#"
										class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
										role="menuitem"
									>Use cases</a>

									<a
										href="#"
										class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
										role="menuitem"
									>Resources</a>
								</div>
								<div role="none">
									<button
										v-if="!authLoading && !isAuthenticated"
										@click="login()"
										class="block w-full px-5 py-3 text-center font-medium text-blue-700 bg-gray-50 hover:bg-gray-100"
										role="menuitem"
									>Log in</button>
									<button
										v-if="!authLoading && isAuthenticated"
										@click="logout()"
										class="block w-full px-5 py-3 text-center font-medium text-blue-700 bg-gray-50 hover:bg-gray-100"
										role="menuitem"
									>Log out</button>
								</div>
							</div>
						</div>
					</div>
				</transition>

				<main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 xl:mt-28">
					<div class="sm:text-center">
						<h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
							<span class="block xl:inline text-white">Birthday celebrations</span>
							<span class="block text-blue-700 xl:inline">are special moments</span>
						</h1>
						<p
							class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl"
						>
							The sentiment behind a gift is often more important than the gift
							itself, hence timing is important and this is why we make keeping
							up with your loved ones birthday easy.
						</p>
						<div class="mt-5 sm:mt-8 sm:flex sm:justify-center">
							<div class="rounded-md shadow">
								<a
									href="#"
									class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 md:py-4 md:text-lg md:px-10"
								>Get started</a>
							</div>
						</div>
					</div>
					<div class="mt-16 flex justify-center">
						<img
							class="w-full sm:w-5/6 object-cover rounded-md shadow-lg"
							src="../../assets/images/bdayapp.png"
							alt
						/>
					</div>
				</main>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapState } from "vuex";

@Component({
	components: {},
	computed: mapState(["authLoading", "isAuthenticated"]),
})
export default class Home extends Vue {
	private showMobileMenu: boolean = false;
	public authLoading!: boolean;
	public isAuthenticated!: boolean;

	constructor() {
		super();
		this.showMobileMenu = false;
	}

	toggleMobileMenu() {
		this.showMobileMenu = !this.showMobileMenu;
	}

	login() {
		this.$store.dispatch("login");
	}

	logout() {
		this.$store.dispatch("logout");
	}
}
</script>
<style lang="scss" scoped>
.logo-icon {
	@apply w-12 h-12 text-blue-700;
}
.menu-enter-active {
	@apply duration-150 ease-out;
}
.menu-enter {
	@apply opacity-0 scale-95;
}
.menu-enter-to {
	@apply opacity-100 scale-100;
}
.menu-leave-active {
	@apply duration-100 ease-in;
}
.menu-levae {
	@apply opacity-100 scale-100;
}
.menu-leave-to {
	@apply opacity-0 scale-95;
}
</style>
<template>
	<div class="main bg-gray-100 flex">
		<loading></loading>
        <transition name="menu">
            <div class="sidebar trans" :class="[open?'open':'']">
                <div class="head w-full h-16 p-4 flex justify-center items-center">
                    <h1 class="text-white font-bold text-xl flex mt-4">
                        <a href="/" class="flex">
                            <svg-icon name="cake-layered" class="mr-3" />Birthday App
                        </a>
                    </h1>
                </div>
                <div class="menu mt-16">
                    <ul class="menu-wrapper text-left text-white">
                        <li class="menu-item">
                            <router-link to="/app">
                                <svg-icon name="chart-bar" class="mr-3" />Stats
                            </router-link>
                        </li>
                        <li class="menu-item">
                            <router-link to="/contacts">
                                <svg-icon name="account-group" class="mr-3" />Contacts
                            </router-link>
                        </li>
                        <li class="menu-item">
                            <router-link to="/settings">
                                <svg-icon name="cog" class="mr-3" />Settings
                            </router-link>
                        </li>
                        <li class="menu-item">
                            <a href="#" @click="handleLogout">
                                <svg-icon name="power-off" class="mr-3" />Log out
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
        <div class="absolute z-50">
            <div class="-mr-2 flex items-center md:hidden">
                <button
                    type="button"
                    class="bg-gray-900 rounded-r-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-700"
                    :class="[open?'open':'']"
                    id="menu-btn"
                    aria-haspopup="true"
                    @click="toggleSideMenu()"
                >
                    <span class="sr-only">Open main menu</span>
                    <!-- Heroicon name: menu -->
                    <svg-icon name="bar" class="fill-current text-gray-100" v-if="!open"/>
                    <svg-icon name="cross-bar" class="fill-current text-gray-100" v-else/>
                </button>
            </div>
        </div>
		<div class="content">
			<slot />
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Loading from "../Loading.vue";
import SvgIcon from "../SvgIcon.vue";

@Component({
	components: { Loading, SvgIcon },
})
export default class Layout extends Vue {
    public open: boolean = false;

	created() {
		if (!this.$store.state.contactFetched) {
			this.$store.dispatch("GET_CONTACT");
		}
	}

	async handleLogout() {
		await this.$store.dispatch("LOGOUT");
		this.$router.push("/");
	}

    async toggleSideMenu() {
        this.open = !this.open;
    }
}
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
@media screen and (max-width: 768px) {
    .sidebar {
        width: 0px;
        display: none;
        &.open {
            width: 200px;
            @apply z-10;
            position: absolute;
            display: block;
        }
    }
    .content {
        width: calc(100vw);
    }
    #menu-btn {
        &.open{
            margin-left: 199px;
        }
    }
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
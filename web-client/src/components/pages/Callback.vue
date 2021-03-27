
<template>
	<div class="flex justify-center">
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
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
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
  @apply bg-gray-900;
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
<template>
	<div>
		<div class="w-screen h-screen bg-opacity-25 z-40 absolute bg-gray-900" v-if="busy">
			<div class="loader">
				<div></div>
				<div></div>
			</div>
		</div>
	</div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
	computed: mapState(["busy"]),
})
export default class Loading extends Vue {}
</script>
<style scoped>
.loader {
	display: inline-block;
	position: absolute;
	width: 80px;
	height: 80px;
	right: 1em;
	top: 1em;
}
.loader div {
	position: absolute;
	border: 4px solid #fff;
	opacity: 1;
	border-radius: 50%;
	animation: loader 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.loader div:nth-child(2) {
	animation-delay: -0.5s;
}
@keyframes loader {
	0% {
		top: 36px;
		left: 36px;
		width: 0;
		height: 0;
		opacity: 1;
	}
	100% {
		top: 0px;
		left: 0px;
		width: 72px;
		height: 72px;
		opacity: 0;
	}
}
</style>
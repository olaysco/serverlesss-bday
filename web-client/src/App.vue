<template>
	<div id="app">
		<router-view></router-view>
		<alert />
	</div>
</template>
<script>
import "@/assets/css/tailwind.css";
import Alert from "./components/Alert.vue";
export default {
	name: "App",
	components: {
		Alert,
	},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto");
#app {
	font-family: "Roboto", sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
</style>

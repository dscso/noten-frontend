<template>
	<div>
		<div id="layout" :class="{active: navbar}" v-if="signedIn">
			<navbar/>
			<div id="main">
				<router-view/>
			</div>
		</div>
		<login v-else/>
	</div>
</template>

<script>
import navbar from './components/navbar'
import store from './store/index'
import login from './components/login'

export default {
	name: 'App',
	store: store,
	components: {
		navbar,
		login
	},
	data: function () {
		return {
			showNav: false
		}
	},
	computed: {
		navbar() {
			return this.$store.state.navbar
    	},
		signedIn() {
			return this.$store.state.login;
		}
	},
}
</script>

<style>

</style>

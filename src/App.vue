<template>
	<div>
		<div id="layout" :class="{active: navbar}" v-if="isAuthenticated">
			<navbar/>
			<div id="main">
				<router-view :key="$route.fullPath" />
			</div>
		</div>
		<login v-else/>
	</div>
</template>

<script>
import navbar from './components/navbar'
import store from './store/index'
import login from './components/login'
import {mapGetters} from 'vuex'

export default {
	name: 'App',
	store: store,
	components: {
		navbar,
		login
	},
	created() {
		this.$store.dispatch('authenticate');
	},
	data: function () {
		return {
			showNav: false
		}
	},
	computed: mapGetters(['isAuthenticated', 'navbar'])
}
</script>

<style>

</style>

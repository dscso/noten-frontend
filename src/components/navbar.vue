<template>
	<div>
		<a id="menuLink" class="menu-link" :class="{active: navbar}" @click="toggleNav()">
				<span></span>
		</a>
		<!-- if you click somewhere in nav, nav toggles    \/ -->
		<div id="menu" :class="{active: navbar}" @click="toggleNav()">
			<div class="pure-menu">
                <a class="pure-menu-heading">
					<span v-show="isStudent">Schüler</span>
					<span v-show="isTeacher">Lehrer</span>
				</a>
                <ul class="pure-menu-list">
					<router-link to="/courses" class="pure-menu-item" tag="li">
						<a class="pure-menu-link">Kurse</a>
					</router-link>
					<router-link to="/settings" class="pure-menu-item" tag="li">
						<a class="pure-menu-link">Einstellungen</a>
					</router-link>
                </ul>
        	</div>
		</div>
	</div>
</template>

<script>
import store from '../store/index.js'
import { mapGetters } from 'vuex';

export default {
	name: 'navbar',
	data: function (){
		return {
		};
	},
    methods: {
		toggleNav: function () {
			this.$store.commit('toggle_navbar');
		}
	},
    computed: {
		...mapGetters(['navbar', 'isStudent', 'isTeacher'])
	},
	watch: {
		'$route' (from, to) {
			// not needed maybe reuse later
			//this.$store.commit('toggle_navbar', false);
		}
	}
    
}
</script>

<style>

</style>
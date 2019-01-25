<template>
	<div>
		<a id="menuLink" class="menu-link" :class="{active: navbar}" @click="toggleNav()">
				<span></span>
		</a>
		<!-- if you click somewhere in nav, nav toggles    \/ -->
		<div id="menu" :class="{active: navbar}" @click="toggleNav()">
			<div class="pure-menu">
                <a class="pure-menu-heading">Pure</a>
                <ul class="pure-menu-list">
					<router-link v-for="page in pages" :key="page.url" :to="page.url" class="pure-menu-item" tag="li">
						<a class="pure-menu-link" @click="toggleNav()">{{page.name}}</a>
					</router-link>
                </ul>
        	</div>
		</div>
	</div>
</template>

<script>
import store from '../store/index.js'

export default {
	name: 'navbar',
	data: function (){
		return {
			showNav: false,
			pages: [
				{
					name: "Home",
					url: "/"
				},{
					name: "hello World",
					url: "/hi"
				}
			]
		};
	},
    methods: {
		toggleNav: function () {
			this.$store.commit('toggle_navbar');
		}
	},
    computed: {
        navbar() {
		    return this.$store.state.navbar
        }
    },
	watch: {
		'$route' (from, to) {
			// not needet maybe reuse later
			//this.$store.commit('toggle_navbar', false);
		}
	}
    
}
</script>

<style>

</style>
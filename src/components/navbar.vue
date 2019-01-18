<template>
	<div>
		<a id="menuLink" class="menu-link" :class="{active: navbar}" @click="toggleNav()">
				<span></span>
		</a>
		<div id="menu" :class="{active: navbar}">
			<div class="pure-menu">
                <a class="pure-menu-heading">Pure</a>
                <ul class="pure-menu-list">
                    <li class="pure-menu-item" v-for="page in pages">
						<router-link tag="li" :to="page.url">
                        	<a class="pure-menu-link" @click="toggleNav()">{{page.name}}</a>
						</router-link>
                    </li>
                </ul>
        	</div>
		</div>
	</div>
</template>

<script>
import store from './../store'

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
			this.$store.commit('toggle_navbar', false);
		}
	}
    
}
</script>

<style>

</style>
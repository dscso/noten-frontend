<template>
    <div id="main">
        <div class="header">
            <h1>Einstellungen</h1>
            <h2>Einstellungen von {{name}}</h2>
        </div>
        <div class="content">
            <h2>Information über Benutzer</h2>
            Name: <b>{{name}}</b><br />
            Nutzertyp: <b>{{type}}</b><br>
            <button class="pure-button button-secondary button-error" @click="logout()">Ausloggen</button>
        </div>
    </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
	name: 'login',
    data: function () {
        return {
            
        }
    },
    methods: {
        ...mapActions({
            logout: 'signOut'
        })
    },
    computed: {
        ...mapGetters(['name', 'type'])
    }
}
</script>
<style>
.button-error {
    background: red;
}
.button-secondary {
    color: white;
    border-radius: 4px;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
}
</style>
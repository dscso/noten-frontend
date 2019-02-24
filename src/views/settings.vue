<template>
    <div id="main">
        <div class="header">
            <h1>Einstellungen</h1>
            <h2>Einstellungen von {{name}}</h2>
        </div>
        <div class="content">
            <h2>Information über Benutzer</h2>
            Name: <b>{{name}}</b><br />
            Nutzertyp: <b>{{type}}</b>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
	name: 'login',
    data: function () {
        return {
            
        }
    },
    computed: mapGetters(['name','type'])
}
</script>
<style>

</style>
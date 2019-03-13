<template>
    <div>
        <div class="header">
            <h1>Belegte Kurse</h1>
        </div>
        <table class="pure-table">
        <thead>
            <tr>
                <th>Name</th>
                
            </tr>
        </thead>
        <tbody>
            
        </tbody>
        </table>
    </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
    name: 'studentcourses',
    components: {},
    data: function () {
        return {}
    },
    created() {
		
	},
    computed: {
        ...mapGetters([])
    }
}
</script>

<style scoped>

</style>
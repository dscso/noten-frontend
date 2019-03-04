<template>
    <div>
        <div class="header">
            <h1>Klasse {{id}}</h1>
        </div>
        <ul>
            <li v-for="(course, index) in getCourses" :key="index">
                <router-link :to="'/courses/'+course.cid" tag="a"> Kurs: {{ course.id }} ({{course.short}})</router-link>
            </li>
        </ul>
        <table class="pure-table">
        <thead>
            <tr>
                <th>Name</th>
                <th class="rotate">Klausur 1</th>
                <th class="rotate">Klausur 2</th>
                <th class="rotate">Mündl 1</th>
            </tr>
        </thead>
        <tbody>
            <tr class="pure-table-odd">
                <td>Jurek Weber</td>
                <td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td>
                <td>4</td>
                <td>1+</td>
            </tr>
        </tbody>
        </table>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'teachercourse',
    props: {
        id: {
            type: String,
            required: false
        }
    },
    data: function () {
        return {
        }
    },
    created() {
		this.$store.dispatch('fetchCourses');
	},
    computed: {
        ...mapGetters(['getCourses', 'isAuthenticated'])
    }
}
</script>

<style scoped>
th.rotate {
    text-align:center;
    white-space:nowrap;
    transform-origin:50% 50%;
    transform: rotate(90deg);
    width:0;
}


th.rotate:before {
    content:'';
    width:0;
    padding-top:110%;/* takes width as reference, + 10% for faking some extra padding */
    display:inline-block;
    vertical-align:middle;
}
</style>
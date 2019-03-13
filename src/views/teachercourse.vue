<template>
    <div>
        <div class="header">
            <h1>Kurs {{getCourse(id).short}}</h1>
            <h2 v-show="!id > 0">Bitte wählen Sie einen Kurs aus</h2>
        </div>
        <div class="pure-menu pure-menu-horizontal">
            <ul class="pure-menu-list">
                <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                    <a id="select-course" class="pure-menu-link">Kurs</a>
                    <ul class="pure-menu-children">
                        <li v-for="(course, index) in getCourses" :key="index" class="pure-menu-item">
                            <router-link :to="'/teacher/courses/'+course.cid" tag="a" :key="course.id" class="pure-menu-link">Kurs: {{ course.id }} ({{course.short}})</router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <br />
        <table class="pure-table" v-show="id != null">
        <thead>
            <tr>
                <th>Name</th>
                <th class="rotate">Klausur 1</th>
                <th class="rotate">Klausur 2</th>
                <th class="rotate">Mündl 1</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(student, index) in getStudents(id)" :key="index" class="pure-table-odd">
                <td>{{student.surname}}, {{student.firstname}}</td>
                <td v-for="(mark, index) in renderMarks(student.uid)" :key="index">{{mark.mark}}</td>
            </tr>
        </tbody>
        </table>
        <!-- Mark selector -->
        <div>
        <markselector @onChange="change"/>
            
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import spinner from '../components/spinner'
import markselector from '../components/markselector'

export default {
    name: 'teachercourse',
    components: {spinner, markselector},
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
        if (this.id != null) { // checks if id is set in URL params
            this.$store.dispatch('fetchStudents', this.id);
        }
	},
    methods: {
        renderMarks: function (id) {
            console.log(id)
            return [{"mark": 15, "mid":1},{"mark": 10, "mid":2}, {"mark": 11, "mid":3}]
        },
        change: function (to) {
            console.log('button pressed' + to)
        }
    },
    computed: {
        ...mapGetters(['getCourses', 'getStudents', 'getCourse'])
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
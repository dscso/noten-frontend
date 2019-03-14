<template>
    <div>
        <div class="header">
            <h1>Kurse <span v-show="id != null">({{getStudentCourse(id).short }})</span></h1>
            <h2 v-show="id == null">Bitte einen Kurs auswählen</h2>
        </div>
        <div class="head">
            <div class="pure-menu pure-menu-horizontal head-element">
                <ul class="pure-menu-list">
                    <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                        <a id="select-course" class="pure-menu-link">Kurs <span v-show="!studentCoursesDownloaded">...</span><span v-show="id != null">({{getStudentCourse(id).short }})</span></a>
                        <ul class="pure-menu-children">
                            <li v-for="(course, index) in getStudentCourses" :key="index" class="pure-menu-item">
                                <router-link :to="'/student/courses/'+course.cid" tag="a" :key="course.id" class="pure-menu-link">Kurs: {{ course.id }} ({{course.short}})</router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        
        <table class="pure-table" v-show="id != null">
        <thead>
            <tr>
                <th v-for="(meta, index) in getStudentMarkMeta(id)" :key="index">{{meta.name}}</th>
            </tr>
        </thead>
        <tbody>
            <td v-for="(meta, index) in getStudentMarkMeta(id)" :key="index">{{getMark(meta.mid).mark}}</td>
        </tbody>
        </table>
    </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
    name: 'studentcourses',
    props: {
        id: {
            type: String,
            required: false
        }
    },
    components: {},
    data: function () {
        return {}
    },
    methods: {
        getMark: function (mid) {
            var marks = this.getStudentMarks
            console.log(marks.length)
            for (let i = 0; i < marks.length; i++) {
                console.log([marks[i], mid])
                if (marks[i].metaid == mid) {
                    return marks[i]
                }
            }
            return {};
        }
    },
    created() {
		this.$store.dispatch('fetchStudent')
        .then(function (resp) {

        })
	},
    computed: {
        ...mapGetters(['getStudentCourses', 'studentCoursesDownloaded', 'getStudentCourse', 'getStudentMarkMeta', 'getStudentMarks'])
    }
}
</script>

<style scoped>

</style>
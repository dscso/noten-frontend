<template>
    <div>
        <div class="header">
            <h1>Kurse</h1>
        </div>
        <div >
            <div v-for="(course, index) in getStudentCourses" :key="index">
                <h2 class="content-subhead">{{course.subject}} ({{course.short}})</h2>
                <table class="pure-table">
                <thead>
                    <tr>
                        <th v-for="(meta, index) in getStudentMarkMeta(course.cid)" :key="index">{{meta.name}}</th>
                    </tr>
                </thead>
                <tbody>
                    <td v-for="(meta, index) in getStudentMarkMeta(course.cid)" :key="index">{{getMark(meta.mid).mark}}</td>
                </tbody>
                </table>
            </div>
        </div>
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
.content-subhead {
    margin: 15px 0 15px 0;
    font-weight: 300;
    color: #888;
}
</style>
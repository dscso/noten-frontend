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
                <th v-for="(meta, index) in getMarkMetas(id)" :key="meta.mid" class="rotate">{{meta.name}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(student, index) in getStudents(id)" :key="student.uid" v-bind:class="{'pure-table-odd': index % 2 === 0}">
                <td>{{student.surname}}, {{student.firstname}}</td>
                <td v-for="(meta, index) in getMarkMetas(id)" :key="meta.mid" @click="showMarkSelector(meta, student)" ><!-- creates any row in this column in the table-->
                    {{getElement(student, meta).mark}}
                    <markselector v-show="selectorMeta.mid == meta.mid && selectorStudent.uid == student.uid" v-bind:current="getElement(student, meta).mark" class="markselector" @onChange="change"/>
                </td>
            </tr>
        </tbody>
        </table> {{this.lol}}
        <div class="close-popup" v-show="selectorMeta.mid != null" @click="selectorMeta = {}"></div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
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
            selectorMeta: {},
            selectorStudent: {},
            lol: "null"
        }
    },
    created() {
		this.$store.dispatch('fetchCourses');
        if (this.id != null) { // checks if id is set in URL params
            this.$store.dispatch('fetchStudents', this.id);
            this.$store.dispatch('fetchMarks', this.id);
        }
	},
    methods: {
        change: function (to) {
            //this.selectorStudent
            //this.selectorMeta
            this.$store.dispatch('setMark', {
                studentid: this.selectorStudent.uid,
                courseid: this.id,
                markmetaid: this.selectorMeta.mid,
                mark: to
            });
        },
        showMarkSelector: function (meta, student) {
            this.selectorMeta = meta;
            this.selectorStudent = student
        },
        getElement(student, meta) { // for table generation
            var marks = this.getMarks(this.id, student.uid)
            for (let i = 0; marks.length > i; i++) {
                if (marks[i].metaid == meta.mid) {
                    return marks[i]
                }
            }
            return {} // if there is no mark for this cell
        }
    },
    computed: {
        ...mapGetters(['getCourses', 'getStudents', 'getCourse', 'getMarkMetas', 'getMarks']), // make getters accessable in this component
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
.markselector {
    user-select: none;
    position: relative;
    z-index:3;
    margin-left: -30px;
    padding: 2px;
    background-color: white;
    margin-top: 10px;
    background-color: #eee;
}
.markselector::before {
    content: "";
    position: absolute;
    top: -20px;
    left: 50%;
    margin-left: -5px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #ccc transparent ;
}
.close-popup {
    top:0px;
    width: 100%;
    height: 100%;
    z-index:2;
    position: absolute;
}
</style>
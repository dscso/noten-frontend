<template>
    <div>
        <div class="header">
            <h1>Kurs {{getCourse(id).short}}</h1>
            <h2 v-show="!id > 0">Bitte wählen Sie einen Kurs aus</h2>
        </div>
        <div class="head">
            <div class="pure-menu pure-menu-horizontal head-element">
                <ul class="pure-menu-list">
                    <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                        <a id="select-course" class="pure-menu-link">Kurs <span v-show="!coursesDownloaded">...</span><span v-show="coursesDownloaded">{{getCourse(id).short}}</span></a>
                        <ul class="pure-menu-children">
                            <li v-for="(course, index) in getCourses" :key="index" class="pure-menu-item">
                                <router-link :to="'/teacher/courses/'+course.cid" tag="a" :key="course.id" class="pure-menu-link">Kurs: {{ course.id }} ({{course.short}})</router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="heat-element">
                <button class="pure-button" @click="showNewMarkMeta = true" v-show="id != null">Neue Note</button>
            </div>
            <div class="heat-element">
                <spinner v-show="coursesReady() && id != null" />
            </div>
            <div v-show="error" class="heat-element">
                <message type="error">Ups, da ist wohl was schiefgelaufen!</message>
            </div>
        </div>
        <table class="pure-table" v-show="id != null">
        <thead>
            <tr>
                <th>Name</th>
                <th v-for="(meta, index) in getMarkMetas(id)" :key="meta.mid">{{meta.name}}</th>
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
        </table>
        <newmarkmeta v-show="showNewMarkMeta" @done="showNewMarkMeta = false" v-bind:id="id"/>
        <div class="close-popup" v-show="selectorMeta.mid != null" @click="selectorMeta = {}"></div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import spinner from '../components/spinner'
import markselector from '../components/markselector'
import message from '../components/message.vue'
import newmarkmeta from '../components/newMarkMeta'

export default {
    name: 'teachercourse',
    components: {spinner, markselector, message, newmarkmeta},
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
            courseLoaded: false,
            studentsLoaded: false,
            error: false,
            showNewMarkMeta: false
        }
    },
    created() {
        var self = this;
		this.$store.dispatch('fetchCourses')
        .then(function (resp) {
            // do nothing
        }, function (error) {
            self.error = true
        });
        if (this.id != null) { // checks if id is set in URL params
            this.$store.dispatch('fetchStudents', this.id) // fetch all students in one course if is existant
            .then(function (resp) {
                self.courseLoaded = true
            }, function (error) {
                self.error = true
            });
            this.$store.dispatch('fetchMarks', this.id) // fetch all marks of the students
            .then(function (resp) {
                self.studentsLoaded = true
            }, function (error) {
                self.error = true
            });
        }
	},
    methods: {
        coursesReady: function () {
            return (!this.studentsLoaded || !this.courseLoaded)
        },
        change: function (to) {
            var self = this
            self.studentsLoaded = false;
            this.$store.dispatch('setMark', {
                studentid: this.selectorStudent.uid,
                courseid: this.id,
                markmetaid: this.selectorMeta.mid,
                mark: to
            }).then(function(data) {
                self.$store.dispatch('fetchMarks', self.id).then(function (resp) {
                    self.studentsLoaded = true;
                }, function (error) {
                    self.error = true
                });
            }, function (error) {
                self.error = true;
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
        },
        newMarkMeta: function () {
            alert("hhiiii")
        }
    },
    computed: {
        ...mapGetters(['getCourses', 'getStudents', 'getCourse', 'getMarkMetas', 'getMarks', 'coursesDownloaded']), // make getters accessable in this component
    }
}
</script>

<style scoped>
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
    position: fixed;
}
.head {
    display: flex;
}
.head-element {
    width: 100px;
    display: inline-block;
}
</style>
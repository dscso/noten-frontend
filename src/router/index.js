import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import http404 from '@/views/http404'
import teacherclass from '@/views/teachercourse'
import settings from '@/views/settings'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },{
            path: '/courses/:id',
            name: 'teachercourse',
            props: true,
            component: teacherclass
        },{
            path: '/teacher/courses',
            component: teacherclass
        },{
            path: '/settings',
            name: 'settings',
            component: settings
        },{
            path: "**",
            name: "http404",
            component: http404
        }
    ]
})

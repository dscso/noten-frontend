import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import http404 from '@/views/http404'

import teachercourse from '@/views/teachercourse'
import studentcourse from '@/views/studentcourse'
import settings from '@/views/settings'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: home
        },{
            path: '/teacher/courses/:id',
            props: true,
            component: teachercourse
        },{
            path: '/teacher/courses',
            component: teachercourse
        },{
            path: '/student/courses',
            component: studentcourse
        },{
            path: '/student/courses/:id',
            props: true,
            component: studentcourse
        },{
            path: '/settings',
            component: settings
        },{
            path: "**",
            component: http404
        }
    ]
})

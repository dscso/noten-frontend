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
            component: home
        },{
            path: '/teacher/courses/:id',
            props: true,
            component: teacherclass
        },{
            path: '/teacher/courses',
            component: teacherclass
        },{
            path: '/settings',
            component: settings
        },{
            path: "**",
            component: http404
        }
    ]
})

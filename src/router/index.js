import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import http404 from '@/views/http404'
import teacherclass from '@/views/teacherclass'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },{
            path: '/class/:id',
            name: 'teacherclass',
            props: true,
            component: teacherclass
        },{
            path: "**",
            name: "http404",
            component: http404
        }
    ]
})

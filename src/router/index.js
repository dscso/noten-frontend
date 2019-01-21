import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import http404 from '@/views/http404'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },{
            path: "**",
            name: "http404",
            component: http404
        }
    ]
})

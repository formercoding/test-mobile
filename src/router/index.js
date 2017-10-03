import Vue from 'vue'
import Router from 'vue-router'
import Introduction from '@/components/introduction'
import Question from '@/components/question'
import Result from '@/components/result'



Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: {
                name: 'introduction',
            }
        }, {
            path: '/introduction',
            name: 'introduction',
            component: Introduction
        }, {
            path: '/question',
            name: 'question',
            component: Question
        }, {
            path: '/result/:id',
            name: 'result',
            component: Result
        }
    ]
})

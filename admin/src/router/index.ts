import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
    {
        path: '/',
        component: () => import('@/views/Main.vue'),
        children: [
            {
                name: 'home',
                path: '/',
                component: () => import('@/views/Home.vue')
            },
            {
                name: 'course-list',
                path: '/courses/list',
                component: () => import('@/views/courses/CourseList.vue')
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router

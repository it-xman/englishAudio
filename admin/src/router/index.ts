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
                name: 'course-crud',
                path: '/:resource/list',
                component: () => import('@/components/ResourceCrud.vue'),
                props: true
            },
            // {
            //     name: 'course-list',
            //     path: '/courses/list',
            //     component: () => import('@/views/courses/CourseList.vue')
            // },
            // {
            //     name: 'course-edit',
            //     path: '/courses/edit/:id',
            //     component: () => import('@/views/courses/CourseEdit.vue'),
            //     props: true
            // },
            // {
            //     name: 'course-create',
            //     path: '/courses/create',
            //     component: () => import('@/views/courses/CourseEdit.vue')
            // }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router

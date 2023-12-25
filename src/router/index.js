import { createRouter, createWebHistory } from 'vue-router'
import { unauthorized } from "@/net";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@/views/index.vue'),
        },{
            path: '/login',
            name: 'login',
            component: () => import('@/views/login.vue'),
        },{
            path: '/register',
            name: 'register',
            component: () => import('@/views/register.vue'),
        },{
            path: '/searchResult',
            name: 'searchResult',
            component: () => import('@/views/searchResult.vue'),
        },{
            path: '/videoPlay',
            name: 'videoPlay',
            component: () => import('@/views/videoPlay.vue'),
        },{
            path: '/userCenter',
            name: 'userCenter',
            component: () => import('@/views/userCenter.vue'),
        },
        // {
        //     path: '/editUser',
        //     name: 'editUser',
        //     component: () => import('@/component/UserCenter/editUser.vue'),
        // },{
        //     path: '/message',
        //     name: 'massage',
        //     component: () => import('@/component/UserCenter/message.vue'),
        // },{
        //     path: '/addVideo',
        //     name: 'addVideo',
        //     component: () => import('@/component/UserCenter/addVideo.vue'),
        // },{
        //     path: '/followings',
        //     name: 'followings',
        //     component: () => import('@/component/UserCenter/followings.vue'),
        // },{
        //     path: '/followers',
        //     name: 'followers',
        //     component: () => import('@/component/UserCenter/followers.vue'),
        // },{
        //     path: '/myVideos',
        //     name: 'myVideos',
        //     component: () => import('@/component/UserCenter/myVideos.vue'),
        // }
    ]
})

// router.beforeEach((to, from, next) => {
//     const isUnauthorized = unauthorized()
//     if(to.name.startsWith('index') && !isUnauthorized) {
//         next('/index')
//     } else if(to.fullPath.startsWith('/index') && isUnauthorized) {
//         next('/')
//     } else {
//         next()
//     }
// })

export default router

import { createRouter, createWebHistory } from 'vue-router'

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
        }
    ]
})

router.beforeEach((to, from, next) => {
    const userId=sessionStorage.getItem("userId")
    if(to.name.startsWith('videoPlay') && userId==null) {
        next('/login')
    } else {
        next()
    }
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router';
import store from '@/store';
import Pages from '@/pages';


Vue.use(VueRouter);

const routes = [
    {
        path: '/index',
        component: Pages.IndexPage,
    },
    {
        path: '/search',
        component: Pages.SearchPage,
    },
    {
        path: '/order',
        component: Pages.OrderPage,
    },
    {
        path: '/my',
        component: Pages.MyPage,
    },
    {
        path: '/userInfo',
        component: Pages.UserPage,
        meta: {
            requireLogin: true,
        },
    },
    {
        path: '/login',
        component: Pages.LoginPage
    },
    {
        path: '/',
        redirect: '/index',
    }
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

router.beforeEach((to,from,next) => {
    store.dispatch('delayUpdatePageState', false);
    if(to.matched.some((item) => {
        return item.meta.requireLogin;
    })) {
        if (store.state.login.userInfo.type == 'login') {
            next();
        } else {
            next({
                path: '/login',
                query: {
                    redirectUrl: to.fullPath
                }
            })
        }
    }
    next();
})

export default router;
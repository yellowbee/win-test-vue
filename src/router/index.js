import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthHandler from '../components/AuthHandler';
import ImageList from '../components/ImageList';
import UploadForm from '../components/UploadForm';
import TaskSearch from '../components/search/TaskSearch';
import Me from '../components/me/Me';
import HowTo from '../components/me/HowTo';
import Signin from '../components/me/Signin';
import Signup from '../components/me/Signup';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/search'
        },
        {
            path: '/oauth2/callback',
            component: AuthHandler
        },
        {
            path: '/',
            component: ImageList
        },
        {
            path: '/upload',
            component: UploadForm
        },
        {
            path: '/search',
            component: TaskSearch
        },
        {
            path: '/me',
            component: Me,
            children: [
                {
                    path: 'how-to',
                    component: HowTo
                },
                {
                    path: 'sign-in',
                    component: Signin,
                    children: [
                        {
                            path: 'sign-up',
                            component: Signup
                        }
                    ]
                }
            ]
        }
    ]
});
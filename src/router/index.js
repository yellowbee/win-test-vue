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
import Profile from '../components/me/Profile';
import Terms from '../components/me/Terms';
import QRcode from '../components/me/QRcode';
import Share from '../components/me/Share';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/me'
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
                    path: 'profile',
                    component: Profile
                },
                {
                    path: 'qrcode',
                    component: QRcode
                },
                {
                    path: 'terms',
                    component: Terms
                },
                {
                    path: 'Share',
                    component: Share
                },
                {
                    path: 'official',
                    beforeEnter() {location.href = 'http://www.woyaotest.com'}
                },
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
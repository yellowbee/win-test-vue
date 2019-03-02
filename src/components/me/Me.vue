<template>
    <div class="me">
        <div class="wrapper" ref="wrapper">
            <Header :title="'我'"/>
            <div class="find-content">
                <div class="friend-circle">
                <img class="avatar-img" src="../../assets/me/panda.png" />
                <router-link v-if="!isLoggedIn" tag="div" @click.native="onClickSubRoute" to="/me/sign-in">
                    <span class="label-text">这里登录或注册, 查看更多信息</span>
                </router-link>
                </div>
                <router-link tag="div" @click.native="onClickSubRoute" class="friend-circle" to="/me/how-to">
                    <img class="find-img" src="../../assets/me/guide.svg" />
                    <span class="find-item">使用指南</span>
                </router-link>

                <div v-if="isLoggedIn" @click="logout" class="exit">
                    <img class="find-img" src="../../assets/me/exit.svg" />
                    <span class="find-item">退出</span>
                </div>
                <Tabbar/>
            </div>
        </div>
        <router-view @backToMe="onBackToMe"></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import Tabbar from '../common/Tabbar';
    import Header from '../common/Header';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        components: {
            Tabbar,
            Header
        },
        computed: {
            ...mapGetters(['isLoggedIn'])
        },
        data() {
            return {
                //show: 'true',
                //prevRoute: null
            }
        },
        methods: {
            onClickSubRoute() {
                const element = this.$refs.wrapper;
                element.classList.remove('animated', 'slideInLeft', 'faster');
                element.classList.add('animated', 'slideOutLeft');
            },
            onBackToMe() {
                const element = this.$refs.wrapper;
                element.classList.remove('animated', 'slideOutLeft');
                element.classList.add('animated', 'slideInLeft', 'faster');
            },
            ...mapActions(['logout'])
        },
        updated() {
            const route = this.$route.fullPath;
            if (route === '/' || route === '/search' || route === '/tasks' || route === '/me/sign-in' || route === '/me/sign-in/sign-up') {
                const element = this.$refs.wrapper;
                element.classList.remove('animated', 'slideInLeft', 'slideOutLeft', 'faster');
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../../scss/constants';

    .me {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 99;
        background-color: $bg-theme-color;
    }
    .wrapper{
        height: 100%;
        overflow: hidden;
    }
    .find-content{
        position: fixed;
        top: 50px;
        width: 100%;
        overflow: hidden;
    }
    .friend-circle{
        display: flex;
        align-items: center;
        left: 0;
        height: 40px;
        padding: 8px 10px;
        margin-top: 10px;
        background-color: #fff;
    }
    .exit {
        display: flex;
        align-items: center;
        left: 0;
        height: 40px;
        padding: 8px 10px;
        margin-top: 30px;
        background-color: #fff;
    }
    .find-img {
        height: 20px;
        width: 20px;
        padding-right: 20px;
    }
    .avatar-img {
        height: 30px;
        width: 30px;
        padding-right: 20px;
    }
    .animated.faster {
        animation-duration: .3s;
    }
    .label-text {
        text-decoration: underline;
    }
</style>

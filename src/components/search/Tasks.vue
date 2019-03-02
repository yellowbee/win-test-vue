<template>
    <div class="tasks">
        <div class="wrapper" ref="wrapper">
        <Header :title="'我的任务'"/>
        <div class="task-publish">
            <!-- <router-link tag="div" @click.native="onClickSubRoute" to="/tasks/new-task"> -->
            <mt-button @click="onPublish" type="primary">发布任务</mt-button>
            <!-- </router-link> -->
            <!-- <span>发布任务</span> -->

            <div v-if="!isLoggedIn" class="helper-text">登录后发布任务或查看已发布任务。</div>
        </div>
        <TaskList v-if="isLoggedIn" :token="getToken" :uuid="getUuid"/>
        <Tabbar/>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import axios from 'axios';
    import Tabbar from '../common/Tabbar';
    import Header from '../common/Header';
    import TaskList from './TaskList';
    import { mapGetters } from 'vuex';
    import { MessageBox } from 'mint-ui';

    export default {
        name: "tasks",
        components: {
            Tabbar,
            Header,
            TaskList
        },
        computed: {
            ...mapGetters(['isLoggedIn', 'getUuid', 'getToken'])
        },
        data: function() {
            return {
                tasks: []
            }
        },
        methods: {
            onPublish() {
                if (!this.isLoggedIn) {
                    MessageBox({
                        message: '您登录后，可以发布任务。'
                    });
                } else {
                    this.$router.push('/tasks/new-task');
                }
            },
            onClickSubRoute() {
                /*const element = this.$refs.wrapper;
                element.classList.remove('animated', 'slideInLeft', 'faster');
                element.classList.add('animated', 'slideOutLeft');*/
            }
        },
        created() {
            let config = {
                headers: { 'Authorization': "bearer " + this.getToken }
            };
            axios.get(`https://woyaotest.com/api/tasks/${this.getUuid}`, config)
                .then(response => {
                    this.tasks = response.data.tasks;
                });
        }
    }
</script>

<style scoped lang="scss">
    @import "../../scss/constants";

    .tasks {
        position: fixed;
        top: 0;
        bottom: 50px;
        left: 0;
        right: 0;
        z-index: 99;
        background-color: $bg-theme-color;
    }

    .task-publish {
        width: 90%;
        margin: 70px auto 0 auto;
        /*padding: 15px 0;*/
        color: white;
        font-size: 20px;
    }
    .mint-button {
        width: 100%;
        background-color: $theme-color;
    }
    .helper-text {
        color: black;
        margin: 30px 0;
    }
    .wrapper{
        height: 100%;
        overflow: hidden;
    }
</style>
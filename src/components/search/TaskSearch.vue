<template>
    <div class="search">
        <Header :title="'爱测试 (个人版)'" />
        <div class="head-holder"></div>
        <router-link v-if="!isLoggedIn" tag="div" to="/me/sign-in">
            <div class="helper-text">登录或注册后可以查看到更多任务哦!</div>
        </router-link>
        <div class="title">
            筛选测试任务
        </div>
        <div class="flex-container filter" @click="showPickerFilter">
            <div class="industry">{{ filter.industry === null ? '行业' : filter.industry }}</div>
            <div class="age">{{ filter.age === null ? '年龄' : filter.age }}</div>
            <div class="sex">{{ filter.sex === null ? '性别' : filter.sex }}</div>
        </div>
        <div class="gradient-bar" />
        <awesome-picker
                ref="picker_filter"
                :data="picker.data_filter"
                @cancel="handlePickerFilterCancel"
                @confirm="handlePickerFilterConfirm">
        </awesome-picker>
        <TaskList :tasks="tasks"/>
        <Tabbar/>
    </div>
</template>

<script>
    import Tabbar from '../common/Tabbar';
    import Header from '../common/Header';
    import TaskList from './TaskList';
    import axios from 'axios';
    import { mapGetters } from 'vuex';
    import selector from '../../common/js/constants';

    export default {
        name: "TaskSearch",
        components: {
            TaskList,
            Tabbar,
            Header
        },
        computed: {
            ...mapGetters(['isLoggedIn', 'getUuid', 'getToken'])
        },
        methods: {
            handlePickerFilterCancel() {
            },
            handlePickerFilterConfirm(e) {
                this.filter.industry = e[0].value;
                this.filter.age = e[1].value;
                this.filter.sex = e[2].value;

                let { industry, age, sex } = this.filter;
                let url = !this.isLoggedIn ? 'https://woyaotest.com/tasks/3' : 'https://woyaotest.com/tasks/-1';
                axios.post(url, {
                    industry,
                    age,
                    sex
                })
                    .then((res) => {
                        this.tasks = res.data;
                    })
                    .catch(function (err) {
                    });
            },
            showPickerFilter() {
                this.$refs.picker_filter.show();
            },
        },
        data() {
            let industry_selection = selector.industry.concat(['不限']);
            let age_selection = selector.age.concat(['不限']);
            let sex_selection = selector.sex.concat(['不限']);

            return {
                filter: {
                    industry: null,
                    age: null,
                    sex: null
                },
                picker: {
                    data_filter: [
                        industry_selection,
                        age_selection,
                        sex_selection
                    ]
                },
                tasks: null
            }
        },
        created() {
            let { industry, age, sex } = this.filter;
            let url = !this.isLoggedIn ? 'https://woyaotest.com/tasks/3' : 'https://woyaotest.com/tasks/-1';

            axios.post(url, {
                industry,
                age,
                sex
            })
                .then((res) => {
                    this.tasks = res.data;
                })
                .catch(function (err) {
                });
        }
    }
</script>

<style scoped lang="scss">
    @import "../../scss/constants";
    @import "../../scss/imports";
    @import "../../scss/mixins";

    .search {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: $bg-theme-color;
    }
    .head-holder {
        height: 50px;
    }
    .title {
        text-align: center;
        padding: 10px 0;
        font-size: $ft-page-title;
        width: 100%;
        background-color: #f8f8f8;
    }
    .filter {
        background-color: white;
        padding: 10px 0;
    }
    .gradient-bar {
        width: 100%;
        height: 5px;
        background-image: linear-gradient(#e8e8e8, white);
    }
    .industry, .age, .sex {
        width: 33%;
        text-align: center;
    }
    .helper-text {
        text-align: center;
        padding: 10px 0;
        background-color: $help-text-color;
        color: white;
        width: 100%;
        font-size: $ft-help-text;
    }
</style>
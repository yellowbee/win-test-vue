<template>
    <div class="search">
        <Header :title="'赚测试'" />
        <div class="title">筛选测试任务</div>
        <div class="flex-container filter" @click="showPickerFilter">
            <div class="industry">{{ filter.industry === null ? '行业' : filter.industry }}</div>
            <div class="age">{{ filter.age === null ? '年龄' : filter.age }}</div>
            <div class="sex">{{ filter.sex === null ? '性别' : filter.sex }}</div>
        </div>
        <awesome-picker
                ref="picker_filter"
                :data="picker.data_filter"
                @cancel="handlePickerFilterCancel"
                @confirm="handlePickerFilterConfirm">
        </awesome-picker>
        <div v-if="!isLoggedIn" class="helper-text">登录/注册查看更多参与测试的机会!</div>
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
            return {
                filter: {
                    industry: null,
                    age: null,
                    sex: null
                },
                picker: {
                    data_filter: [
                        ['互联网','通讯','交通','零售','建筑','金融','软件','政府','医疗','健康','制造业','汽车','媒体','能源','教育','咨询','不限'],
                        ['60后','70后','80后','85后','90后','95后','00后','不限'],
                        ['男','女','不限']
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
    .title {
        text-align: center;
        margin: 60px 0 20px 0;
        font-size: $ft-page-title;
    }
    .filter {
        background-color: white;
        padding: 10px 0;
    }
    .industry, .age, .sex {
        width: 33%;
        text-align: center;
    }
    .helper-text {
        text-align: center;
        padding: 10px 0;
    }
</style>
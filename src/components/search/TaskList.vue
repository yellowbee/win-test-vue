<template>
    <div class="scroll-list">
        <ul>
            <!-- <li v-for="item in list" style="margin: 120px 0;">{{ item }}</li> -->
            <div class="spinner" v-if="loadingData">
                <mt-spinner size="50" color="#184b86" type="fading-circle"></mt-spinner>
            </div>
            <div style="width: 90%; margin: 20px auto;" v-if="!loadingData && tasks.length==0">您还没有发布任何任务。</div>
            <div v-if="!loadingData">
            <TaskItem
                    v-for="task in tasks"
                    :task="task"
                    :key="task._id"
            >
            </TaskItem>
            </div>
            <div style="width: 100%; height: 250px;"/>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios';
    import TaskItem from './TaskItem';

    export default {
        name: 'TaskList',
        data() {
            return {
                list: [],
                loadingData: false
            }
        },
        components: {
            TaskItem
        },
        props: {
            tasks: Array
        },
        methods: {
            loadMore() {
                this.loading = true;
                setTimeout(() => {
                    let last = this.list[this.list.length - 1];
                    for (let i = 1; i <= 10; i++) {
                        this.list.push(last + i);
                    }
                    this.loading = false;
                }, 2500);

                this.loading;
            }
        },
        watch: {
            '$route': function() {
                if (this.$route.fullPath === '/tasks') {
                    this.loadingData = true;
                    let config = {
                        headers: {'Authorization': "bearer " + this.token}
                    };
                    axios.get(`https://woyaotest.com/api/tasks/${this.uuid}`, config)
                        .then(response => {
                            this.tasks = response.data.tasks;
                            this.loadingData = false;
                        });
                }
            }
        }
        /*created() {
            this.loadingData = true;
            let config = {
                headers: { 'Authorization': "bearer " + this.token }
            };
            axios.get(`https://woyaotest.com/api/tasks/${this.uuid}`, config)
                .then(response => {
                    this.tasks = response.data.tasks;
                    this.loadingData = false;
                });
        }*/
    };
</script>

<style scoped>
    .scroll-list {
        position: fixed;
        top: 190px;
        left: 0;
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }
    .spinner {
        width: 85px;
        height: 85px;
        margin: 150px auto;
    }
</style>
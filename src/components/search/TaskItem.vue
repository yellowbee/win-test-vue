<template>
    <li class="testee">
        <div class="head">
            {{ task.name }}
        </div>
        <p class="section" ref="taskDesc"></p>
        <div class="section">
            <div class="sec-head">测试者标准</div>
            <div>
                年龄:{{ task.age }} &nbsp; 性别:{{ task.sex }} &nbsp; 行业:{{ task.industry }} &nbsp; 任务:{{ task.edu }}
            </div>
        </div>
        <div class="section">
            <div class="sec-head">测试报酬:</div>
            <div>
                {{ task.payType }} {{task.payDesc }}
            </div>
        </div>
        <div class="section">
            <div class="sec-head">联系方式:</div>
            <div>
                手机号码: {{ task.mobile }}
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: 'TaskItem',
        props: {
            task: Object
        },
        computed: {
            descUrlified: function() {
                let urlRegex = /(https?:\/\/[^\s]+)/g;
                return this.task.desc.replace(urlRegex, function(url) {
                    return '<a href="' + url + '">' + url + '</a>';
                })
                // or alternatively
                // return text.replace(urlRegex, '<a href="$1">$1</a>')
            }
        },
        mounted: function () {
            this.$refs.taskDesc.innerHTML = this.descUrlified;
        }
    }
</script>

<style scoped lang="scss">
    @import "../../scss/constants";

    li {
        cursor: pointer;
        margin: 10px 0;
        padding: 20px 20px;
        background-color: white;
    }

    p {
        //white-space: pre-line;
        white-space: pre-wrap;
        word-break: break-all;
    }

    .head {
        color: $theme-color;
        margin: 10px 0;
    }
    .sec-head {
        font-weight: $ft-weight;
        margin-bottom: 5px;
    }
    .section {
        margin: 15px 0;
    }
</style>
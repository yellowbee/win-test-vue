<template>
    <li class="testee">
        <div class="head">
            {{ task.name }}
        </div>
        <div class="section">
            {{ task.desc }}
        </div>
        <div class="section">
            <div class="sec-head">测试者标准</div>
            <div>
                {{ task.age }} {{ task.sex }} {{ task.industry }} {{ task.edu }}
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

    .head {
        color: #184b86;
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
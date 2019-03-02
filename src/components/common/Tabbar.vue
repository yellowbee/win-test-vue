<template>
    <div class="tab">
        <router-link tag="div" class="tab-item" to="/search">
            <div class="tab-link tab-link-1">
                <span class="tab-link-text">找人测试</span>
            </div>
        </router-link>
        <router-link tag="div" class="tab-item" to="/me">
            <div class="tab-link tab-link-3">
                <span class="tab-link-text">我</span>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "Tabbar"
    }
</script>

<style scoped lang="scss">
    @import "../../scss/constants";

    .tab{
        border-top: 1px solid rgba(153,153,153,0.4);
        display: flex;
        position: fixed;
        height: 50px;
        line-height: 44px;
        font-size: 14px;
        bottom: 0px;
        left: 0;
        right: 0;
        /*z-index: 9;*/
        background-color: #fff;
    }
    .tab-item{
        flex: 1;
        text-align: center;
    }
    .tab-link{
        position: relative;
        color: #888888;
        height: 50px;
    }
    .tab-link span{
        position: absolute;
        font-size: 14px;
        line-height: 14px;
        height: 14px;
        width: 100%;
        bottom: 6px;
        left: 0px;
    }
    .tab-link-1{
        background: url('../../assets/tab/search_off.png') no-repeat center 6px;
        background-size: 20px 20px;
    }
    .tab-link-2{
        background: url('../../assets/tab/task_off.png') no-repeat center 6px;
        background-size: 20px 20px;
    }
    .tab-link-3{
        background: url('../../assets/tab/me_off.png') no-repeat center 8px;
        background-size: 16px 16px;
    }
    .router-link-active .tab-link{
        color: $theme-color;
    }
    .router-link-active .tab-link-1{
        background: url('../../assets/tab/search_on.png') no-repeat center 6px;
        background-size: 20px 20px;
    }
    .router-link-active .tab-link-2{
        background: url('../../assets/tab/task_on.png') no-repeat center 6px;
        background-size: 20px 20px;
    }
    .router-link-active .tab-link-3{
        background: url('../../assets/tab/me_on.png') no-repeat center 8px;
        background-size: 16px 16px;
    }
</style>
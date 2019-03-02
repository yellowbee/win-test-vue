<template>
    <div id="app">
        <div>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
            <!--
            <div class="tab">
                <router-link tag="div" class="tab-item" to="/search">
                    <div class="tab-link tab-link-1">
                        <span class="tab-link-text">找人测试</span>
                    </div>
                </router-link>
                <router-link tag="div" class="tab-item" to="/tasks">
                    <div class="tab-link tab-link-2">
                        <span class="tab-link-text">我的任务</span>
                    </div>
                </router-link>
                <router-link tag="div" class="tab-item" to="/me">
                    <div class="tab-link tab-link-3">
                        <span class="tab-link-text">我</span>
                    </div>
                </router-link>
            </div>
            -->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app',
        methods: {
        }
    }
</script>

<style lang="scss">
    @import "./scss/constants";
    /*@import "./common/style.css"*/

    /* http://meyerweb.com/eric/tools/css/reset/
       v2.0 | 20110126
       License: none (public domain)
    */
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
        font-family: 'Avenir Next','Lantinghei SC';
        font-smoothing: antialiased; /*字体平滑显示*/
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }


    html, body {
        margin: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    div, input, textarea {
        box-sizing: border-box;
    }
    #app{
        height: 100%;
    }
    .app-header{
        background-color: $theme-color;
        height: 50px;
        color: #fff;
        position: absolute;
        width: 100%;
        /*z-index: 9;*/
    }
    .title{
        font-size: 18px;
        padding-top: 14px;
        padding-left: 14px;
    }
    .search img{
        position: absolute;
        top: 14px;
        right: 80px;
    }
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
        background: url('./assets/tab/search_off.png') no-repeat center 6px;
        background-size: 20px 20px;
    }
    .tab-link-2{
        background: url('./assets/tab/task_off.png') no-repeat center 6px;
        background-size: 20px 20px;
    }
    .tab-link-3{
        background: url('./assets/tab/me_off.png') no-repeat center 8px;
        background-size: 16px 16px;
    }
    textarea:focus, input:focus {
        outline: none;
    }
    textarea, input {
        border: none;
    }
    .router-link-active .tab-link{
        color: $theme-color;
    }
    .router-link-active .tab-link-1{
        background: url('./assets/tab/search_on.png') no-repeat center 6px;
        background-size: 20px 20px;
    }
    .router-link-active .tab-link-2{
        background: url('./assets/tab/task_on.png') no-repeat center 6px;
        background-size: 20px 20px;
    }
    .router-link-active .tab-link-3{
        background: url('./assets/tab/me_on.png') no-repeat center 8px;
        background-size: 16px 16px;
    }

</style>
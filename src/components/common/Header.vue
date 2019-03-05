<template>
    <div class="app-header">
        <div>{{ title }}</div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        props: ['title']
    }
</script>

<style scoped lang="scss">
    @import "../../scss/constants";

    .app-header {
        background-color: $theme-color;
        height: 50px;
        color: #fff;
        width: 100%;
        padding: 15px 0 0 15px;

        font-size: $ft-page-title;
    }
</style>
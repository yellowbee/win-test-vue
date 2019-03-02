<template>
    <div class="app-header">
        <div class="title">{{ title }}</div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        props: ['title']
    }
</script>

<style scoped>
    app-header{
        background-color: #184b86;
        height: 50px;
        color: #fff;
        position: fixed;
        top: 0;
        width: 100%;
        /*z-index: 9;*/
    }
</style>
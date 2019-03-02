<template>
    <transition name="slide">
        <div class="how-to">
            <Back @click.native="onClickBack" :destRoute="'/me'" :title="'使用指南'"/>

            <div class="content-wrapper" ref="wrapper">
                <div class="content">
                    <img class="how-to-img" src="../../assets/me/how_to.png" />
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import BScroll from 'better-scroll';
    import Back from '../common/Back';

    export default {
        components: {
            BScroll,
            Back
        },
        mounted() {
            this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.wrapper, {click: true})
            })
        },
        name: "HowTo",
        methods: {
            onClickBack() {
                this.$emit('backToMe', null);
            }
        }
    }
</script>

<style scoped>
    .how-to{
        /*position: fixed;
        top: 0;
        bottom: 50px;
        left: 0;
        right: 0;
        z-index: 99;
        background-color: rgba(238,233,233,0.6);*/

        position: fixed;
        width:100%;
        height:100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 89;
        background-color: rgba(238,233,233,1);
        /*overflow: scroll;*/
    }
    .how-to-img {
        display: block;
        width: 100%;
    }

    .content-wrapper{
        height: 100%;
        overflow: hidden;
    }

    .slide-enter-active,.slide-leave-active{
        transition: all 0.3s;
    }
    .slide-enter,.slide-leave-to{
        transform: translate3d(100%, 0, 0);
    }
</style>
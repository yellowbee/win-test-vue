<template>
    <transition name="slide">
        <div class="qrcode-container">
            <div style="position: fixed;width: 100%; z-index: 90;">
                <Back :destRoute="'/me'" :title="'分享爱测试应用'"/>
            </div>
            <div class="terms">
                <img class="qrcode-img" src="../../assets/me/QRcode.png" />
            </div>
        </div>
    </transition>
</template>

<script>
    import Back from '../common/Back';

    export default {
        name: "QRcode",
        components: {
            Back
        },
        data() {
            return {
                terms: {
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../scss/constants";

    .qrcode-container {
        position: fixed;
        width:100%;
        height:100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 89;
        background-color: $bg-theme-color;
        overflow-y: auto;
    }
    .qrcode-img {
        width: 100%;
        margin-top: 50px;
    }
    .slide-enter-active,.slide-leave-active{
        transition: all 0.3s;
    }
    .slide-enter,.slide-leave-to{
        transform: translate3d(100%, 0, 0);
    }
</style>
<template>
    <transition name="slide">
        <div class="qrcode-container">
            <div style="position: fixed;width: 100%; z-index: 90;">
                <Back :destRoute="'/me'" :title="'分享爱测试'"/>
            </div>
            <div style="padding: 5em 1em 1em 1em">
                <div style="font-size: 1.5em; margin: 0.5em 0">分享爱测试APP</div>
                <p>
                    分享下面链接给小伙伴，小伙伴每完成一个测试任务后，您也能获得相对应的奖励提成哦，赶快参与分享吧！
                </p>
            </div>
            <div style="padding: 0 1em">
                <input class="form-code" type="text" v-model="shareLink" placeholder="分享链接">
                <mt-button
                        class="form-get-code"
                        type="primary"
                        v-clipboard:copy="shareLink"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError"
                >
                    复制分享链接
                </mt-button>
                <div v-if="copied" style="color:green">分享链接已复制，赶紧分享给小伙伴吧!</div>
            </div>
            <div class="terms">
                <img class="qrcode-img" src="../../assets/me/placeholder.png" />
            </div>
        </div>
    </transition>
</template>

<script>
    import Back from '../common/Back';

    export default {
        name: "Share",
        components: {
            Back
        },
        methods: {
          onGetShareLink() {

          },
          onCopy: function (e) {
              this.copied = true;
          },
          onError: function (e) {
              alert('Failed to copy texts')
          }
        },
        created() {

        },
        data() {
            return {
                shareLink: 'http://wintest.m.woyaotest.com/me/sign-in/sign-up',
                copied: false
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

    .form-code {
        display: inline-block;
        width: calc(55% - 1em);
        height: 40px;
        margin: 10px 1em 0 0;
        padding: 0 0 0 10px;
        font-size: $ft-form-normal;
        //background-color: $bg-theme-color;
    }
    .form-get-code {
        display: inline-block;
        width: calc(45% - 10px);
        color: white;
        margin: 10px 0;
        font-size: $ft-form-normal;
        background-color: $theme-color;
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
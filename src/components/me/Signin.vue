<template>
    <transition name="slide">
        <div class="sign-in">
            <div ref="wrapper">
            <!-- <Back @click.native="onClickBack" :destRoute="'/me'" :title="'登录'"/> -->
            <Back :destRoute="'/me'" :title="'登录'"/>

            <div class="form">
                <div class="flex-container">
                    <div style="width: 50%;" class="page-title">测试者登录</div>
                    <router-link style="width: 50%;margin: 50px 0;" tag="div" class="helper-text" to="/me/sign-in/sign-up">
                        还没有账号? 请注册
                    </router-link>
                </div>
                <form @submit="handleSubmit">
                    <div v-if="errors.mobile" class="err-msg">{{ errors.mobile }}</div>
                    <input class="form-mobile" type="text" v-model="testee.mobile" placeholder="手机"/>
                    <div v-if="errors.code" class="err-msg">{{ errors.code }}</div>
                    <input class="form-code" type="text" v-model="testee.code" placeholder="验证码">
                    <mt-button @click="onGetCode" class="form-get-code" type="primary" :disabled="getCodeBtn.disabled">
                        获取验证码
                    </mt-button>
                    <div style="width: 100%; border-bottom: 1px solid gray; margin-bottom: 10px;"/>
                    <div v-if="errors.response" class="err-msg">{{ errors.response }}</div>
                    <mt-button class="form-submit" type="submit" :disabled="signinBtn.disabled">
                        登录
                    </mt-button>
                </form>
            </div>
            <!-- <router-link tag="div" @click.native="onClickSubRoute" class="helper-text" to="/me/sign-in/sign-up"> -->
        </div>
            <!-- <router-view @backToMe="onBackToMe"></router-view> -->
            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
    import Back from '../common/Back';
    import axios from 'axios';
    import { mapActions } from 'vuex';

    export default {
        name: "Signin",
        components: {
            Back
        },
        methods: {
            ...mapActions(['login']),
            onClickBack() {
                this.$emit('backToMe', null);
            },
            onClickSubRoute() {
                const element = this.$refs.wrapper;
                element.classList.remove('animated', 'slideInLeft', 'faster');
                element.classList.add('animated', 'slideOutLeft');
            },
            onBackToMe() {
                const element = this.$refs.wrapper;
                element.classList.remove('animated', 'slideOutLeft');
                element.classList.add('animated', 'slideInLeft', 'faster');
            },
            handleSubmit(e) {
                e.preventDefault();
                if (this.checkForm()) {
                    this.signinBtn.disabled = true;

                    axios.post('https://woyaotest.com/testee-login', {
                        mobile: this.testee.mobile,
                        code: this.testee.code
                    })
                        .then((res) => {
                            if (!res.data.success) {
                                if (res.data.errorCode === '0003') {
                                    this.errors.response = '手机号码还未注册，请尝试用其他号码登录, 或先注册。'
                                } else if (res.data.errorCode === '0005') {
                                    this.errors.response = '验证码不正确，请重新输入或获取';
                                }
                                this.signinBtn.disabled = false;
                            } else {
                                this.errors.response = null;
                                this.login({ token: res.data.token, uuid: res.data.uuid, name: res.data.name });
                            }
                        })
                        .catch(function (err) {
                            this.errors.response = '验证码不正确，请重新输入或获取';
                            this.signinBtn.disabled = false;
                        });
                }
            },
            checkForm() {
                let success = true;

                if (!this.testee.mobile.match(/1[\d]{10}/)) {
                    this.errors.mobile = '请输入有效手机号';
                    success = false;
                } else {
                    this.errors.mobile = null;
                }

                if (!this.testee.code) {
                    this.errors.code = '验证码不能为空';
                    success = false;
                } else {
                    this.errors.code = null;
                }

                return success;
            },
            onGetCode(e) {
                e.preventDefault();
                if (!this.testee.mobile || !this.testee.mobile.match(/^1[\d]{10}$/)) {
                    this.errors.mobile = '请输入有效手机号';
                    return;
                } else {
                    this.errors.mobile = null;
                }

                this.getCodeBtn.disabled = true;
                axios.post('https://woyaotest.com/sms', {
                    mobile: this.testee.mobile
                })
                    .then((res) => {
                        if (!res.data.success) {
                            this.errors.response = '验证码发送失败，请再次获取。'
                        } else {
                            this.errors.response = null;
                        }
                        this.getCodeBtn.disabled = false;
                    })
                    .catch(function (err) {
                        this.errors.response = '验证码发送失败，请再次获取。'
                        this.getCodeBtn.disabled = false;
                    });
            },
        },
        data() {
            return {
                errors: {
                    mobile: null,
                    response: null
                },
                testee: {
                    mobile: '',
                    code: ''
                },
                getCodeBtn: {
                    disabled: false
                },
                signinBtn: {
                    disabled: false
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../scss/constants";

    .sign-in {
        position: fixed;
        width:100%;
        height:100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 89;
        background-color: $bg-theme-color;
    }
    .flex-container {
        display: flex;
        flex-direction: row;
    }
    .form {
        width: 80%;
        margin: 10px auto;
    }
    .form-mobile {
        display: block;
        width: 100%;
        height: 40px;
        border: none;
        border-radius: 5px;
        margin: 10px auto;
        padding: 0 0 0 10px;
        font-size: $ft-form-normal;
    }
    .form-code {
        display: inline-block;
        width: 55%;
        height: 40px;
        border: none;
        margin: 10px 0;
        padding: 0 0 0 10px;
        font-size: $ft-form-normal;
        background-color: $bg-theme-color;
    }
    .form-get-code {
        display: inline-block;
        width: calc(45% - 10px);
        color: white;
        margin: 10px 0;
        font-size: $ft-form-normal;
        background-color: $theme-color;
    }
    .form-submit {
        width: 100%;
        color: white;
        margin: 30px 0 5px 0;
        background-color: $theme-color;
    }
    .helper-text {
        width: 80%;
        margin: 0 auto;
        font-weight: $ft-weight;
        text-decoration: underline;
        font-size: $ft-form-normal;
    }
    .err-msg {
        font-size: $ft-form-err-msg;
        color: red;
    }
    .page-title {
        font-size: $ft-page-title;
        margin: 50px 0;
    }
    .slide-enter-active,.slide-leave-active{
        transition: all 0.3s;
    }
    .slide-enter,.slide-leave-to{
        transform: translate3d(100%, 0, 0);
    }
</style>
<template>
    <transition name="slide">
        <div class="sign-in">
            <!-- <Back @click.native="onClickBack" :destRoute="'/me/sign-in'" :title="'注册'"/> -->
            <Back :destRoute="'/me/sign-in'" :title="'注册'"/>

            <div class="form">
                <div class="page-title">测试者注册</div>

                <form @submit.prevent="handleSubmit">
                    <div>
                        <div v-if="errors.name" class="err-msg" style="display: inline-block;width: 50%;">{{ errors.name }}</div>
                        <div v-if="errors.natural" style="display: inline-block;width: 50%"><div class="err-msg">{{ errors.natural }}</div></div>
                    </div>
                    <div class="flex-container" style="margin: 10px 0;">
                        <input class="name" type="text" v-model="testee.name" placeholder="姓名"/>
                        <div class="age-sex flex-container" @click="showPickerNatural">
                                <div class="age">{{ testee.age === null ? '年龄' : testee.age }}</div>
                                <div class="sex">{{ testee.sex === null ? '性别' : testee.sex }}</div>
                        </div>
                    </div>
                    <div v-if="errors.social" class="err-msg">{{ errors.social }}</div>
                    <div class="flex-container industry-edu" @click="showPickerSocial">
                        <div class="industry">{{ testee.industry === null ? '职业所属行业' : testee.industry }}</div>
                        <div class="edu">{{ testee.edu === null ? '学历' : testee.edu }}</div>
                    </div>

                    <awesome-picker
                            ref="picker_natural"
                            :data="picker.data_natural"
                            :swipeTime="picker.swipeTime"
                            @cancel="handlePickerNaturalCancel"
                            @confirm="handlePickerNaturalConfirm">
                    </awesome-picker>

                    <awesome-picker
                            ref="picker_social"
                            :data="picker.data_social"
                            @cancel="handlePickerSocialCancel"
                            @confirm="handlePickerSocialConfirm">
                    </awesome-picker>

                    <div v-if="errors.mobile" class="err-msg">{{ errors.mobile }}</div>
                    <input class="form-mobile" type="text" v-model="testee.mobile" placeholder="手机">
                    <div v-if="errors.code" class="err-msg">{{ errors.code }}</div>
                    <input class="form-code" type="text" v-model="testee.code" placeholder="验证码">
                    <mt-button @click="onGetCode" class="form-get-code" type="primary" :disabled="getCodeBtn.disabled">
                        获取验证码
                    </mt-button>
                    <div style="width: 100%; border-bottom: 1px solid gray; margin-bottom: 10px;"/>
                    <div v-if="errors.response" class="err-msg">{{ errors.response }}</div>
                    <mt-button class="form-submit" type="submit" :disabled="signupBtn.disabled">
                        加入并开始体验
                    </mt-button>
                </form>
            </div>
            <!-- <router-link tag="div" @click.native="onClickBack" class="helper-text" to="/me/sign-in"> -->
            <router-link tag="div" class="helper-text" to="/me/sign-in">
                已有账号， 进行登录
            </router-link>
        </div>
    </transition>
</template>

<script>
    import Back from '../common/Back';
    import axios from 'axios';
    import { mapActions, mapGetters } from 'vuex';
    import selector from '../../common/js/constants';

    export default {
        name: "Signup",
        components: {
            Back
        },
        computed: {
            ...mapGetters(['isLoggedIn'])
        },
        methods: {
            ...mapActions(['login']),
            onClickBack() {
                this.$emit('backToMe', null);
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
            handleSubmit(e) {
                e.preventDefault();
                if (this.checkForm()) {
                    this.signupBtn.disabled = true;

                    axios.post('https://woyaotest.com/new-testee', {
                        name: this.testee.name,
                        industry: this.testee.industry,
                        size: this.testee.size,
                        mobile: this.testee.mobile,
                        code: this.testee.code
                    })
                        .then((res) => {
                            if (!res.data.success) {
                                if (res.data.errorCode === '0001') {
                                    this.errors.response = '该手机号码已经使用，请尝试其他号码。'
                                } else if (res.data.errorCode === '0005') {
                                    this.errors.response = '验证码不正确，请重新输入或获取。';
                                }
                                this.signupBtn.disabled = false;
                            } else {
                                this.errors.response = null;
                                this.login({ token: res.data.token.value, uuid: res.data.testee.uuid });
                            }
                        })
                        .catch(function (err) {
                            this.errors.response = '验证码不正确，请重新输入或获取';
                            this.signupBtn.disabled = false;
                        });
                }
            },
            showPickerNatural() {
                this.$refs.picker_natural.show();
            },
            showPickerSocial() {
                this.$refs.picker_social.show();
            },
            handlePickerNaturalCancel() {
            },
            handlePickerNaturalConfirm(e) {
                this.testee.age = e[0].value;
                this.testee.sex = e[1].value;
            },
            handlePickerSocialCancel() {
            },
            handlePickerSocialConfirm(e) {
                this.testee.industry = e[0].value;
                this.testee.edu = e[1].value;
            },
            checkForm() {
                let success = true;

                if (!this.testee.name) {
                    this.errors.name = '姓名不能为空';
                    success = false;
                } else {
                    this.errors.name = null;
                }

                if (!this.testee.age || !this.testee.sex) {
                    this.errors.natural = '年龄/性别不能为空';
                    success = false;
                } else {
                    this.errors.natural = null;
                }

                if (!this.testee.industry || !this.testee.edu) {
                    this.errors.social = '行业/学历不能为空';
                    success = false;
                } else {
                    this.errors.social = null;
                }

                if (!this.testee.mobile || !this.testee.mobile.match(/^1[\d]{10}$/)) {
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
            }
        },
        data() {
            let industry_selection = selector.industry.concat(['其他']);
            return {
                errors: {
                  name: null,
                  natural: null,
                  social: null,
                  mobile: null,
                  code: null,
                  response: null
                },
                testee: {
                    name: null,
                    age: null,
                    sex: null,
                    industry: null,
                    edu: null,
                    mobile: null,
                    code: null
                },
                picker: {
                    data_natural: [
                        selector.age,
                        selector.sex
                    ],
                    data_social: [
                        industry_selection,
                        selector.edu
                    ]
                },
                getCodeBtn: {
                    disabled: false,
                    message: null
                },
                signupBtn: {
                    disabled: false
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../scss/constants";
    @import "../../scss/imports";
    @import "../../scss/mixins";

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
    .form {
        width: 80%;
        margin: 10px auto;
    }
    input {
        padding-left: 10px;
        border-radius: 5px;
    }
    .name {
        @include flex-item(50%, 40px);
    }
    .age-sex {
        @include flex-item(50%, 40px);
        margin-left: 5px;
        background-color: white;
        padding-left: 10px;
        border-radius: 5px;
    }
    .age, .sex, .industry, .edu {
        @include flex-item(50%, 40px);
        padding: 14px 0;
    }
    .industry-edu {
        background-color: white;
        margin: 10px 0;
        padding-left: 10px;
    }
    .form-picker {
        display: block;
        width: 100%;
        height: 40px;
        border: none;
        border-radius: 5px;
        background-color: white;
        margin: 10px auto;
        padding: 0 0 0 10px;
        font-size: $ft-form-normal;
    }
    .flex__item {
        height: 40px;
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
        margin: 50px 0 20px 0;
    }
    .slide-enter-active,.slide-leave-active{
        transition: all 0.3s;
    }
    .slide-enter,.slide-leave-to{
        transform: translate3d(100%, 0, 0);
    }
</style>
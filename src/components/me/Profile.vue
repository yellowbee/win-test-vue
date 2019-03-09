<template>
    <transition name="slide">
        <div class="sign-in">
            <div style="position: fixed;width: 100%; z-index: 90;">
                <Back :destRoute="'/me'" :title="'完善测试者资料'"/>
            </div>

            <div class="form">
                <div class="page-title">完善测试者资料</div>

                <form @submit.prevent="handleSubmit">
                    <div v-if="errors.name" class="err-msg">{{ errors.name }}</div>
                    <input class="form-mobile" type="text" v-model="testee.name" placeholder="姓名"/>
                    <div v-if="errors.profile" class="err-msg">{{ errors.profile }}</div>
                    <div class="form-picker" @click="showPicker">
                        <div class="picker-item" style="width: 20%;">{{ testee.age === null ? '年龄' : testee.age }}</div>
                        <div class="picker-item" style="width: 20%;">{{ testee.sex === null ? '性别' : testee.sex }}</div>
                        <div class="picker-item" style="width: 30%;">{{ testee.industry === null ? '职业' : testee.industry }}</div>
                        <div class="picker-item" style="width: 30%;">{{ testee.edu === null ? '学历' : testee.edu }}</div>
                    </div>
                    <textarea class="form-mobile form-desc" v-model="testee.desc" placeholder="请在这里写下自我介绍，方便测试的方式(在线/离线)和方便测试的时间段"/>

                    <div class="section-title">我的角色 (成为测试招募员能够赢取企业订单哦)</div>
                    <div class="form-picker" @click="showPickerRole">
                        <div class="picker-item" style="width: 100%;">{{ testee.role === null ? '用户角色' : testee.role }}</div>
                    </div>

                    <awesome-picker
                            ref="picker"
                            :data="picker.data"
                            @cancel="handlePickerCancel"
                            @confirm="handlePickerConfirm">
                    </awesome-picker>

                    <awesome-picker
                            ref="pickerRole"
                            :data="pickerRole.data"
                            @cancel="handlePickerRoleCancel"
                            @confirm="handlePickerRoleConfirm">
                    </awesome-picker>

                    <div class="section-title">联系方式</div>
                    <div v-if="errors.mobile" class="err-msg">{{ errors.mobile }}</div>
                    <div class="flex-container">
                        <input class="form-contact" style="width: 50%;" type="text" v-model="testee.mobile" placeholder="手机"/>
                        <input class="form-contact" style="margin-left: 10px;width: calc(50% - 10px);" type="text" v-model="testee.wechat" placeholder="微信"/>
                    </div>

                    <div class="section-title">期待测试报酬: (如果又个性化需求，请点击"其他"并详细描述)</div>
                    <div class="flex-container">
                        <div class="form-pay-type" @click="showPickerPay">{{ testee.payType === null ? '报酬方式' : testee.payType }}</div>
                        <input class="form-pay-desc" type="text" v-model="testee.payDesc" placeholder="详细描述"/>
                    </div>
                    <awesome-picker
                            ref="pickerPay"
                            :data="pickerPay.data"
                            @cancel="handlePickerPayCancel"
                            @confirm="handlePickerPayConfirm">
                    </awesome-picker>

                    <div v-if="errors.response" class="err-msg">{{ errors.response }}</div>
                    <mt-button class="form-submit" type="submit" :disabled="updateBtn.disabled">
                        更新个人资料
                    </mt-button>
                </form>
            </div>
        </div>
    </transition>
</template>

<script>
    import Back from '../common/Back';
    import axios from 'axios';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: "Profile",
        components: {
            Back
        },
        computed: {
            ...mapGetters(['isLoggedIn', 'getUuid', 'getToken'])
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                if (this.checkForm()) {
                    this.updateBtn.disabled = true;

                    let { age, desc, edu, industry, mobile, name, payDesc, payType, sex, role, wechat } = this.testee;
                    let config = {
                        headers: { 'Authorization': "bearer " + this.getToken }
                    };
                    axios.put('https://woyaotest.com/api/testee', {
                        uuid: this.getUuid,
                        age,
                        desc,
                        edu,
                        industry,
                        mobile,
                        name,
                        payDesc,
                        payType,
                        sex,
                        role,
                        wechat
                    }, config)
                        .then((res) => {
                            if (!res.data.success) {
                                this.errors.response = '提交更新没有成功，请再试一次。';
                                this.updateBtn.disabled = false;
                            } else {
                                this.errors.response = null;
                                this.$router.go(-1);
                            }
                        })
                        .catch(function (err) {
                            this.errors.response = '提交更新没有成功，请再试一次。';
                            this.updateBtn.disabled = false;
                        });
                }
            },
            showPicker() {
                this.$refs.picker.show();
            },
            handlePickerCancel() {},
            handlePickerConfirm(e) {
                this.testee.age = e[0].value;
                this.testee.sex = e[1].value;
                this.testee.industry = e[2].value;
                this.testee.edu = e[3].value;
            },
            showPickerPay() {
                this.$refs.pickerPay.show();
            },
            handlePickerPayCancel() {},
            handlePickerPayConfirm(e) {
                this.testee.payType = e[0].value;
            },
            showPickerRole() {
                this.$refs.pickerRole.show();
            },
            handlePickerRoleCancel() {},
            handlePickerRoleConfirm(e) {
                this.testee.role = e[0].value;
            },
            checkForm() {
                let success = true;

                if (!this.testee.name) {
                    this.errors.name = '请填写姓名';
                    success = false;
                } else {
                    this.errors.name = null;
                }

                if (!this.testee.sex || !this.testee.age || !this.testee.industry || !this.testee.edu) {
                    this.errors.profile = '请填写测试者标准';
                    success = false;
                } else {
                    this.errors.profile = null;
                }

                if (!this.testee.mobile || !this.testee.mobile.match(/^1[\d]{10}$/)) {
                    this.errors.mobile = '请输入有效手机号';
                    success = false;
                } else {
                    this.errors.mobile = null;
                }

                return success;
            }
        },
        created() {
            let config = {
                headers: { 'Authorization': "bearer " + this.getToken }
            };
            axios.get(`https://woyaotest.com/api/testee/${this.getUuid}`, config)
                .then((res) => {
                    if (res.data.success) {
                        let { age, desc, edu, industry, mobile, name, payDesc, payType, role, sex, wechat } = res.data.testee;
                        this.testee.age = age === undefined ? null : age;
                        this.testee.desc = desc === undefined ? null : desc;
                        this.testee.edu = edu === undefined ? null : edu;
                        this.testee.industry = industry === undefined ? null : industry;
                        this.testee.mobile = mobile === undefined ? null : mobile;
                        this.testee.name = name === undefined ? null : name;
                        this.testee.payDesc = payDesc === undefined ? null : payDesc;
                        this.testee.payType = payType === undefined ? null : payType;
                        this.testee.role = role === undefined ? null : role;
                        this.testee.sex = sex === undefined ? null : sex;
                        this.testee.wechat = wechat === undefined ? null : wechat;
                    }
                })
                .catch(function (err) {
                });
        },
        data() {
            return {
                errors: {
                    name: null,
                    desc: null,
                    profile: null,
                    pay: null,
                    mobile: null,
                    response: null
                },
                testee: {
                    age: null,
                    desc: null,
                    edu: null,
                    industry: null,
                    mobile: null,
                    name: null,
                    payDesc: null,
                    payType: null,
                    sex: null,
                    role: null,
                    wechat: null
                },
                picker: {
                    data: [
                        ['60后','70后','80后','90后','95后','00后','不限'],
                        ['男', '女', '不限'],
                        ['互联网','软件','通讯','交通','零售','建筑','金融','政府','医疗','健康','制造业','媒体','能源','教育','咨询','自由职业','学生','家庭主妇','离退休','待业','不限'],
                        ['高中','大专','本科','研究生', '不限']
                    ]
                },
                pickerPay: {
                    data: [
                        ['现金','礼品卡','小礼品','其他']
                    ]
                },
                pickerRole: {
                    data: [
                        ['我是测试参与者','我是测试招募员','我是参与者兼招募员']
                    ]
                },
                updateBtn: {
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
        overflow-y: auto;
    }
    .form {
        height: 100%;
        width: 80%;
        margin: 100px auto;
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
    .flex-container {
        display: flex;
        flex-direction: row;
        margin: 10px auto;
    }
    .form-pay-type, .form-contact {
        width: 35%;
        height: 40px;
        border: none;
        border-radius: 5px;
        background-color: white;
        padding: 14px;
        font-size: $ft-form-normal;
    }
    .form-pay-desc {
        width: calc(65% - 10px);
        height: 40px;
        border: none;
        border-radius: 5px;
        background-color: white;
        font-size: $ft-form-normal;
        padding-left: 10px;
        margin-left: 10px;
    }
    .picker-item {
        display: inline-block;
        padding: 0;
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
    .form-desc {
        height: 100px;
        padding: 10px 0 0 10px;
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
        margin: 30px 0 20px 0;
    }
    .section-title {
        margin-top: 35px;
        font-size: $ft-form-normal;
    }
    .slide-enter-active,.slide-leave-active{
        transition: all 0.3s;
    }
    .slide-enter,.slide-leave-to{
        transform: translate3d(100%, 0, 0);
    }
</style>
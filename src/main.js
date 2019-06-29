import Vue from 'vue'
import VueAnalytics from 'vue-analytics';
import MintUI from 'mint-ui';
import VueClipboard from 'vue-clipboard2';
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import store from './store'
//import VueLazyLoad from 'vue-lazyload'

import './common/style.css' // 这里需要引入基本的样式

// /* eslint-disable no-unused-vars */  // 这一句必须写，用来规避ES6的语法检测
// import vConsole from 'vconsole'  // 针对手机网页的前端 console 调试面板
// console.log('test')
//window['env'] = process.env.NODE_ENV;

Vue.use(VueAnalytics, {
    id: 'UA-80879372-2',
    router,
    debug: {
        enabled: process.env.NODE_ENV === 'development', // default false
        trace: true, // default false
        sendHitTask: process.env.NODE_ENV === 'production' // default true
    }
});

Vue.use(MintUI);
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);

import AwesomePicker from 'vue-awesome-picker';
Vue.use(AwesomePicker);

/*Vue.use(VueLazyLoad, {
    loading: require('./assets/lazy.png')
})*/

//Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

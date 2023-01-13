import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();

import Vue from 'vue';
import App from './vue/app';
import vuetify from './vue/plugins/vuetify'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast,{
    position:'top-left'
});

const app = new Vue({
    el:'#app',
    vuetify,
    components: { App }
});


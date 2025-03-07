import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import '@/assets/styles.scss';

const app = createApp(App);

// 使用路由中间件 为应用程序启用路由功能，使应用可以根据定义的路由在不同视图之间导航。
app.use(router);

// 使用 PrimeVue 插件并进行主题配置，将主题预设设置为 Aura，同时指定了暗模式选择器为 .app-dark。
app.use(PrimeVue, {
    theme: {
        preset: Aura, // 设置主题预设为Aura
        options: {
            darkModeSelector: '.app-dark' // 配置暗黑模式的选择器
        }
    }
});

// 使用 PrimeVue 的 ToastService 插件，该服务用于在应用程序中显示 Toast 通知。
app.use(ToastService);

// 使用 PrimeVue 的 ConfirmationService 插件，该服务用于在应用程序中显示确认对话框。
app.use(ConfirmationService);

// 将 Vue 应用挂载到 DOM 中 ID 为 app 的元素上，这是初始化 Vue 应用的最后一步。
app.mount('#app');

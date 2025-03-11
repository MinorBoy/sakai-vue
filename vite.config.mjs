import { fileURLToPath, URL } from 'node:url';

import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    // 配置优化依赖项
    optimizeDeps: {
        // 禁用自动发现依赖项，以提高性能
        noDiscovery: true
    },
    // 插件配置
    plugins: [
        // 使用Vue插件
        vue(),
        // 使用组件自动导入插件
        Components({
            dts: true, // 生成.d.ts类型声明文件，解决vscode中无法自动提示组件属性和方法的问题
            // 配置解析器
            resolvers: [PrimeVueResolver()]
        })
    ],
    // 解析配置
    resolve: {
        // 别名配置
        alias: {
            // 配置'@'符号指向的目录
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});

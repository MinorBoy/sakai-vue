// 配置Tailwind CSS的导出对象，用于定制化Tailwind CSS的行为和样式
/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui';

export default {
    // 配置暗黑模式的激活方式，通过选择器或特定类名来启用暗黑模式
    darkMode: ['selector', '[class*="app-dark"]'],

    // 指定内容文件的路径，Tailwind CSS会根据这些文件中的内容来生成相应的CSS规则
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

    // 插件配置，这里使用了PrimeUI插件来扩展Tailwind CSS的功能
    plugins: [PrimeUI],

    // 自定义主题配置，主要用于定义响应式设计的断点
    theme: {
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1920px'
        }
    }
};

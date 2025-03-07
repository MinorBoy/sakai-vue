/* eslint-env node */
// 导入现代模块解析所需的库，以确保ESLint能够正确解析模块
require('@rushstack/eslint-patch/modern-module-resolution');

// ESLint配置文件，用于定义项目中的代码规范和规则
module.exports = {
    // 设置当前配置为根配置，避免继承上级目录的ESLint配置
    root: true,
    // 定义环境中可用的全局变量，这里设置了Node.js环境
    env: {
        node: true
    },
    // 扩展自Vue 3和ESLint推荐的规则集，以及与Prettier格式规范的集成
    extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-prettier'],
    // 配置解析器选项，使用最新的ECMAScript版本
    parserOptions: {
        ecmaVersion: 'latest'
    },
    // 自定义规则配置，以覆盖或添加特定的规则
    rules: {
        // 关闭多词组件名称规则，允许使用单个单词作为Vue组件的名称
        'vue/multi-word-component-names': 'off',
        // 关闭保留组件名称规则，允许使用Vue保留的关键字作为组件名称
        'vue/no-reserved-component-names': 'off',
        // 设置Vue组件中标签的顺序，必须先script，然后template，最后style
        'vue/component-tags-order': [
            'error',
            {
                order: ['script', 'template', 'style']
            }
        ]
    }
};

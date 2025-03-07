/**
 * 导出一个配置对象，用于指定在项目中使用的PostCSS插件
 * 这里的配置定义了两个重要的PostCSS插件：tailwindcss和autoprefixer
 * 这些插件用于处理和转换CSS，以实现更好的跨浏览器兼容性和设计一致性
 */
module.exports = {
    // 定义要使用的PostCSS插件及其配置
    plugins: {
        // Tailwind CSS插件，用于提供一个实用程序优先的设计系统
        tailwindcss: {},
        // Autoprefixer插件，用于自动添加CSS前缀，以实现跨浏览器兼容性
        autoprefixer: {}
    }
};

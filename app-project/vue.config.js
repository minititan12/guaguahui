const path = require('path');
module.exports = {

  indexPath: 'index1.html',

  assetsDir: 'static',
  publicPath: './',

  devServer: {
    proxy: {
      '/api':{
        target:'http://test.gghbuy.com',
        changeOrigin: true
      },
      '/public':{
        target:'http://test.gghbuy.com',
        changeOrigin: true
      }
    }
  },

  configureWebpack:{
    resolve: {  // 配置解析别名
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    },
    module:{
        rules:[
        {
          test:/\.(woff2?|eot|ttf|otf)(\?.*)$/,
          loader:'url-loader',
          options:{
            limit: 10000,
            // name: utils.assetsPath('fonrs/[name].[hash:7].[ext]')
          }
        }
      ]
    },
  },

  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload');
  }
}
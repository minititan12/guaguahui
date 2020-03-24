const path = require('path');
module.exports = {

  indexPath: 'index1.html',

  assetsDir: 'static',
  publicPath: './',
  productionSourceMap: false,

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
    externals: {
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      'axios': 'axios'
    }
  },
}
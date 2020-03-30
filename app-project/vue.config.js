const path = require('path');
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');

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
    plugins: [
      new SkeletonWebpackPlugin({
        webpackConfig: {
            entry: {
                app: path.join(__dirname, './src/skeleton.js')
            }
        },
        minimize: true,
        quiet: true,
      })
    ],
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

  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
}
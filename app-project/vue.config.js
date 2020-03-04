const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin")
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
    plugins: [      
      new CompressionPlugin({
          test:/\.js$|\.html$|\.css/, //匹配文件名
          threshold: 10240,//对超过10k的数据压缩
          deleteOriginalAssets: false //不删除源文件
      })
    ]
  }
}
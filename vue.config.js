const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios'
  // 'element-ui': 'ELEMENT'
}

const cdn = {
  // 开发环境
  dev: {
    css: [
      // 'https://cdn.jsdelivr.net/npm/element-ui@2.4.11/lib/theme-chalk/index.min.css'
    ],
    js: [
      'https://cdn.bootcss.com/vue/2.5.17/vue.js',
      'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.js',
      'https://cdn.bootcss.com/vuex/3.0.1/vuex.js',
      'https://cdn.bootcss.com/axios/0.18.0/axios.js'
      // 'https://cdn.jsdelivr.net/npm/element-ui@2.4.11/lib/index.js'
    ]
  },
  // 生产环境
  build: {
    css: [
      // 'https://cdn.jsdelivr.net/npm/element-ui@2.4.11/lib/theme-chalk/index.min.css'
    ],
    js: [
      // disable cache wifi 310-420ms, max 600ms, fast 3g 3.07s
      'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js'
      // 'https://cdn.jsdelivr.net/npm/element-ui@2.4.11/lib/index.min.js'
    ]
  }
}

const isProduction = process.env.NODE_ENV === 'production'

// Gzip 压缩
const productionGzip = true
const productionGzipExtensions = ['js', 'css']

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true
    // proxy: {
    //   '/php': {
    //     target: '',
    //     ws: true,
    //     changeOrigin: true
    //   },
    //   '/java': {
    //     target: '',
    //     ws: true,
    //     changeOrigin: true
    //   }
    // }
  },
  configureWebpack: config => {
    config.externals = externals

    if (isProduction) {
      // 移除console debugger
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_debugger: true,
              drop_console: true
            }
          }
        })
      )
      if (productionGzip) {
        config.plugins.push(
          new CompressionWebpackPlugin({
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
          })
        )
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].cdn = cdn[isProduction ? 'build' : 'dev']
        return args
      })
  }
}

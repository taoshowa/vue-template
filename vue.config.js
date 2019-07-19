const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const pkg = require('./package.json')
const defaultSettings = require('./src/settings.js')

const dependencies = pkg.dependencies
const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios'
}
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: [
      `https://cdn.bootcss.com/vue/${dependencies['vue']}/vue.runtime.js`,
      `https://cdn.bootcss.com/vue-router/${dependencies['vue-router']}/vue-router.js`,
      `https://cdn.bootcss.com/vuex/${dependencies['vuex']}/vuex.js`,
      `https://cdn.bootcss.com/axios/${dependencies['axios']}/axios.js`
    ]
  },
  // 生产环境
  prod: {
    css: [],
    js: [
      // disable cache wifi 310-420ms, max 600ms, fast 3g 3.07s
      `https://cdn.jsdelivr.net/npm/vue@${dependencies['vue']}/dist/vue.runtime.min.js`,
      `https://cdn.jsdelivr.net/npm/vue-router@${dependencies['vue-router']}/dist/vue-router.min.js`,
      `https://cdn.jsdelivr.net/npm/vuex@${dependencies['vuex']}/dist/vuex.min.js`,
      `https://cdn.jsdelivr.net/npm/axios@${dependencies['axios']}/dist/axios.min.js`
    ]
  }
}

const name = defaultSettings.title || 'Vue Template' // page title

const isProduction = process.env.NODE_ENV === 'production'

// 静态库使用cdn形式加载 or 直接打包
const useExternals = false
// 生产模式移除console信息
const productionClear = false
// 生产模式Gzip压缩资源
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
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px2rem')({ remUnit: 37.5 }) // 换算的基数
        ]
      }
    }
  },
  configureWebpack: config => {
    config.name = name
    if (useExternals) {
      config.externals = externals
    }

    if (isProduction) {
      // 移除console debugger
      if (productionClear) {
        config.plugins.push(
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                drop_console: true // 删除console.*
                // pure_funcs: ['console.log'] // 删除console.log
              }
            }
          })
        )
      }
      if (productionGzip) {
        // Gzip
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
    // 防止关闭cdn index.html的报错
    config
      .plugin('html')
      .tap(args => {
        args[0].cdn = useExternals ? cdn[isProduction ? 'prod' : 'dev'] : { css: [], js: [] }
        return args
      })
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    // config
    //   .when(isProduction,
    //     config => {
    //       config
    //         .optimization.splitChunks({
    //           chunks: 'all',
    //           cacheGroups: {
    //             libs: {
    //               name: 'chunk-libs',
    //               test: /[\\/]node_modules[\\/]/,
    //               priority: 10,
    //               chunks: 'initial' // only package third parties that are initially dependent
    //             }
    //           }
    //         })
    //       config.optimization.runtimeChunk('single')
    //     }
    //   )
  }
}

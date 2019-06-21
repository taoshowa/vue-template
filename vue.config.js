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

const productionClear = true
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
    config.externals = externals
    config.name = name

    if (isProduction) {
      // 移除console debugger
      if (productionClear) {
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
    config
      .plugin('html')
      .tap(args => {
        args[0].cdn = cdn[isProduction ? 'prod' : 'dev']
        return args
      })
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  }
}

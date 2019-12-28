'use strict'
let { version } = require('./package.json')
version = version.replace(/\./g, '-')

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = 'vue map&charts' // page title

// If your port is set to 80
// use administrator privileges to execute the command line
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 8888 npm run dev OR npm run dev --port=8888
const port = process.env.port || process.env.npm_config_port || 8888 // dev port

module.exports = {
  /* 关于这个配置文件的配置参考：https://cli.vuejs.org/zh/config/#vue-config-js */

  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  /**
   * BASE_URL - 会和 vue.config.js 中的 publicPath 选项相符，即你的应用会部署到的基础路径
   */
  /**
   * NODE_ENV - 会是 "development"、"production"或"test"中的一个。具体的值取决于应用运行的模式
   */
  publicPath: process.env.NODE_ENV === 'production' ? '/map-chart/' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  // 在 multi-page 模式下构建应用
  /**
   * 因为我这里会多一个骨架片的构建，所以这个我使用了pages选项
   */
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/getData => mock/getData
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    after: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.when(process.env.NODE_ENV === 'production', config => {
      // 给打包后的app.js加上了版本号
      config.output.filename(`static/js/[name].[hash].${version}.js`).end()
      // 给打包后的chunk-vendors加上版本号
      config.output.chunkFilename(`static/js/[name].[hash].${version}.js`).end()
    })
  },
  pwa: {
    themeColor: 'red',
    msTileColor: 'red',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'red',
    manifestOptions: {
      theme_color: 'red',
      start_url: '/map-chart/',
      background_color: 'red'
    }
  }
}

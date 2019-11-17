module.exports = {
  presets: [
    // '@vue/cli-plugin-babel/preset'
    // '@vue/app'
    ['@vue/app', {
      useBuiltIns: 'entry'
    }]
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'mint-ui',
        style: true
      }
    ]
  ]
}

/**
'关于这个 babel.config.js 文件的说明： 【文档： https://cli.vuejs.org/zh/config/#babel】',
'所有的 Vue CLI 应用都使用 @vue/babel-preset-app, ',
'它包含了 babel-preset-env、JSX 支持以及为最小化包体积优化过的配置。（所以我在 presets 中使用了 @vue/app）',
'关于@vue/app更多的细节和 preset 选项,请看文档： 【文档： https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app】',
'与此同时呢, 关于 Polyfill 的配置也是需要我们关注的： 【文档：https://cli.vuejs.org/zh/guide/browser-compatibility.html#polyfill】',
''
*/

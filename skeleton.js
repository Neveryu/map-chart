const fs = require('fs')
const { resolve } = require('path')
const { createBundleRenderer } = require('vue-server-renderer')

function createRenderer(bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    // recommended for performance
    // runInNewContext: false
  }))
}

const handleError = err => {
  console.error(`error during render : ${req.url}`)
  console.error(err.stack)
}

const bundle = require('./dist/skeleton.json')
const templatePath = resolve('./public/index.template.html')
const template = fs.readFileSync(templatePath, 'utf-8')
const renderer = createRenderer(bundle, {
  template
})

// console.log(renderer)

/**
 * 说明：
 * 默认的index.html中包含<%= BASE_URL %>的插值语法
 * 我们不在生成骨架屏这一步改变模板中的这个插值
 * 因为这个插值会在项目构建时完成
 * 但是如果模板中有这个插值语法，而我们在vue-server-renderder中使用这个模板，而不传值的话，是会报错的
 * 所以，我们去掉模板中的插值，而使用这个传参的方式，再将这两个插值原模原样返回到模板中
 * 
 * 文档： https://cli.vuejs.org/zh/guide/html-and-static-assets.html#%E6%8F%92%E5%80%BC
 */
const context = {
  title: 'maps-charts',  // default title
  meta: `<meta name="theme-color" content="#4285f4">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <link rel="stylesheet" href="<%= BASE_URL %>css/reset.css">`
}

renderer.renderToString(context, (err, html) => {
  if(err) {
    return handleError(err)
  }
  fs.writeFileSync(resolve(__dirname, './public/index.html'), html, 'utf-8')
})

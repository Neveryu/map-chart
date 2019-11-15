const bodyParser = require('body-parser')

function registerRoutes(app) {
  let mockLastIndex
  const { default: mocks } = require('./index.js')
  for(const mock of mocks) {
    app[mock.type](mock.url, mock.response)   
    mockLastIndex = app._router.stack.length
  }
  const mockRoutesLength = Object.keys(mocks).length
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  }
}

module.exports = app => {
  // es6 polyfill
  // 这个必须的加，因为在node环境中使用es6的模块
  require('@babel/register')
  // 如果.env.devo
  // require('@babel/register')({
  //   presets: ['@babel/preset-env']
  // })

  // parse app body
  // https://expressjs.com/en/4x/api.html#req.body
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  const mockRoutes = registerRoutes(app)
  var mockRoutesLength = mockRoutes.mockRoutesLength
  var mockStartIndex = mockRoutes.mockStartIndex

  // watch files, hot reload mock server
  
}

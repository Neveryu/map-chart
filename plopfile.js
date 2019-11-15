const componentGenerator = require('./plop-templates/component/prompt')

module.exports = function(plop) {
  plop.setGenerator('component', componentGenerator)
}
